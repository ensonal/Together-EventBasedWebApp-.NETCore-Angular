import { Box, Typography } from "@mui/material";
import KeyboardReturnRoundedIcon from "@mui/icons-material/KeyboardReturnRounded";
import { ChatMainPanelContainer } from "./containers/ChatMainPanelContainer";

export function ChatPage() {
  return (
    <div className="d-flex flex-column gap-2 w-100 mt-3">
      <div className="d-flex flex-row gap-2 justify-content-start align-items-center">
        <Box
          className="p-0 rounded-3"
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
        >
          <KeyboardReturnRoundedIcon className="text-center" />
        </Box>
        <Typography variant="h6" sx={{ color: "#303030" }} fontSize={16}>
          Back to the home page
        </Typography>
      </div>
      <div className="w-100 h-100 bg-white rounded-3 border">
        <ChatMainPanelContainer />
      </div>
    </div>
  );
}
