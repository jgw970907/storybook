import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { GptLayout } from 'styles/gpt/gptLayout';
import { useStoriesInfinityScroll } from 'queries/gpt';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card } from 'components/shared/Card';
import Spinner from 'components/shared/Spinner';
import { Loader } from 'components/shared';
import { LoaderWrapper } from 'styles/LoaderWrapper';
const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  padding: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
`;
interface GptStoryInfinityScrollProps {
  order: 'DESC' | 'ASC' | 'CLICKS';
  searchTitle: string;
  searchAuthorName: string;
  category: string;
}
export const GptStoryInfinityScroll = ({
  order,
  searchTitle,
  searchAuthorName,
  category,
}: GptStoryInfinityScrollProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useStoriesInfinityScroll(
    order,
    searchTitle,
    searchAuthorName,
    category,
  );

  const loadMoreRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  if (status === 'error') return <div>Error loading stories</div>;

  return (
    <GptLayout>
      {status === 'loading' ? (
        <LoaderWrapper>
          <Loader custom={true} />
        </LoaderWrapper>
      ) : (
        <StoryGrid>
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.data.map((story) => (
                <Link
                  key={story.id}
                  to={`/gptpage/detail/${story.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <Card
                    id={story.id}
                    title={story.title}
                    imageUrl={
                      story.images.length > 0
                        ? story.images[0].path
                        : 'https://picsum.photos/200/150'
                    }
                    category={story.category}
                    authorName={story.authorName}
                    isMyPage={false}
                    userId={story.userId}
                    clicks={story.clicks}
                  />
                </Link>
              ))}
            </React.Fragment>
          ))}
          {isFetchingNextPage && (
            <LoadingMessage>
              <Spinner width="2rem" />
            </LoadingMessage>
          )}
          <div ref={loadMoreRef} style={{ height: '20px' }} />
        </StoryGrid>
      )}
    </GptLayout>
  );
};
