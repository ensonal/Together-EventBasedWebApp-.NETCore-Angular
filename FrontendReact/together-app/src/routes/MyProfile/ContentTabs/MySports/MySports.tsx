import { UserSport } from "../../../../api/models/UserSport";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import { useState } from "react";
import { SportCard } from "./components/SportCard/SportCard";
import { getAllUserSports } from "../../../../api/services/UserSportService";
import { useEffect } from "react";
import { AddUserSportModal } from "./components/AddUserSportModal";

export function MySports() {
  const [sports, setSports] = useState([] as UserSport[]);

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

  const [openAddModal, setOpenAddModal] = useState(false);
  const openAddSportModal = () => {
    setOpenAddModal(true);
  };

  return (
    <Card sx={{ padding: 3, paddingBottom: 1 }} variant="outlined">
      <div className="rounded-3 w-100 pt-2 pb-2">
        <div className="d-flex flex-row flex-wrap gap-3 w-100">
          {sports?.length > 0 ? (
            sports.map((sport) => (
              <SportCard key={sport.userSportId} {...sport} />
            ))
          ) : (
            <div className="text-center w-100">No sports found</div>
          )}
          <div className="text-center mt-2 w-100">
            <Button
              variant="contained"
              className="mt-2"
              onClick={() => openAddSportModal()}
            >
              Add new sport
            </Button>
          </div>
          <AddUserSportModal
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
          />
        </div>
      </div>
    </Card>
  );
}
