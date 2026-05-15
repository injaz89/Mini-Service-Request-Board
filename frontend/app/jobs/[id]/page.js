import { getJobById } from '../../../lib/api';
import JobDetailClient from './JobDetailClient';

// Generate page metadata dynamically
export async function generateMetadata({ params }) {
  try {
    const result = await getJobById(params.id);
    const job = result.data;
    return {
      title: job?.title
        ? `${job.title} | Mini-Service`
        : 'Job Detail | Mini-Service',
    };
  } catch {
    return { title: 'Job Not Found | Mini-Service' };
  }
}

// Server Component — fetches the job and delegates rendering to the client
export default async function JobDetailPage({ params }) {
  let job = null;
  let fetchError = null;

  try {
    const result = await getJobById(params.id);
    job = result.data ?? result; // handle both { data: job } and bare job shapes
  } catch (err) {
    fetchError = err.message;
  }

  // ── 404-style view ────────────────────────────────────────────────────────
  if (!job || fetchError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h1>
          <p className="text-sm text-gray-500 mb-6">
            {fetchError
              ? `Something went wrong: ${fetchError}`
              : 'This job listing no longer exists or the link is incorrect.'}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white
                       text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to all jobs
          </a>
        </div>
      </div>
    );
  }

  // ── Happy path: pass the job to the client component ─────────────────────
  return <JobDetailClient job={job} />;
}
