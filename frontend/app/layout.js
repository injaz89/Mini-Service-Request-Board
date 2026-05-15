import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Mini-Service Request Board',
  description: 'Find and post local service job requests.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ── Top Navbar ── */}
        <Navbar />

        {/* ── Page Content ── */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
