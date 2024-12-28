import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/form-controls/Button';
import Loading from '../../components/Loading';
import { Globe, Building2, Rss, Briefcase, Scroll } from 'lucide-react';
import InfoListItem from '../../components/ui/InfolistItem';
import { useWorkspaceApi } from '../../hooks/useWorkspace';
import { ROUTES } from '../../routes/paths';
import Card from '../../components/ui/Card';

const View: React.FC = () => {
  const { id } = useParams();
  const { show, workspace, loading } = useWorkspaceApi();

  useEffect(() => {
    const workspaceId = parseInt(id || '', 10);
    if (workspaceId) {
      show(workspaceId);
    }
  }, [id]);

  if (loading || !workspace) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Workspace Details
        </h2>

        <div className="flex gap-2">
          <Link
            to="/workspaces"
            className="px-4 py-2 text-gray-800 rounded-lg transition-colors flex items-center"
          >
            Back to List
          </Link>

          <Link to={ROUTES.WORKSPACE.EDIT(workspace.id)}>
            <Button
              type="button"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              Edit Workspace
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-2 flex-col">
        <Card title="General Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoListItem
              icon={<Briefcase className="h-5 w-5 text-gray-600" />}
              label="Workspace Name"
              value={workspace.name}
            />
            <InfoListItem
              icon={<Scroll className="h-5 w-5 text-gray-600" />}
              label="Description"
              value={workspace.description}
            />
          </div>
        </Card>

        {workspace?.organization && (
          <Card title="Organization Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoListItem
                icon={<Building2 className="h-5 w-5 text-gray-600" />}
                label="Organization Name"
                value={workspace.organization.name}
              />
              <InfoListItem
                icon={<Globe className="h-5 w-5 text-gray-600" />}
                label="Domain"
                value={workspace.organization.domain}
              />
              <InfoListItem
                icon={<Rss className="h-5 w-5 text-gray-600" />}
                label="Subscription Type"
                value={workspace.organization.subscriptionType}
              />
            </div>
          </Card>
        )}
      </div>
    </React.Fragment>
  );
};

export default View;
