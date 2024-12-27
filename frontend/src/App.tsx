import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './components/layout/Index';
import NotFound from './pages/Notfound';
import Loading from './components/Loading';
import Profile from './pages/Profile';
import ConfirmModal from './components/alert/Confirm';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const OrganizationIndex = lazy(() => import('./pages/organization/Index'));
const OrganizationCreate = lazy(() => import('./pages/organization/Create'));

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <ConfirmModal />
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/dashboard/" element={<Dashboard />} />
              <Route
                path="/organizations"
                element={<OrganizationIndex />}
              />
              <Route
                path="/organizations/create"
                element={<OrganizationCreate />}
              />
              <Route path="/dashboard/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </React.Fragment>
  );
};

export default App;
