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
          paddingTop: { sm: "75px", md: "100px" },
          backgroundColor: theme.palette.black.main,
          color: theme.palette.black.contrastText,
          width: "100vw",
          position: "relative",
        })}
      >
        {props.children}
      </Box>
      <Footer />
    </>
  );
}
