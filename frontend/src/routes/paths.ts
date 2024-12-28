import { ORGANIZATIONS, PROJECTS, WORKSPACES } from '../config/constant';

export const ROUTES = {
  DASHBOARD: '/',
  ORGANIZATIONS: {
    LIST: `/${ORGANIZATIONS}`,
    NEW: `/${ORGANIZATIONS}/new`,
    EDIT: (id: number | string) => `/${ORGANIZATIONS}/edit/${id}`,
    VIEW: (id: number | string) => `/${ORGANIZATIONS}/view/${id}`,
  },
  WORKSPACE: {
    LIST: `/${WORKSPACES}`,
    NEW: `/${WORKSPACES}/new`,
    EDIT: (id: number | string) => `/${WORKSPACES}/edit/${id}`,
    VIEW: (id: number | string) => `/${WORKSPACES}/view/${id}`,
  },

  PROJECTS: {
    LIST: `/${PROJECTS}`,
    NEW: `/${PROJECTS}/new`,
    EDIT: (id: number | string) => `/${PROJECTS}/edit/${id}`,
    VIEW: (id: number | string) => `/${PROJECTS}/view/${id}`,
  },
};
