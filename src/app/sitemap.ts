import type { MetadataRoute } from "next";
import { sections } from "@/lib/site";

export const dynamic = "force-static";

const BASE = "https://ramenprotokol.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return sections.map((s) => ({
    url: `${BASE}${s.href}`,
    changeFrequency: "weekly",
    priority: s.slug === "" ? 1 : 0.7,
  }));
}
