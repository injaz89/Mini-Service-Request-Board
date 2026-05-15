'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'All Jobs' },
  { href: '/jobs/new', label: 'Post a Job' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 tracking-tight hover:text-blue-600 transition-colors"
          >
            <span className="text-blue-600">🔧</span> Mini-Service
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-2">
            {NAV_LINKS.map(({ href, label }) => {
              // Exact match for home, prefix match for others
              const isActive =
                href === '/' ? pathname === '/' : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                  ].join(' ')}
                >
                  {label}
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
}
