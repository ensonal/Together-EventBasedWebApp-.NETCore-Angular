import { Card, Typography } from "@mui/material";
import SportType from "../../../../api/enums/SportType";
import { UserEquipment } from "../../../../api/models/UserEquipment";

export function EquipmentViewCard({
  userEquipments,
}: {
  userEquipments: UserEquipment[];
}) {
  return (
    <div className="d-flex flex-row gap-3 mt-2 flex-wrap">
      {userEquipments &&
        (userEquipments.length > 4
          ? userEquipments.slice(0, 4)
          : userEquipments
        ).map((equipment) => (
          <Card
            key={equipment.userEquipmentId}
            className="rounded-4 p-3 shadow"
            style={{
              height: "auto",
              overflow: "hidden",
              flex: "1 1 calc(25% - 1rem)", 
              maxWidth: "calc(25% - 1rem)", 
              border: "1px solid #e0e0e0",
            }}
            sx={{ boxShadow: 0 }}
          >
            <div className="d-flex flex-column gap-1">
              <img
                src={
                  equipment.imageUrl
                    ? equipment.imageUrl
                    : "https://placehold.co/125x125"
                }
                alt="Event"
                className="rounded-3 shadow"
                width={"100%"}
                height={150}
                style={{ objectFit: "cover" }}
              />
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                className="text-center m-0 p-0"
                noWrap
              >
                {equipment.equipmentName}
              </Typography>
              <div className="d-flex flex-row justify-content-center m-0 p-0">
                <Typography
                  variant="body2"
                  style={{ color: "#929292" }}
                  noWrap
                >
                  {SportType[equipment.sportId]}
                </Typography>
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
}
