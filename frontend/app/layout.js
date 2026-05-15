import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Mini-Service Request Board',
  description: 'Find and post local service job requests.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ── Top Navbar ── */}
        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Brand */}
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold text-gray-900 tracking-tight hover:text-blue-600 transition-colors"
              >
                <span className="text-blue-600">🔧</span> Mini-Service
              </Link>

              {/* Right: Nav link */}
              <Link
                href="/jobs/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </nav>

        {/* ── Page Content ── */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
