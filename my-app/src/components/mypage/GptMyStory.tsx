import { useGetMyStories, usePatchDisclosure } from 'queries/gpt';
import { useState } from 'react';
import { Card } from 'components/shared/Card';
import { MdOutlinePublic, MdOutlinePublicOff } from 'react-icons/md';
import AdminPagination from 'components/admin/AdminPagination';
import { PaginationWrapper } from 'styles/AdminStyledTemp';
import { LoaderWrapper } from 'styles/LoaderWrapper';
import { FaRegTrashCan } from 'react-icons/fa6';
import { deleteGptStory } from 'api/gpt';
import * as S from 'styles/mypage/mypageStyled';
import { Loader } from 'components/shared';
import { UserType } from 'types/userTypes';

const GptMyStory = ({ userId, user }: { userId: string; user: UserType | null }) => {
  const [storyPage, setStoryPage] = useState(1);
  const { mutate: patchMutate } = usePatchDisclosure(storyPage.toString());
  const { data: MyStories, status: storyStatus } = useGetMyStories(
    {
      take: 10,
      page: storyPage,
    },
    userId,
    true,
  );
  const deleteStory = async (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteGptStory(id);
        alert('삭제되었습니다.');
      } catch (error) {
        alert('삭제 중 에러가 발생했습니다.');
      }
    }
  };

  const patchDisclosure = (id: string) => {
    patchMutate(id);
  };
  return (
    <S.Section>
      <div className="likesbook">
        {/* 나의 스토리는 두줄 이상으로 배치하기 때문에 grid를 사용 */}
        <h1>나의 스토리</h1>
        {storyStatus === 'loading' ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : MyStories && MyStories.data.stories.length > 0 ? (
          <>
            <S.Layout>
              <S.BookWrapper $isSuccess={true}>
                {storyStatus === 'success' && (
                  <>
                    {MyStories.data.stories.map((story) => {
                      const { id, title, createdAt, updatedAt, isSecret, category, images } = story;
                      return (
                        <S.CardWrapper key={id}>
                          <S.IconWrap>
                            {user && user.role !== 'ADMIN' && (
                              <S.Icon>
                                <S.IconBtn onClick={() => deleteStory(id)}>
                                  <FaRegTrashCan />
                                </S.IconBtn>
                              </S.Icon>
                            )}
                            <S.Icon>
                              <S.IconBtn onClick={() => patchDisclosure(id)}>
                                {isSecret ? <MdOutlinePublicOff /> : <MdOutlinePublic />}
                              </S.IconBtn>
                            </S.Icon>
                          </S.IconWrap>
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
                            isPrompt={true}
                            userId={userId}
                          />
                        </S.CardWrapper>
                      );
                    })}
                  </>
                )}
              </S.BookWrapper>
            </S.Layout>
            <PaginationWrapper>
              <AdminPagination
                currentPage={storyPage}
                setCurrentPage={setStoryPage}
                total={Number(MyStories.total)}
                handleNextPage={(pageNum: number) => {
                  if (pageNum < Math.ceil(MyStories.total / 10)) {
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
          <p>나의 스토리가 없습니다.</p>
        )}{' '}
      </div>
    </S.Section>
  );
};

export default GptMyStory;
