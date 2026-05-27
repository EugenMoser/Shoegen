import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

export default function Header(): React.JSX.Element {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
  ];

  return (
    <header className="flex bg-white w-full justify-between items-center sticky top-0 z-10 p-4 border-b">
      <div className="flex height-[100px] gap-8 items-center">
        <Image
          src="/logo.webp"
          alt="Shoegen Logo"
          width={70}
          height={70}
        />
        <h1>Shoegen</h1>
        <nav className="hidden md:flex gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className=" border-2 p-2 rounded-2xl hover:bg-primary hover:text-secondary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <ShoppingCart size={48} />
    </header>
  );
}
