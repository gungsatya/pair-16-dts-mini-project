import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
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
    // fontFamily: [
    //   "-apple-system",
    //   "BlinkMacSystemFont",
    //   '"Segoe UI"',
    //   "Inter",
    //   '"Helvetica Neue"',
    //   "Arial",
    //   "sans-serif",
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"',
    // ].join(","),
    allVariants: {
      fontFamily: "Inter, sans-serif",
    },
  },
});
