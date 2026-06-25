import type { Metadata } from "next";
import Script from "next/script";
import { CinematicEffects } from "@/components/cinematic-effects";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://samskriti-ten.vercel.app";
const TITLE = "Samskriti — shared memory for your AI coding tools";
const DESCRIPTION =
  "Stop re-explaining your project every time you switch between Claude, GPT, and Gemini. One shared memory for all your AI tools.";
const OG_IMAGE = "/demo/demo-readback.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Samskriti",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 2880,
        height: 1800,
        alt: "Gemini reading back a decision recorded by Claude Code via Samskriti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
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
