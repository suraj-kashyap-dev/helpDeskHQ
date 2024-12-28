export interface Project {
  id: number;
  workspace: {
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
    settings: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  };
  name: string;
  description: string;
  status: string;
  settings: any | null;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormValues {
  id?: number;
  workspaceId: number;
  name: string;
  description: string;
  status: string;
  settings?: string;
  startDate: string;
  endDate: string;
}
