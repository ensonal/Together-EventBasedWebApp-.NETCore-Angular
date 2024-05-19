import { Card, Typography } from "@mui/material";
import { UserEquipment } from "../../../../api/models/UserEquipment";
import { EquipmentViewCard } from "./EquipmentViewCard";

export function UserEquipmentsView({
  userEquipments,
}: {
  userEquipments: UserEquipment[];
}) {
  return (
    <Card
      className="rounded-4 p-3"
      style={{ height: "auto", overflow: "hidden", width: "100%", flex: 1 }}
      sx={{ boxShadow: 0 }}
    >
      <div className="d-flex flex-row justify-content-between">
        <Typography variant="h6">Equipments</Typography>
        <Typography variant="body1">Show all</Typography>
      </div>
      <EquipmentViewCard userEquipments={userEquipments} />
    </Card>
  );
}
