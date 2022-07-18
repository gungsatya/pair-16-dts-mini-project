import { Box, Container, Stack, Typography } from "@mui/material";
import Profile from "../components/Profile";
import HeaderOnly from "../templates/HeaderOnly";

export default function ProfilesPage() {
  return (
    <HeaderOnly>
      <Box
        sx={(theme) => ({
          width: "100vw",
          height: "100vh",
          backgroundColor: theme.palette.black.main,
          paddingTop: "100px",
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
              <Profile name="Me">
                <Box
                  component="img"
                  src="/assets/avatars/1.png"
                  sx={{ width: "200px", height: "200px" }}
                />
              </Profile>
              <Profile name="You">
                <Box
                  component="img"
                  src="/assets/avatars/2.png"
                  sx={{ width: "200px", height: "200px" }}
                />
              </Profile>
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
