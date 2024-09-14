import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { storyArrayForInfi } from 'types/gptTypes';

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 10px 0;
`;

const SlideWrapper = styled.div<{ currentIndex: number; cardWidth: number; gap: number }>`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: ${({ currentIndex, cardWidth, gap }) =>
    `translateX(-${currentIndex * (cardWidth + gap)}px)`}; // 카드의 너비와 갭 반영
  gap: ${({ gap }) => `${gap}px`}; // 카드 사이의 간격
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
`;

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

interface CardSlideProps {
  items: storyArrayForInfi | undefined;
}

export const CardSlide: React.FC<CardSlideProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap, setGap] = useState(20); // 카드 사이의 간격
  const slideRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(5); // 기본적으로 보이는 카드 개수

  // 카드 너비를 계산하여 상태로 저장
  useEffect(() => {
    const updateLayout = () => {
      if (slideRef.current) {
        const slideWidth = slideRef.current.clientWidth;

        // 화면 크기에 따라 visibleCards와 카드 간격을 동적으로 조정
        const newVisibleCards = window.innerWidth >= 1200 ? 5 : window.innerWidth >= 768 ? 3 : 1; // 화면 크기에 따라 보여질 카드 수 결정
        const newGap = window.innerWidth >= 768 ? 20 : 10; // 모바일에서는 간격을 줄임
        setGap(newGap);
        setVisibleCards(newVisibleCards);
        setCardWidth((slideWidth - newGap * (newVisibleCards - 1)) / newVisibleCards); // 카드 너비 계산
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => Math.min(prevIndex + 1, 10 - visibleCards), // 10개의 데이터만 표시
    );
  };

  return items && items.length > 0 ? (
    <SlideContainer ref={slideRef}>
      <SlideWrapper currentIndex={currentIndex} cardWidth={cardWidth} gap={gap}>
        {items.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.images[0]?.path || 'https://picsum.photos/200/150'}
            clicks={item.clicks}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            category={item.category}
            authorName={item.authorName}
            isMyPage={false}
            userId={item.userId}
          />
        ))}
      </SlideWrapper>
      {currentIndex > 0 && <PrevButton onClick={handlePrev}>&lt;</PrevButton>}
      {currentIndex < 10 - visibleCards && <NextButton onClick={handleNext}>&gt;</NextButton>}
    </SlideContainer>
  ) : (
    <div>데이터가 없습니다.</div>
  );
};
