import { useEffect, useState } from "react";
import { UserSport } from "../../../../api/models/UserSport";
import { getAllUserSports } from "../../../../api/services/UserSportService";
import { Typography } from "@mui/material";
import { UserSportsViewCard } from "./UserSporstViewCard";
import { AllUserSportsModal } from "./AllUserSportsModal";

export function UserSportsView() {
  const [sports, setSports] = useState<UserSport[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sports = await getAllUserSports();
        setSports(sports);
      } catch (error) {
        console.error("Failed to fetch user sports:", error);
      }
    };

    fetchSports();
  }, []);

  const sportsToShow = sports?.slice(0, 4);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <Typography
          variant="body1"
          fontWeight="medium"
          sx={{ color: "#303030" }}
        >
          Sports
        </Typography>
        <Typography
          variant="body2"
          fontWeight="medium"
          sx={{ color: "#3D52F3" }}
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          View all
        </Typography>
      </div>
      <UserSportsViewCard sports={sportsToShow} />
      <AllUserSportsModal sports={sports} open={modalOpen} handleClose={handleClose} />
    </div>
  );
}
