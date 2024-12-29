import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import {
  AlertCircle,
  Calendar,
  Clock,
  Hash,
  User,
  Info,
  Briefcase,
  Tag,
  Activity,
  Scroll,
  ChartBar,
  Phone,
  ExternalLink,
} from 'lucide-react';
import InfoListItem from '../../components/ui/InfolistItem';
import { useTicketApi } from '../../hooks/useTickets';
import { ROUTES } from '../../routes/paths';
import Card from '../../components/ui/Card';

const TicketView: React.FC = () => {
  const { id } = useParams();
  const { show, ticket, loading } = useTicketApi();

  useEffect(() => {
    const ticketId = parseInt(id || '', 10);
    if (ticketId) {
      show(ticketId);
    }
  }, [id]);

  if (loading || !ticket) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 min-h-screen">
      <div className="lg:w-1/4 space-y-6">
        <Card title="Ticket Overview">
          <div className="space-y-4">
            <InfoListItem
              icon={<Hash className="h-5 w-5" />}
              label="Ticket ID"
              value={
                <span className="font-mono text-gray-700">{ticket.id}</span>
              }
            />
            <InfoListItem
              icon={<AlertCircle className="h-5 w-5" />}
              label="Priority"
              value={
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            ticket.priority.toLowerCase() === 'high'
                              ? 'bg-red-100 text-red-800'
                              : ticket.priority.toLowerCase() === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                          }`}
                >
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {ticket.priority}
                </span>
              }
            />
            <InfoListItem
              icon={<Clock className="h-5 w-5" />}
              label="Estimated Hours"
              value={
                <span className="font-semibold text-gray-700">
                  {ticket.estimatedHours}h
                </span>
              }
            />
            <InfoListItem
              icon={<Calendar className="h-5 w-5" />}
              label="Created At"
              value={
                <span className="text-gray-600">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
              }
            />
            <InfoListItem
              icon={<Calendar className="h-5 w-5" />}
              label="Updated At"
              value={
                <span className="text-gray-600">
                  {new Date(ticket.updatedAt).toLocaleDateString()}
                </span>
              }
            />
          </div>
        </Card>

        {ticket.project && (
          <Card title="Project Information">
            <div className="flex flex-col gap-6">
              <InfoListItem
                icon={<Briefcase className="h-5 w-5" />}
                label="Project Name"
                value={
                   <div className="flex items-center gap-2">
                   <span className="font-medium text-gray-900">
                     {ticket.project.name}
                   </span>

                   <Link to={ROUTES.PROJECTS.VIEW(ticket.project.id)}>
                     <ExternalLink className="h-4 w-4 text-blue-600 hover:text-blue-800" />
                   </Link>
                 </div>
                }
              />
              <InfoListItem
                icon={<Info className="h-5 w-5" />}
                label="Project Description"
                value={
                  <span className="text-gray-600">
                    {ticket.project.description}
                  </span>
                }
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
              to={ROUTES.TICKETS.LIST}
              className="px-4 py-2 text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-200"
            >
              Back to List
            </Link>

            <Link
              to={ROUTES.TICKETS.EDIT(ticket.id)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              <div className="flex gap-2">
                <span>Edit Ticket</span>
              </div>
            </Link>
          </div>
        </div>

        <Card title="General Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoListItem
              icon={<Briefcase className="h-5 w-5" />}
              label="Title"
              value={
                <span className="font-medium text-gray-900">
                  {ticket.title}
                </span>
              }
            />
            <InfoListItem
              icon={<Tag className="h-5 w-5" />}
              label="Type"
              value={
                <span className="capitalize text-gray-700">{ticket.type}</span>
              }
            />

            <InfoListItem
              icon={<Activity className="h-5 w-5" />}
              label="Impact"
              value={
                <span className="capitalize text-gray-700">
                  {ticket.impact}
                </span>
              }
            />
            <InfoListItem
              icon={<Clock className="h-5 w-5" />}
              label="Status"
              value={
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            ticket.status.toLowerCase() === 'high'
                              ? 'bg-red-100 text-red-800'
                              : ticket.status.toLowerCase() === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                          }`}
                >
                  {ticket.status}
                </span>
              }
            />
            <InfoListItem
              icon={<Scroll className="h-5 w-5" />}
              label="Description"
              value={
                <span className="capitalize text-gray-700">
                  {ticket.description}
                </span>
              }
            />
          </div>
        </Card>

        {ticket.reporter && (
          <Card title="Reporter Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoListItem
                icon={<User className="h-5 w-5" />}
                label="Reporter Name"
                value={
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {ticket.reporter.fullName}
                    </span>

                    <Link to={ROUTES.USER.VIEW(ticket.reporter.id)}>
                      <ExternalLink className="h-4 w-4 text-blue-600 hover:text-blue-800" />
                    </Link>
                  </div>
                }
              />
              <InfoListItem
                icon={<Info className="h-5 w-5" />}
                label="Reporter Email"
                value={
                  <a
                    href={`mailto:${ticket.reporter.email}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {ticket.reporter.email}
                  </a>
                }
              />
              <InfoListItem
                icon={<Phone className="h-5 w-5" />}
                label="Reporter Phone"
                value={
                  <span className="font-medium text-gray-900">
                    {ticket.reporter.phone}
                  </span>
                }
              />
              <InfoListItem
                icon={<ChartBar className="h-5 w-5" />}
                label="Reporter Status"
                value={
                  <span className="font-medium text-gray-900">
                    {ticket.reporter.status}
                  </span>
                }
              />
              <InfoListItem
                icon={<Clock className="h-5 w-5" />}
                label="Last Login"
                value={
                  <span className="text-gray-600">
                    {ticket.reporter.lastLogin
                      ? new Date(ticket.reporter.lastLogin).toLocaleString()
                      : 'Never logged in'}
                  </span>
                }
              />
            </div>
          </Card>
        )}

        {ticket.assignee && (
          <Card title="Assignee Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoListItem
                icon={<User className="h-5 w-5" />}
                label="Assignee Name"
                value={
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {ticket.assignee.fullName}
                    </span>

                    <Link to={ROUTES.USER.VIEW(ticket.assignee.id)}>
                      <ExternalLink className="h-4 w-4 text-blue-600 hover:text-blue-800" />
                    </Link>
                  </div>
                }
              />
              <InfoListItem
                icon={<Info className="h-5 w-5" />}
                label="Assignee Email"
                value={
                  <a
                    href={`mailto:${ticket.assignee.email}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {ticket.assignee.email}
                  </a>
                }
              />
              <InfoListItem
                icon={<Phone className="h-5 w-5" />}
                label="Assignee Phone"
                value={
                  <span className="font-medium text-gray-900">
                    {ticket.assignee.phone}
                  </span>
                }
              />
              <InfoListItem
                icon={<ChartBar className="h-5 w-5" />}
                label="Assignee Status"
                value={
                  <span className="font-medium text-gray-900">
                    {ticket.assignee.status}
                  </span>
                }
              />
              <InfoListItem
                icon={<Clock className="h-5 w-5" />}
                label="Last Login"
                value={
                  <span className="text-gray-600">
                    {ticket.assignee.lastLogin
                      ? new Date(ticket.assignee.lastLogin).toLocaleString()
                      : 'Never logged in'}
                  </span>
                }
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TicketView;
