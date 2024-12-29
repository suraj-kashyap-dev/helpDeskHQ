import {
  ORGANIZATIONS,
  PROJECTS,
  WORKSPACES,
  TEAMS,
  USERS,
  TICKETS,
} from '../config/constant';

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

  USER: {
    LIST: `/${USERS}`,
    NEW: `/${USERS}/new`,
    EDIT: (id: number | string) => `/${USERS}/edit/${id}`,
    VIEW: (id: number | string) => `/${USERS}/view/${id}`,
  },

  TEAM: {
    LIST: `/${USERS}/${TEAMS}`,
    NEW: `/${USERS}/${TEAMS}/new`,
    EDIT: (id: number | string) => `/${USERS}/${TEAMS}/edit/${id}`,
    VIEW: (id: number | string) => `/${USERS}/${TEAMS}/view/${id}`,
  },

  PROJECTS: {
    LIST: `/${PROJECTS}/active`,
    NEW: `/${PROJECTS}/new`,
    EDIT: (id: number | string) => `/${PROJECTS}/edit/${id}`,
    VIEW: (id: number | string) => `/${PROJECTS}/view/${id}`,
  },

  TICKETS: {
    LIST: `/${TICKETS}/all`,
    NEW: `/${TICKETS}/new`,
    EDIT: (id: number | string) => `/${TICKETS}/edit/${id}`,
    VIEW: (id: number | string) => `/${TICKETS}/view/${id}`,
  },
};
