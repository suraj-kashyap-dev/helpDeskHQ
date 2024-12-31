import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load components
const Layout = lazy(() => import('./components/layout/Index'));
const NotFound = lazy(() => import('./pages/Notfound'));
const Profile = lazy(() => import('./pages/Profile'));
const ConfirmModal = lazy(() => import('./components/alert/Confirm'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Organizations
const OrganizationList = lazy(() => import('./pages/Organizations/List'));
const OrganizationCreate = lazy(() => import('./pages/Organizations/Create'));
const OrganizationEdit = lazy(() => import('./pages/Organizations/Edit'));
const OrganizationView = lazy(() => import('./pages/Organizations/View'));

// Workspaces
const WorkspaceList = lazy(() => import('./pages/Workspaces/List'));
const WorkspaceCreate = lazy(() => import('./pages/Workspaces/Create'));
const WorkspaceEdit = lazy(() => import('./pages/Workspaces/Edit'));
const WorkspaceView = lazy(() => import('./pages/Workspaces/View'));

// Projects
const ProjectList = lazy(() => import('./pages/Projects/List'));
const ProjectView = lazy(() => import('./pages/Projects/View'));
const ProjectCreate = lazy(() => import('./pages/Projects/Create'));
const ProjectEdit = lazy(() => import('./pages/Projects/Edit'));

// Users
const UserList = lazy(() => import('./pages/Users/List'));
const UserCreate = lazy(() => import('./pages/Users/Create'));
const UserEdit = lazy(() => import('./pages/Users/Edit'));
const UserView = lazy(() => import('./pages/Users/View'));

// Teams
const TeamList = lazy(() => import('./pages/Teams/List'));
const TeamCreate = lazy(() => import('./pages/Teams/Create'));
const TeamEdit = lazy(() => import('./pages/Teams/Edit'));
const TeamView = lazy(() => import('./pages/Teams/View'));

// Tickets
const TicketList = lazy(() => import('./pages/Tickets/List'));
const TicketCreate = lazy(() => import('./pages/Tickets/Create'));
const TicketEdit = lazy(() => import('./pages/Tickets/Edit'));
const TicketView = lazy(() => import('./pages/Tickets/View'));

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <Suspense fallback={<div className="text-center mt-10"></div>}>
        <Router>
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

              <Route path="/users" element={<UserList />} />
              <Route path="/users/new" element={<UserCreate />} />
              <Route path="/users/edit/:id" element={<UserEdit />} />
              <Route path="/users/view/:id" element={<UserView />} />

              <Route path="/users/teams" element={<TeamList />} />
              <Route path="/users/teams/new" element={<TeamCreate />} />
              <Route path="/users/teams/edit/:id" element={<TeamEdit />} />
              <Route path="/users/teams/view/:id" element={<TeamView />} />

              <Route path="/workspaces" element={<WorkspaceList />} />
              <Route path="/workspaces/new" element={<WorkspaceCreate />} />
              <Route path="/workspaces/edit/:id" element={<WorkspaceEdit />} />
              <Route path="/workspaces/view/:id" element={<WorkspaceView />} />

              <Route path="/tickets/:type" element={<TicketList />} />
              <Route path="/tickets/new" element={<TicketCreate />} />
              <Route path="/tickets/view/:id" element={<TicketView />} />
              <Route path="/tickets/edit/:id" element={<TicketEdit />} />

              <Route path="/projects/:status" element={<ProjectList />} />
              <Route path="/projects/new" element={<ProjectCreate />} />
              <Route path="/projects/view/:id" element={<ProjectView />} />
              <Route path="/projects/edit/:id" element={<ProjectEdit />} />

              <Route path="/dashboard/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Suspense>
    </React.Fragment>
  );
};

export default App;
