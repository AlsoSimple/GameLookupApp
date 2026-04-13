import { useState } from 'react';

export function useSearch() {
  const [query, setQuery] = useState('');

  const updateQuery = (value: string) => {
    setQuery(value);
  };

  return { query, updateQuery };
}
