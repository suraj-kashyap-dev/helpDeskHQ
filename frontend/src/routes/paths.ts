export const ROUTES = {
    DASHBOARD: '/',
    ORGANIZATIONS: {
      LIST: '/organizations',
      NEW: '/organizations/new',
      EDIT: (id: number | string) => `/organizations/edit/${id}`,
      VIEW: (id: number | string) => `/organizations/view/${id}`,
    },
    WORKSPACE: {
      LIST: '/workspaces',
      NEW: '/workspaces/new',
      EDIT: (id: number | string) => `/workspaces/edit/${id}`,
      VIEW: (id: number | string) => `/workspaces/view/${id}`,
    },
  };
  