import { MenuItem } from '../types/menu.types';
import {
  Ticket,
  FolderDot,
  LayoutDashboard,
  Building2,
  Users,
  BarChart,
  Settings,
} from 'lucide-react';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
  },
  {
    id: 'organizations',
    label: 'Organizations',
    path: '/organizations',
    icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
  },
  {
    id: 'tickets',
    label: 'Tickets',
    path: '/tickets',
    icon: <Ticket className="w-5 h-5 mr-3" />,
    subMenus: [
      { id: 'all-tickets', label: 'All Tickets', path: '/tickets/all' },
      { id: 'open-tickets', label: 'Open Tickets', path: '/tickets/open' },
      {
        id: 'closed-tickets',
        label: 'Closed Tickets',
        path: '/tickets/closed',
      },
      {
        id: 'urgent-tickets',
        label: 'Urgent Tickets',
        path: '/tickets/urgent',
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    icon: <FolderDot className="w-5 h-5 mr-3" />,
    subMenus: [
      {
        id: 'active-projects',
        label: 'Active Projects',
        path: '/projects/active',
      },
      {
        id: 'completed-projects',
        label: 'Completed',
        path: '/projects/completed',
      },
      {
        id: 'archived-projects',
        label: 'Archived',
        path: '/projects/archived',
      },
    ],
  },
  {
    id: 'team',
    label: 'Team Members',
    path: '/team',
    icon: <Users className="w-5 h-5 mr-3" />,
    subMenus: [
      { id: 'team-list', label: 'Team List', path: '/team/list' },
      { id: 'team-schedule', label: 'Schedule', path: '/team/schedule' },
      {
        id: 'team-performance',
        label: 'Performance',
        path: '/team/performance',
      },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    path: '/reports',
    icon: <BarChart className="w-5 h-5 mr-3" />,
    subMenus: [
      { id: 'daily-reports', label: 'Daily Reports', path: '/reports/daily' },
      {
        id: 'weekly-reports',
        label: 'Weekly Reports',
        path: '/reports/weekly',
      },
      {
        id: 'monthly-reports',
        label: 'Monthly Reports',
        path: '/reports/monthly',
      },
      {
        id: 'custom-reports',
        label: 'Custom Reports',
        path: '/reports/custom',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: <Settings className="w-5 h-5 mr-3" />,
  },
];
