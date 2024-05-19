import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DateFilter } from "./DateFilter";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import React from "react";

export function AdditionalFilters() {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="d-flex flex-row gap-2">
        <Card
          sx={{
            boxShadow: 0,
            cursor: "pointer",
            border: "1px solid #c6c6c6",
            padding: "0.3rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            minWidth: "fit-content",
            flexGrow: 1,
            maxWidth: "fit-content",
          }}
          onClick={handleClick}
        >
          <Typography sx={{ color: "#474D4B", whiteSpace: "nowrap" }} fontSize={14} variant="body1">
            Filters
          </Typography>
          <FilterListRoundedIcon style={{ color: "#474D4B" }} fontSize="small"/>
        </Card>
        {open && (
          <>
            <TextField
              select
              label="City"
              variant="outlined"
              fullWidth
              size="small"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
            <TextField
              select
              label="Country"
              variant="outlined"
              fullWidth
              size="small"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
            <TextField
              select
              label="Sport type"
              variant="outlined"
              fullWidth
              size="small"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
            <TextField
              select
              label="Level"
              variant="outlined"
              fullWidth
              size="small"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>
          </>
        )}
      </div>
      {open && <DateFilter />}
    </>
  );
}
