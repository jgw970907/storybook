import AdminPagination from 'components/admin/AdminPagination';
import { Loader } from 'components/shared';
import { Card } from 'components/shared/Card';
import { useGetStoryLikes } from 'queries/gpt/gptLike';
import { useState } from 'react';
import { Layout, PaginationWrapper } from 'styles/AdminStyledTemp';
import { LoaderWrapper } from 'styles/LoaderWrapper';
import * as S from 'styles/mypage/mypageStyled';
const GptStoryLike = ({ userId }: { userId: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const take = 10;
  const { data, status } = useGetStoryLikes({ take, page: currentPage });

  return (
    <S.Section>
      <div className="likesbook">
        <h1>내가 좋아한 스토리</h1>
        {status === 'loading' ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : data && data.books.length > 0 ? (
          <div>
            <Layout>
              <S.BookWrapper $isSuccess={true}>
                {status === 'success' && (
                  <>
                    {data.books.map((story) => {
                      const { id, title, createdAt, updatedAt, isSecret, category, images } = story;
                      return (
                        <S.CardWrapper key={id}>
                          <S.IconWrap></S.IconWrap>
                          <Card
                            id={id}
                            title={title}
                            imageUrl={
                              images.length > 0 ? images[0].path : 'https://picsum.photos/200/150'
                            }
                            createdAt={createdAt}
                            updatedAt={updatedAt}
                            isSecret={isSecret}
                            category={category}
                            isPrompt={false}
                            userId={userId}
                          />
                        </S.CardWrapper>
                      );
                    })}
                  </>
                )}
              </S.BookWrapper>
            </Layout>
            <PaginationWrapper>
              <AdminPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={Number(data.totalPages * take)}
                handleNextPage={(pageNum: number) => {
                  if (data.totalPages * take > currentPage * take) {
                    setCurrentPage(pageNum + 1);
                  }
                }}
                handlePrevPage={(pageNum: number) => {
                  if (currentPage > 1) {
                    setCurrentPage(pageNum - 1);
                  }
                }}
              />
            </PaginationWrapper>
          </div>
        ) : (
          <div>좋아한 스토리가 없습니다.</div>
        )}
      </div>
    </S.Section>
  );
};

export default GptStoryLike;
