import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DateFilter } from "./DateFilter";
import React, { useEffect, useState } from "react";
import { GetSportFilters, GetSportExperienceFilters } from "../../../../api/services/FilterService";
import { SportExperience } from "../../../../api/models/SportExperience";
import { Sport } from "../../../../api/models/Sport";
import { EventFilters } from "../../../../api/models/EventModels/EventFilters";

export function AdditionalFilters({ filters, setFilters }: { filters: EventFilters, setFilters: any }) {
  const [sportFilter, setSportFilter] = useState<Sport[]>([]);
  const [sportExperienceFilter, setSportExperienceFilter] = useState<SportExperience[]>([]);

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
    <div className="d-flex flex-row gap-2">
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
    </div>
  );
}
