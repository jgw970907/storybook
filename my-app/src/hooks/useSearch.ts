import { useState } from 'react';
import { useSearchStore } from 'store/useSearchStore';

export const useSearch = () => {
  const [searchState, setSearchState] = useState('');
  const { search, setSearch } = useSearchStore();
  const [order, setOrder] = useState<'DESC' | 'ASC' | 'CLICKS'>('DESC');

  return {
    searchState,
    setSearchState,
    search,
    setSearch,
    order,
    setOrder,
  };
};
