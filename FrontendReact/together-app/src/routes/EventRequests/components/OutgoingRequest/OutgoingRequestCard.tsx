import { useEffect, useState } from "react";
import { getOutgoingRequest } from "../../../../api/services/RequestManagementService";
import { OutEventRequestCard } from "./OutEventRequestCard";
import { Stack } from "@mui/material";

export function OutgoingRequestCard() {
  const [request, setRequest] = useState<any>();

  useEffect(() => {
    getOutgoingRequest().then((response) => {
      setRequest(response);
    });
  }, []);

  return (
    <Stack
      spacing={{ xs: 0.5, sm: 1, md: 1.5 }}
      direction="column"
      useFlexGap
      flexWrap="wrap"
      className="w-100"
    >
      {request?.map((request: any) => (
        <OutEventRequestCard
          key={request?.eventRequestStatusId}
          request={request}
        />
      ))}
    </Stack>
  );
}
