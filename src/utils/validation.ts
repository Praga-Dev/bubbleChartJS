import { Configuration } from "../models/public/configuration";

/**
 * Validates configuration and ensures required properties exist.
 */
export function validateConfig(config: Configuration): boolean {
  if (!config) {
    console.error("Invalid config object");
    return false;
  }

  if (!Array.isArray(config.data) || config.data.length === 0) {
    console.error("Invalid or empty data array");
    return false;
  }

  return true;
}
