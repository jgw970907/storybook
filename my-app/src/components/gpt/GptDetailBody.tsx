import React from 'react';
import * as S from 'styles/gpt/gptDetail';

interface BodyProps {
  content: string | undefined;
}

const Body: React.FC<BodyProps> = ({ content }) => {
  if (!content) {
    return <S.Container>내용이 없습니다.</S.Container>;
  }

  const formattedContent = content;

  return <S.BodyContainer dangerouslySetInnerHTML={{ __html: formattedContent }}></S.BodyContainer>;
};

export default Body;
