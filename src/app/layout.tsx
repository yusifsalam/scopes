import type { Metadata } from "next";
import Footer from "./components/layout/Footer";
import SettingsMenu from "./components/SettingsMenu";
import "./globals.css";
import { UserPreferencesStoreProvider } from "./state/user-preferences-provider";

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
      <body className="flex min-h-screen flex-col justify-between antialiased">
        <UserPreferencesStoreProvider>
          {children}
          <SettingsMenu />
        </UserPreferencesStoreProvider>
        <Footer />
      </body>
    </html>
  );
}
