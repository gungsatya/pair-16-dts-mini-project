import { Button, Stack } from "@mui/material";
import LoginOrRegister from "../components/LoginOrRegister";
import { Link } from "react-router-dom";
import { Auth } from "../templates/Auth";

export default function LoginPage() {
  return (
    <Auth>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <LoginOrRegister
          formOnSubmit={(email, password) =>
            console.log(`login with email ${email} password ${password}`)
          }
          type="login"
        />
        <Button variant="text" component={Link} to="/register">
          I have no account
        </Button>
      </Stack>
    </Auth>
  );
}
