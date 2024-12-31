import { User } from "./user.types";
import { Ticket } from "./tickets.types";

export interface Attachment {
    id: number;
    name: string;
    size: string;
    type: string;
    url: string;
    thumbnailUrl?: string;
}

export interface StatusUpdate {
    type: 'status_change' | 'assignment' | 'priority_change' | 'system'
    content: string;
    timestamp: string;
}

export interface Comment {
    id: number;
    ticket: Ticket;
    sender: User;
    type: string;
    status?: 'sent' | 'delivered' | 'read';
    statusUpdate: StatusUpdate;
    mentions?: string | null;
    content: string;
    isInternal: boolean;
    isResolution: boolean;
    createdAt: string;
    updatedAt: string;
}
