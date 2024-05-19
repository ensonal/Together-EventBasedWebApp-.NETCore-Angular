import SportType from "../enums/SportType";
import EventStatus from "../enums/EventStatus";
import SportExperience from "../enums/SportExperience";
import IUserInfo from "./UserInfo";

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
    city: string;
    country: string;
    eventImageUrl: string;
    userInfo: IUserInfo;
}

function convertUserEventToEnum(sportId: number, eventStatusId: number, sportExperienceId: number){
    return {
        sport: SportType[sportId],
        eventStatus: EventStatus[eventStatusId],
        sportExperience: SportExperience[sportExperienceId]
    }
}

function splitDateToMonthName(date: Date){
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "Julu",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    return {
        month: monthNames[date.getMonth()],
    }
}

export { convertUserEventToEnum, splitDateToMonthName};