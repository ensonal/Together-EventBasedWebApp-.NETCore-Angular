import ProfilePic from "../../../../assets/images/profile-pic.jpeg";
import Divider from '@mui/material/Divider';
import IUserInfo from "../../../../api/models/UserInfo";

export function UserCardHeader ({ userInfo }: { userInfo: IUserInfo }) {
    return (
        <div className="d-flex flex-column justify-content-center">
            <div className="text-center mt-3">
                <img
                    className="rounded-circle"
                    src={ProfilePic}
                    width="200"
                    height="200"
                    alt="Profile"
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div>
                <h4 className="text-center mt-3 m-0">{userInfo.name} {userInfo.surname}</h4>
                <p className="text-center"></p>
            </div>
            <Divider />
        </div>
    );
}