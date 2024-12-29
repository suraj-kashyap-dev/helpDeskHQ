import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Index';
import NotFound from './pages/Notfound';
import Loading from './components/Loading';
import Profile from './pages/Profile';
import ConfirmModal from './components/alert/Confirm';

const Dashboard = lazy(() => import('./pages/Dashboard'));

// Oraganization
const OrganizationList = lazy(() => import('./pages/Organizations/List'));
const OrganizationCreate = lazy(() => import('./pages/Organizations/Create'));
const OrganizationEdit = lazy(() => import('./pages/Organizations/Edit'));
const OrganizationView = lazy(() => import('./pages/Organizations/View'));

// Workspace
const WorkspaceList = lazy(() => import('./pages/Workspaces/List'));
const WorkspaceCreate = lazy(() => import('./pages/Workspaces/Create'));
const WorkspaceEdit = lazy(() => import('./pages/Workspaces/Edit'));
const WorkspaceView = lazy(() => import('./pages/Workspaces/View'));

// Project
const ProjectList = lazy(() => import('./pages/Projects/List'));
const ProjectView = lazy(() => import('./pages/Projects/View'));
const ProjectCreate = lazy(() => import('./pages/Projects/Create'));
const ProjectEdit = lazy(() => import('./pages/Projects/Edit'));

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
              <Route path="/organizations" element={<OrganizationList />} />
              <Route
                path="/organizations/new"
                element={<OrganizationCreate />}
              />
              <Route
                path="/organizations/edit/:id"
                element={<OrganizationEdit />}
              />
              <Route
                path="/organizations/view/:id"
                element={<OrganizationView />}
              />

              <Route path="/workspaces" element={<WorkspaceList />} />
              <Route path="/workspaces/new" element={<WorkspaceCreate />} />
              <Route path="/workspaces/edit/:id" element={<WorkspaceEdit />} />
              <Route path="/workspaces/view/:id" element={<WorkspaceView />} />

              <Route path="/projects/:status" element={<ProjectList />} />
              <Route path="/projects/new" element={<ProjectCreate />} />
              <Route path="/projects/view/:id" element={<ProjectView />} />
              <Route path="/projects/view/edit/:id" element={<ProjectEdit />} />
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
