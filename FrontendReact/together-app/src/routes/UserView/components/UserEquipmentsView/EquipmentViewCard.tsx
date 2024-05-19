import { Card, Divider, Typography } from "@mui/material";
import  SportType  from "../../../../api/enums/SportType";
import { UserEquipment } from "../../../../api/models/UserEquipment";

export function EquipmentViewCard( {userEquipments} : {userEquipments: UserEquipment[]}){
    return(
        <div className="d-flex flex-row gap-3 flex-wrap">
        {userEquipments.map((equipment) => (
          <Card
            sx={{ width: "150px", height: "220px" }}
            variant="outlined"
            className="rounded-2 mt-2"
          >
            <div className="text-center mt-3">
              <img
                className="rounded-3 shadow p-2"
                src={
                  equipment.imageUrl
                    ? equipment.imageUrl
                    : "https://placehold.co/125x125"
                }
                width="100"
                height="100"
                alt="equipment"
                style={{ objectFit: "cover" }}
              />
            </div>
            <Divider className="mt-3" />
            <Typography
              className="fs-6 fw-normal text-center text-dark p-3 pb-0 mb-1"
              noWrap
            >
              {equipment.equipmentName}
            </Typography>
            <Typography
              className="fw-light text-center text-dark p-0 m-0"
              noWrap
            >
              {SportType[equipment.sportId]}
            </Typography>
          </Card>
        ))}
      </div>
    )
}