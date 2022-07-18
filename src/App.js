import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import ProfilesPage from "./containers/ProfilesPage";
import RegisterPage from "./containers/RegisterPage";
import ProtectedAuth from "./templates/ProtectedAuth";
import UnProtectedAuth from "./templates/UnProtectedAuth";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedAuth>
              <HomePage />
            </ProtectedAuth>
          }
        />
        <Route
          path="/login"
          element={
            <UnProtectedAuth>
              <LoginPage />
            </UnProtectedAuth>
          }
        />
        <Route
          path="/register"
          element={
            <UnProtectedAuth>
              <RegisterPage />
            </UnProtectedAuth>
          }
        />
        <Route
          path="/profiles"
          element={
            <ProtectedAuth>
              <ProfilesPage />
            </ProtectedAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
