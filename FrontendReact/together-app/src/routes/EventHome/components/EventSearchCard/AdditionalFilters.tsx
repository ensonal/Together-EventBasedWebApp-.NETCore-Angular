import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DateFilter } from "./DateFilter";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import React, { useEffect, useState } from "react";
import { GetSportFilters, GetSportExperienceFilters } from "../../../../api/services/FilterService";
import { SportExperience } from "../../../../api/models/SportExperience";
import { Sport } from "../../../../api/models/Sport";
import { EventFilters } from "../../../../api/models/EventModels/EventFilters";

export function AdditionalFilters({ filters, setFilters }: { filters: EventFilters, setFilters: any }) {
  const [open, setOpen] = React.useState(false);
  const [sportFilter, setSportFilter] = useState<Sport[]>([]);
  const [sportExperienceFilter, setSportExperienceFilter] = useState<SportExperience[]>([]);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    GetSportFilters().then((res) => {
      setSportFilter(res);
    });
    GetSportExperienceFilters().then((res) => {
      setSportExperienceFilter(res);
    });
  }, []);

  const handleFilterChange = (name: string, value: any) => {
    setFilters((prevFilters: EventFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
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
              label="Sport type"
              variant="outlined"
              fullWidth
              size="small"
              onChange={(e) => handleFilterChange("sportId", e.target.value)}
            >
              {sportFilter.map((sport) => (
                <MenuItem key={sport.sportId} value={sport.sportId}>
                  {sport.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Level"
              variant="outlined"
              fullWidth
              size="small"
              onChange={(e) => handleFilterChange("sportExperienceId", e.target.value)}
            >
              {sportExperienceFilter.map((sportExperience) => (
                <MenuItem key={sportExperience.sportExperienceId} value={sportExperience.sportExperienceId}>
                  {sportExperience.level}
                </MenuItem>
              ))}
            </TextField>
            <DateFilter filters={filters} setFilters={setFilters} />
          </>
        )}
      </div>

    </>
  );
}
