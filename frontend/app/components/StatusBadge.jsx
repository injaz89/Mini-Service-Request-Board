const STATUS_STYLES = {
  Open:          'bg-green-100 text-green-700 border border-green-200',
  'In Progress': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  Closed:        'bg-gray-100 text-gray-500 border border-gray-200',
};

export default function StatusBadge({ status }) {
  const cls = STATUS_STYLES[status] || 'bg-gray-100 text-gray-500 border border-gray-200';
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}>
      {status}
    </span>
  );
}
