import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";


export const metadata: Metadata = {
  title: "Level Up CV",
  description: "Gamifying your boring CVs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
