import React, { Suspense } from 'react';
import Navigation from './components/layout/Navigation';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { PrivateRoutes } from 'pages';
import { UserPage, LoginPage, SignupPage, MyPage } from 'pages/user';

import { Loader } from 'components/shared';
import { styled } from 'styled-components';
import { useAuth } from 'hooks/useAuth';

const AdminManage = React.lazy(() => import('../src/pages/admin/AdminManage'));
const AdminCreateItem = React.lazy(() => import('../src/pages/admin/AdminCreateItem'));
const AdminEditItem = React.lazy(() => import('../src/pages/admin/AdminEditItem'));
const AdminMain = React.lazy(() => import('../src/pages/admin/AdminMain'));
const AdminDashboard = React.lazy(() => import('../src/pages/admin/AdminDashboard'));
const AdminManageUsers = React.lazy(() => import('../src/pages/admin/AdminManageUsers'));
const AdminManageReviews = React.lazy(() => import('../src/pages/admin/AdminManageReviews'));

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
  return (
    <AppWrapper>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route element={<Navigation />}>
              <Route path="/" element={<UserPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>

            <Route element={<PrivateRoutes />}>
              <Route path="/admin" element={<AdminMain />}>
                <Route path="" element={<AdminDashboard />} />
                <Route path="create" element={<AdminCreateItem />} />
                <Route path="books" element={<AdminManage />} />
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
