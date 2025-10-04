"use client";

import styles from "./page.module.scss";
import {
  getDecodedConfig,
  isFeatureEnabled
} from "@/utils/featureConfig";

export default function Page() {
  const config = getDecodedConfig();

  // Safe access with feature flags
  const pageAccess = isFeatureEnabled("PAGE_ACCESS")
    ? config?.PAGE_ACCESS?.data
    : null;

  const dropdowns = isFeatureEnabled("DROPDOWN_OPTIONS")
    ? config?.DROPDOWN_OPTIONS?.data
    : null;

  const messages = isFeatureEnabled("UI_MESSAGES")
    ? config?.UI_MESSAGES?.data
    : null;

  return (
    <main className="layout">
      <header className={styles.page__header}>
        <h1 className={styles["page__header-title"]}>Remote Config Demo</h1>
        <p className={styles["page__header-subtitle"]}>
          Showing features driven by remote configuration
        </p>
      </header>

      {pageAccess && (
        <section className={styles.page__section}>
          <h2 className={styles["page__section-title"]}>Page Access</h2>
          <div className={styles["page__section-content"]}>
            <p>
              Can access registration page:{" "}
              {pageAccess?.canAccessRegistrationPage ? "Yes" : "No"}
            </p>
            <p>
              Can access dashboard:{" "}
              {pageAccess?.canAccessDashboard ? "Yes" : "No"}
            </p>
          </div>
        </section>
      )}

      {dropdowns && (
        <section className={styles.page__section}>
          <h2 className={styles["page__section-title"]}>Dropdown Options</h2>
          <div className={styles["page__section-content"]}>
            <ul className={styles.page__list}>
              {dropdowns?.paymentMethods?.map((method) => (
                <li
                  key={method.value}
                  className={styles["page__list-item"]}
                >
                  {method.label}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {messages && (
        <section className={styles.page__section}>
          <h2 className={styles["page__section-title"]}>UI Messages</h2>
          <div className={styles["page__section-content"]}>
            <div
              className={`${styles.page__message} ${styles["page__message--info"]}`}
            >
              {messages?.welcomeMessage}
            </div>
            <div
              className={`${styles.page__message} ${styles["page__message--error"]}`}
            >
              {messages?.errorMessage}
            </div>
            <div
              className={`${styles.page__message} ${styles["page__message--success"]}`}
            >
              {messages?.successMessage}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
