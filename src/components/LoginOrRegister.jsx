import { alpha, Box, Button, styled, TextField } from "@mui/material";
import { useState } from "react";

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

export default function LoginOrRegister(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function _emailOnChange(event) {
    setEmail(event.target.value);
  }

  function _passwordOnChange(event) {
    setPassword(event.target.value);
  }

  function _formCallback(event) {
    event.preventDefault();
    props.formOnSubmit(email, password);
  }

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1, width: "80%" }}
      onSubmit={_formCallback}
    >
      <StyledTextField
        margin="normal"
        required
        fullWidth
        id="email"
        name="email"
        placeholder="Email"
        type="text"
        autoComplete="email"
        variant="outlined"
        value={email}
        autoFocus
        onChange={_emailOnChange}
      />
      <StyledTextField
        margin="normal"
        required
        fullWidth
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        value={password}
        onChange={_passwordOnChange}
      />
      <StyledButton type="submit" fullWidth variant="contained" size="large">
        {props.type === "login" ? "Login" : "Register"}
      </StyledButton>
    </Box>
  );
}
