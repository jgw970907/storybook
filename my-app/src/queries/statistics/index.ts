import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { getCount } from 'api/statistics';

export const useGetCount = () => {
  return useQuery({
    queryKey: [QueryKeys.ADMIN, 'count'],
    queryFn: getCount,
    placeholderData: () => ({
      totalBooks: '-',
      totalClicks: '-',
      totalUsers: '-',
      totalAdmins: '-',
      totalComments: '-',
    }),
  });
};
