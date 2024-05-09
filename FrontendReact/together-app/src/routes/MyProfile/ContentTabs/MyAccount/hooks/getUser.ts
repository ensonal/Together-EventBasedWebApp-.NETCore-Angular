import { getUserInfo } from "../../../../../api/services/UserService";

export function getUser() {
    const fetchUserInfo = async () => {
        try {
            const userInfoData = await getUserInfo();
            return userInfoData;
        } catch (error) {
            console.error("Failed to fetch user information:", error);
        }
    };

    return fetchUserInfo;
}