const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

export const siteUrl = configured || "https://hiro-azurite2.vercel.app";
