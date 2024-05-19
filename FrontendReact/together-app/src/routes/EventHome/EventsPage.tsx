import { EventGrid } from "./components/EventGrid/EventGrid";
import { EventSearchCard } from "./components/EventSearchCard/EventSearchCard";
import Pagination from "@mui/material/Pagination";
import { UserEvent } from "../../api/models/UserEvent";
import { getAllEvents } from "../../api/services/EventService";
import { useEffect, useState } from "react";
import { EventFilters } from "../../api/models/EventModels/EventFilters";
import { PaginationModel } from "../../api/models/common/PaginationModel";

export function EventsPage() {
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const [filters, setFilters] = useState<EventFilters>({} as EventFilters);
  const [pagination, setPagination] = useState<PaginationModel>({
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
  });

  useEffect(() => {
    async function fetchEvents() {
      const response = await getAllEvents(filters, pagination);
      if (response.data) {
        setUserEvents(response.data);
        setPagination((prevPagination) => ({
          ...prevPagination,
          totalCount: response.totalCount,
        }));
      }
    }

    fetchEvents();
  }, [filters, pagination.pageNumber]);

  const handlePaginationChange = (pageNumber: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      pageNumber,
    }));
  };

  const pageCount =
    pagination.totalCount && pagination.pageSize
      ? Math.ceil(pagination.totalCount / pagination.pageSize)
      : 0;

  return (
    <div className="d-flex flex-column gap-3 align-self-start align-items-center">
      <EventSearchCard filters={filters} setFilters={setFilters} />
      <EventGrid userEvents={userEvents} />
      <div className="d-flex justify-content-center mb-3">
        <Pagination
          count={pageCount}
          variant="outlined"
          shape="rounded"
          page={pagination?.pageNumber ? pagination.pageNumber : 1}
          onChange={(event, value) => {
            handlePaginationChange(value);
          }}
        />
      </div>
    </div>
  );
}
