import Select from "@mui/material/Select";
import { Sport } from "../../../api/models/Sport";
import { useState, useEffect } from "react";
import { getAllSports } from "../../../api/services/UserSportService";
import MenuItem from "@mui/material/MenuItem";
import { SportExperience } from "../../../api/models/SportExperience";
import { getAllSportExperience } from "../../../api/services/UserSportService";
import { UserEvent } from "../../../api/models/UserEvent";
import { Dispatch, SetStateAction } from "react";

export function SportSelectForm({
  setUserEvent,
  event,
}: {
  setUserEvent: React.Dispatch<any>;
  event?: any;
}) {
  const [sportList, setSportList] = useState<Sport[]>([]);
  const [experienceList, setExperienceList] = useState<SportExperience[]>([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sports = await getAllSports();
        setSportList(sports);
      } catch (error) {
        console.error("Failed to fetch sports:", error);
      }
    };

    const fetchExperience = async () => {
      try {
        const experiences = await getAllSportExperience();
        setExperienceList(experiences);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      }
    };

    fetchExperience();
    fetchSports();
  }, []);

  return (
    <div className="d-flex flex-column gap-3 w-100">
      <div className="d-flex flex-column gap-2 w-100">
        <p className="fs-5 m-0 mt-2">Sport</p>
        <Select
          value={event?.sportId}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth
          onChange={(event) => {
            const sportId = event.target.value as number;
            setUserEvent((userEvent: UserEvent) => ({
              ...userEvent,
              sportId,
            }));
          }}
        >
          {sportList.map((sport) => (
            <MenuItem key={sport.sportId} value={sport.sportId}>
              {sport.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="d-flex flex-column gap-2 w-100">
        <p className="fs-5 m-0 mt-2">Difficulty</p>
        <Select
          value={event?.sportExperienceId}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          fullWidth
          onChange={(event) => {
            const sportExperienceId = event.target.value as number;
            setUserEvent((userEvent: UserEvent) => ({
              ...userEvent,
              sportExperienceId,
            }));
          }}
        >
          {experienceList.map((experience) => (
            <MenuItem
              key={experience.sportExperienceId}
              value={experience.sportExperienceId}
            >
              {experience.level}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
