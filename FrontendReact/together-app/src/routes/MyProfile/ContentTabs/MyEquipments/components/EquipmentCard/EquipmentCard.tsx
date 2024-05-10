import { UserEquipment } from "../../../../../../api/models/UserEquipment";
import { Card, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUserEquipment } from "../../../../../../api/services/UserEquipmentService";
import "./EquipmentCard.css";
import SportType from "../../../../../../api/enums/SportType";

export function EquipmentCard(equipment: UserEquipment) {
  const handleDelete = () => {
    console.log(equipment.userEquipmentId);
    deleteUserEquipment(equipment.userEquipmentId);
  };

  return (
    <Card
      sx={{ width: "177px", height: "235px" }}
      variant="outlined"
      className="mat-card rounded-2"
    >
      <div className="text-center mt-3">
        <img
          className="rounded-3 shadow p-2"
          src="https://getrentacar.com/storage/cache/images/960-640-100-fit-111601.jpeg"
          width="125"
          height="125"
          alt="equipment"
          style={{ objectFit: "cover" }}
        />
      </div>
      <Divider className="mt-3" />
      <p className="fs-6 fw-normal text-center text-dark p-3 pb-0 mb-1">
        {equipment.equipmentName}
      </p>
      <p className="fw-light text-center text-dark p-0 m-0">
        {SportType[equipment.sportId]}
      </p>
      <div className="button-container d-flex flex-row gap-3">
        <IconButton aria-label="delete" className="delete-button" onClick={() => handleDelete()}>
          <DeleteIcon className="button-icon" />
        </IconButton>
      </div>
    </Card>
  );
}
