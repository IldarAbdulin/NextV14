'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'Todos', path: '/todos' },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="my-5">
      <div className="flex justify-between items-center">
        <Link href={`/`}>
          <h2>Next App</h2>
        </Link>
        <div className="flex gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              passHref
              href={link.path}
              className={`${
                pathname === link.path ? 'text-red-700 underline' : ''
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
