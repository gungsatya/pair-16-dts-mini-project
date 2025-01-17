import { Button, Stack } from "@mui/material";
import LoginOrRegister from "../components/LoginOrRegister";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../templates/Auth";
import GoogleIcon from "@mui/icons-material/Google";

import {
  loginUserWithEmailPassword,
  loginWithGoogle,
} from "../authentication/firebase.js";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  async function _login(email, password) {
    const response = await loginUserWithEmailPassword(email, password);
    if (response.status) {
      navigate("/profiles");
    } else {
      setLoginError(response.error.code);
    }
  }

  async function _loginWithGoogle() {
    const response = await loginWithGoogle();
    if (response.status) {
      navigate("/profiles");
    } else {
      setLoginError(response.error.code);
    }
  }

  return (
    <Auth>
      <Stack
        direction="column"
        alignItems="strech"
        justifyContent="center"
        sx={{ height: "100%" }}
        gap={2}
      >
        <LoginOrRegister
          formOnSubmit={_login}
          type="login"
          error={loginError}
        />
        <Button
          startIcon={<GoogleIcon />}
          variant="outlined"
          onClick={_loginWithGoogle}
        >
          Login with Google
        </Button>
        <Button variant="text" component={Link} to="/register">
          I have no account
        </Button>
      </Stack>
    </Auth>
  );
}
