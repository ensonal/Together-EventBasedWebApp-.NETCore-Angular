import { UserEquipment } from "../../../../../api/models/UserEquipment";
import { addUserEquipment } from "../../../../../api/services/UserEquipmentService";

export function addEquipment() {
    const addEquipment = async (equipment: UserEquipment) => {
        try {
            const response = await addUserEquipment(equipment);
            return response;
        } catch (error) {
            console.error("Failed to add equipment:", error);
        }
    };

    return addEquipment;
}