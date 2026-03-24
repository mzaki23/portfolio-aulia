import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md border-2 border-[#1e5b85] rounded-full px-8 py-3 flex gap-8 font-display font-bold text-lg shadow-[0_4px_0_rgba(30,91,133,1)]">
      <Link href="/#beranda" className="hover:text-[#6dbcdb] transition-colors">Home</Link>
      <Link href="/#tentang" className="hover:text-[#6dbcdb] transition-colors">Profile</Link>
      <Link href="/gallery" className="hover:text-[#6dbcdb] transition-colors">Gallery</Link>
    </nav>
  );
}
