import { useEffect, useState } from "react";
import { GetChatMessages } from "../../../../../api/services/ChatService";
import { ChatModel } from "../../../../../api/models/ChatModels/ChatModel";
import { formatDate } from "../../../../../utils/formatDate";
import { IncomingMessageCard } from "../IncomingMessageCard/IncomingMessageCard";
import { OutgoingMessageCard } from "../OutcomingMessageCard/OutgoingMessageCard";
import "./MessageFlow.css";

export function MessageFlow({ roomId }: any) {
  const [messages, setMessages] = useState<ChatModel[]>([]);

  useEffect(() => {
    if (!roomId) return;
    const fetchMessages = async () => {
      const response = await GetChatMessages(roomId);
      const allMessages = [...response];
      allMessages.sort((a, b) => new Date(a.sentDate).getTime() - new Date(b.sentDate).getTime());
      setMessages(allMessages);
    };
    fetchMessages();
  }, [roomId]);

  return (
    <div className="message-flow w-100">
      <div className="d-flex flex-column ps-3 p-2 w-100">
        {messages.map((message) => (
          message.isMine ? 
            <OutgoingMessageCard key={message.chatMessageId} message={{...message, sentDate: formatDate(message.sentDate)}} /> :
            <IncomingMessageCard key={message.chatMessageId} message={{...message, sentDate: formatDate(message.sentDate)}} />
        ))}
      </div>
    </div>
  );
}
