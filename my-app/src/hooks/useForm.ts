import { useState, useCallback, ChangeEvent } from 'react';

const useForm = <T extends Record<string, string>>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialState);
  }, [initialState]);

  const checkEmpty = useCallback(() => {
    const empty = Object.values(values).some((value) => value.length === 0);
    setIsEmpty(empty);
    return empty;
  }, [values]);

  return { values, isEmpty, handleChange, resetForm, checkEmpty };
};

export default useForm;
