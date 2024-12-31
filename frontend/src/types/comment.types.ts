import { User } from "./user.types";

export interface Attachment {
    id: number;
    name: string;
    size: string;
    type: string;
    url: string;
    thumbnailUrl?: string;
}

export interface StatusUpdate {
    type: 'status_change' | 'assignment' | 'priority_change' | 'system';
    content: string;
    timestamp: Date;
}

export interface Comment {
    id: number;
    type: 'message' | 'status_update' | 'auto_reply';
    sender: User;
    content: string;
    timestamp: Date;
    attachments?: Attachment[];
    status?: 'sent' | 'delivered' | 'read';
    reactions?: Array<{
        emoji: string;
        count: number;
        users: string[];
    }>;
    isEdited?: boolean;
    threadCount?: number;
    statusUpdate?: StatusUpdate;
}