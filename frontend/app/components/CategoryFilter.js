'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { value: '',            label: 'All Jobs'   },
  { value: 'Plumbing',   label: '🔧 Plumbing'   },
  { value: 'Electrical', label: '⚡ Electrical'  },
  { value: 'Painting',   label: '🎨 Painting'    },
  { value: 'Joinery',    label: '🪚 Joinery'     },
  { value: 'Other',      label: '📦 Other'       },
];

export default function CategoryFilter({ selected }) {
  const router      = useRouter();
  const searchParams = useSearchParams();

  function handleClick(value) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete('category');
    else         params.set('category', value);
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {CATEGORIES.map(({ value, label }) => {
        const active = (selected || '') === value;
        return (
          <button
            key={value || 'all'}
            onClick={() => handleClick(value)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              active
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
