import { prisma } from "./db";

export async function getSiteContent(section: string): Promise<Record<string, unknown>> {
  try {
    const rows = await prisma.siteContent.findMany({ where: { section } });
    return Object.fromEntries(rows.map((row) => [row.key, row.value]));
  } catch (error) {
    // Database unreachable (e.g. during a build-time static prerender, or a transient outage) —
    // fall back to empty so callers use their own hardcoded defaults instead of crashing the page.
    console.error(`getSiteContent("${section}") failed, using defaults:`, error);
    return {};
  }
}

export async function getAllSiteContentGrouped(): Promise<Record<string, Record<string, unknown>>> {
  try {
    const rows = await prisma.siteContent.findMany({ orderBy: [{ section: "asc" }, { key: "asc" }] });
    const grouped: Record<string, Record<string, unknown>> = {};
    for (const row of rows) {
      grouped[row.section] ??= {};
      grouped[row.section][row.key] = row.value;
    }
    return grouped;
  } catch (error) {
    console.error("getAllSiteContentGrouped failed, using empty content:", error);
    return {};
  }
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
  try {
    const row = await prisma.settings.findUnique({ where: { id: "default" } });
    if (!row) return DEFAULT_SETTINGS;
    return {
      whatsappNumber: row.whatsappNumber,
      contactEmail: row.contactEmail,
      instagramUrl: row.instagramUrl,
    };
  } catch (error) {
    // Database unreachable (e.g. during a build-time static prerender, or a transient outage) —
    // fall back to defaults instead of crashing every page (layout.tsx calls this for every request).
    console.error("getAllSettings failed, using defaults:", error);
    return DEFAULT_SETTINGS;
  }
}
