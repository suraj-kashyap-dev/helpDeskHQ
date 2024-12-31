import React, { useState } from 'react';
import {
  Search, Star, ChevronLeft, Pin, Forward, Paperclip,
  Clock, User, Settings, MoreVertical, Reply,
  MessageSquare,
  BarChart2
} from 'lucide-react';

const TicketView = () => {
  const [activeTab, setActiveTab] = useState('all-threads');
  
  const ticketData = {
    id: "TICKET #2",
    title: "Query for Opensource Uvdesk Project",
    customer: {
      name: "Customer Test",
      email: "cust.test27@gmail.com"
    },
    status: "Open",
    priority: "Low",
    type: "Customization",
    agent: "Not Assigned",
    replies: 3,
    timestamp: "29-09-2022 12:31pm"
  };

  const messages = [
    {
      id: 1,
      author: "Customer Test",
      content: "Hello, We are looking for opensource Helpdesk System.",
      timestamp: "29-09-2022 12:31pm",
      type: "created",
      isCustomer: true
    },
    {
      id: 3,
      author: "Admin John",
      content: "Admin Test Reply",
      timestamp: "29-09-2022 12:32pm",
      type: "replied",
      isCustomer: false
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}

      {/* Ticket Info */}
      <div className="w-72 bg-white border-r">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <button className="hover:bg-gray-100 p-1.5 rounded-lg">
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
            <h2 className="font-medium">{ticketData.id}</h2>
          </div>
        </div>
        
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">{ticketData.customer.name}</div>
                <div className="text-sm text-gray-500">{ticketData.customer.email}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "Total Replies", value: ticketData.replies },
              { label: "TimeStamp", value: ticketData.timestamp },
              { label: "Channel", value: "Email" },
              { label: "Agent", value: ticketData.agent },
              { label: "Priority", value: ticketData.priority },
              { label: "Status", value: ticketData.status },
              { label: "Type", value: ticketData.type }
            ].map(item => (
              <div key={item.label}>
                <div className="text-sm font-medium text-gray-500">{item.label}</div>
                <div className="text-sm">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-lg font-medium">{ticketData.title}</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Star className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Pin className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Forward className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="px-6 border-t">
            <div className="flex -mb-px">
              {['All Threads', 'Replies', 'Forwards', 'Notes', 'Pinned'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                  className={`px-4 py-2 border-b-2 text-sm ${
                    activeTab === tab.toLowerCase().replace(' ', '-')
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(message => (
            <div key={message.id} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.isCustomer ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <User className={`w-5 h-5 ${
                    message.isCustomer ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium">{message.author}</span>
                  <span className="text-sm text-gray-500">
                    {message.timestamp} - {message.type} Ticket
                  </span>
                </div>
                <div className="text-gray-700">{message.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-t p-4">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
              Saved Replies
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
              Prepared Responses
            </button>
            <div className="ml-auto flex gap-2">
              <button className="px-4 py-2 border hover:bg-gray-50 rounded-lg text-sm">
                Previous Ticket
              </button>
              <button className="px-4 py-2 border hover:bg-gray-50 rounded-lg text-sm">
                Next Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketView;