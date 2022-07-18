import { Grid, Paper, Stack } from "@mui/material";

export function Auth(props) {
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
      }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(/assets/images/ProfilePicture.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={24}
        square
        sx={(theme) => ({
          backgroundColor: theme.palette.black.main,
        })}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          {props.children}
        </Stack>
      </Grid>
    </Grid>
  );
}
