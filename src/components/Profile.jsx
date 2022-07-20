import { Box, Stack, Typography } from "@mui/material";

export default function Profile(props) {
  return (
    <>
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
          component="img"
          src={props.image}
          sx={(theme) => ({
            borderRadius: theme.shape.borderRadius,
            height: "10vw",
            maxHeight: "200px",
            maxWidth: "200px",
            minHeight: "84px",
            minWidth: "84px",
            position: "relative",
            width: "10vw",
          })}
        ></Box>
        <Typography variant="h6" align="center">
          {props.name}
        </Typography>
      </Stack>
    </>
  );
}
