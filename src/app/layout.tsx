import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/site";
import Shell from "@/components/Shell";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ramen Protokol · Field Lab",
    template: "%s · Ramen Protokol Field Lab",
  },
  description: site.description,
  applicationName: "Ramen Protokol Field Lab",
  authors: [{ name: "Ramen Protokol" }],
  keywords: [
    "AI Product Engineer",
    "AI-assisted software delivery",
    "AI evaluation",
    "validation",
    "hallucination detection",
    "developer tooling",
  ],
  metadataBase: new URL("https://ramenprotokol.dev"),
  openGraph: {
    title: "Ramen Protokol · Field Lab",
    description: site.tagline,
    type: "website",
    siteName: "Ramen Protokol Field Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramen Protokol · Field Lab",
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
