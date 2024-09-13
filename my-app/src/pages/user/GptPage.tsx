import { Button } from 'components/shared';
import { GptLayout } from 'styles/gpt/gptLayout';
import SearchBar from 'components/shared/SearchBar';
import CategorySelector from 'components/gpt/CategorySelector';
import { GptStoryInfinityScroll } from 'components/gpt/GptStoryInfinityScroll';
import { useSearch } from 'hooks/useSearch';
import { GptStoryLists } from 'components/gpt/GptStoryLists';
import { useMakeTemplate } from 'queries/gpt';
import Bottom from 'components/layout/Bottom';

export default function GptPage() {
  const {
    searchTitle,
    searchAuthorName,
    setSearchTitle,
    setSearchAuthorName,
    category,
    setCategory,
    order,
    setOrder,
  } = useSearch();
  const { mutate, status } = useMakeTemplate();
  const handleCreateTemplate = () => {
    if (window.confirm('스토리를 만들겠습니까?')) {
      mutate();
    }
  };
  return (
    <>
      <GptLayout>
        <div>
          <GptStoryLists />
          <SearchBar
            setSearchTitle={setSearchTitle}
            setSearchAuthorName={setSearchAuthorName}
            order={order}
            setOrder={setOrder}
            backColorType="gray"
            setCategory={setCategory}
          />
          <CategorySelector selectedCategory={category} setSelectedCategory={setCategory} />
          <Button onClick={handleCreateTemplate} status={status}>
            스토리 만들기
          </Button>

          <GptStoryInfinityScroll
            order={order}
            searchTitle={searchTitle}
            searchAuthorName={searchAuthorName}
            category={category}
          />
        </div>
      </GptLayout>
      <Bottom />
    </>
  );
}
