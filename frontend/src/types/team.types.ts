export interface Team {
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
  settings: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamFormValues {
  id?: number;
  workspace_id: number;
  name: string;
  description?: string;
  settings?: string;
}
