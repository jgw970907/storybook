import { GptLayout } from 'styles/gpt/gptLayout';
import { getGptStory } from 'api/gpt';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GptStory } from 'types/gptTypes';
import Header from 'components/gpt/GptDetailHeader';
import Body from 'components/gpt/GptDetailBody';
import * as S from 'styles/gpt/gptDetail';
import { Loader } from 'components/shared';
import Bottom from 'components/layout/Bottom';
import { UserType } from 'types/userTypes';

export default function GptDetail() {
  const [story, setStory] = useState<GptStory>();
  const [user, setuser] = useState<UserType>();
  const { storyId } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchStory = async () => {
      if (!storyId) return;
      try {
        setLoading(true);
        const res = await getGptStory(storyId);
        setuser(res.user);
        setStory(res);
      } catch (error) {
        alert('스토리를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [storyId]); // 의존성 배열에 storyId 추가

  return loading ? (
    <Loader />
  ) : (
    <>
      <GptLayout>
        <S.HeaderWrapper>
          <Header
            storyId={storyId}
            user={user}
            createdAt={story?.createdAt}
            updatedAt={story?.updatedAt}
            category={story?.category}
            clicks={story?.clicks}
            title={story?.title}
            isStorypage={true}
          />
          <S.HeaderImageWrapper>
            <S.HeaderImage
              src={story?.images[0]?.path || 'https://picsum.photos/200/150'}
              alt="story"
            />
          </S.HeaderImageWrapper>
        </S.HeaderWrapper>
        <Body content={story?.content} />
      </GptLayout>
      <Bottom />
    </>
  );
}
