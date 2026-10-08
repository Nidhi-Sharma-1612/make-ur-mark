import ContentSectionForm from "@/components/admin/ContentSectionForm";
import { CONTENT_SCHEMA } from "@/lib/content-schema";
import { getAllSiteContentGrouped } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const grouped = await getAllSiteContentGrouped();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-brand-ink">Site Content</h1>
        <p className="text-sm text-brand-ink/60">
          Edit the text and images on the homepage. Changes appear on the live site right away.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
        {CONTENT_SCHEMA.map((schema) => (
          <ContentSectionForm key={schema.section} schema={schema} initialValues={grouped[schema.section] ?? {}} />
        ))}
      </div>
    </div>
  );
}
