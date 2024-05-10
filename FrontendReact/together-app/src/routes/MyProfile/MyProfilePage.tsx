import MainContentTab from "./ContentTabs/MainContentTab";
import { UserCard } from "./UserInfo/UserCard";

export function MyProfilePage() {
  
  return (
    <div className="pt-3" style={{marginRight: '15%', marginLeft: '15%'}}>
      <div className="d-flex flex-row justify-content-center">
        <div className="col-md-3 order-md-1 mt-1 align-self-start">
          <UserCard />
        </div>
        <div className="col-md-9 order-md-2 ps-4 mt-1 align-self-start">
          <MainContentTab />
        </div>
      </div>
    </div>
  );
}