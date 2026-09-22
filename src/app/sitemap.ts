import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const lastModified = new Date("2026-09-22");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
