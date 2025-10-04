"use client";

import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { COOKIE_CONFIG } from "../constants/cookieNames";
import remoteConfigSources from "../constants/remoteConfigSources";

/**
 * FeatureConfig
 *
 * This class stores and manages the uneditable (server-provided) remote config.
 * It acts as an in-memory cache so the uneditable config can be accessed
 * without repeatedly decoding or re-fetching.
 */
class FeatureConfig {
  config = null;

  /**
   * Get the uneditable config currently stored in memory.
   */
  getUneditableConfig() {
    return this.config;
  }

  /**
   * Set or update the uneditable config in memory.
   * @param {object|string} data - Encoded or plain uneditable config
   */
  setUneditableConfig(data) {
    this.config = data;
  }
}

export const featureConfig = new FeatureConfig();

/**
 * getDecodedConfig
 *
 * Returns the merged configuration object from:
 * - uneditable config (server-provided, persistent)
 * - editable config (stored in cookies for QA or testing overrides)
 *
 * If uneditable config is not set, it falls back to static remoteConfigSources.
 */
export function getDecodedConfig() {
  const preUneditable = featureConfig.getUneditableConfig();
  let uneditable = null;

  if (!Boolean(preUneditable)) {
    // Fallback to static config when server config is unavailable
    uneditable = remoteConfigSources;
  } else {
    // Decode JWT token from server
    uneditable = jwtDecode(preUneditable);
  }

  // Read editable config from cookies
  const preEditable = getCookie(COOKIE_CONFIG);
  if (!Boolean(preEditable)) {
    return uneditable;
  }
  const editable = jwtDecode(preEditable);

  // Merge: editable values override uneditable ones
  return {
    ...uneditable,
    ...editable,
  };
}

/**
 * getFeature
 *
 * Retrieve a feature object by key from the merged config.
 */
export function getFeature(key) {
  const config = getDecodedConfig();
  return config?.[key];
}

/**
 * isFeatureEnabled
 *
 * Check if a given feature is marked as enabled in config.
 */
export function isFeatureEnabled(key) {
  const feature = getFeature(key);
  return feature?.enabled === true;
}

/**
 * getFeatureData
 *
 * Retrieve the "data" property for a given feature.
 */
export function getFeatureData(key) {
  const feature = getFeature(key);
  return feature?.data;
}

/**
 * getFeatureDataAlter
 *
 * Retrieve the "data_alter" property for a given feature.
 * This is typically used as a fallback to prevent breaking changes
 * when the data structure of a feature changes significantly.
 */
export function getFeatureDataAlter(key) {
  const feature = getFeature(key);
  return feature?.data_alter;
}

/**
 * waitForUneditableConfig
 *
 * Utility to wait until the uneditable config is loaded in memory.
 * This is useful in async scenarios where the config might not be
 * ready immediately.
 *
 * @param {number} interval - polling interval in ms
 * @param {number} timeout - max time to wait in ms
 * @returns {Promise<object|string>} - resolves with uneditable config
 */
function waitForUneditableConfig(interval = 50, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const timer = setInterval(() => {
      const config = featureConfig.getUneditableConfig();
      if (config) {
        clearInterval(timer);
        resolve(config);
      } else if (Date.now() - start > timeout) {
        clearInterval(timer);
        reject(new Error("Timeout waiting for uneditable config"));
      }
    }, interval);
  });
}

/**
 * getDecodeConfigAsync
 *
 * Async/await-friendly version of getDecodedConfig.
 * Waits until uneditable config is available before resolving,
 * then merges with editable config from cookies.
 */
export async function getDecodeConfigAsync() {
  // Wait until uneditable config is ready
  const preUneditable = await waitForUneditableConfig();

  // Decode if the config is a token string, otherwise use directly
  const uneditable =
    typeof preUneditable === "string"
      ? jwtDecode(preUneditable)
      : preUneditable;

  // Get editable config from cookie
  const preEditable = getCookie(COOKIE_CONFIG);

  if (!preEditable) {
    return uneditable;
  }

  const editable = jwtDecode(preEditable);

  // Merge editable into uneditable
  return {
    ...uneditable,
    ...editable,
  };
}

/**
 * isFeatureEnabledAsync
 *
 * Async version of isFeatureEnabled.
 * Waits for config to be loaded before returning the result.
 *
 * @param {string} key
 * @returns {Promise<boolean>}
 */
export async function isFeatureEnabledAsync(key) {
  const config = await getDecodeConfigAsync();
  const feature = config?.[key];
  return feature?.enabled === true;
}
