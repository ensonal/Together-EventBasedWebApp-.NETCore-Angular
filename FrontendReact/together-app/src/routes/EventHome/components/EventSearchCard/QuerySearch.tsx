import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { IconButton } from "@mui/material";
import { EventFilters } from "../../../../api/models/EventModels/EventFilters";
import { useState, useEffect } from "react";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import { useNavigate } from "react-router-dom";


export function QuerySearch({
  setFilters,
  setOpen,
  open,
  clearFilters,
}: {
  setFilters: any;
  setOpen: (open: boolean) => void;
  open: boolean;
  clearFilters: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (clearFilters) {
      setSearchQuery("");
    }
  }, [clearFilters]);

  const handleMapClick = () => {
    navigate("/events-map");
  }

  const handleFilterChange = (name: string, value: any) => {
    setFilters((prevFilters: EventFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    handleFilterChange("searchQuery", value);
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
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <IconButton
        className="rounded-2"
        sx={{ border: "1px solid #909090" }}
        onClick={() => setOpen(!open)}
      >
        <FilterListRoundedIcon style={{ color: "#707070" }} fontSize="small" />
      </IconButton>
      <IconButton className="rounded-2" sx={{ border: "1px solid #909090" }} onClick={handleMapClick}>
        <MapRoundedIcon style={{ color: "#707070" }} fontSize="small" />
      </IconButton>
    </div>
  );
}
