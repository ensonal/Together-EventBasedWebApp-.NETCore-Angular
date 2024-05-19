import { Card } from "@mui/material";
import { QuerySearch } from "./QuerySearch";
import { AdditionalFilters } from "./AdditionalFilters";

export function EventSearchCard() {
  return (
    <Card
      className="p-3 rounded-3 d-flex flex-column gap-2 w-100"
      sx={{ boxShadow: 0 }}
    >
      <QuerySearch />
      <AdditionalFilters />
    </Card>
  );
}
