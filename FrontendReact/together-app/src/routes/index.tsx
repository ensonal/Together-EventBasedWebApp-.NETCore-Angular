import { Routes as BaseRoutes, Route, Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { RegisterPage } from "../routes/Register/RegisterPage";
import { LoginPage } from "./Login/LoginPage";
import { MyProfilePage } from "../routes/MyProfile/MyProfilePage";
import { useLocation } from "react-router-dom";

export default function Routes() {
  const location = useLocation();

  const isRegisterOrLogin =
    location.pathname === "/register" || location.pathname === "/login";

  return (
    <BaseRoutes>
      <Route
        path="/"
        element={
          <>
            {!isRegisterOrLogin && <NavBar />}
            <div
              style={{
                backgroundColor: isRegisterOrLogin ? "#4A43EB" : "transparent",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flex: 1 }}>
                <Outlet />
              </div>
            </div>
          </>
        }
      >
        <Route path="/" element={<div>Home</div>} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="my-profile" element={<MyProfilePage />} />
      </Route>
    </BaseRoutes>
  );
}
