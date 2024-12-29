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
    <div className="flex flex-col lg:flex-row gap-8 p-6 min-h-screen">
      <div className="lg:w-1/4 space-y-6">
        {project?.workspace && (
          <Card title="Workspace Details">
            <div className="flex flex-col gap-6">
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
            <div className="flex flex-col gap-6">
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
      <div className="lg:w-3/4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Ticket Details</h2>

          <div className="flex gap-3">
            <Link
              to={ROUTES.PROJECTS.LIST}
              className="px-4 py-2 text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-200"
            >
              Back to List
            </Link>

            <Link
              to={ROUTES.PROJECTS.EDIT(project.id)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              <div className="flex gap-2">
                <span>Add Project</span>
              </div>
            </Link>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default View;
