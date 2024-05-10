import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { UserEquipment } from "../../../../../api/models/UserEquipment";
import { addEquipment } from "../hooks/addUserEquipment";
import TextField from "@mui/material/TextField";
import { getAllSports } from "../../../../../api/services/UserSportService";
import { Sport } from "../../../../../api/models/Sport";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";

export function AddEquipmentModal({
  openAddModal = false,
  setOpenAddModal = (value: boolean) => {},
}) {
  const [open, setOpen] = useState(false);
  const [equipment, setEquipment] = useState({} as UserEquipment);
  const [sportList, setSportList] = useState<Sport[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setEquipment({ ...equipment, sportId: Number(event.target.value)});
  };

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sports = await getAllSports();
        setSportList(sports);
      } catch (error) {
        console.error("Failed to fetch sports:", error);
      }
    };

    fetchSports();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setOpenAddModal(false);
  };

  useEffect(() => {
    if (openAddModal) {
      setOpen(true);
    }
  }, [openAddModal]);

    const handleAddEquipment = async () => {
        try {
        const response = await addEquipment()(equipment);
        handleClose();
        } catch (error) {
        console.error("Failed to add equipment:", error);
        }
    };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          className="text-center mb-2"
          variant="h6"
          component="h2"
        >
          Add new equipment
        </Typography>
        <div className="d-flex flex-column m-2 mt-0 mb-0 pb-0">
          <div className="d-flex flex-column align-items-center mt-1">
            <p className="fw-normal m-0">Equipment Photo</p>
            <img
              src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710460800&semt=sph"
              width="100"
              height="100"
              alt="placeholder"
            />
          </div>
          <p className="fw-normal m-1">Equipment Name</p>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            placeholder="Enter your equipment name"
            fullWidth
            onChange={(e) =>
              setEquipment({ ...equipment, equipmentName: e.target.value })
            }
          />
          <div>
            <p className="fw-normal m-0 mt-2">Sport Type</p>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              onChange={handleChange}
              fullWidth
            >
              {sportList.map((sport) => (
                  <MenuItem key={sport.sportId} value={sport.sportId}>{sport.name}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="text-center">
            <Button variant="contained" className="mt-2" onClick={() => handleAddEquipment()}>
              Add equipment
            </Button>
        </div>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};
