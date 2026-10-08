import AdminNav from "@/components/admin/AdminNav";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-brand-cream">
      <aside className="w-64 shrink-0 border-r border-brand-blush bg-brand-white">
        <AdminNav />
      </aside>
      <main className="flex-1 overflow-x-hidden p-8">{children}</main>
    </div>
  );
}
