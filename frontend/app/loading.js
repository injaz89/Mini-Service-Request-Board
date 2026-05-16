function Skeleton({ className }) {
  return <div className={`bg-slate-200 rounded-xl animate-pulse ${className}`} />;
}

export default function Loading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-3 w-32 rounded-full mb-3" />
        <Skeleton className="h-9 w-60 mb-2" />
        <Skeleton className="h-4 w-24 rounded-full" />
      </div>

      {/* Filter pills skeleton */}
      <div className="flex gap-2 mb-8">
        {[80, 110, 120, 105, 95, 90].map((w, i) => (
          <div key={i} className="h-8 bg-slate-200 rounded-full animate-pulse" style={{ width: w }} />
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 border-l-4 border-l-slate-200 p-5 shadow-sm">
            <Skeleton className="h-5 w-20 rounded-full mb-3" />
            <Skeleton className="h-5 w-full mb-1.5" />
            <Skeleton className="h-5 w-3/4 mb-4" />
            <Skeleton className="h-3 w-full mb-1.5" />
            <Skeleton className="h-3 w-5/6 mb-4" />
            <div className="flex justify-between pt-3 border-t border-slate-100">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
