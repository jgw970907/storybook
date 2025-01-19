import * as S from 'styles/gpt/gptDetail';
import * as M from 'styles/ModalStyled';
import { UserType } from 'types/userTypes';
import dateFormat from 'utils/getDateStr';
import {
  useAddLike,
  useGetStoryIsLike as getStoryIsLike,
  useRemoveLike,
} from 'queries/gpt/gptLike';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';

const Header = ({
  storyId,
  user,
  createdAt,
  updatedAt,
  title,
  category,
  clicks,
  isStorypage,
}: {
  storyId?: string | undefined;
  user: UserType | null | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  title?: string | undefined;
  category?: string | undefined;
  clicks?: number | undefined;
  isStorypage: boolean;
}) => {
  const { user: myuserinfo } = useUserStore();

  const { data: storyIsLikeData, status } =
    storyId && myuserinfo?.id
      ? getStoryIsLike(storyId, myuserinfo.id)
      : { data: undefined, status: 'loading' };
  const navigate = useNavigate();
  const { mutate: addLike, status: addStatus } = useAddLike({ storyId: storyId || '' });
  const { mutate: removeLike, status: removeStatus } = useRemoveLike({ storyId: storyId || '' });

  const toggleLike = () => {
    if (!myuserinfo?.id || !storyId) {
      alert('사용자 정보가 없습니다. 다시 로그인해주세요.');

      navigate('/login');
      return;
    }

    if (storyIsLikeData?.isLike) {
      removeLike({ storyId, userId: myuserinfo?.id });
    } else {
      addLike({ storyId, userId: myuserinfo.id });
    }
  };
  return (
    <S.Container>
      <S.InfoContainer>
        <Link to={`/gptpage/user/${user?.id}`}>
          <S.profileImg
            $size={'5rem'}
            src={user?.profileImg[0] || '/img/default.png'}
          ></S.profileImg>
        </Link>
        {isStorypage && (
          <M.HeartButton
            onClick={toggleLike}
            $liked={storyIsLikeData?.isLike}
            $status={status}
            disabled={addStatus === 'loading' || removeStatus === 'loading'}
          >
            <FaHeart />
          </M.HeartButton>
        )}
        <S.Ptag>이메일:{user?.email}</S.Ptag>
        <S.Ptag>이름:{user?.name}</S.Ptag>
        <S.Ptag>활동명:{user?.nickname}</S.Ptag>
        {!isStorypage && (
          <S.Ptag>개설일:{dateFormat(user?.createdAt || String(Date.now()))}</S.Ptag>
        )}
        {createdAt && updatedAt && (
          <S.Ptag>
            {createdAt < updatedAt
              ? ` (수정됨: ${dateFormat(updatedAt)})`
              : `작성일: ${dateFormat(createdAt)}`}
          </S.Ptag>
        )}

        {category && <S.Ptag>카테고리:{category}</S.Ptag>}
        {clicks !== undefined && <S.Ptag>{`조회수:${clicks}`}</S.Ptag>}
      </S.InfoContainer>
      {isStorypage ? <S.Title>{title}</S.Title> : <S.Title>{user?.nickname}의 스토리</S.Title>}
    </S.Container>
  );
};

export default Header;
