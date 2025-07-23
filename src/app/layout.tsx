import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
