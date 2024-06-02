import { Card } from "@mui/material";
import { QuerySearch } from "./QuerySearch";
import { AdditionalFilters } from "./AdditionalFilters";
import { EventFilters } from "../../../../api/models/EventModels/EventFilters";
import { useState } from "react";

export function EventSearchCard({ filters, setFilters }: { filters: EventFilters, setFilters: any }) {
  const [open, setOpen] = useState(false);
  const [clearFilters, setClearFilters] = useState(false);

  const handleClearFilters = () => {
    setClearFilters(true);
    setFilters({});
    setTimeout(() => setClearFilters(false), 0);
  };

  return (
    <Card
      className="p-3 rounded-3 d-flex flex-column gap-2 w-100"
      sx={{ boxShadow: 0 }}
    >
      <QuerySearch setFilters={setFilters} setOpen={setOpen} open={open} clearFilters={clearFilters} />
      {open && <AdditionalFilters filters={filters} setFilters={setFilters} handleClearFilters={handleClearFilters}/>}
    </Card>
  );
}
