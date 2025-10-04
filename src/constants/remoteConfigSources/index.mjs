/**
 * Default remote feature configuration for the frontend application.
 *
 * Purpose:
 * 1. Acts as a canonical source of truth for local development or fallback if remote config fails.
 * 2. Used by build scripts to generate `remote-config.json` in /public/storage.
 *
 * Field descriptions:
 * - ticket_code: Internal tracking or reference ID
 * - enabled: Whether the feature is active by default (global switch)
 * - editable_with_cookies:
 *     This flag indicates whether the feature can be overridden via a client-side cookie.
 *     Commonly used for testing or debugging in production:
 *       - If a feature has issues, it can be disabled globally (`enabled: false`)
 *       - QA engineers can still enable or modify the feature locally by injecting a cookie
 *     Technical notes:
 *       - Editable configs are encoded into a JWT and stored in cookies.
 *       - Not all features should be marked editable due to browser cookie size limitations.
 *       - Use selectively for features that need rapid QA toggling, not for large payloads.
 * - data: Metadata specific to the feature
 * - data_alter:
 *     Fallback or migration-safe alternative to `data`.
 *     Used when the structure/type of `data` needs a breaking change
 *     (e.g. from primitive → object, array → object, or major schema shift).
 *     The app should be coded to check if `data_alter` exists:
 *       - Old app versions still read `data` (no breaking changes)
 *       - New app versions read `data_alter` once deployed
 *     After rollout, the new `data_alter` can eventually replace `data`.
 *     Think of this as a “shadow config” to prevent downtime — similar to how OS
 *     updates use compatibility layers before migration is complete.
 */

import { responseMessages } from "./responseMessages.mjs";
import { bigFormOptions } from "./bigFormOptions.mjs";

export default {
  PAGE_ACCESS: {
    ticket_code: "F20-10001",
    enabled: true,
    editable_with_cookies: false,
    data: {
      canAccessRegistrationPage: true,
      canAccessDashboard: false,
    },
    data_alter: {},
  },
  DROPDOWN_OPTIONS: {
    ticket_code: "F20-10002",
    enabled: true,
    editable_with_cookies: false,
    data: {
      paymentMethods: [
        { value: "", label: "Select Payment Method" },
        { value: "bank_transfer", label: "Bank Transfer" },
        { value: "credit_card", label: "Credit Card" },
        { value: "e_wallet", label: "E-Wallet" },
      ],
      defaultPayment: "bank_transfer",
    },
    data_alter: {},
  },
  UI_MESSAGES: {
    ticket_code: "F20-10003",
    enabled: true,
    editable_with_cookies: false,
    data: {
      welcomeMessage: "Welcome to the Self-Registration System",
      registrationClosedMessage: "Registration is temporarily closed, please check back later.",
      successMessage: "Your registration has been submitted successfully.",
      errorMessage: "An error occurred. Please try again.",
    },
    data_alter: {},
  },
  DOCUMENT_VALIDATION_RULES: {
    ticket_code: "F20-10004",
    enabled: true,
    editable_with_cookies: true,
    data: {
      allowedFileTypes: ["jpg", "png", "pdf"],
      maxFileSizeMB: 5,
      rejectReasonSimilarityThreshold: 0.85,
      autoSuggestFix: true,
    },
    data_alter: {},
  },
  RESPONSE_MESSAGES: {
    ticket_code: "F20-10005",
    enabled: true,
    editable_with_cookies: false, // too big for cookie override
    data: responseMessages, // imported from a separate file
    data_alter: {},
  },
  LARGE_FORM_OPTIONS: {
    ticket_code: "F20-10006",
    enabled: true,
    editable_with_cookies: false, // too big for cookie override
    data: bigFormOptions, // imported from a separate file
    data_alter: {},
  },
  SUBJECT_ACCESS_REQUEST: {
    ticket_code: "F20-10007",
    enabled: false, // not released yet
    editable_with_cookies: false,
    data: {
      profileFields: {
        fullName: true,
        email: true,
        phoneNumber: true,
        address: false,
      },
    },
    data_alter: {},
  },
};
