import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { IconButton } from "@mui/material";
import { EventFilters } from "../../../../api/models/EventModels/EventFilters";

export function QuerySearch({ setFilters, setOpen, open }: { setFilters: any, setOpen: (open: boolean) => void, open: boolean }) {
  const handleFilterChange = (name: string, value: any) => {
    setFilters((prevFilters: EventFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex flex-row gap-2">
      <TextField
        id="input-with-icon-textfield"
        placeholder="Search for events"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon style={{ color: "#474D4B" }} />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        fullWidth
        size="small"
        onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
      />
      <IconButton
        className="rounded-2"
        sx={{ border: "1px solid #909090" }}
        onClick={() => setOpen(!open)}
      >
        <FilterListRoundedIcon style={{ color: "#707070" }} fontSize="small" />
      </IconButton>
    </div>
  );
}
