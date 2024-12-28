// Type for the workspace data as retrieved from the API response
export interface Workspace {
  id: number;
  organization: {
    id: number;
    name: string;
    domain: string;
    subscriptionType: string;
    settings: string;
    createdAt: string;
    updatedAt: string;
  };
  name: string;
  description: string;
  settings: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceFormValues {
  organization_id: number;
  name: string;
  description: string;
  settings: string;
}
