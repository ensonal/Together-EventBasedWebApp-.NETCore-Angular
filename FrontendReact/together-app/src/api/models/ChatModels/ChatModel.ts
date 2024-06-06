import { MessageUserView } from "./MessageUserView";

export interface ChatModel {
    chatMessageId: number;
    chatRoomId: number;
    senderId: string;
    content: string;
    sentDate: string;
    isMine: boolean;
    messageUserView: MessageUserView;
}