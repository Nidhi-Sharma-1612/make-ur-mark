import SettingsForm from "@/components/admin/SettingsForm";
import { getAllSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getAllSettings();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-brand-ink">Settings</h1>
        <p className="text-sm text-brand-ink/60">
          Update the WhatsApp number used by every order/enquiry button site-wide.
        </p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
