import { PHYSICS } from "../constants/physics";
import { DataItemInfo } from "../models/internal/data-item-info";
import { Configuration } from "../models/public/configuration";

export function getChartData(
  config: Configuration,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  // Add padding constant at the top
  const CANVAS_PADDING = 5; // pixels of padding around all edges

  // Calculate available space considering padding
  const maxPossibleRadius = Math.min(
    (canvas.width - CANVAS_PADDING * 2) / 2,
    (canvas.height - CANVAS_PADDING * 2) / 2
  );

  // Calculate radii based on available space
  // const availableWidth = canvas.width - CANVAS_PADDING * 2;
  // const availableHeight = canvas.height - CANVAS_PADDING * 2;
  // const canvasMinDimension = Math.min(availableWidth, availableHeight);

  // Add this code for crisp rendering
  const devicePixelRatio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  // reduce width & height
  // const rectWidth = rect.width - (rect.width / 100) * 10;
  // const rectHeight = rect.height - (rect.height / 100) * 10;

  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;

  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";

  ctx.scale(devicePixelRatio, devicePixelRatio);

  // Modify center calculations
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const sortedData: DataItemInfo[] = [...config.data]
    .sort((a, b) => b.value - a.value)
    .map((item) => ({
      ...item,
      radius: 0,
      x: 0,
      y: 0,
      fixed: false,
    }));

  const maxValue = sortedData[0].value;

  // Define radius range dynamically
  // const internalMinRadius = canvasMinDimension * 0.25; // 5% of smallest dimension
  // const internalMaxRadius = canvasMinDimension * 0.65; // 15% of smallest dimension

  const internalMaxRadius = Math.min(
    maxPossibleRadius * 0.5, // Use 80% of maximum possible space
    70 // Absolute maximum
  );

  const internalMinRadius = Math.max(
    internalMaxRadius * 0.3, // Minimum 30% of max radius
    25 // Absolute minimum
  );

  // Value-based radius calculation with padding consideration
  sortedData.forEach((item) => {
    // Calculate radius proportional to value and canvas size
    const valueRatio = item.value / maxValue;
    item.radius =
      internalMinRadius + valueRatio * (internalMaxRadius - internalMinRadius);

    // Ensure radius respects padding
    item.radius = Math.min(
      item.radius,
      (canvas.width - CANVAS_PADDING * 2) / 2,
      (canvas.height - CANVAS_PADDING * 2) / 2
    );
  });

  // Add aspect ratio preservation in bubble positioning
  sortedData.forEach((item, index) => {
    if (index === 0) {
      item.x = centerX;
      item.y = centerY;
      item.fixed = true;
    } else {
      const baseDist = sortedData[0].radius + item.radius + 3;

      // Replace with deterministic positioning using golden angle
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees

      // Calculate position with padding constraints
      const maxX = canvas.width - CANVAS_PADDING - item.radius;
      const maxY = canvas.height - CANVAS_PADDING - item.radius;

      item.x = Math.min(
        maxX,
        Math.max(
          CANVAS_PADDING + item.radius,
          centerX + Math.cos(goldenAngle * index) * baseDist
        )
      );
      item.y = Math.min(
        maxY,
        Math.max(
          CANVAS_PADDING + item.radius,
          centerY + Math.sin(goldenAngle * index) * baseDist
        )
      );

      item.fixed = false;
    }
  });

  // Physics simulation
  // Adjust physics parameters for tighter packing

  // Unified physics simulation and collision resolution
  for (let i = 0; i < PHYSICS.iterations; i++) {
    // Main physics simulation
    sortedData.forEach((current, index) => {
      // Apply special handling for center bubble
      if (index === 0) {
        // Soft center positioning with spring-like behavior
        const dx = centerX - current.x;
        const dy = centerY - current.y;
        const dist = Math.hypot(dx, dy);

        // Only apply correction if significantly off-center
        if (dist > 2) {
          current.x += dx * PHYSICS.centerDamping;
          current.y += dy * PHYSICS.centerDamping;
        }
        return;
      }

      let dxTotal = 0;
      let dyTotal = 0;

      // 1. Boundary constraints
      const boundaryPadding = current.radius + CANVAS_PADDING;
      if (current.x < boundaryPadding) {
        dxTotal += (boundaryPadding - current.x) * PHYSICS.boundaryForce;
      } else if (current.x > canvas.width - boundaryPadding) {
        dxTotal +=
          (canvas.width - boundaryPadding - current.x) * PHYSICS.boundaryForce;
      }

      // 2. Bubble repulsion with tight spacing
      sortedData.forEach((other) => {
        if (current === other) return;

        const dx = current.x - other.x;
        const dy = current.y - other.y;
        const distance = Math.hypot(dx, dy);
        const minDistance = current.radius + other.radius;

        // Apply repulsion force using PHYSICS.forceStrength
        if (distance < minDistance * 1.5) {
          // Only apply when bubbles are close
          const repulsionForce =
            PHYSICS.forceStrength * (minDistance / Math.max(distance, 0.1));
          dxTotal += (dx / distance) * repulsionForce;
          dyTotal += (dy / distance) * repulsionForce;
        }

        // Add additional center attraction
        const dxCenter = centerX - current.x;
        const dyCenter = centerY - current.y;
        const centerDistance = Math.hypot(dxCenter, dyCenter);

        // Value-based attraction strength (weaker for smaller values)
        const attractionStrength = 0.02 * (current.value / maxValue);

        current.x += (dxCenter / centerDistance) * attractionStrength;
        current.y += (dyCenter / centerDistance) * attractionStrength;
      });

      // 3. Strong center attraction with value-based weighting
      const dxCenter = centerX - current.x;
      const dyCenter = centerY - current.y;
      const centerDist = Math.hypot(dxCenter, dyCenter);
      const minCenterDist =
        sortedData[0].radius + current.radius + PHYSICS.centerRadiusBuffer;
      const attraction =
        PHYSICS.centerForce * (1 - Math.pow(current.value / maxValue, 0.3));

      // Value-based attraction strength
      const attractionStrength =
        PHYSICS.centerAttraction *
        (1 - current.value / maxValue) *
        (1 - Math.min(1, centerDist / minCenterDist));

      current.x += dxCenter * attractionStrength;
      current.y += dyCenter * attractionStrength;

      // Apply accumulated forces with damping
      current.x += dxTotal * (1 - PHYSICS.damping);
      current.y += dyTotal * (1 - PHYSICS.damping);
    });

    // Combined collision resolution
    sortedData.forEach((current, i) => {
      sortedData.forEach((other, j) => {
        if (i >= j) return;

        // Special handling for center bubble collisions
        if (i === 0 || j === 0) {
          const centerBubble = i === 0 ? current : other;
          const normalBubble = i === 0 ? other : current;

          const dx = normalBubble.x - centerBubble.x;
          const dy = normalBubble.y - centerBubble.y;
          const distance = Math.hypot(dx, dy);
          const minDistance = centerBubble.radius + normalBubble.radius + 2;

          if (distance < minDistance) {
            const overlap = minDistance - distance;
            const angle = Math.atan2(dy, dx);

            // Only move the normal bubble
            normalBubble.x += Math.cos(angle) * overlap * 0.7;
            normalBubble.y += Math.sin(angle) * overlap * 0.7;
          }
          return;
        }

        const dx = current.x - other.x;
        const dy = current.y - other.y;
        const distance = Math.hypot(dx, dy);
        // Adjusted to allow slight overlap for collision effect
        const minDistance = current.radius + other.radius - 5; // Allow 5px overlap

        if (distance < minDistance) {
          // Use forceStrength to influence collision response
          const overlap =
            (minDistance - distance) * (0.3 + PHYSICS.forceStrength * 5);
          const angle = Math.atan2(dy, dx);

          // Mass-weighted adjustment
          const massRatio = other.radius / (current.radius + other.radius);
          if (!current.fixed) {
            current.x += Math.cos(angle) * overlap * massRatio;
            current.y += Math.sin(angle) * overlap * massRatio;
          }
          if (!other.fixed) {
            other.x -= Math.cos(angle) * overlap * (1 - massRatio);
            other.y -= Math.sin(angle) * overlap * (1 - massRatio);
          }
        }
      });
    });
  }

  // Modify boundary clamping to include center bubble
  sortedData.forEach((bubble) => {
    const clampedX = Math.max(
      CANVAS_PADDING + bubble.radius,
      Math.min(canvas.width - CANVAS_PADDING - bubble.radius, bubble.x)
    );

    const clampedY = Math.max(
      CANVAS_PADDING + bubble.radius,
      Math.min(canvas.height - CANVAS_PADDING - bubble.radius, bubble.y)
    );

    // Only update position if not fixed or moved significantly
    if (
      !bubble.fixed ||
      Math.hypot(bubble.x - clampedX, bubble.y - clampedY) > 2
    ) {
      bubble.x = clampedX;
      bubble.y = clampedY;
    }
  });

  return sortedData;
}
