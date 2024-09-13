import React, { Suspense } from 'react';
import Navigation from './components/layout/Navigation';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { PrivateRoutes } from 'pages';
import { ReviewPage, MyPage } from 'pages/user';
import { LoginPage, SignupPage } from 'pages/auth';
import { Loader } from 'components/shared';
import { styled } from 'styled-components';
import { useAuth } from 'hooks/useAuth';
import { LoaderScreen } from 'styles/LoaderWrapper';

const AdminManageBooks = React.lazy(() => import('../src/pages/admin/AdminManageBooks'));
const AdminCreateItem = React.lazy(() => import('../src/pages/admin/AdminCreateItem'));
const AdminEditItem = React.lazy(() => import('../src/pages/admin/AdminEditItem'));
const AdminMain = React.lazy(() => import('../src/pages/admin/AdminMain'));
const AdminDashboard = React.lazy(() => import('../src/pages/admin/AdminDashboard'));
const AdminManageUsers = React.lazy(() => import('../src/pages/admin/AdminManageUsers'));
const AdminManageReviews = React.lazy(() => import('../src/pages/admin/AdminManageReviews'));
const GptPage = React.lazy(() => import('../src/pages/user/GptPage'));
const GptPromptPage = React.lazy(() => import('../src/pages/user/GptPromptPage'));
const GptStoryDetail = React.lazy(() => import('../src/pages/user/GptStoryDetail'));
const GptUserPage = React.lazy(() => import('../src/pages/user/GptUserPage'));
function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <LoaderScreen>
        <Loader />
      </LoaderScreen>
    );
  }
  return (
    <AppWrapper>
      <Suspense
        fallback={
          <LoaderScreen>
            <Loader />
          </LoaderScreen>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route element={<Navigation />}>
              <Route path="/" element={<GptPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/gptpage" element={<GptPage />} />
              <Route path="/gptpage/prompt/:storyId" element={<GptPromptPage />} />
              <Route path="/gptpage/detail/:storyId" element={<GptStoryDetail />} />
              <Route path="/gptpage/user/:userId" element={<GptUserPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/mypage" element={<MyPage />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Route>

            <Route element={<PrivateRoutes />}>
              <Route path="/admin" element={<AdminMain />}>
                <Route path="" element={<AdminDashboard />} />
                <Route path="create" element={<AdminCreateItem />} />
                <Route path="books" element={<AdminManageBooks />} />
                <Route path="books/detail/:id" element={<AdminEditItem />} />
                <Route path="users" element={<AdminManageUsers />} />
                <Route path="reviews" element={<AdminManageReviews />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;
