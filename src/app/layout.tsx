import type { Metadata } from "next";
import Script from "next/script";
import { CinematicEffects } from "@/components/cinematic-effects";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samskriti — AI that grows instead of starting over",
  description:
    "Samskriti helps AI systems grow through experience so every conversation builds on the last.",
  openGraph: {
    title: "Samskriti — AI that grows instead of starting over",
    description:
      "Conversations end. Growth shouldn't. Samskriti is a model-independent runtime that helps AI agents build dynamic behavioral state through experience.",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-bg-dark text-white antialiased">
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
          strategy="beforeInteractive"
        />
        <CinematicEffects />
        {children}
      </body>
    </html>
  );
}
