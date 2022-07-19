import { Box } from "@mui/material";
import Header from "./../components/Header";

export default function HeaderOnly(props) {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={(theme) => ({
          backgroundColor: theme.palette.black.main,
          color: theme.palette.black.contrastText,
        })}
      >
        {props.children}
      </Box>
    </>
  );
}
