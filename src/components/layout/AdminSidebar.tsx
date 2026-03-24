"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";

const navItems = [
  { href: "/admin/dashboard", icon: "fas fa-home", label: "Dashboard" },
  { href: "/admin/profil", icon: "fas fa-user", label: "Edit Profil" },
  { href: "/admin/resume", icon: "fas fa-file-alt", label: "Data Diri" },
  { href: "/admin/galeri", icon: "fas fa-images", label: "Kelola Galeri" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 h-full bg-white border-r-3 border-[#6dbcdb] flex flex-col shadow-[4px_0_0_rgba(109,188,219,0.3)]" style={{ borderRight: "3px solid #6dbcdb" }}>
      {/* Header */}
      <div className="p-5 border-b-2 border-[#6dbcdb] bg-[#fef08a]">
        <h2 className="font-display font-bold text-xl text-[#1e5b85]">
          🎨 Admin Panel
        </h2>
        <p className="text-xs text-[#6dbcdb] font-bold mt-0.5">Portfolio Manager</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${pathname === item.href ? "active" : ""}`}
          >
            <i className={`${item.icon} w-4`} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-2 border-[#6dbcdb] flex flex-col gap-2">
        <Link href="/" className="nav-item text-sm">
          <i className="fas fa-external-link-alt w-4" /> Lihat Portfolio
        </Link>
        <form action={logout}>
          <button type="submit" className="nav-item w-full text-sm text-red-500 hover:bg-red-50">
            <i className="fas fa-sign-out-alt w-4" /> Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
