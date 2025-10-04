import jwtEncode from "jwt-encode";
import { COOKIE_CONFIG } from "../../../constants/cookieNames";
import { cookies } from "next/headers";

/**
 * API route handler for fetching remote configuration and managing editable features via cookies.
 *
 * This function performs the following steps:
 * 1. Determines the base URL of the incoming request.
 * 2. Builds the remote configuration URL from environment variables, optionally appending a timestamp to prevent caching.
 * 3. Fetches the remote configuration JSON from the remote URL.
 * 4. Splits the configuration into editable and uneditable features based on the `editable_with_cookies` flag.
 * 5. Encodes both editable and uneditable configurations using JWT for secure transmission.
 * 6. Stores the editable configuration in a client-readable cookie if available, or deletes the cookie if none.
 * 7. Returns the uneditable configuration in the API response.
 *
 * Notes:
 * - Editable features are stored in a cookie with HttpOnly=false so that client-side scripts can access them.
 * - Uneditable features are only returned in the JSON response and are not stored in cookies.
 * - This handler uses Next.js App Router conventions: `GET(req)` function and the built-in `cookies()` API.
 */
export const dynamic = "force-dynamic"; // Ensures that this API route is always dynamic and never cached

export async function GET(req) {
  try {
    // Parse the full URL of the incoming request to get protocol and host
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    // Get the remote config source URL from environment variables
    const sourceUrl = process.env.NEXT_PUBLIC_REMOTE_CONFIG_URL;

    // Determine the final remote config URL
    // If sourceUrl is relative (starts with "storage/"), prefix it with the base URL
    // Otherwise, append a timestamp query parameter to prevent caching
    const remoteConfigUrl = sourceUrl.startsWith("storage/")
      ? `${baseUrl}/${sourceUrl}`
      : `${sourceUrl}?gear=${new Date().toISOString()}`;

    // Fetch the remote configuration JSON from the remote URL
    const configRes = await fetch(remoteConfigUrl, { cache: "no-store" });
    if (!configRes.ok) {
      // Return HTTP 500 if fetching fails
      return new Response(
        JSON.stringify({ error: "Failed to fetch remote config" }),
        { status: 500 }
      );
    }

    // Parse the JSON response
    const fullConfig = await configRes.json();

    // Split the configuration into editable and uneditable features
    const editableConfig = Object.fromEntries(
      Object.entries(fullConfig).filter(([, v]) => v.editable_with_cookies === true)
    );
    const uneditableConfig = Object.fromEntries(
      Object.entries(fullConfig).filter(([, v]) => v.editable_with_cookies === false)
    );

    // Encode both configs using JWT
    const secretKey = process.env.NEXT_PUBLIC_REMOTE_CONFIG_KEY;
    const editableEncoded = jwtEncode(editableConfig, secretKey);
    const uneditableEncoded = jwtEncode(uneditableConfig, secretKey);

    // Access Next.js App Router cookie store
    const cookieStore = await cookies();

    // If editable config exists, set it in a client-readable cookie
    // Otherwise, delete the cookie if it exists
    if (Object.keys(editableConfig).length > 0) {
      cookieStore.set({
        name: COOKIE_CONFIG,
        value: editableEncoded,
        path: "/",
        httpOnly: false, // allows client-side JS to read the cookie
      });
    } else {
      cookieStore.delete(COOKIE_CONFIG, { path: "/" });
    }

    // Return the uneditable config as JSON in the response body
    return new Response(
      JSON.stringify({ success: true, data: uneditableEncoded }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Log unexpected errors to server console
    console.error("Failed to fetch remote config:", error);
    return new Response(
      JSON.stringify({ error: "Unexpected error" }),
      { status: 500 }
    );
  }
}
