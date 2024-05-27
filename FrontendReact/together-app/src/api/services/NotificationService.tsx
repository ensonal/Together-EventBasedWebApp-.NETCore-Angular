import { get, post } from '../axios';

export async function getUserNotifications() {
    const url = "/Notification/GetUserNotifications";
    const response = await get(url);
    return response;
}

export async function markNotificationAsRead(notificationId: string) {
    const url = `/Notification/MarkNotificationAsRead/${notificationId}`;
    const response = await post(url);
    return response;
}