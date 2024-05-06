import { Routes as BaseRoutes, Route, Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Register } from "../routes/Register";

export default function Routes() {
  return (
    <BaseRoutes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="register" element={<Register />} />
      </Route>
    </BaseRoutes>
  );
}
