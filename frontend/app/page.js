import { Suspense } from 'react';
import Link from 'next/link';
import { getAllJobs } from '../lib/api';
import CategoryFilter from './components/CategoryFilter';
import StatusBadge from './components/StatusBadge';

export const metadata = {
  title: 'MiniService — Local Service Requests',
  description: 'Browse and post local service job requests.',
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

// Per-category colour accent (full strings so Tailwind picks them up)
const CAT = {
  'Plumbing':   { border: 'border-l-blue-400',   badge: 'bg-blue-50 text-blue-700',     icon: '🔧' },
  'Electrical': { border: 'border-l-yellow-400', badge: 'bg-yellow-50 text-yellow-700', icon: '⚡' },
  'Painting':   { border: 'border-l-purple-400', badge: 'bg-purple-50 text-purple-700', icon: '🎨' },
  'Joinery':    { border: 'border-l-green-400',  badge: 'bg-green-50 text-green-700',   icon: '🪚' },
  'Other':      { border: 'border-l-slate-300',  badge: 'bg-slate-100 text-slate-600',  icon: '📦' },
};
const fallbackCat = { border: 'border-l-slate-300', badge: 'bg-slate-100 text-slate-600', icon: '📦' };

export default async function HomePage({ searchParams }) {
  const resolved = await Promise.resolve(searchParams);
  const category  = resolved?.category || '';

  let jobs  = [];
  let error = null;

  try {
    const result = await getAllJobs(category ? { category } : {});
    jobs = result.data || [];
  } catch (err) {
    error = (err.message === 'fetch failed' || err.cause?.code === 'ECONNREFUSED')
      ? 'Could not load jobs. Is the backend running?'
      : (err.message || 'Something went wrong.');
  }

  return (
    <div className="animate-fade-in">

      {/* ── Hero header ─────────────────────────────────────────────── */}
      <div className="mb-8">
        <p className="text-indigo-600 text-sm font-semibold tracking-wide uppercase mb-2">
          Local Service Marketplace
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Service{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Requests
              </span>
            </h1>
            <p className="text-slate-500 mt-1.5 text-sm">
              {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
              {category ? ` in "${category}"` : ''}
            </p>
          </div>

          <Link
            href="/jobs/new"
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition-colors duration-200 shadow-sm"
          >
            <span>+</span> Post a Job
          </Link>
        </div>
      </div>

      {/* ── Category pills ──────────────────────────────────────────── */}
      <div className="mb-8 animate-slide-up delay-100">
        <Suspense fallback={
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 w-24 bg-slate-200 rounded-full animate-pulse" />
            ))}
          </div>
        }>
          <CategoryFilter selected={category} />
        </Suspense>
      </div>

      {/* ── Error state ─────────────────────────────────────────────── */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-5 py-4 flex items-start gap-3 mb-6">
          <span className="text-xl leading-none mt-0.5">⚠️</span>
          <div>
            <p className="font-semibold text-red-700 text-sm">Failed to load jobs</p>
            <p className="text-red-500 text-sm mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* ── Empty state ─────────────────────────────────────────────── */}
      {!error && jobs.length === 0 && (
        <div className="text-center py-20 animate-fade-in">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-semibold text-slate-700">No jobs found</p>
          <p className="text-sm text-slate-400 mt-1 mb-6">
            Try a different category or be the first to post one.
          </p>
          <Link
            href="/jobs/new"
            className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            + Post the first job
          </Link>
        </div>
      )}

      {/* ── Job cards grid ──────────────────────────────────────────── */}
      {jobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-slide-up delay-200">
          {jobs.map((job) => {
            const style = CAT[job.category] ?? fallbackCat;
            return (
              <Link
                key={job._id}
                href={`/jobs/${job._id}`}
                className={`group flex flex-col bg-white rounded-2xl border border-slate-200 border-l-4 ${style.border}
                            p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
              >
                {/* Category chip */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${style.badge}`}>
                    {style.icon} {job.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base font-bold text-slate-900 mb-1.5 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
                  {job.title}
                </h2>

                {/* Description preview */}
                {job.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {job.description}
                  </p>
                )}

                {/* Footer row */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                  <StatusBadge status={job.status} />
                  <div className="text-right">
                    {job.location && (
                      <p className="text-xs text-slate-400">📍 {job.location}</p>
                    )}
                    <p className="text-xs text-slate-400">{formatDate(job.createdAt)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

    </div>
  );
}
