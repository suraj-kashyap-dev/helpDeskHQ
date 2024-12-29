import { Project } from './projects.types';
import { User } from './user.types';

export interface Ticket {
  id: number;
  project: Project;
  reporter: User;
  assignee: User;
  title: string;
  description: string;
  type: 'BUG' | 'FEATURE' | 'TASK';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  estimatedHours: number;
  customFields: string;
  parentTicket: Ticket | null;
  position: number;
  dueDate: string | null;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TicketFormValues {
  project: Project;
  reporter: User;
  assignee: User;
  title: string;
  description: string;
  type: 'BUG' | 'FEATURE' | 'TASK';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  estimatedHours: number;
  customFields: string;
  parentTicket: Ticket | null;
  position: number;
  dueDate: string | null;
  resolvedAt: string | null;
}
