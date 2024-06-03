import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { UserEquipment } from "../../../../api/models/UserEquipment";
import SportType from "../../../../api/enums/SportType";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "70vh",
  borderRadius: 2,
  outline: "none",
  border: "none",
};

export function AllUserEquipmentsModal({
  equipments,
  open,
  handleClose,
}: {
  equipments: UserEquipment[];
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="p-4">
        <div className="d-flex flex-row flex-wrap justify-content-center gap-2 w-100">
          {equipments.map((equipment) => (
            <div
              key={equipment.userEquipmentId}
              className="d-flex flex-column gap-2 border rounded-3 mt-2"
              style={{ width: 150 }}
            >
              <div className="text-center mt-3">
                <img
                  className="rounded-1 shadow-sm"
                  src={equipment.imageUrl || "https://placehold.co/125x125"}
                  width="100"
                  height="100"
                  alt="equipment"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <Typography
                variant="body1"
                fontWeight="medium"
                sx={{ color: "#303030" }}
                className="text-center"
              >
                {equipment.equipmentName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#303030" }}
                className="text-center mb-3"
              >
                {SportType[equipment.sportId]}
              </Typography>
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  );
}
