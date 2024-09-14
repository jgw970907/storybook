import { CardSlide } from 'components/shared/CardSlide';
import styled from 'styled-components';
import { getStyledColor } from 'utils';
import { MdRecommend } from 'react-icons/md';
import { FaRegSmile } from 'react-icons/fa';
import Spinner from 'components/shared/Spinner';
import { useGetBestStories, useGetRandomStories } from 'queries/gpt';
const cardHeight = '340px'; // 카드의 높이와 동일하게 설정

const SectionTitle = styled.h2`
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  width: 10rem;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 1rem;
  color: ${getStyledColor('forest', 700)};
  background-color: ${getStyledColor('forest', 300)};
`;
const SpinnerWrap = styled.div<{ $height: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $height }) => $height};
`;
export const GptStoryLists = () => {
  const { data: bestStories, status: bestloading } = useGetBestStories();
  const { data: randomStories, status: recommendloading } = useGetRandomStories();
  return (
    <div>
      <SectionTitle>
        최고작
        <FaRegSmile />
      </SectionTitle>
      {bestloading === 'loading' ? (
        <SpinnerWrap $height={cardHeight}>
          <Spinner width="3rem" />{' '}
        </SpinnerWrap>
      ) : (
        <CardSlide items={bestStories?.data.stories} />
      )}

      <SectionTitle>
        추천작
        <MdRecommend />
      </SectionTitle>
      {recommendloading === 'loading' ? (
        <SpinnerWrap $height={cardHeight}>
          <Spinner width="3rem" />{' '}
        </SpinnerWrap>
      ) : (
        <CardSlide items={randomStories?.data.stories} />
      )}
    </div>
  );
};
