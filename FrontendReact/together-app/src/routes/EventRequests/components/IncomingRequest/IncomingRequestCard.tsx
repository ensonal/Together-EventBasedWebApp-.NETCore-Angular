import { getIncomingRequest } from "../../../../api/services/RequestManagementService";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { IncEventRequestCard } from "./IncEventRequestCard";
import { EmptyState } from "../../../../components/EmptyState/EmptyState";

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
      {request.length === 0 || !request || request === undefined ? (
        <EmptyState type="incoming requests" />
      ) : (
        request?.map((request: any) => (
          <IncEventRequestCard
            key={request?.eventRequestStatusId}
            request={request}
          />
        ))
      )}
    </Stack>
  );
}
