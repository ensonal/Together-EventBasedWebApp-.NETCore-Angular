import { MessageFlow } from "../components/MessagePanel/MessageFlow/MessageFlow";
import { MessagePanelHeader } from "../components/MessagePanel/MessagePanelHeader";
import { SendMessage } from "../components/MessagePanel/SendMessage";

export function MessagePanelContainer() {
  return (
    <div className="d-flex flex-column justify-content-between w-100 h-100">
      <div className="d-flex flex-column w-100 h-100">
        <MessagePanelHeader />
        <MessageFlow />
      </div>
      <SendMessage />
    </div>
  );
}
