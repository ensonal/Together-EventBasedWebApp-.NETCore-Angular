import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DateFilter } from "./DateFilter";
import React, { useEffect, useState } from "react";
import {
  GetSportFilters,
  GetSportExperienceFilters,
} from "../../../../api/services/FilterService";
import { SportExperience } from "../../../../api/models/SportExperience";
import { Sport } from "../../../../api/models/Sport";
import { EventFilters } from "../../../../api/models/EventModels/EventFilters";
import { Typography } from "@mui/material";

export function AdditionalFilters({
  filters,
  setFilters,
  handleClearFilters
}: {
  filters: EventFilters;
  setFilters: any;
  handleClearFilters: () => void;
}) {
  const [sportFilter, setSportFilter] = useState<Sport[]>([]);
  const [sportExperienceFilter, setSportExperienceFilter] = useState<
    SportExperience[]
  >([]);
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedSportExperience, setSelectedSportExperience] = useState<string>("");
  const [clearDates, setClearDates] = useState<boolean>(false);

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

  const handleAllFilterClear = () => {
    setFilters({});
    setSelectedSport("");
    setSelectedSportExperience("");
    setClearDates(true);
    setTimeout(() => setClearDates(false), 0);
    handleClearFilters();
  };

  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex flex-row gap-2">
        <TextField
          select
          label="Sport type"
          variant="outlined"
          fullWidth
          size="small"
          value={selectedSport}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedSport(value);
            handleFilterChange("sportId", value);
          }}
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
          value={selectedSportExperience}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedSportExperience(value);
            handleFilterChange("sportExperienceId", value);
          }}
        >
          {sportExperienceFilter.map((sportExperience) => (
            <MenuItem
              key={sportExperience.sportExperienceId}
              value={sportExperience.sportExperienceId}
            >
              {sportExperience.level}
            </MenuItem>
          ))}
        </TextField>
        <DateFilter filters={filters} setFilters={setFilters} clearDates={clearDates} />
      </div>
      <div className="text-center" style={{ cursor: "pointer" }} onClick={handleAllFilterClear}>
        <Typography variant="body1" color="primary" className="fw-bold">
          Clear filters
        </Typography>
      </div>
    </div>
  );
}
