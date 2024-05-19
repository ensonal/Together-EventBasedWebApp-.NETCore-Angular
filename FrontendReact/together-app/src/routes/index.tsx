import { Routes as BaseRoutes, Route, Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { RegisterPage } from "../routes/Register/RegisterPage";
import { LoginPage } from "./Login/LoginPage";
import { MyProfilePage } from "../routes/MyProfile/MyProfilePage";
import { CreateEventPage } from "../routes/CreateEvent/CreateEventPage";
import { useLocation } from "react-router-dom";
import { VerticalNavBar } from "../components/VerticalNavBar/VerticalNavBar";
import { useEffect, useState } from "react";
import { EventsPage } from "./EventHome/EventsPage";
import { EventDetailsPage } from "./EventDetails/EventDetailsPage";
import { UserViewPage } from "./UserView/UserViewPage";
import { getPadding} from "../utils/getPaddingByScreenSize";

export default function Routes() {
  const location = useLocation();
  const [verticalNavFlex, setVerticalNavFlex] = useState(1);
  const [padding, setPadding] = useState(20);

  const isRegisterOrLogin =
    location.pathname === "/register" || location.pathname === "/login";

  useEffect(() => {
    const handleResize = () => {
      setPadding(getPadding(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BaseRoutes>
      <Route
        path="/"
        element={
          <div className="d-flex flex-column">
            {!isRegisterOrLogin && <NavBar />}
            <div
              style={{
                backgroundColor: isRegisterOrLogin ? "white" : "#F1F2F6",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                paddingLeft: !isRegisterOrLogin ? `${padding}rem` : 0,
                paddingRight: !isRegisterOrLogin ? `${padding}rem` : 0,
              }}
            >
              {isRegisterOrLogin ? (
                <Outlet />
              ) : (
                <div style={{ flexDirection: "row", display: "flex" }}>
                  <div
                    style={{
                      flex: verticalNavFlex,
                      backgroundColor: "#F1F2F6",
                    }}
                    className="pt-3"
                  >
                    <VerticalNavBar verticalNavFlex={verticalNavFlex} />
                  </div>
                  <div style={{ flex: 4, marginLeft: 20 }} className="pt-3">
                    <Outlet />
                  </div>
                </div>
              )}
            </div>
          </div>
        }
      >
        <Route path="/" element={<div>Home</div>} />
        <Route path="*" element={<div>Not Found</div>} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="my-profile" element={<MyProfilePage />} />
        <Route path="create-event" element={<CreateEventPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="event/:eventId" element={<EventDetailsPage />} />
        <Route path="user/:userId" element={<UserViewPage />} />
      </Route>
    </BaseRoutes>
  );
}
