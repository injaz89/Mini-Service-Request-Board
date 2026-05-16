const STATUS_CONFIG = {
  'Open':        { cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500' },
  'In Progress': { cls: 'bg-amber-50  text-amber-700  border border-amber-200',   dot: 'bg-amber-500'  },
  'Closed':      { cls: 'bg-slate-100 text-slate-500  border border-slate-200',   dot: 'bg-slate-400'  },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG['Closed'];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
}
