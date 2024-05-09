import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import Button from "@mui/material/Button";
import ProfilePic from "../../../../assets/images/profile-pic.jpeg";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { getUser } from "./hooks/getUser";
import { updateUser } from "./hooks/updateUser";
import IUserInfo from "../../../../api/models/UserInfo";

export function MyAccount() {
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser()();
        setUserInfo(userData || undefined);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
        setUserInfo(undefined);
      }
    };

    fetchUser();
  }, []);

  const handleSave = () => {
    if (userInfo) {
      updateUser(userInfo);
    }
  };
  
  const handleInputChange = (key: keyof IUserInfo, value: string) => {
    if (userInfo) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo!,
        [key]: value,
      }));
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ padding: 3, paddingBottom: 1 }} variant="outlined">
      <div className="rounded-3 w-100 pt-2 pb-2">
        <div className="d-flex flex-column justify-content-between">
          <div className="d-flex flex-column justify-content-center align-items-center pb-3">
            <img
              src={ProfilePic}
              className="rounded-circle object-fit-cover"
              width="100"
              height="100"
              alt="profile-pic"
              style={{ objectFit: "cover" }}
            />
          </div>
          <Divider />
          <div className="pt-4 d-flex flex-column gap-1">
            <div className="d-flex flex-row gap-3">
              <div>
                <p className="fs-6 fw-normal m-0 text-dark w-100 mt-1 mb-2">
                  Name
                </p>
                <TextField
                  id="input-first-name"
                  label="First Name"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  value={userInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div>
                <p className="fs-6 fw-normal m-0 text-dark w-100 mt-1 mb-2">
                  Last Name
                </p>
                <TextField
                  id="input-with-icon-textfield"
                  label="Last Name"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  value={userInfo.surname}
                  onChange={(e) => handleInputChange("surname", e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex flex-row gap-3">
              <div>
                <p className="fs-6 fw-normal m-0 text-dark w-100 mt-2 mb-2">
                  Email
                </p>
                <TextField
                  id="input-with-icon-textfield"
                  label="Email"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={userInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div>
                <p className="fs-6 fw-normal m-0 text-dark w-100 mt-2 mb-2">
                  Phone
                </p>
                <TextField
                  id="input-with-icon-textfield"
                  label="Phone"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={userInfo.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="d-flex flex-row gap-3">
              <div>
                <p className="fs-6 fw-normal m-0 text-dark w-100 mt-2 mb-2">
                  City
                </p>
                <TextField
                  id="input-with-icon-textfield"
                  label="City"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCityIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={userInfo.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>
              <div>
                <p className="fs-6 fw-normal m-0 text-dark w-100 mt-2 mb-2">
                  Country
                </p>
                <TextField
                  id="input-with-icon-textfield"
                  label="Country"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PublicIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={userInfo.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <Button
              variant="contained"
              className="mt-2"
              onClick={() => handleSave()}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
