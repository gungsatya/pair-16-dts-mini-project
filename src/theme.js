import { createTheme, responsiveFontSizes } from "@mui/material";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      netflixRed: {
        main: "#B9090B",
        contrastText: "#fff",
      },
      black: {
        main: "#141414",
        contrastText: "#fff",
      },
      gray: {
        main: "#808080",
        contrastText: "#000",
      },
      midGray: {
        main: "rgba(109, 109, 110, 0.7)",
        contrastText: "#fff",
      },
      smokeWhite: "#E5E5E5",
    },
    typography: {
      allVariants: {
        fontFamily: "Inter, sans-serif",
      },
    },
  })
);
