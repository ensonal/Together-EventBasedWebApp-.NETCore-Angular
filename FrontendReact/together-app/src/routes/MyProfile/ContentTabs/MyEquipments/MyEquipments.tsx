import Card from "@mui/material/Card";
import { getEquipments } from "./hooks/getUserEquipments";
import { useEffect, useState } from "react";
import { EquipmentCard } from "./components/EquipmentCard/EquipmentCard";
import { UserEquipment } from "../../../../api/models/UserEquipment";
import { Button } from "@mui/material";
import { AddEquipmentModal } from "./components/AddEquipmentModal";

export function MyEquipments() {
  const [equipments, setEquipments] = useState([] as UserEquipment[]);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const equipments = await getEquipments()();
        setEquipments(equipments!);
      } catch (error) {
        console.error("Failed to fetch user equipments:", error);
      }
    };

    fetchEquipments();
  }, []);

  const [openAddModal, setOpenAddModal] = useState(false);
  const openAddEquipmentModal = () => {
    setOpenAddModal(true);
  };

  return (
    <Card sx={{ padding: 3, paddingBottom: 1 }} variant="outlined">
      <div className="rounded-3 w-100 pt-2 pb-2">
        <div className="d-flex flex-row flex-wrap gap-3 w-100">
          {equipments?.length > 0 ? (
            equipments.map((equipment) => (
              <EquipmentCard key={equipment.userEquipmentId} {...equipment} />
            ))
          ) : (
            <div className="text-center w-100">No equipments found</div>
          )}
          <div className="text-center mt-2 w-100">
            <Button
              variant="contained"
              className="mt-2"
              onClick={() => openAddEquipmentModal()}
            >
              Add new equipment
            </Button>
          </div>
          <AddEquipmentModal
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
          />
        </div>
      </div>
    </Card>
  );
}
