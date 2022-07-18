import { Box, Stack, Typography } from "@mui/material";

export default function Profile(props) {
  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="center"
      spacing={1}
      sx={(theme) => ({
        color: theme.palette.gray.main,
        "&:hover": {
          color: theme.palette.smokeWhite,
          "& .MuiBox-root": {
            boxShadow: "0 0 0 5px " + theme.palette.smokeWhite,
            backgroundColor: theme.palette.smokeWhite,
          },
        },
      })}
    >
      <Box
        sx={(theme) => ({
          width: "200px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: theme.shape.borderRadius,
          overflow: "hidden",
        })}
      >
        {props.children}
      </Box>
      <Typography variant="h6" align="center">
        {props.name}
      </Typography>
    </Stack>
  );
}
