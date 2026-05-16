import { Suspense } from 'react';
import Link from 'next/link';
import { getAllJobs } from '../lib/api';
import CategoryFilter from './components/CategoryFilter';
import StatusBadge from './components/StatusBadge';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const metadata = {
  title: 'Service Requests | Mini-Service',
  description: 'Browse and post local service job requests.',
};

export default async function HomePage({ searchParams }) {
  const resolvedParams = await Promise.resolve(searchParams);
  const category = resolvedParams?.category || '';

  let jobs = [];
  let error = null;

  try {
    const result = await getAllJobs(category ? { category } : {});
    jobs = result.data || [];
  } catch (err) {
    // Distinguish a network/connection failure from an API error
    if (err.message === 'fetch failed' || err.cause?.code === 'ECONNREFUSED') {
      error = 'Could not load jobs. Is the backend running?';
    } else {
      error = err.message || 'Something went wrong loading jobs.';
    }
  }

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Requests</h1>
          <p className="text-sm text-gray-500 mt-1">
            {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Category filter (client component) — must be in Suspense because it uses useSearchParams() */}
          <Suspense fallback={<div className="h-9 w-28 bg-gray-100 rounded-lg animate-pulse" />}>
            <CategoryFilter selected={category} />
          </Suspense>

          {/* Post a Job button */}
          <Link
            href="/jobs/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Post a Job
          </Link>
        </div>
      </div>

      {/* ── Error State ── */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-4 text-sm mb-6 flex items-start gap-3">
          <span className="text-lg leading-none mt-0.5">⚠️</span>
          <div>
            <p className="font-semibold mb-0.5">Failed to load jobs</p>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* ── Empty State ── */}
      {!error && jobs.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium">No jobs found</p>
          <p className="text-sm mt-1">Try a different category or post the first one.</p>
        </div>
      )}

      {/* ── Job Cards Grid ── */}
      {jobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <Link
              key={job._id}
              href={`/jobs/${job._id}`}
              className="flex flex-col bg-white rounded-xl border border-gray-200 p-5
                         hover:shadow-lg hover:border-blue-300 hover:-translate-y-0.5
                         transition-all duration-200 ease-in-out"
            >
              {/* Title */}
              <h2 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                {job.title}
              </h2>

              {/* Meta row */}
              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {job.category}
                </span>
                {job.location && (
                  <span>📍 {job.location}</span>
                )}
              </div>

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                <StatusBadge status={job.status} />
                <span className="text-xs text-gray-400">
                  {formatDate(job.createdAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
