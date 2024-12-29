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
  FolderDot,
  ChartBarBig,
  Calendar,
  Calendar1,
} from 'lucide-react';
import InfoListItem from '../../components/ui/InfolistItem';
import { ROUTES } from '../../routes/paths';
import Card from '../../components/ui/Card';
import { useProjectApi } from '../../hooks/useProjectApi';
import formatDate from '../../utils/dateFormat';

const View: React.FC = () => {
  const { id } = useParams();
  const { show, project, loading } = useProjectApi();

  useEffect(() => {
    const projectId = parseInt(id || '', 10);
    if (projectId) {
      show(projectId);
    }
  }, [id]);

  if (loading || !project) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Project Details</h2>

        <div className="flex gap-2">
          <Link
            to={ROUTES.PROJECTS.LIST}
            className="px-4 py-2 text-gray-800 rounded-lg transition-colors flex items-center"
          >
            Back to List
          </Link>

          <Link to={ROUTES.PROJECTS.EDIT(project.id)}>
            <Button
              type="button"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              Edit Project
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-2 flex-col">
        <Card title="General Information">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <InfoListItem
              icon={<FolderDot className="h-5 w-5 text-gray-600" />}
              label="Project Name"
              value={project.name}
            />
            <InfoListItem
              icon={<Calendar className="h-5 w-5 text-gray-600" />}
              label="Start Date"
              value={formatDate(project.startDate, 'yyyy-MM-dd HH:mm')}
            />
            <InfoListItem
              icon={<Calendar className="h-5 w-5 text-gray-600" />}
              label="End Date"
              value={formatDate(project.endDate, 'yyyy-MM-dd HH:mm')}
            />
            <InfoListItem
              icon={<ChartBarBig className="h-5 w-5 text-gray-600" />}
              label="Status"
              value={project.status}
            />
            <InfoListItem
              icon={<Scroll className="h-5 w-5 text-gray-600" />}
              label="Description"
              value={project.description}
            />
          </div>
        </Card>

        {project?.workspace && (
          <Card title="Workspace Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoListItem
                icon={<Briefcase className="h-5 w-5 text-gray-600" />}
                label="Workspace Name"
                value={project.workspace.name}
              />
              <InfoListItem
                icon={<Scroll className="h-5 w-5 text-gray-600" />}
                label="Description"
                value={project.workspace.description}
              />
            </div>
          </Card>
        )}

        {project?.workspace?.organization && (
          <Card title="Organization Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoListItem
                icon={<Building2 className="h-5 w-5 text-gray-600" />}
                label="Organization Name"
                value={project.workspace.organization.name}
              />
              <InfoListItem
                icon={<Globe className="h-5 w-5 text-gray-600" />}
                label="Domain"
                value={project.workspace.organization.domain}
              />
              <InfoListItem
                icon={<Rss className="h-5 w-5 text-gray-600" />}
                label="Subscription Type"
                value={project.workspace.organization.subscriptionType}
              />
            </div>
          </Card>
        )}
      </div>
    </React.Fragment>
  );
};

export default View;
