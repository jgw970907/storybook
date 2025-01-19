import { useGetCount } from 'queries/statistics';
import { useNavigate } from 'react-router-dom';
import * as S from 'styles/AdminStyledTemp';
import { styled } from 'styled-components';
import { getStyledColor } from 'utils';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: count } = useGetCount();

  return (
    <S.Layout>
      <FlexAlign>
        <Wrap>
          <Box>
            <S.ContainerHeader>
              <S.ContainerTitle>총 관리자 수</S.ContainerTitle>
            </S.ContainerHeader>
            <Text>{count?.totalAdmins}개</Text>
          </Box>
          <Box>
            <S.ContainerHeader>
              <S.ContainerTitle>총 유저 수</S.ContainerTitle>
            </S.ContainerHeader>
            <Text>{count?.totalUsers}개</Text>
          </Box>
          <Box>
            <S.ContainerHeader>
              <S.ContainerTitle>등록된 책 권수</S.ContainerTitle>
            </S.ContainerHeader>
            <Text>{count?.totalBooks}권</Text>
          </Box>
          <Box>
            <S.ContainerHeader>
              <S.ContainerTitle>총 조회수</S.ContainerTitle>
            </S.ContainerHeader>
            <Text>{count?.totalClicks}회</Text>
          </Box>

          <Box>
            <S.ContainerHeader>
              <S.ContainerTitle>총 댓글 수</S.ContainerTitle>
            </S.ContainerHeader>
            <Text>{count?.totalComments}개</Text>
          </Box>
        </Wrap>
        <S.LinkCardWrap>
          <Box>
            <S.ContainerHeader>
              <S.ContainerTitle>책 등록</S.ContainerTitle>
              <S.Wrapper $marginTop={30}>새로운 책을 등록</S.Wrapper>
            </S.ContainerHeader>
            <S.Wrapper $marginTop={50}>
              <S.Button $variant="primary" onClick={() => navigate('/admin/create')}>
                이동하기
              </S.Button>
            </S.Wrapper>
          </Box>
          <Box>
            <S.ContainerHeader>
              <S.ContainerTitle>책 관리</S.ContainerTitle>
              <S.Wrapper $marginTop={30}>테이블에서 등록된 책의 정보와 수정 및 삭제</S.Wrapper>
            </S.ContainerHeader>
            <S.Wrapper $marginTop={50}>
              <S.Button $variant="primary" onClick={() => navigate('/admin/books')}>
                이동하기
              </S.Button>
            </S.Wrapper>
          </Box>
          <Box>
            <S.ContainerHeader>
              <S.ContainerTitle>사용자 관리</S.ContainerTitle>
              <S.Wrapper $marginTop={30}>사용자 리스트를 확인하고</S.Wrapper>
              <S.Wrapper>관리자 권한인 경우 회원탈퇴 시키기 가능(부적절한 사용자)</S.Wrapper>
            </S.ContainerHeader>
            <S.Wrapper $marginTop={50}>
              <S.Button $variant="primary" onClick={() => navigate('/admin/users')}>
                이동하기
              </S.Button>
            </S.Wrapper>
          </Box>
          <Box>
            <S.ContainerHeader>
              <S.ContainerTitle>댓글 관리</S.ContainerTitle>
              <S.Wrapper $marginTop={30}>부적절한 댓글 발견시</S.Wrapper>
              <S.Wrapper>관리자 권한인 경우 댓글 삭제</S.Wrapper>
            </S.ContainerHeader>
            <S.Wrapper $marginTop={50}>
              <S.Button $variant="primary" onClick={() => navigate('/admin/reviews')}>
                이동하기
              </S.Button>
            </S.Wrapper>
          </Box>
        </S.LinkCardWrap>
      </FlexAlign>
    </S.Layout>
  );
};

export default AdminDashboard;

const Wrap = styled.div`
  display: flex;
  gap: 50px;
  white-space: nowrap;

  & ${S.Container} {
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${getStyledColor('teal', 400)};
    }
  }

  & ${S.ContainerTitle} {
    color: ${getStyledColor('teal', 900)};
    font-size: 18px;
  }

  & ${S.ContainerHeader} {
    min-height: 30px;
  }
`;
const Text = styled.div`
  text-align: center;
  font-weight: bold;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: background-color 0.2s ease;
  background-color: white;
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 10px;
`;
const FlexAlign = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
