import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Sport } from "../../../api/models/Sport";
import { useState, useEffect } from "react";
import { getAllSports } from "../../../api/services/UserSportService";
import MenuItem from "@mui/material/MenuItem";

export function SportSelectForm() {
  const [sportList, setSportList] = useState<Sport[]>([]);
  const [selectedSport, setSelectedSport] = useState({} as Sport);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sports = await getAllSports();
        setSportList(sports);
      } catch (error) {
        console.error("Failed to fetch sports:", error);
      }
    };
    fetchSports();
  }, []);

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Sport"
      fullWidth
      onChange={(event) =>
        setSelectedSport({
          ...selectedSport,
          sportId: Number(event.target.value),
        })
      }
    >
      {sportList.map((sport) => (
        <MenuItem key={sport.sportId} value={sport.sportId}>
          {sport.name}
        </MenuItem>
      ))}
    </Select>
  );
}
