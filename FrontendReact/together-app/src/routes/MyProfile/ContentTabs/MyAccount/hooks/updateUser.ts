import { updateUserInfo } from "../../../../../api/services/UserService";
import IUserInfo from "../../../../../api/models/UserInfo";

export function updateUser(userInfo: IUserInfo) {
    const fetchUserInfo = async () => {
        try {
            await updateUserInfo(userInfo);
        } catch (error) {
            console.error("Failed to update user information:", error);
        }
    }

    fetchUserInfo();
}