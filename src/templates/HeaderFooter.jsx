import { Box } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function HeaderFooter(props) {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={(theme) => ({
          paddingTop: "100px",
          backgroundColor: theme.palette.black.main,
          color: theme.palette.black.contrastText,
        })}
      >
        {props.children}
      </Box>
      <Footer />
    </>
  );
}
