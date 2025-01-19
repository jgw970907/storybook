import React from 'react';
import styled from 'styled-components';
import { BookCategory } from '../../constant/bookCategory';
import { pixelToRem } from 'utils';

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: ${pixelToRem(10)};
  width: 100%;
  justify-content: center;
`;

const CategoryButton = styled.button<{ isSelected: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;

  font-size: ${pixelToRem(14)};
  border: none;
  background-color: ${(props) => (props.isSelected ? '#007bff' : '#f0f0f0')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isSelected ? '#0056b3' : '#e0e0e0')};
  }
  @media screen and (max-width: 768px) {
    font-size: ${pixelToRem(10)};
    padding: 0.4rem 0.9rem;
  }
`;

const SELECTED_CATEGORIES: BookCategory[] = [
  '소설',
  '비소설',
  '과학',
  '판타지',
  '로맨스',
  '추리',
  '자기계발',
  '기술',
  '블로그',
  '여행',
];

interface CategorySelectorProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <CategoryContainer>
      {SELECTED_CATEGORIES.map((category) => (
        <CategoryButton
          key={category}
          isSelected={selectedCategory === category}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </CategoryButton>
      ))}
    </CategoryContainer>
  );
};

export default CategorySelector;
