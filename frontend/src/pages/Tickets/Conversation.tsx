import React, { useEffect, useState } from 'react';
import { 
  User, Send, Paperclip, MoreVertical, Clock, 
  Check, CheckCheck, Smile, MessageSquare,
  AlertCircle, ChevronRight, FileText, Image as ImageIcon,
  Link as LinkIcon, Edit, Reply
} from 'lucide-react';
import { useCommentApi } from '../../hooks/useCommentApi';
import { useParams } from 'react-router-dom';
import { use } from 'i18next';
import { Attachment } from '../../types/comment.types';

const TicketConversation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetch, comments } = useCommentApi();

  useEffect(() => {
    fetch();
  }, []);

  const renderStatusUpdate = (message: Message) => {
    if (!message.statusUpdate) return null;
    
    return (
      <div className="flex items-center justify-center my-4">
        <div className="bg-gray-50 rounded-full px-4 py-2 flex items-center gap-2 text-sm text-gray-600">
          {message.statusUpdate.type === 'status_change' && <AlertCircle className="w-4 h-4" />}
          {message.statusUpdate.type === 'assignment' && <User className="w-4 h-4" />}
          {message.statusUpdate.content}
          <span className="text-gray-400 text-xs">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  };

  const renderMessageStatus = (status?: 'sent' | 'delivered' | 'read') => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const renderAttachment = (attachment: Attachment) => {
    const isImage = attachment.type.startsWith('image/');
    
    return (
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mt-2 group hover:bg-gray-100 transition-colors">
        <div className="flex-shrink-0">
          {isImage ? (
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img 
                src={attachment.thumbnailUrl || attachment.url} 
                alt={attachment.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-500" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
          <p className="text-xs text-gray-500">{attachment.size}</p>
        </div>
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-gray-200 rounded-full">
            <LinkIcon className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border">
      {/* Conversation Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between bg-white overflow-x-auto">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Conversation History</h3>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
            <span className="text-sm text-gray-500">2 participants</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MessageSquare className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {comments.map((message) => (
          <React.Fragment key={message.id}>
            {message.type === 'status_update' ? (
              renderStatusUpdate(message)
            ) : (
              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{message.sender.fullName}</span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.isEdited && (
                      <span className="text-xs text-gray-400">(edited)</span>
                    )}
                    <div className="ml-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 hover:bg-gray-100 rounded-full">
                        <Smile className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-full">
                        <Reply className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-full">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 text-gray-700 prose prose-sm max-w-none">
                    {message.content}
                  </div>
                  {message.attachments?.map((attachment) => (
                    <div key={attachment.id}>
                      {renderAttachment(attachment)}
                    </div>
                  ))}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {message.reactions.map((reaction, index) => (
                        <button
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
                        >
                          <span>{reaction.emoji}</span>
                          <span className="text-gray-600">{reaction.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {message.threadCount && (
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {message.threadCount} replies
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  {renderMessageStatus(message.status)}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            Support Agent is typing...
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 border-t bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User className="w-4 h-4" />
            Replying as Support Agent
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <textarea
                rows={3}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your message... Use @ to mention someone"
              />
              <div className="mt-2 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full relative">
                    <Paperclip className="w-5 h-5 text-gray-400" />
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      multiple
                    />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <ImageIcon className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="flex-1 text-xs text-gray-400">
                  Press Enter to send, Shift + Enter for new line
                </div>
                <div className="flex items-center gap-2">
                  <select className="text-sm border rounded-lg px-3 py-2 bg-white">
                    <option value="in_progress">Set Status: In Progress</option>
                    <option value="pending">Set Status: Pending</option>
                    <option value="resolved">Set Status: Resolved</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="px-6 py-3 border-t bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2">
              <CheckCheck className="w-4 h-4" />
              Mark as Resolved
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2">
              <User className="w-4 h-4" />
              Reassign
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Escalate
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Response Time: 5m 30s</span>
            <div className="h-4 w-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">SLA: 2h remaining</span>
          </div>
        </div>
      </div>

      {/* Canned Responses Panel (Hidden by default) */}
      <div className="hidden px-6 py-4 border-t">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-700">Canned Responses</div>
          <div className="grid grid-cols-2 gap-2">
            <button className="text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              Greeting
            </button>
            <button className="text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              Request More Info
            </button>
            <button className="text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              Escalation Notice
            </button>
            <button className="text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              Resolution Follow-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketConversation;