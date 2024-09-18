import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { userQueries, likeQueries } from 'queries';
import { useGetMyStories } from 'queries/gpt';
import { deleteGptStory } from 'api/gpt';
import React, { useState, useRef } from 'react';
import { styled } from 'styled-components';
import { Book } from 'components/user';
import { Button, Loader } from 'components/shared';
import CustomModal from 'components/modal/CustomModal';
import { ImageUploader } from 'components/shared';
import { ImageUploaderImperativeHandle } from 'components/shared/ImageUploader';
import { postImage } from 'api/imageapi';
import { useUserStore } from 'store/useUserStore';
import { Card } from 'components/shared/Card';
import { MdOutlinePublic, MdOutlinePublicOff } from 'react-icons/md';
import AdminPagination from 'components/admin/AdminPagination';
import { PaginationWrapper } from 'styles/AdminStyledTemp';
import { usePatchDisclosure } from 'queries/gpt';
import Bottom from 'components/layout/Bottom';
import { LoaderWrapper } from 'styles/LoaderWrapper';
import { FaRegTrashCan } from 'react-icons/fa6';
import { getStyledColor } from 'utils';
const MyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [storyPage, setStoryPage] = useState(1);
  const [nicknameBtn, setNicknameBtn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwalert, setPwalert] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const { user } = useUserStore();

  const userId: string = user?.id || '';
  const { usePatchUser } = userQueries;
  const { useGetBookLikes } = likeQueries;

  const take = 10;
  const imageRef = useRef<ImageUploaderImperativeHandle>(null);
  const queryClient = useQueryClient();
  const { mutate, error } = usePatchUser();
  const { mutate: patchMutate } = usePatchDisclosure(currentPage.toString());
  const {
    data: LikesBooks,
    status,
    isSuccess,
  } = useGetBookLikes({ take: take, page: currentPage });
  const { data: MyStories, status: storyStatus } = useGetMyStories(
    {
      take: take,
      page: storyPage,
    },
    userId,
    true,
  );

  const saveProfileImg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!imageSrc) {
      alert('프로필 이미지를 선택하세요.');
      return;
    }
    const fileData = imageRef.current?.getFileData();
    if (fileData) {
      try {
        const res = await postImage(fileData[0]);
        setImageSrc(res.imagePath);
        mutate(
          { id: userId, profileImgPath: res.imagePath },
          {
            onSuccess: () => {
              alert('프로필 이미지가 성공적으로 변경되었습니다.');
              setImageSrc('');
            },
          },
        );
      } catch (error) {
        alert('이미지 업로드에 실패했습니다.');
      }
    } else {
      alert('파일이 없습니다.');
    }
  };
  const saveNickName = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!nickname) {
      alert('닉네임을 입력하세요.');

      return;
    }
    mutate(
      { id: userId, nickname: nickname },
      {
        onSuccess: () => {
          alert('닉네임이 성공적으로 변경되었습니다.');
          queryClient.invalidateQueries([QueryKeys.USER_DATA]);
          setNickname('');
        },
      },
    );
  };
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
  const patchPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      alert('비밀번호와 비밀번호 확인을 입력하세요.');
      return;
    }
    if (password !== confirmPassword) {
      setPwalert(false);
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setPwalert(true);
    mutate(
      { id: userId, password: password },
      {
        onSuccess: () => {
          alert('비밀번호가 성공적으로 변경되었습니다.');
          setPassword('');
          setConfirmPassword('');
        },
      },
    );
    if (error) {
      alert(error);
    }
  };

  const handleClick = (id: string) => {
    setModalOpen(true);
    unshowScroll();
    setSelectedBookId(id); // 선택된 책의 ID를 상태에 저장
  };

  const unshowScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  const showScroll = () => {
    document.body.style.overflow = 'unset';
  };

  const findSelectedBook = () => {
    return LikesBooks?.books.flatMap((data) => data).find((data) => data?.id === selectedBookId);
  };
  const selectedBook = findSelectedBook();

  const patchDisclosure = (id: string) => {
    patchMutate(id);
  };
  return (
    <Container>
      <section>
        <UserTable>
          <h1 className="tbody">내정보</h1>
          <form>
            <table>
              <tbody>
                <tr>
                  <th>프로필 이미지 변경</th>
                  <td>
                    <ImageUploader ref={imageRef} />
                    <ProfileImgBtnWrap>
                      <Button onClick={() => saveProfileImg}>프로필 이미지 변경</Button>
                    </ProfileImgBtnWrap>
                  </td>
                </tr>
                <tr>
                  <th>아이디(이메일)</th>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <th>활동명</th>
                  <td>
                    <div>
                      <span>{user?.nickname ? user.nickname : nickname}</span>
                      <Button type="button" onClick={() => setNicknameBtn(!nicknameBtn)}>
                        {nicknameBtn ? '활동명 변경 취소' : '활동명 변경'}
                      </Button>
                      <div style={{ display: nicknameBtn ? 'block' : 'none' }}>
                        <div className="changeNickname">
                          <input
                            placeholder="변경할 닉네임 입력"
                            onChange={(e) => setNickname(e.target.value)}
                          ></input>
                          <Button onClick={() => saveNickName}>닉네임 변경</Button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <th>비밀번호 변경</th>
                  <td>
                    <div className="passwordtable">
                      <table>
                        <tbody>
                          <tr>
                            <th>새 비밀번호</th>
                            <td>
                              <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                disabled={true}
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <th>비밀번호 다시 입력</th>
                            <td>
                              <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                disabled={true}
                              ></input>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p style={{ color: 'red', padding: '8px' }}>
                        {pwalert ? null : '비밀번호가 일치하지 않습니다'}
                      </p>
                      <Button onClick={() => patchPassword} disabled={true}>
                        비밀번호 변경
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <div className="likesbook">
            {/* 내가 좋아한 책같은 경우 한줄로 배치할 것이기 때문에 flex 사용 */}
            <h1>내가 좋아한 책</h1>
            {status === 'loading' ? (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            ) : LikesBooks && LikesBooks.books.length > 0 ? (
              <>
                <Layout>
                  <BookWrapper $isSuccess={isSuccess}>
                    {storyStatus === 'success' && (
                      <>
                        {LikesBooks.books.map((data) => {
                          const { id, title, images, ...spread } = data;
                          return (
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              key={id}
                            >
                              <Book
                                key={id}
                                id={id}
                                images={images}
                                title={title}
                                {...spread}
                                onClick={() => handleClick(id)}
                              />
                              {modalOpen && (
                                <CustomModal
                                  bookId={selectedBookId}
                                  book={selectedBook}
                                  setModalOpen={setModalOpen}
                                  showScroll={showScroll}
                                ></CustomModal>
                              )}
                            </div>
                          );
                        })}
                      </>
                    )}
                  </BookWrapper>
                </Layout>
                <PaginationWrapper>
                  <AdminPagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={Number(LikesBooks.totalPages * take)}
                    handleNextPage={(pageNum: number) => {
                      if (LikesBooks.totalPages * take > currentPage * take) {
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
              </>
            ) : (
              <p>내가 좋아요한 책이 없습니다</p>
            )}
          </div>
          <div className="likesbook">
            {/* 나의 스토리는 두줄 이상으로 배치하기 때문에 grid를 사용 */}
            <h1>나의 스토리</h1>
            {storyStatus === 'loading' ? (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            ) : MyStories && MyStories.data.stories.length > 0 ? (
              <>
                <Layout>
                  <BookWrapper $isSuccess={true}>
                    {storyStatus === 'success' && (
                      <>
                        {MyStories.data.stories.map((story) => {
                          const { id, title, createdAt, updatedAt, isSecret, category, images } =
                            story;
                          return (
                            <CardWrapper key={id}>
                              <IconWrap>
                                {user && user.role !== 'ADMIN' && (
                                  <Icon>
                                    <IconBtn onClick={() => deleteStory(id)}>
                                      <FaRegTrashCan />
                                    </IconBtn>
                                  </Icon>
                                )}
                                <Icon>
                                  <IconBtn onClick={() => patchDisclosure(id)}>
                                    {isSecret ? <MdOutlinePublicOff /> : <MdOutlinePublic />}
                                  </IconBtn>
                                </Icon>
                              </IconWrap>
                              <Card
                                id={id}
                                title={title}
                                imageUrl={
                                  images.length > 0
                                    ? images[0].path
                                    : 'https://picsum.photos/200/150'
                                }
                                createdAt={createdAt}
                                updatedAt={updatedAt}
                                isSecret={isSecret}
                                category={category}
                                isMyPage={true}
                                userId={userId}
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
                    total={Number(MyStories.total)}
                    handleNextPage={(pageNum: number) => {
                      if (pageNum < Math.ceil(MyStories.total / take)) {
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
        </UserTable>
      </section>
      <Bottom />
    </Container>
  );
};

export default MyPage;
const UserTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding: 20px;
  margin: 30px auto;

  .tbody {
    font-size: 20px;
    font-weight: bold;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    width: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #f2f2f2;
    text-align: left;
  }

  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
  }

  .changeNickname {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .passwordtable {
    width: 100%;
    > table {
    }
  }
  .passwordtable th {
    border: none;
    background-color: transparent;
  }

  .passwordtable table {
    border-collapse: separate;
  }

  .passwordtable button {
    margin: 15px 8px;
  }

  .likesbook {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .editNickname {
    background-color: transparent;
  }

  .changeNickname {
    margin: 10px 0px;
    padding: 10px;
    border: 1px solid #dadde4;
    background-color: #f0f0f0;
    color: #555;
    font-size: 11px;
    width: 70%;

    input {
      height: 22px;
      padding: 2px 5px;
      line-height: 22px;
      border: 1px solid #dadde4;
    }
  }

  .passwordtable {
    font-size: 12px;
    width: 270px;
  }

  h1 {
    color: black;
  }
  .likesbook h1 {
    margin-top: 80px;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
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
const IconWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 5px;
  position: relative;
  gap: 10px;
`;
const Icon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 50%;
  &:hover {
    background-color: ${getStyledColor('red', 800)};
  }
`;
const IconBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const ProfileImgBtnWrap = styled.div`
  margin: 10px 0;
`;
