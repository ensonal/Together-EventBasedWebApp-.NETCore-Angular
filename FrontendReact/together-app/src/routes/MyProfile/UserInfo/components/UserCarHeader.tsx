import Divider from "@mui/material/Divider";
import IUserInfo from "../../../../api/models/UserInfo";
import Skeleton from "@mui/material/Skeleton";

export function UserCardHeader({ userInfo }: { userInfo: IUserInfo }) {
  const calculateMembershipDays = (membershipDate: Date) => {
    const today = new Date();
    const membership = new Date(membershipDate);
    const diffTime = Math.abs(today.getTime() - membership.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-column align-items-center justify-content-center mt-2">
          {userInfo.profileImageUrl === null ? (
            <Skeleton variant="circular" width={180} height={180} />
          ) : (
            <img
              className="rounded-circle shadow-lg"
              src={userInfo.profileImageUrl}
              width="180"
              height="180"
              alt="Profile"
              style={{ objectFit: "cover" }}
            />
          )}
          <p className="fs-4 fw-normal text-center mt-3 m-0">
            {userInfo.name} {userInfo.surname}
          </p>
          <p className="fw-normal text-center mt-1 m-0">
            Member of together for{" "}
            {calculateMembershipDays(userInfo.membershipDate)} days
          </p>
        </div>
      </div>
      <Divider className="mt-3 mb-3" />
    </>
  );
}