'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatusBadge from '../../components/StatusBadge';
import { updateJobStatus, deleteJob } from '../../../lib/api';

const STATUS_OPTIONS = ['Open', 'In Progress', 'Closed'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ── Small labelled field ──────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
        {label}
      </dt>
      <dd className="text-gray-800 text-sm">{children}</dd>
    </div>
  );
}

// ── Main client component ─────────────────────────────────────────────────────
export default function JobDetailClient({ job }) {
  const router = useRouter();

  // ── Status update state ───────────────────────────────────────────────────
  const [currentStatus, setCurrentStatus] = useState(job.status);
  const [statusLoading, setStatusLoading]   = useState(false);
  const [statusSuccess, setStatusSuccess]   = useState(false);
  const [statusError, setStatusError]       = useState('');

  async function handleStatusChange(e) {
    const newStatus = e.target.value;
    setStatusLoading(true);
    setStatusSuccess(false);
    setStatusError('');

    try {
      await updateJobStatus(job._id, newStatus);
      setCurrentStatus(newStatus);
      setStatusSuccess(true);
      setTimeout(() => setStatusSuccess(false), 2000);
    } catch (err) {
      setStatusError(err.message || 'Failed to update status.');
    } finally {
      setStatusLoading(false);
    }
  }

  // ── Delete state ──────────────────────────────────────────────────────────
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError]     = useState('');

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${job.title}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    setDeleteLoading(true);
    setDeleteError('');

    try {
      await deleteJob(job._id);
      router.push('/');
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete job.');
      setDeleteLoading(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors"
        >
          ← Back to all jobs
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Card header */}
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-900 leading-snug flex-1">
                {job.title}
              </h1>
              <StatusBadge status={currentStatus} />
            </div>
          </div>

          {/* Card body */}
          <div className="px-8 py-6 space-y-8">

            {/* Description */}
            {job.description && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                  Description
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            )}

            {/* Details grid */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Category">{job.category}</Field>
              <Field label="Location">{job.location || '—'}</Field>
              <Field label="Contact Name">{job.contactName || '—'}</Field>
              <Field label="Contact Email">
                {job.contactEmail ? (
                  <a
                    href={`mailto:${job.contactEmail}`}
                    className="text-blue-600 hover:underline"
                  >
                    {job.contactEmail}
                  </a>
                ) : (
                  '—'
                )}
              </Field>
              <Field label="Posted On">{formatDate(job.createdAt)}</Field>
              <Field label="Status">{currentStatus}</Field>
            </dl>

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Status Update */}
            <div>
              <label
                htmlFor="status-select"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Update Status
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  id="status-select"
                  value={currentStatus}
                  onChange={handleStatusChange}
                  disabled={statusLoading}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700
                             focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60
                             disabled:cursor-not-allowed transition"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {statusLoading && (
                  <span className="text-sm text-gray-500 animate-pulse">Updating…</span>
                )}
                {statusSuccess && (
                  <span className="text-sm text-green-600 font-medium">✓ Status updated</span>
                )}
                {statusError && (
                  <span className="text-sm text-red-600">{statusError}</span>
                )}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Delete section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">Delete this job</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  This action is permanent and cannot be undone.
                </p>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2">
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm
                             font-medium rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors
                             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {deleteLoading ? 'Deleting…' : 'Delete Job'}
                </button>
                {deleteError && (
                  <span className="text-xs text-red-600">{deleteError}</span>
                )}
              </div>
            </div>

          </div>
        </div>
    </div>
  );
}
