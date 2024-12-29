export interface User {
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
  email: string;
  fullName: string;
  password: string;
  phone: string;
  status: string;
  preferences: string;
  notificationSettings: string | null;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserFormValues {
  id?: number;
  organization_id: number;
  email: string;
  full_name: string;
  password?: string;
  confirmation_password?: string;
  phone: string;
  status: string;
  preferences: string;
  notification_settings: string | null;
}
