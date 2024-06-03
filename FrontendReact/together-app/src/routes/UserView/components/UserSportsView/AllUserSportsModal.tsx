import { UserSport } from "../../../../api/models/UserSport";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { borderRadius } from "@mui/system";

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
};

export function AllUserSportsModal({
  sports,
  open,
  handleClose,
}: {
  sports: UserSport[];
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          All User Sports
        </Typography>
        <div className="d-flex flex-row flex-wrap justify-content-start gap-2 w-100">
          {sports.map((sport) => (
            <div
              key={sport.sportId}
              className="d-flex flex-column gap-2 border rounded-3 mt-2"
              style={{ width: 150 }}
            >
              <div className="text-center mt-3">
                <img
                  className="rounded-1 shadow-sm"
                  src={sport.imageUrl}
                  width="80"
                  height="80"
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
                {sport.sportName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#303030" }}
                className="text-center mb-3"
              >
                {sport.level}
              </Typography>
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  );
}
