import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { AdminSidebar } from "@/components/admin/sidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f7f9f6] lg:flex">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      <div className="min-w-0 flex-1">
        <header className="flex min-h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
          <div>
            <p className="text-sm font-bold text-slate-900">MOYONE Admin</p>
            <p className="text-xs text-slate-500">
              Signed in as {session.user.name || session.user.email}
            </p>
          </div>

          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}>
            <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              Sign out
            </button>
          </form>
        </header>

        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
