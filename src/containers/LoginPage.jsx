import { Button, Stack } from "@mui/material";
import LoginOrRegister from "../components/LoginOrRegister";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../templates/Auth";

import { loginUserWithEmailPassword } from "../authentication/firebase.js";

export default function LoginPage() {
  const navigate = useNavigate();

  async function _login(email, password) {
    const response = await loginUserWithEmailPassword(email, password);
    if (response.status) {
      navigate("/profiles");
    } else {
      // setLoginError(response.error);
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
        <LoginOrRegister formOnSubmit={_login} type="login" />
        <Button variant="text" component={Link} to="/register">
          I have no account
        </Button>
      </Stack>
    </Auth>
  );
}
