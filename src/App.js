import { Routes, Route } from "react-router-dom";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import ProfilesPage from "./containers/ProfilesPage";
import RegisterPage from "./containers/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
      </Routes>
    </>
  );
}

export default App;
