import { Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginOrRegister from "../components/LoginOrRegister";
import { Auth } from "../templates/Auth";

import { registerUserWithEmailPassword } from "../authentication/firebase.js";

export default function RegisterPage() {
  const navigate = useNavigate();

  function _register(email, password) {
    const response = registerUserWithEmailPassword(email, password);
    if (response.status) {
      navigate("/profiles");
    } else {
    }
  }

  return (
    <Auth>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <LoginOrRegister formOnSubmit={_register} type="register" />
        <Button variant="text" component={Link} to="/login">
          I have existing account
        </Button>
      </Stack>
    </Auth>
  );
}
