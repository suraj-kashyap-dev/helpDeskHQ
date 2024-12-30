import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Index';
import NotFound from './pages/Notfound';
import Profile from './pages/Profile';
import ConfirmModal from './components/alert/Confirm';
import Dashboard from './pages/Dashboard';

// Organizations
import OrganizationList from './pages/Organizations/List';
import OrganizationCreate from './pages/Organizations/Create';
import OrganizationEdit from './pages/Organizations/Edit';
import OrganizationView from './pages/Organizations/View';

// Workspaces
import WorkspaceList from './pages/Workspaces/List';
import WorkspaceCreate from './pages/Workspaces/Create';
import WorkspaceEdit from './pages/Workspaces/Edit';
import WorkspaceView from './pages/Workspaces/View';

// Projects
import ProjectList from './pages/Projects/List';
import ProjectView from './pages/Projects/View';
import ProjectCreate from './pages/Projects/Create';
import ProjectEdit from './pages/Projects/Edit';

// Users
import UserList from './pages/Users/List';
import UserCreate from './pages/Users/Create';
import UserEdit from './pages/Users/Edit';
import UserView from './pages/Users/View';

// Teams
import TeamList from './pages/Teams/List';
import TeamCreate from './pages/Teams/Create';
import TeamEdit from './pages/Teams/Edit';
import TeamView from './pages/Teams/View';

// Tickets
import TicketList from './pages/Tickets/List';
import TicketCreate from './pages/Tickets/Create';
import TicketEdit from './pages/Tickets/Edit';
import TicketView from './pages/Tickets/View';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <ConfirmModal />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="/organizations" element={<OrganizationList />} />
            <Route path="/organizations/new" element={<OrganizationCreate />} />
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
    </React.Fragment>
  );
};

export default App;
