import MainContentTab from "./ContentTabs/MainContentTab";
import { UserCard } from "./UserInfo/UserCard";

export function MyProfilePage() {
  
  return (
    <div className="m-5 p-5 pt-1 mt-3 mb-0">
      <div className="d-flex flex-row justify-content-center">
        <div className="col-md-3 order-md-1 mt-1">
          <UserCard />
        </div>
        <div className="col-md-9 order-md-2 ps-4 mt-1">
          <MainContentTab />
        </div>
      </div>
    </div>
  );
}