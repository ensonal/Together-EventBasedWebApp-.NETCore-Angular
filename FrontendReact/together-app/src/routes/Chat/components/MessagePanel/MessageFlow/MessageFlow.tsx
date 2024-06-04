import { IncomingMessageCard } from "../IncomingMessageCard/IncomingMessageCard";
import { OutgoingMessageCard } from "../OutcomingMessageCard/OutgoingMessageCard";
import "./MessageFlow.css";

export function MessageFlow() {
  return (
    <div className="message-flow">
      <div className=" d-flex flex-column ps-3 p-2">
        {Array.from({ length: 1 }).map((_, index) => (
          <div key={index}>
            <IncomingMessageCard />
          </div>
        ))}
        {Array.from({ length: 1 }).map((_, index) => (
          <div key={index}>
            <OutgoingMessageCard />
          </div>
        ))}
        {Array.from({ length: 1 }).map((_, index) => (
          <div key={index}>
            <IncomingMessageCard />
          </div>
        ))}
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index}>
            <OutgoingMessageCard />
          </div>
        ))}
      </div>
    </div>
  );
}
