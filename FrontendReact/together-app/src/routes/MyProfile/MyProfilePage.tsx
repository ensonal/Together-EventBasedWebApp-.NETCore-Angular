import MainContentTab from "./ContentTabs/MainContentTab";

export function MyProfilePage() {
  return (
    <div className="d-flex flex-row justify-content-center">
      {/*
        <div className="col-md-4 order-md-1 mt-1 align-self-start">
          <UserCard />
        </div>
        */}
      <div className="w-100 align-self-start">
        <MainContentTab />
      </div>
    </div>
  );
}
