import { useState } from 'react';
import { useSearchStore } from 'store/useSearchStore';

export const useSearch = () => {
  const [searchState, setSearchState] = useState('');
  const {
    searchTitle,
    setSearchTitle,
    searchAuthorName,
    setSearchAuthorName,
    category,
    setCategory,
  } = useSearchStore();
  const [order, setOrder] = useState<'DESC' | 'ASC' | 'CLICKS'>('DESC');

  return {
    searchState,
    setSearchState,
    searchTitle,
    setSearchTitle,
    searchAuthorName,
    setSearchAuthorName,
    category,
    setCategory,
    order,
    setOrder,
  };
};
