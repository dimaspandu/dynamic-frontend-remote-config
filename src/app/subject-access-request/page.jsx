"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDecodeConfigAsync,
  isFeatureEnabledAsync,
} from "@/utils/featureConfig";
import styles from "./sar.module.scss";

/**
 * SubjectAccessRequestPage
 *
 * This page renders the Subject Access Request (SAR) feature.
 * Behavior:
 * - If the feature is disabled, show a message and redirect to home after 3 seconds.
 * - If the feature is enabled, load its config asynchronously and render available fields.
 * - While waiting for the config, a loading message is displayed.
 */
export default function SubjectAccessRequestPage() {
  const [enabled, setEnabled] = useState(null);
  const [fields, setFields] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function checkFeature() {
      // Check if the SAR feature is enabled
      const available = await isFeatureEnabledAsync("SUBJECT_ACCESS_REQUEST");
      setEnabled(available);

      if (available) {
        // If enabled, load the feature config and extract profile fields
        const config = await getDecodeConfigAsync();
        setFields(config?.SUBJECT_ACCESS_REQUEST?.data?.profileFields || {});
      } else {
        // If disabled, redirect to home after 3 seconds
        const timer = setTimeout(() => {
          router.push("/");
        }, 3000);
        return () => clearTimeout(timer);
      }
    }

    checkFeature();
  }, [router]);

  // While waiting for async config, show a loading state
  if (enabled === null) {
    return (
      <div className={styles.sar__loadingWrapper}>
        <div className={styles.sar__spinner}></div>
        <p className={styles.sar__loadingText}>Loading feature config...</p>
      </div>
    );
  }

  // If the feature is disabled, show unavailable message
  if (!enabled) {
    return (
      <main className={["layout", styles.sar].join(" ")}>
        <h1 className={styles.sar__title}>Subject Access Request</h1>
        <p className={styles.sar__unavailable}>
          This feature is not available at the moment. <br />
          Redirecting you to Home...
        </p>
      </main>
    );
  }

  // If the feature is enabled, render the list of profile fields
  return (
    <main className={["layout", styles.sar].join(" ")}>
      <h1 className={styles.sar__title}>Subject Access Request</h1>
      <p className={styles.sar__subtitle}>
        Below are the fields you can request access to:
      </p>
      <ul className={styles.sar__list}>
        {fields &&
          Object.entries(fields).map(([field, allowed]) => (
            <li
              key={field}
              className={`${styles.sar__listItem} ${
                allowed
                  ? styles["sar__listItem--enabled"]
                  : styles["sar__listItem--disabled"]
              }`}
            >
              {field} {allowed ? "(Available)" : "(Not Available)"}
            </li>
          ))}
      </ul>
    </main>
  );
}
