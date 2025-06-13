export type MessageType = "system" | "user";

export interface ChatMessage {
    type: MessageType;         // "user" or "system"
    senderId?: string;         // Only for user messages
    senderName?: string;       // Optional display name
    content: string;           // The actual message
    timestamp: string;         // ISO string
}
