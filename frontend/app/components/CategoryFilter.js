'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = ['All', 'Plumbing', 'Electrical', 'Painting', 'Joinery'];

export default function CategoryFilter({ selected }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'All') {
      params.delete('category');
    } else {
      params.set('category', value);
    }

    router.push(`/?${params.toString()}`);
  }

  return (
    <select
      value={selected || 'All'}
      onChange={handleChange}
      className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {CATEGORIES.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
