import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { Sport } from "../../../../../api/models/Sport";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { SportExperience } from "../../../../../api/models/SportExperience";
import {
  getAllSports,
  getAllSportExperience,
  addUserSport,
} from "../../../../../api/services/UserSportService";
import { UserSport } from "../../../../../api/models/UserSport";

export function AddUserSportModal({
  openAddModal = false,
  setOpenAddModal = (value: boolean) => {},
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenAddModal(false);
  };
  const [userSport, setUserSport] = useState({} as UserSport);
  const [sportList, setSportList] = useState<Sport[]>([]);
  const [experienceList, setExperienceList] = useState<SportExperience[]>([]);

  const handleAddSport = async () => {
    try {
      const response = await addUserSport(userSport);
      handleClose();
    } catch (error) {
      console.error("Failed to add sport:", error);
    }
  };

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

  useEffect(() => {
    if (openAddModal) {
      setOpen(true);
    }
  }, [openAddModal]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          className="text-center mb-2"
          variant="h6"
          component="h2"
        >
          Add new equipment
        </Typography>
        <div className="d-flex flex-column m-2 mt-0 mb-0 pb-0">
          <p className="fw-normal m-1">Sport</p>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            fullWidth
            onChange={(event) =>
              setUserSport({
                ...userSport,
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
          <p className="fw-normal m-1">Experience Level</p>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            fullWidth
            onChange={(event) =>
                setUserSport({
                    ...userSport,
                    sportExperienceId: Number(event.target.value),
                })
            }
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
        <div className="text-center">
          <Button
            variant="contained"
            className="mt-2"
            onClick={() => handleAddSport()}
          >
            Add sport
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};
