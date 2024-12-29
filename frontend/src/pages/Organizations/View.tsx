import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOrganizationApi } from '../../hooks/useOrganization';
import { Button } from '../../components/ui/form-controls/Button';
import Loading from '../../components/Loading';
import { Globe, Settings as SettingsIcon, Building2, Rss } from 'lucide-react';
import InfoListItem from '../../components/ui/InfolistItem';
import { ROUTES } from '../../routes/paths';
import Card from '../../components/ui/Card';

const View: React.FC = () => {
  const { id } = useParams();
  const { showOrganization, organization, loading } = useOrganizationApi();

  useEffect(() => {
    const organizationId = parseInt(id || '', 10);
    if (organizationId) {
      showOrganization(organizationId);
    }
  }, [id]); // Ensure `showOrganization` is not part of the dependency array

  if (loading || !organization) {
    return <Loading />;
  }

  const formattedSettings = organization.settings
    ? JSON.stringify(organization.settings, null, 2)
    : '';

  const subscriptionLabel =
    {
      FREE: 'Free Plan',
      STANDARD: 'Standard Plan',
      PREMIUM: 'Premium Plan',
    }[organization.subscriptionType] || 'Unknown Plan';

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Organization Details
        </h2>

        <div className="flex gap-2">
          <Link
            to="/organizations"
            className="px-4 py-2 text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-200"
          >
            Back to List
          </Link>

          <Link to={ROUTES.ORGANIZATIONS.EDIT(organization.id)}>
            <Button
              type="button"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              Edit Organization
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-2 flex-col">
        <Card title="General Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoListItem
              icon={<Building2 className="h-5 w-5 text-gray-600" />}
              label="Organization Name"
              value={organization.name}
            />
            <InfoListItem
              icon={<Globe className="h-5 w-5 text-gray-600" />}
              label="Domain"
              value={organization.domain}
            />
            <InfoListItem
              icon={<Rss className="h-5 w-5 text-gray-600" />}
              label="Subscription Type"
              value={subscriptionLabel}
            />
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default View;
