import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

class NotFoundPage extends React.Component {
  render() {
    return (
      <Box
        sx={(theme) => ({
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.palette.black.contrastText,
          backgroundColor: theme.palette.black.main,
          flexDirection: "column",
          gap: "20px",
        })}
      >
        <Typography variant="h2">404 Not Found</Typography>
        <Typography
          variant="body1"
          style={{ textAlign: "center", color: "#fff" }}
          component={Link}
          to="/"
        >
          Go to Home
        </Typography>
      </Box>
    );
  }
}
export default NotFoundPage;
