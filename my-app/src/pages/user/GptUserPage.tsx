import { GptLayout } from 'styles/gpt/gptLayout';
import GptDetailHeader from 'components/gpt/GptDetailHeader';

import { useGetMyStories } from 'queries/gpt';
import { Card } from 'components/shared/Card';
import { Loader } from 'components/shared';
import { PaginationWrapper } from 'styles/AdminStyledTemp';
import AdminPagination from 'components/admin/AdminPagination';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUser } from 'api/user';
import { UserType } from 'types/userTypes';
import { useParams } from 'react-router-dom';
import Bottom from 'components/layout/Bottom';
import { LoaderWrapper } from 'styles/LoaderWrapper';

const GptUserPage = () => {
  const [storyPage, setStoryPage] = useState(1);
  const [user, setUser] = useState<UserType>();
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) return;
    const getUserInfo = async () => {
      const res = await getUser(userId);
      setUser(res);
    };
    try {
      getUserInfo();
    } catch (e) {
      alert('사용자 정보를 불러오는데 실패했습니다.');
    }
  }, [userId]);
  const { data: Stories, status: storyStatus } = useGetMyStories(
    {
      take: 10,
      page: storyPage,
    },
    userId || '',
    false,
  );
  const take = 10;

  return (
    <>
      <GptLayout>
        {user && <GptDetailHeader user={user} isStorypage={false}></GptDetailHeader>}

        {storyStatus === 'loading' ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : Stories && Stories.data.stories.length > 0 && userId ? (
          <>
            <Layout>
              <BookWrapper $isSuccess={true}>
                {storyStatus === 'success' && (
                  <>
                    {Stories.data.stories.map((story) => {
                      const { id, title, createdAt, updatedAt, isSecret, category, images } = story;
                      return (
                        <CardWrapper key={id}>
                          <Card
                            id={id}
                            title={title}
                            imageUrl={
                              images.length > 0 ? images[0].path : 'https://picsum.photos/200/150'
                            }
                            userId={userId}
                            createdAt={createdAt}
                            updatedAt={updatedAt}
                            isSecret={isSecret}
                            category={category}
                            isMyPage={true}
                          />
                        </CardWrapper>
                      );
                    })}
                  </>
                )}
              </BookWrapper>
            </Layout>
            <PaginationWrapper>
              <AdminPagination
                currentPage={storyPage}
                setCurrentPage={setStoryPage}
                total={Number(Stories.total)}
                handleNextPage={(pageNum: number) => {
                  if (pageNum < Math.ceil(Stories.total / take)) {
                    setStoryPage(pageNum + 1);
                  }
                }}
                handlePrevPage={(pageNum: number) => {
                  if (storyPage > 1) {
                    setStoryPage(pageNum - 1);
                  }
                }}
              />
            </PaginationWrapper>
          </>
        ) : (
          <p>스토리가 없습니다.</p>
        )}
      </GptLayout>
      <Bottom />
    </>
  );
};

export default GptUserPage;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  width: 100%;
`;

const BookWrapper = styled.div<{ $isSuccess?: boolean }>`
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  transition: opacity 1s ease;
  opacity: ${({ $isSuccess }) => ($isSuccess ? 1 : 0)};
`;
const CardWrapper = styled.div`
  position: relative;
`;
