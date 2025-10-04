import "./globals.scss";
import ConfigInitializer from "@/components/ConfigInitializer";

/**
 * RootLayout
 *
 * The root layout for the application using Next.js App Router.
 * It defines the HTML structure and includes global wrappers.
 *
 * Metadata:
 * - title: Default document title
 * - description: Default document description
 *
 * The ConfigInitializer component is mounted here to ensure
 * remote configuration is fetched and applied when the app loads.
 */
export const metadata = {
  title: "Dynamic Frontend Remote Config",
  description: "Demonstration of runtime feature configuration in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <ConfigInitializer />
        {children}
      </body>
    </html>
  );
}
