import { Box } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function HeaderFooter(props) {
  return (
    <>
      <Header />
      <Box component="main">{props.children}</Box>
      <Footer />
    </>
  );
}
