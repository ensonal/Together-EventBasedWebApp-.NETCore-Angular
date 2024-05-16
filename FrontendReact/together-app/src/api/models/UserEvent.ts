import SportType from "../enums/SportType";
import EventStatus from "../enums/EventStatus";
import SportExperience from "../enums/SportExperience";

export interface UserEvent {
    userEventId: number;
    userId: string;
    sportId: number;
    eventStatusId: number;
    sportExperienceId: number;
    title: string;
    description: string;
    eventDate: Date;
    eventHour: string,
    location: string;
    eventImageUrl: string;
}

function convertUserEventToEnum(sportId: number, eventStatusId: number, sportExperienceId: number){
    return {
        sport: SportType[sportId],
        eventStatus: EventStatus[eventStatusId],
        sportExperience: SportExperience[sportExperienceId]
    }
}

export { convertUserEventToEnum };