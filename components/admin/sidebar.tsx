import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  Sprout,
  Images,
  ChartNoAxesColumn,
  PanelsTopLeft,
  Users,
  Settings,
} from "lucide-react";

const groups = [
  {
    label: "WORKSPACE",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Stories", href: "/admin/stories", icon: BookOpen },
      { label: "Projects", href: "/admin/projects", icon: FolderKanban },
      { label: "Programs", href: "/admin/programs", icon: Sprout },
      { label: "Media library", href: "/admin/media", icon: Images },
      { label: "Impact & statistics", href: "/admin/impact", icon: ChartNoAxesColumn },
      { label: "Pages", href: "/admin/pages", icon: PanelsTopLeft },
    ],
  },
  {
    label: "ORGANIZATION",
    items: [
      { label: "Team & partners", href: "/admin/organization", icon: Users },
      { label: "Users & roles", href: "/admin/users", icon: Users },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  return (
    <aside className="flex h-full min-h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <Link
        href="/admin"
        className="flex min-h-[104px] flex-col justify-center border-b border-slate-100 px-6 py-5"
      >
        <Image
          src="/images/moyone-logo.png"
          alt="MOYONE — Mobile Youth Network Organization"
          width={140}
          height={48}
          priority
          className="h-auto max-h-10 w-auto max-w-[140px] object-contain object-left"
        />
        <span className="mt-2 text-xs font-medium tracking-wide text-slate-500">
          Administration
        </span>
      </Link>

      <nav className="flex-1 space-y-7 px-3 py-6">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[10px] font-bold tracking-[0.16em] text-slate-400">
              {group.label}
            </p>
            <div className="mt-3 space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-900"
                  >
                    <Icon size={17} strokeWidth={1.8} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <Link href="/" className="text-sm font-medium text-slate-500 hover:text-brand-800">
          ← View public website
        </Link>
      </div>
    </aside>
  );
}
