import { Card, Typography } from "@mui/material";
import emptyStateSvg from "../../assets/images/emptyState.svg";

export function EmptyState({ type }: { type: string }) {
  return (
    <Card
      sx={{
        boxShadow: 0,
        border: "0.5px solid transparent",
        background:
          "linear-gradient(white, white) padding-box, linear-gradient(90deg, #3D52F3 0%, #3DCBF3 100%) border-box",
      }}
      className="rounded-4 p-5 shadow-sm w-100 d-flex flex-column align-items-center gap-3"
      style={{ height: "auto" }}
    >
      <img src={emptyStateSvg} alt="Empty state" height={200} width="auto" />
      <Typography
        variant="body1"
        sx={{ color: "#505050", fontSize: 18, fontWeight: "normal" }}
      >
        No {type} to show
      </Typography>
    </Card>
  );
}
