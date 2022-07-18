import { Box } from "@mui/material";
import Header from "./../components/Header";
export default function HeaderOnly(props) {
  return (
    <>
      <Header />
      <Box component="main">{props.children}</Box>
    </>
  );
}
