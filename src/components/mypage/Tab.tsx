import ReviewLike from './ReviewLike';
import GptMyStory from './GptMyStory';
import GptStoryLike from './GptStoryLike';
import { UserType } from 'types/userTypes';
import { useState } from 'react';
import styled from 'styled-components';
import MyReview from './MyReview';
type TabType = 'myStory' | 'likeStory' | 'likeBook' | 'myReview';
type TabProps = {
  user: UserType | null;
  userId: string;
};
const tabs = [
  { key: 'myStory', label: '나의 스토리' },
  { key: 'likeStory', label: '좋아한 스토리' },
  { key: 'likeBook', label: '좋아한 책' },
  { key: 'myReview', label: '내 리뷰' },
];

const Tab = ({ user, userId }: TabProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('myStory');

  const renderContent = () => {
    switch (activeTab) {
      case 'myStory':
        return <GptMyStory user={user} userId={userId} />;
      case 'likeStory':
        return <GptStoryLike userId={userId} />;
      case 'likeBook':
        return <ReviewLike />;
      case 'myReview':
        return <MyReview userId={userId} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <TabMenu>
        {tabs.map(({ key, label }) => (
          <TabBtn key={key} onClick={() => setActiveTab(key as TabType)} active={activeTab === key}>
            {label}
          </TabBtn>
        ))}
      </TabMenu>
      {renderContent()}
    </div>
  );
};

export default Tab;

const TabMenu = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TabBtn = styled.button<{ active: boolean }>`
  padding: 10px;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.active ? '#f2f2f2' : 'white')};
  cursor: pointer;
`;
