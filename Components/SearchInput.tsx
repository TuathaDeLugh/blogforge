'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get('search');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const params = new URLSearchParams(searchParams.toString());
      if (e.currentTarget.value) {
        params.set('search', e.currentTarget.value);
      } else {
        params.delete('search');
      }
      params.set('page', '1');
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search users by name, username, or email..."
      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
      defaultValue={search || ''}
      onKeyDown={handleSearch}
    />
  );
}
