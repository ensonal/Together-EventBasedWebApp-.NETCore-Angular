import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { UserCardHeader } from "./components/UserCarHeader";
import { UserCardInfo } from "./components/UserCardInfo";
import { getUserInfo } from "../../../api/services/UserService";
import IUserInfo from "../../../api/models/UserInfo";

export function UserCard() {
  const [userInfo, setUserInfo] = useState<IUserInfo>({} as IUserInfo);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const userInfoData = await getUserInfo();
      setUserInfo(userInfoData);
    } catch (error) {
      console.error("Failed to fetch user information:", error);
    }
  };

  return (
    <Card sx={{ borderRadius: 3 }} variant="outlined">
      <CardContent>
        <UserCardHeader userInfo={userInfo} />
        <UserCardInfo userInfo={userInfo} />
      </CardContent>
    </Card>
  );
}
