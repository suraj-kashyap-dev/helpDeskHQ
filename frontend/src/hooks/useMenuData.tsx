import { Home, Building2, Ticket, Users, Headphones, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const useMenuData = () => {
  const { t } = useTranslation();

  const mainMenus = [
    {
      icon: <Ticket className="h-5 w-5" />,
      label: t('Tickets'),
      subMenus: [
        { label: t('All Tickets'), path: '/tickets/all', icon: <Home className="h-4 w-4" /> },
        { label: t('My Tickets'), path: '/tickets/my', icon: <Users className="h-4 w-4" /> },
        { label: t('Unassigned'), path: '/tickets/unassigned', icon: <Users className="h-4 w-4" /> }
      ]
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      label: t('Organizations'),
      path: '/organizations',
    },
    {
      icon: <Headphones className="h-5 w-5" />,
      label: t('Support'),
      subMenus: [
        { label: t('Knowledge Base'), path: '/support/kb' },
        { label: t('FAQ'), path: '/support/faq' }
      ]
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: t('Settings'),
      path: '/settings'
    }
  ];

  return { mainMenus };
};
