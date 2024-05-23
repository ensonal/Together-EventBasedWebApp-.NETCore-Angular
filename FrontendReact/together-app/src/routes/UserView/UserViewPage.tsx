import UserInfo from "../../api/models/UserInfo";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserViewInfo } from "../../api/services/UserService";
import { getUserEventsByUserId } from "../../api/services/EventService";
import { getUserSportsByUserId } from "../../api/services/UserSportService";
import { getUserEquipmentByUserId } from "../../api/services/UserEquipmentService";
import { UserImageView } from "./components/UserImageView";
import { UserInfoView } from "./components/UserInfoView";
import { UserSport } from "../../api/models/UserSport";
import { UserEvent } from "../../api/models/UserEvent";
import { UserEventsView } from "./components/UserEventsView";
import { UserEquipment } from "../../api/models/UserEquipment";
import { UserEquipmentsView } from "./components/UserEquipmentsView/UserEquipmentsView";

export function UserViewPage() {
  const [user, setUser] = useState<UserInfo>();
  const [userSports, setUserSports] = useState<UserSport[]>([]);
  const [userEquipments, setUserEquipments] = useState<UserEquipment[]>([]);
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      getUserViewInfo(userId).then((res) => {
        setUser(res);
      });

      getUserSportsByUserId(userId).then((res) => {
        setUserSports(res);
      });

      getUserEventsByUserId(userId).then((res) => {
        setUserEvents(res);
      });

      getUserEquipmentByUserId(userId).then((res) => {
        setUserEquipments(res);
      });
    }
  }, [userId]);

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row h-100 gap-3">
        <UserInfoView user={user} />
        <UserImageView user={user} />
      </div>
      <div className="d-flex flex-column w-100 gap-3">
        <UserEventsView userEvents={userEvents} />
        <UserEquipmentsView userEquipments={userEquipments} />
      </div>
    </div>
  );
}
