"use client";

import { useEffect } from "react";
import { featureConfig } from "@/utils/featureConfig";

/**
 * ConfigInitializer
 *
 * This client-only component is responsible for fetching the remote
 * configuration from the backend API and injecting it into the
 * featureConfig utility at runtime.
 *
 * Notes:
 * - It runs once on the client when the app starts (empty dependency array).
 * - The component itself renders nothing (returns null).
 * - Errors are logged to the console but do not block rendering.
 */
export default function ConfigInitializer() {
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("/api/config");
        const result = await res.json();

        // Update feature configuration if data is returned
        if (result?.data) {
          featureConfig.setUneditableConfig(result.data);
        }
      } catch (err) {
        // Log error in case the config fetch fails
        console.error("Error fetching remote config:", err);
      }
    };

    fetchConfig();
  }, []);

  // This component does not render any UI
  return null;
}
