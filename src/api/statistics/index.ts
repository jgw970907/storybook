import { getAxiosInstance as Axios } from '../axios/index';

import { Countlist } from 'types';
export const getCount = async () => {
  const res = await Axios(`/statistics/count`).get<Countlist>();

  return res;
};
