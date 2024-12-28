export const ROUTES = {
    DASHBOARD: '/',
    ORGANIZATIONS: {
      LIST: '/organizations',
      CREATE: '/organizations/create',
      EDIT: (id: number | string) => `/organizations/edit/${id}`,
      VIEW: (id: number | string) => `/organizations/view/${id}`,
    },
    WORKSPACE: {
      LIST: '/workspaces',
      CREATE: '/workspaces/new',
      EDIT: (id: number | string) => `/workspaces/edit/${id}`,
      VIEW: (id: number | string) => `/workspaces/view/${id}`,
    },
  };
  