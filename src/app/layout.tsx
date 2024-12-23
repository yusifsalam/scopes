import type { Metadata } from "next";
import { UserPreferencesStoreProvider } from "./state/user-preferences-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily 'scopes",
  description: "Daily 'scopes serves you fresh 'scopes every day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex" />
      </head>
      <body className="antialiased">
        <UserPreferencesStoreProvider>{children}</UserPreferencesStoreProvider>
      </body>
    </html>
  );
}
