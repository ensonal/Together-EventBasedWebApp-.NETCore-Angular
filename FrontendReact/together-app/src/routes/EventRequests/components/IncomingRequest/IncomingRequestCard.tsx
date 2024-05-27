import { getIncomingRequest } from "../../../../api/services/RequestManagementService";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { IncEventRequestCard } from "./IncEventRequestCard";

export function IncomingRequestCard() {
  const [request, setRequest] = useState<any>([]);
  useEffect(() => {
    getIncomingRequest().then((response) => {
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
        <IncEventRequestCard
          key={request?.eventRequestStatusId}
          request={request}
        />
      ))}
    </Stack>
  );
}
