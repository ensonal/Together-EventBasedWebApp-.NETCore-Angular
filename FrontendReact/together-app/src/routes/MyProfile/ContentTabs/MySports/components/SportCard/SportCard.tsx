import { UserSport } from "../../../../../../api/models/UserSport";
import "./SportCard.css";
import { Card, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUserSport } from "../../../../../../api/services/UserSportService";

export function SportCard(sport: UserSport) {
  const handleDelete = () => {
    deleteUserSport(sport.userSportId);
  };

  return (
    <Card
      sx={{ width: "177px", height: "235px" }}
      variant="outlined"
      className="mat-card rounded-2"
    >
      <div className="text-center mt-3">
        <img
          className="rounded-1 shadow-sm p-2"
          src={sport.imageUrl}
          width="125"
          height="125"
          alt="equipment"
          style={{ objectFit: "cover" }}
        />
      </div>
      <Divider className="mt-3" />
      <p className="fs-6 fw-normal text-center text-dark p-3 pb-0 mb-1">
        {sport.sportName}
      </p>
      <p className="fw-light text-center text-dark p-0 m-0">{sport.level}</p>
      <div className="button-container d-flex flex-row gap-3">
        <IconButton
          aria-label="delete"
          className="delete-button"
          onClick={() => handleDelete()}
        >
          <DeleteIcon className="button-icon" />
        </IconButton>
      </div>
    </Card>
  );
}
