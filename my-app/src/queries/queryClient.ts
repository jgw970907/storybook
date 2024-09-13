import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

const getQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
        retry: 0,
      },
    },
  } as QueryClientConfig);

  return queryClient;
};

export default getQueryClient;
