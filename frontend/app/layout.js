import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'MiniService — Local Service Requests',
  description: 'Find and post local service job requests.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-slate-100">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
