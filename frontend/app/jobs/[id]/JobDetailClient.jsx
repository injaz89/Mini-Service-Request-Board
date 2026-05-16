'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatusBadge from '../../components/StatusBadge';
import { updateJobStatus, deleteJob } from '../../../lib/api';

const STATUS_OPTIONS = ['Open', 'In Progress', 'Closed'];

const CAT_ICON = {
  'Plumbing': '🔧', 'Electrical': '⚡',
  'Painting': '🎨', 'Joinery': '🪚', 'Other': '📦',
};

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className="text-sm text-slate-800 font-medium">{value || '—'}</dd>
    </div>
  );
}

export default function JobDetailClient({ job }) {
  const router = useRouter();

  const [currentStatus, setCurrentStatus] = useState(job.status);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(false);
  const [statusError,   setStatusError]   = useState('');

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError,   setDeleteError]   = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleStatusChange(e) {
    const newStatus = e.target.value;
    setStatusLoading(true); setStatusSuccess(false); setStatusError('');
    try {
      await updateJobStatus(job._id, newStatus);
      setCurrentStatus(newStatus);
      setStatusSuccess(true);
      setTimeout(() => setStatusSuccess(false), 2500);
    } catch (err) {
      setStatusError(err.message || 'Failed to update status.');
    } finally {
      setStatusLoading(false);
    }
  }

  async function handleDelete() {
    setDeleteLoading(true); setDeleteError('');
    try {
      await deleteJob(job._id);
      router.push('/');
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete job.');
      setDeleteLoading(false);
      setConfirmDelete(false);
    }
  }

  const catIcon = CAT_ICON[job.category] ?? '📦';

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">

      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-7 transition-colors"
      >
        ← Back to all jobs
      </Link>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Card header */}
        <div className="px-7 py-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {catIcon} {job.category}
            </span>
            <StatusBadge status={currentStatus} />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
            {job.title}
          </h1>
        </div>

        {/* Card body */}
        <div className="px-7 py-6 space-y-7">

          {/* Description */}
          {job.description && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Description</p>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>
          )}

          {/* Details grid */}
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-5 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <InfoRow label="Location"     value={job.location}    />
            <InfoRow label="Contact Name" value={job.contactName} />
            <InfoRow label="Posted On"    value={formatDate(job.createdAt)} />
            {job.contactEmail && (
              <div className="col-span-2 flex flex-col gap-0.5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</dt>
                <dd>
                  <a href={`mailto:${job.contactEmail}`} className="text-sm text-indigo-600 hover:underline font-medium">
                    {job.contactEmail}
                  </a>
                </dd>
              </div>
            )}
          </dl>

          <hr className="border-slate-100" />

          {/* Status update */}
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">Update Status</p>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={currentStatus}
                onChange={handleStatusChange}
                disabled={statusLoading}
                className="border border-slate-200 rounded-xl px-3.5 py-2 text-sm bg-white text-slate-700
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60
                           disabled:cursor-not-allowed transition-shadow duration-200"
              >
                {STATUS_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>

              {statusLoading && <span className="text-sm text-slate-500 animate-pulse">Updating…</span>}
              {statusSuccess && <span className="text-sm text-emerald-600 font-semibold">✓ Saved</span>}
              {statusError   && <span className="text-sm text-red-600">{statusError}</span>}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Delete */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-700">Delete this job</p>
              <p className="text-xs text-slate-400 mt-0.5">This action is permanent and cannot be undone.</p>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2">
              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors duration-200"
                >
                  Delete Job
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDelete}
                    disabled={deleteLoading}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200 disabled:opacity-60"
                  >
                    {deleteLoading ? 'Deleting…' : 'Confirm Delete'}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
              {deleteError && <span className="text-xs text-red-600">{deleteError}</span>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
