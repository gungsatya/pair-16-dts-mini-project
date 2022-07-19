import { Box, Container, Stack, Typography } from "@mui/material";
import Profile from "../components/Profile";
import HeaderOnly from "../templates/HeaderOnly";
import { Link } from "react-router-dom";

export default function ProfilesPage() {
  return (
    <HeaderOnly>
      <Box
        sx={(theme) => ({
          width: "100vw",
          height: "100vh",
          backgroundColor: theme.palette.black.main,
          color: theme.palette.black.contrastText,
        })}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Stack
            direction="column"
            spacing={8}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h2">Who's watching ?</Typography>
            <Stack
              direction="row"
              spacing={6}
              alignItems="center"
              justifyContent="center"
            >
              <Link to="/">
                <Profile name="Me">
                  <Box
                    component="img"
                    src="/assets/avatars/1.png"
                    sx={{ width: "200px", height: "200px" }}
                  />
                </Profile>
              </Link>
              <Link to="/">
                <Profile name="You">
                  <Box
                    component="img"
                    src="/assets/avatars/2.png"
                    sx={{ width: "200px", height: "200px" }}
                  />
                </Profile>
              </Link>
              <Link to="/">
                <Profile name="Friend 1">
                  <Box
                    component="img"
                    src="/assets/avatars/3.png"
                    sx={{ width: "200px", height: "200px" }}
                  />
                </Profile>
              </Link>
              <Link to="/">
                <Profile name="Friend 2">
                  <Box
                    component="img"
                    src="/assets/avatars/4.png"
                    sx={{ width: "200px", height: "200px" }}
                  />
                </Profile>
              </Link>
              <Profile name="Other">
                <Box
                  component="img"
                  src="/assets/icons/add-profile.svg"
                  sx={{ width: "120px", height: "120px" }}
                />
              </Profile>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </HeaderOnly>
  );
}
