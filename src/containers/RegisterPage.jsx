import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import LoginOrRegister from "../components/LoginOrRegister";
import { Auth } from "../templates/Auth";

export default function RegisterPage() {
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
            console.log(`register with email ${email} password ${password}`)
          }
          type="register"
        />
        <Button variant="text" component={Link} to="/login">
          I have existing account
        </Button>
      </Stack>
    </Auth>
  );
}
