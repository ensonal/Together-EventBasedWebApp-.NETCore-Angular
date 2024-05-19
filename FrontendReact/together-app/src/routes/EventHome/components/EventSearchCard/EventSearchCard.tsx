import { Card } from "@mui/material";
import { QuerySearch } from "./QuerySearch";
import { AdditionalFilters } from "./AdditionalFilters";
import { EventFilters } from "../../../../api/models/EventModels/EventFilters";

export function EventSearchCard({ filters, setFilters }: { filters: EventFilters, setFilters: any }) {
  return (
    <Card
      className="p-3 rounded-3 d-flex flex-column gap-2 w-100"
      sx={{ boxShadow: 0 }}
    >
      <QuerySearch filters={filters} setFilters={setFilters}/>
      <AdditionalFilters filters={filters} setFilters={setFilters}/>
    </Card>
  );
}
