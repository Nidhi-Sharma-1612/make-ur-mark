import { prisma } from "./db";

export async function getSiteContent(section: string): Promise<Record<string, unknown>> {
  const rows = await prisma.siteContent.findMany({ where: { section } });
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
}

export async function getAllSiteContentGrouped(): Promise<Record<string, Record<string, unknown>>> {
  const rows = await prisma.siteContent.findMany({ orderBy: [{ section: "asc" }, { key: "asc" }] });
  const grouped: Record<string, Record<string, unknown>> = {};
  for (const row of rows) {
    grouped[row.section] ??= {};
    grouped[row.section][row.key] = row.value;
  }
  return grouped;
}

export type Settings = {
  whatsappNumber: string;
  contactEmail: string | null;
  instagramUrl: string | null;
};

const DEFAULT_SETTINGS: Settings = {
  whatsappNumber: "91XXXXXXXXXX",
  contactEmail: null,
  instagramUrl: null,
};

export async function getAllSettings(): Promise<Settings> {
  const row = await prisma.settings.findUnique({ where: { id: "default" } });
  if (!row) return DEFAULT_SETTINGS;
  return {
    whatsappNumber: row.whatsappNumber,
    contactEmail: row.contactEmail,
    instagramUrl: row.instagramUrl,
  };
}
