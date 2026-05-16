'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createJob } from '../../../lib/api';

const CATEGORIES = ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INITIAL = { title: '', description: '', category: 'Plumbing', location: '', contactName: '', contactEmail: '' };

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">⚠ {error}</p>}
    </div>
  );
}

const inputCls = (err) =>
  `w-full border rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white placeholder:text-slate-400
   focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200
   ${err ? 'border-red-400 bg-red-50/40' : 'border-slate-200 hover:border-slate-300'}`;

export default function NewJobPage() {
  const router = useRouter();
  const [form, setForm]         = useState(INITIAL);
  const [errors, setErrors]     = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading]   = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim())       e.title       = 'Title is required.';
    if (!form.description.trim()) e.description = 'Description is required.';
    if (form.contactEmail && !EMAIL_REGEX.test(form.contactEmail))
      e.contactEmail = 'Please enter a valid email address.';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError('');
    const ve = validate();
    if (Object.keys(ve).length) { setErrors(ve); return; }
    setLoading(true);
    try {
      await createJob(form);
      router.push('/');
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto animate-fade-in">

      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-7 transition-colors"
      >
        ← Back to all jobs
      </Link>

      {/* Header */}
      <div className="mb-7">
        <p className="text-indigo-600 text-xs font-semibold tracking-widest uppercase mb-1">New request</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Post a Service Request</h1>
        <p className="text-slate-500 text-sm mt-1">Fill in the details and we'll list your job.</p>
      </div>

      {/* API error */}
      {apiError && (
        <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
          <span>⚠️</span> {apiError}
        </div>
      )}

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5"
      >
        <Field label="Title" required error={errors.title}>
          <input
            type="text" name="title" value={form.title} onChange={handleChange}
            placeholder="e.g. Leaking kitchen tap"
            className={inputCls(errors.title)}
          />
        </Field>

        <Field label="Description" required error={errors.description}>
          <textarea
            name="description" value={form.description} onChange={handleChange}
            rows={4} placeholder="Describe the job in detail…"
            className={inputCls(errors.description)}
          />
        </Field>

        <Field label="Category">
          <select
            name="category" value={form.category} onChange={handleChange}
            className={inputCls(false)}
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Location">
            <input
              type="text" name="location" value={form.location} onChange={handleChange}
              placeholder="e.g. Glasgow"
              className={inputCls(false)}
            />
          </Field>

          <Field label="Contact Name">
            <input
              type="text" name="contactName" value={form.contactName} onChange={handleChange}
              placeholder="e.g. John Smith"
              className={inputCls(false)}
            />
          </Field>
        </div>

        <Field label="Contact Email" error={errors.contactEmail}>
          <input
            type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange}
            placeholder="e.g. john@email.com"
            className={inputCls(errors.contactEmail)}
          />
        </Field>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit" disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? 'Posting…' : 'Post Job'}
          </button>
          <Link
            href="/"
            className="flex-1 text-center border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium py-2.5 px-4 rounded-xl transition-colors duration-200"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
