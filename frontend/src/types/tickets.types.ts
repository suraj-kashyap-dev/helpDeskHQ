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
  project_id?: number;
  reporter_id?: number;
  assignee_id?: number;
  title: string;
  description: string;
  type: 'BUG' | 'FEATURE' | 'TASK';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  estimated_hours: number;
  custom_fields: string;
  parent_ticket: Ticket | null;
  position: number;
  due_date: string | null;
  resolved_at: string | null;
}
