import ContentSectionForm from "@/components/admin/ContentSectionForm";
import ContentSectionNav from "@/components/admin/ContentSectionNav";
import { CONTENT_SCHEMA } from "@/lib/content-schema";
import { getAllSiteContentGrouped } from "@/lib/content";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ section?: string }>;
};

export default async function AdminContentPage({ searchParams }: PageProps) {
  const { section } = await searchParams;
  const grouped = await getAllSiteContentGrouped();
  const activeSchema = CONTENT_SCHEMA.find((s) => s.section === section) ?? CONTENT_SCHEMA[0];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-brand-ink">Site Content</h1>
        <p className="text-sm text-brand-ink/60">
          Edit the text and images on the homepage. Changes appear on the live site right away.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <ContentSectionNav active={activeSchema.section} />
        <div className="min-w-0 max-w-2xl flex-1">
          <ContentSectionForm
            key={activeSchema.section}
            schema={{ section: activeSchema.section, label: activeSchema.label, fields: activeSchema.fields }}
            initialValues={grouped[activeSchema.section] ?? {}}
          />
        </div>
      </div>
    </div>
  );
}
