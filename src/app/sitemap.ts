import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/support`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
