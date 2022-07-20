import { Box, Grid, Stack, Typography } from "@mui/material";
import Profile from "../components/Profile";
import HeaderOnly from "../templates/HeaderOnly";
import { Link } from "react-router-dom";

export default function ProfilesPage() {
  return (
    <HeaderOnly>
      <Box
        sx={(theme) => ({
          width: "100vw",
          height: {
            xs: "100vh",
            sm: "calc(100vh - 75px)",
            md: "calc(100vh - 100px)",
          },
          backgroundColor: theme.palette.black.main,
          color: theme.palette.black.contrastText,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
        })}
      >
        <Stack direction="column" spacing={1} alignItems="center">
          <Typography variant="h2">Who's watching ?</Typography>
          <Grid container spacing={2}>
            <Grid item component={Link} to="/">
              <Profile name="Profile 1" image="/assets/avatars/1.png" />
            </Grid>
            <Grid item component={Link} to="/">
              <Profile name="Profile 2" image="/assets/avatars/2.png" />
            </Grid>
            <Grid item component={Link} to="/">
              <Profile name="Profile 3" image="/assets/avatars/3.png" />
            </Grid>
            <Grid item component={Link} to="/">
              <Profile name="Profile 4" image="/assets/avatars/4.png" />
            </Grid>
            <Grid item>
              <Profile name="Other" image="/assets/icons/add-profile.svg" />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </HeaderOnly>
  );
}
