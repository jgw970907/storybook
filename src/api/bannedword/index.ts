import { getAxiosInstance as Axios } from '../axios/index';
import { BannedWordList } from 'types';

export const addBannedWord = async (word: string) => {
  const res = await Axios(`/bannedword`).post<BannedWordList>({ word });
  return res;
};
export const getBannedWords = async (take: number, page: number) => {
  const res = await Axios(`/bannedword?take=${take}&page=${page}`).get<BannedWordList>();
  return res;
};
export const deleteBannedWord = async (id: string) => {
  const res = await Axios(`/bannedword/${id}`).remove<BannedWordList>();
  return res;
};
