import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import dateFormat from 'utils/getDateStr';
import { incrementClicks } from 'api/gpt';
import { pixelToRem } from 'utils';
import { FaRegHeart } from 'react-icons/fa';
import { PiCursorClickDuotone } from 'react-icons/pi';
import { Align } from 'styles/common/CommonStyled';
export const Card = ({
  id,
  title,
  imageUrl,
  isSecret,
  createdAt,
  category,
  isPrompt,
  authorName,
  userId,
  clicks,
  cardWidth,
  likeCount,
}: {
  id: string;
  title: string;
  imageUrl: string;
  isSecret?: boolean;
  createdAt?: string;
  category?: string;
  isPrompt?: boolean;
  authorName?: string;
  userId: string;
  clicks?: number;
  cardWidth?: number;
  likeCount?: number;
}) => {
  const handleClick = (id: string) => {
    if (id) {
      incrementClicks(id);
    } else {
      alert('책이 삭제되었거나 잘못된 경로입니다.');
    }
  };
  return (
    <CardStyle $cardWidth={cardWidth}>
      <StyledLink
        to={isPrompt ? `/gptpage/prompt/${id}` : `/gptpage/detail/${id}`}
        style={{ width: '100%' }}
        onClick={() => handleClick(id)}
      >
        <Image src={imageUrl} alt={title} />
        <Title>{title}</Title>

        {clicks !== undefined && (
          <Align direction={'row'}>
            <Text>{category}/</Text>
            <PiCursorClickDuotone />
            <Text>{`:${clicks} /`}</Text>
            <FaRegHeart />
            <Text>{`:${likeCount}`}</Text>
          </Align>
        )}
        {createdAt && <Text>{`작성일: ${dateFormat(createdAt)}`}</Text>}
        {!isPrompt && (
          <StyledLink to={`/gptpage/user/${userId}`}>
            <Author>{authorName}</Author>
          </StyledLink>
        )}

        {isPrompt && <Status>{isSecret ? '비공개' : '공개'}</Status>}
      </StyledLink>
    </CardStyle>
  );
};
const CardStyle = styled.div.attrs<{ $cardWidth?: number }>((props) => ({
  style: {
    width: props.$cardWidth ? `${props.$cardWidth}px` : 'auto',
  },
}))`
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 330px;

  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.03);
    transition: all 0.3s ease;
  }
`;

const StyledLink = styled(RouterLink)`
  width: 100%;
  color: inherit; // 기본 글자색을 상속받음

  &:visited {
    color: inherit; // 방문 후에도 기본 글자색을 유지
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  object-fit: cover;
`;
const Author = styled.p`
  text-align: center;
  padding: 10px;
  font-weight: bold;
  font-size: ${pixelToRem(14)};
  z-index: 1;
  transition:
    transform 0.2s,
    color 0.2s;
  text-decoration: none;
  &:hover {
    transform: scale(1.1);
    background-color: rgba(30, 9, 9, 0.8);
  }
  @media screen and (max-width: 768px) {
    font-size: ${pixelToRem(12)};
  }
`;

const Title = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
  padding: 10px;
  font-weight: bold;
  color: black;
  font-size: ${pixelToRem(14)};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    font-size: ${pixelToRem(12)};
  }
`;

const Text = styled.p`
  text-align: center;
  padding: 5px;
  font-size: 0.9rem;
  color: #757575;
  @media screen and (max-width: 768px) {
    font-size: ${pixelToRem(10)};
  }
`;

const Status = styled.p`
  text-align: center;
  padding: 5px;
  font-size: 0.8em;
  color: ${(props) => (props.children === '비공개' ? '#f44336' : '#4caf50')};
`;
