import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { UserPreferencesStoreProvider } from "./state/user-preferences-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserPreferencesStoreProvider>{children}</UserPreferencesStoreProvider>
      </body>
    </html>
  );
}
