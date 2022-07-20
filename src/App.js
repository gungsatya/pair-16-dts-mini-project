import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./containers/NotFoundPage";
import LoginPage from "./containers/LoginPage";
import ProfilesPage from "./containers/ProfilesPage";
import RegisterPage from "./containers/RegisterPage";
import ProtectedAuth from "./templates/ProtectedAuth";
import UnProtectedAuth from "./templates/UnProtectedAuth";
import ItemMainPage from "./containers/ItemMainPage";
import MovieTVDetailPage from "./containers/MovieTVDetailPage";
import PeopleDetailPage from "./containers/PeopleDetailPage";
import DashboardPage from "./containers/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
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
        <Route path="/src/:type" element={<ItemMainPage />} />
        <Route
          path="/src/persons/detail/:id"
          element={
            <ProtectedAuth>
              <PeopleDetailPage />
            </ProtectedAuth>
          }
        />
        <Route
          path="/src/:type/detail/:id"
          element={
            <ProtectedAuth>
              <MovieTVDetailPage />
            </ProtectedAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
