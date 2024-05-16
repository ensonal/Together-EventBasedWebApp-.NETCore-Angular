import { Routes as BaseRoutes, Route, Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { RegisterPage } from "../routes/Register/RegisterPage";
import { LoginPage } from "./Login/LoginPage";
import { MyProfilePage } from "../routes/MyProfile/MyProfilePage";
import { CreateEventPage } from "../routes/CreateEvent/CreateEventPage";
import { useLocation } from "react-router-dom";
import { VerticalNavBar } from "../components/VerticalNavBar/VerticalNavBar";
import { useEffect, useState } from "react";

export default function Routes() {
  const location = useLocation();

  const [verticalNavFlex, setVerticalNavFlex] = useState(1);

  const isRegisterOrLogin =
    location.pathname === "/register" || location.pathname === "/login";

    {/*
  useEffect(() => {
    location.pathname === "/register" || location.pathname === "/login"
      ? setVerticalNavFlex(0)
      : setVerticalNavFlex(1);
    location.pathname === "/events"
      ? setVerticalNavFlex(0.1)
      : setVerticalNavFlex(1);
  }, [location.pathname]);
  */}

  return (
    <BaseRoutes>
      <Route
        path="/"
        element={
          <div className="d-flex flex-column">
            {!isRegisterOrLogin && <NavBar />}
            <div
              style={{
                backgroundColor: isRegisterOrLogin ? "#3D52F3" : "#F1F2F6",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                paddingLeft: !isRegisterOrLogin ? "20rem" : 0,
                paddingRight: !isRegisterOrLogin ? "20rem" : 0,
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
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="my-profile" element={<MyProfilePage />} />
        <Route path="create-event" element={<CreateEventPage />} />
        <Route path="events" element={<div>Events</div>} />
      </Route>
    </BaseRoutes>
  );
}
