import {
  alpha,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  styled,
  TextField,
} from "@mui/material";

export default function Login() {
  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.netflixRed.main,
    "&:hover": {
      backgroundColor: alpha(theme.palette.netflixRed.main, 0.85),
    },
    margin: "20px 0",
  }));

  const StyledTextField = styled(TextField)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    background: "rgba(234, 234, 234, 0.07)",
    border: "1px solid #FFFFFF",
    "& .MuiOutlinedInput-input": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "#fff",
    },
  }));

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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="Email"
              variant="outlined"
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
            >
              Sign In
            </StyledButton>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
