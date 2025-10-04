/**
 * responseMessages
 *
 * Centralized response messages for different APIs in the system.
 * 
 * Structure:
 * {
 *   apiName: {
 *     METHOD: {
 *       STATUS_CODE: {
 *         message: "Short user-facing text",
 *         description: "Detailed explanation for developers or logging"
 *       }
 *     }
 *   }
 * }
 *
 * Benefits:
 * - Ensures consistency of wording across APIs
 * - Easier to update error/success messages without editing multiple files
 * - Can be extended to support i18n (translations) in the future
 * - Acts as a reference dictionary for developers and QA
 */

export const responseMessages = {
  // ===== Login API =====
  login: {
    POST: {
      200: {
        message: "Login successful.",
        description: "User is authenticated and session is established."
      },
      400: {
        message: "Invalid credentials.",
        description: "The username or password is incorrect."
      },
      401: {
        message: "Unauthorized.",
        description: "Login failed due to missing or invalid authentication details."
      },
      429: {
        message: "Too many login attempts.",
        description: "Account temporarily locked due to repeated failed attempts."
      },
      500: {
        message: "Server error.",
        description: "Unexpected error occurred while processing login."
      }
    }
  },

  // ===== Profile API =====
  profile: {
    GET: {
      200: {
        message: "Profile retrieved successfully.",
        description: "The user's profile data has been returned."
      },
      401: {
        message: "Unauthorized.",
        description: "You must be logged in to view profile data."
      },
      404: {
        message: "Profile not found.",
        description: "The requested user profile does not exist."
      },
      500: {
        message: "Server error.",
        description: "An error occurred while retrieving the profile."
      }
    },
    PUT: {
      200: {
        message: "Profile updated successfully.",
        description: "The profile data was updated."
      },
      400: {
        message: "Invalid data.",
        description: "One or more fields failed validation."
      },
      401: {
        message: "Unauthorized.",
        description: "You must be logged in to update your profile."
      },
      500: {
        message: "Server error.",
        description: "An error occurred while updating profile data."
      }
    }
  },

  // ===== Orders API =====
  orders: {
    GET: {
      200: {
        message: "Orders retrieved successfully.",
        description: "The list of orders is returned."
      },
      204: {
        message: "No orders found.",
        description: "The user has no orders to display."
      },
      401: {
        message: "Unauthorized.",
        description: "Login required to access order data."
      },
      500: {
        message: "Server error.",
        description: "An error occurred while fetching orders."
      }
    },
    POST: {
      201: {
        message: "Order created successfully.",
        description: "A new order has been placed."
      },
      400: {
        message: "Invalid order data.",
        description: "The request body contained invalid or incomplete data."
      },
      401: {
        message: "Unauthorized.",
        description: "You must be logged in to place an order."
      },
      422: {
        message: "Unprocessable entity.",
        description: "Validation failed, some fields are invalid."
      },
      500: {
        message: "Server error.",
        description: "An error occurred while creating the order."
      }
    }
  },

  // ===== Payments API =====
  payments: {
    POST: {
      200: {
        message: "Payment processed successfully.",
        description: "The payment has been confirmed and recorded."
      },
      400: {
        message: "Invalid payment request.",
        description: "The payment payload is invalid."
      },
      401: {
        message: "Unauthorized.",
        description: "You must be logged in to perform payment."
      },
      402: {
        message: "Payment required.",
        description: "Payment failed due to insufficient funds."
      },
      500: {
        message: "Server error.",
        description: "The server could not complete the payment."
      }
    }
  }
};
