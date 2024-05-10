import { getUserEquipments } from "../../../../../api/services/UserEquipmentService";

export function getEquipments() {
    const fetchUserEquipments = async () => {
        try {
            const userEquipments = await getUserEquipments();
            return userEquipments;
        } catch (error) {
            console.error("Failed to fetch user equipments:", error);
        }
    };

    return fetchUserEquipments;
}