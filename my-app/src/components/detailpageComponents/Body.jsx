import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Body = ({ content }) => {
  if (!content) {
    return <S.container>내용이 없습니다.</S.container>;
  }

  return <S.container dangerouslySetInnerHTML={{ __html: content }}></S.container>;
};

export default Body;
const S = {
  container: styled.div`
    width: 100%;
    height: 100%;
    min-height: 800px;
    padding: 1rem;
  `,
};
