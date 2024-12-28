export const ROUTES = {
    DASHBOARD: '/',
    ORGANIZATIONS: {
      LIST: '/organizations',
      CREATE: '/organizations/create',
      EDIT: (id: number | string) => `/organizations/edit/${id}`,
    },
    PROJECTS: {
      LIST: '/projects',
      CREATE: '/projects/create',
      EDIT: (id: number | string) => `/projects/edit/${id}`,
    },
  };
  