// Next.js automatically renders this while server components are fetching.
// No 'use client' needed — this is a special file, not a component you import.

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-gray-400">
      {/* Animated spinner */}
      <div
        className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm font-medium tracking-wide">Loading jobs…</p>
    </div>
  );
}
