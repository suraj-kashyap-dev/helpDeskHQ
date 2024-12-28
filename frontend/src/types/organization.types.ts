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
  subscription_type: 'FREE' | 'STANDARD' | 'PREMIUM';
  settings: string;
}
