import { MenuItem } from '../types/menu.types';
import {
  Ticket,
  FolderDot,
  LayoutDashboard,
  Building2,
  BarChart,
  Settings,
  Briefcase,
  BookOpen,
  Users,
  Shield,
  Workflow,
  Cog,
  MessageSquare,
  UserCog,
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
    icon: <Building2 className="w-5 h-5 mr-3" />,
  },
  {
    id: 'workspaces',
    label: 'Workspaces',
    path: '/workspaces',
    icon: <Briefcase className="w-5 h-5 mr-3" />,
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
        id: 'in-active-projects',
        label: 'Inactive Projects',
        path: '/projects/inactive',
      },
      {
        id: 'completed-projects',
        label: 'Completed Projects',
        path: '/projects/completed',
      },
    ],
  },
  {
    id: 'tickets',
    label: 'Tickets',
    path: '/tickets',
    icon: <Ticket className="w-5 h-5 mr-3" />,
    subMenus: [
      { id: 'all-tickets', label: 'All Tickets', path: '/tickets' },
      { id: 'my-tickets', label: 'My Tickets', path: '/tickets/my' },
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
      { id: 'unassigned', label: 'Unassigned', path: '/tickets/unassigned' },
      { id: 'watching', label: 'Watching', path: '/tickets/watching' },
    ],
  },
  {
    id: 'users',
    label: 'Users & Teams',
    path: '/users',
    icon: <UserCog className="w-5 h-5 mr-3" />,
    subMenus: [
      // Internal Users
      { id: 'all-users', label: 'Users', path: '/users' },
      { id: 'teams', label: 'Teams', path: '/teams' },
      { id: 'user-roles', label: 'User Roles', path: '/users/roles' },
      {
        id: 'user-permissions',
        label: 'Permissions',
        path: '/users/permissions',
      },
      // Teams
      {
        id: 'team-members',
        label: 'Team Members',
        path: '/users/team-members',
      },
      { id: 'skills-matrix', label: 'Skills Matrix', path: '/users/skills' },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    path: '/customers',
    icon: <Users className="w-5 h-5 mr-3" />,
    subMenus: [
      { id: 'customer-list', label: 'All Customers', path: '/customers' },
      { id: 'companies', label: 'Companies', path: '/customers/companies' },
      { id: 'contacts', label: 'Contacts', path: '/customers/contacts' },
      { id: 'contracts', label: 'Contracts', path: '/customers/contracts' },
    ],
  },
  {
    id: 'knowledge-base',
    label: 'Knowledge Base',
    path: '/knowledge-base',
    icon: <BookOpen className="w-5 h-5 mr-3" />,
    subMenus: [
      { id: 'articles', label: 'Articles', path: '/knowledge-base/articles' },
      {
        id: 'categories',
        label: 'Categories',
        path: '/knowledge-base/categories',
      },
      { id: 'drafts', label: 'Drafts', path: '/knowledge-base/drafts' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    path: '/reports',
    icon: <BarChart className="w-5 h-5 mr-3" />,
    subMenus: [
      {
        id: 'ticket-stats',
        label: 'Ticket Analytics',
        path: '/reports/tickets',
      },
      {
        id: 'team-performance',
        label: 'Team Performance',
        path: '/reports/team',
      },
      { id: 'sla-compliance', label: 'SLA Compliance', path: '/reports/sla' },
      {
        id: 'customer-metrics',
        label: 'Customer Metrics',
        path: '/reports/customers',
      },
      {
        id: 'custom-reports',
        label: 'Custom Reports',
        path: '/reports/custom',
      },
    ],
  },
  {
    id: 'admin',
    label: 'Administration',
    path: '/admin',
    icon: <Cog className="w-5 h-5 mr-3" />,
    subMenus: [
      {
        id: 'security',
        label: 'Security',
        path: '/admin/security',
        icon: <Shield className="w-4 h-4 mr-2" />,
        subMenus: [
          {
            id: 'users',
            label: 'User Management',
            path: '/admin/security/users',
          },
          {
            id: 'roles',
            label: 'Role Management',
            path: '/admin/security/roles',
          },
          { id: 'audit', label: 'Audit Logs', path: '/admin/security/audit' },
        ],
      },
      {
        id: 'workflow',
        label: 'Workflow',
        path: '/admin/workflow',
        icon: <Workflow className="w-4 h-4 mr-2" />,
        subMenus: [
          {
            id: 'automations',
            label: 'Automations',
            path: '/admin/workflow/automations',
          },
          { id: 'sla', label: 'SLA Policies', path: '/admin/workflow/sla' },
          {
            id: 'business-hours',
            label: 'Business Hours',
            path: '/admin/workflow/hours',
          },
        ],
      },
      {
        id: 'integrations',
        label: 'Integrations',
        path: '/admin/integrations',
        icon: <MessageSquare className="w-4 h-4 mr-2" />,
        subMenus: [
          {
            id: 'email',
            label: 'Email Settings',
            path: '/admin/integrations/email',
          },
          {
            id: 'api',
            label: 'API Management',
            path: '/admin/integrations/api',
          },
          {
            id: 'webhooks',
            label: 'Webhooks',
            path: '/admin/integrations/webhooks',
          },
        ],
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: <Settings className="w-5 h-5 mr-3" />,
    subMenus: [
      { id: 'profile', label: 'My Profile', path: '/settings/profile' },
      {
        id: 'preferences',
        label: 'Preferences',
        path: '/settings/preferences',
      },
      {
        id: 'notifications',
        label: 'Notifications',
        path: '/settings/notifications',
      },
      {
        id: 'custom-fields',
        label: 'Custom Fields',
        path: '/settings/custom-fields',
      },
      { id: 'tags', label: 'Tags', path: '/settings/tags' },
      { id: 'templates', label: 'Templates', path: '/settings/templates' },
    ],
  },
];
