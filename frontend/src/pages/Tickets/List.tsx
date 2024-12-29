import React, { useEffect } from 'react';
import {
  Activity,
  AlertCircle,
  Calendar,
  ChartBar,
  Clock,
  Edit,
  Eye,
  FolderDot,
  Hash,
  MessageSquare,
  Tag,
  Ticket,
  Trash2,
  UserCheck,
  UserCog,
} from 'lucide-react';
import { Button } from '../../components/ui/form-controls/Button';
import { confirmDialog } from '../../utils/eventBus';
import { Input } from '../../components/ui/form-controls/Input';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';
import { useTicketApi } from '../../hooks/useTickets';

const Index: React.FC = () => {
  const { tickets, fetch, destroy } = useTicketApi();

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = (id: number) => {
    confirmDialog({
      title: 'Delete Ticket',
      description: 'Are you sure you want to delete this ticket?',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm: () => destroy(id),
    });
  };

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Tickets</h2>

        <Link
          to={ROUTES.TICKETS.NEW}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
        >
          <div className="flex gap-2">
            <span>Add Ticket</span>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-lg border overflow-x-auto border-gray-200 shadow-sm">
        <div className="px-6 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="">
              <Input
                type="text"
                placeholder="Search ticket"
                className="w-[360px] px-4 py-2"
              />
            </div>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ticket Details
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reporter / Assignee
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Project
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {tickets && tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className={`hover:bg-gray-100 ${
                    ticket.id % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="px-6 py-4 w-full">
                    <div className="flex justify-between">
                      <div className="space-y-3">
                        {/* Ticket Header */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Hash className="h-4 w-4" />
                            {ticket.id}
                          </span>
                          <h3 className="text-base font-medium text-gray-900 flex items-center gap-1">
                            <Ticket className="h-4 w-4" />
                            {ticket.title}
                          </h3>
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
                        </div>

                        <p className="text-sm text-gray-600 max-w-2xl flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          {ticket.description || '-'}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            Type: {ticket.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Activity className="h-4 w-4" />
                            Impact: {ticket.impact}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Est. Hours: {ticket.estimatedHours}
                          </span>
                          <span className="flex items-center gap-1">
                            <ChartBar className="h-4 w-4" />
                            Status: {ticket.status}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due: {ticket.dueDate ?? '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-col">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <UserCheck className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {ticket.reporter.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {ticket.reporter.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 ml-11">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            Reported
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <UserCog className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {ticket.assignee.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {ticket.assignee.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-3">
                      <div className="flex justify-center items-start gap-2">
                        <div className="flex items-center gap-2">
                          <FolderDot className="h-4 w-4 text-gray-600" />
                          <h4 className="text-sm font-medium text-gray-900">
                            {ticket.project.name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <div className="flex justify-center items-center gap-3">
                      <Link
                        to={ROUTES.TICKETS.VIEW(ticket.id)}
                        className="text-gray-800 focus:ring-0 focus:ring-offset-0"
                      >
                        <div className="flex justify-center gap-2 items-center">
                          <Eye className="h-4 w-4" />
                          <span className="font-medium">View</span>
                        </div>
                      </Link>
                      <Link
                        to={ROUTES.TICKETS.EDIT(ticket.id)}
                        className="text-blue-700 focus:ring-0 focus:ring-offset-0"
                      >
                        <div className="flex justify-center gap-2 items-center">
                          <Edit className="h-4 w-4" />
                          <span className="font-medium">Edit</span>
                        </div>
                      </Link>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 !p-0"
                        leftIcon={<Trash2 className="h-4 w-4" />}
                        onClick={() => handleDelete(ticket.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-sm text-center text-gray-500"
                >
                  No organizations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Index;
