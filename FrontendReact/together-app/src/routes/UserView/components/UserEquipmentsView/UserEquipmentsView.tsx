import { Card, Typography } from "@mui/material";
import { UserEquipment } from "../../../../api/models/UserEquipment";
import { EquipmentViewCard } from "./EquipmentViewCard";

export function UserEquipmentsView({
  userEquipments,
}: {
  userEquipments: UserEquipment[];
}) {
  const handleClick = () => {
    console.log("View all equipments");
  };

  return (
    <Card
      className="rounded-4 p-3"
      style={{ height: "auto", overflow: "hidden", width: "100%", flex: 1 }}
      sx={{ boxShadow: 0 }}
    >
      <div className="d-flex flex-row justify-content-between align-items-center">
        <Typography variant="h6">Equipments</Typography>
        {userEquipments.length > 4 && (
          <Typography
            variant="body2"
            fontWeight="medium"
            sx={{ color: "#3D52F3" }}
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            View all
          </Typography>
        )}
      </div>
      <EquipmentViewCard userEquipments={userEquipments} />
    </Card>
  );
}
