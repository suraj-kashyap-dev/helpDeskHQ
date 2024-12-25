export interface Organization {
  id: number;
  name: string;
  domain: string;
  subscriptionType: string;
  settings: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationFormValues {
  name: string;
  domain: string;
  subscriptionType: 'Free' | 'Standard' | 'Premium';
  settings: string;
}
