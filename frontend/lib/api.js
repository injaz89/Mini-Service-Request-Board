const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ─── Helper ───────────────────────────────────────────────────────────────────
async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      if (body.message) message = body.message;
      else if (body.errors) message = body.errors.map((e) => e.message).join(', ');
    } catch (_) {
      // body is not JSON — keep the default message
    }
    throw new Error(message);
  }
  return res.json();
}

// ─── GET /api/jobs ────────────────────────────────────────────────────────────
// Supports optional filters: { category, status }
export async function getAllJobs(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.status)   params.set('status',   filters.status);

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${BASE_URL}/api/jobs${query}`, {
    cache: 'no-store', // always fresh — job board data changes frequently
  });
  return handleResponse(res);
}

// ─── GET /api/jobs/:id ────────────────────────────────────────────────────────
export async function getJobById(id) {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    cache: 'no-store',
  });
  return handleResponse(res);
}

// ─── POST /api/jobs ───────────────────────────────────────────────────────────
export async function createJob(data) {
  const res = await fetch(`${BASE_URL}/api/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// ─── PATCH /api/jobs/:id ──────────────────────────────────────────────────────
export async function updateJobStatus(id, status) {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
}

// ─── DELETE /api/jobs/:id ─────────────────────────────────────────────────────
export async function deleteJob(id) {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}
