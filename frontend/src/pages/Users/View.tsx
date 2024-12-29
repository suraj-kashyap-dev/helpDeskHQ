import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/form-controls/Button';
import Loading from '../../components/Loading';
import {
  Globe,
  Building2,
  Rss,
  Briefcase,
  Scroll,
  Shield,
  User,
  IdCard,
  Mail,
} from 'lucide-react';
import InfoListItem from '../../components/ui/InfolistItem';
import { useUserApi } from '../../hooks/useUserApi';
import { ROUTES } from '../../routes/paths';
import Card from '../../components/ui/Card';

const View: React.FC = () => {
  const { id } = useParams();
  const { show, user, loading } = useUserApi();

  useEffect(() => {
    const userId = parseInt(id || '', 10);
    if (userId) {
      show(userId);
    }
  }, [id]);

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">User Details</h2>

        <div className="flex gap-2">
          <Link
            to="/users"
            className="px-4 py-2 text-gray-800 rounded-lg transition-colors flex items-center"
          >
            Back to List
          </Link>

          <Link to={ROUTES.USER.EDIT(user.id)}>
            <Button
              type="button"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              Edit User
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-2 flex-col">
        <Card title="General Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoListItem
              icon={<User className="h-5 w-5 text-gray-600" />}
              label="User Name"
              value={user.fullName}
            />
            <InfoListItem
              icon={<Shield className="h-5 w-5 text-gray-600" />}
              label="Status"
              value={user.status}
            />
            <InfoListItem
              icon={<Mail className="h-5 w-5 text-gray-600" />}
              label="Email"
              value={user.email}
            />
            <InfoListItem
              icon={<Mail className="h-5 w-5 text-gray-600" />}
              label="Phone"
              value={user.phone}
            />
          </div>
        </Card>

        {user?.organization && (
          <Card title="Organization Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoListItem
                icon={<Building2 className="h-5 w-5 text-gray-600" />}
                label="Organization Name"
                value={user.organization.name}
              />
              <InfoListItem
                icon={<Globe className="h-5 w-5 text-gray-600" />}
                label="Domain"
                value={user.organization.domain}
              />
              <InfoListItem
                icon={<Rss className="h-5 w-5 text-gray-600" />}
                label="Subscription Type"
                value={user.organization.subscriptionType}
              />
            </div>
          </Card>
        )}
      </div>
    </React.Fragment>
  );
};

export default View;
