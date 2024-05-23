export interface UserEventRequest {
    userEventRequestId: number;
    userEventId: number;
    ownerUserId: string;
    guestUserId: string;
    eventRequestStatusId: number;
    requestDate: Date;
}