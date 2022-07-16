import {
  AppBar,
  Box,
  Button,
  Container,
  alpha,
  Stack,
  styled,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";

const pages = [
  {
    text: "Dashboard",
    path: "/",
  },
  {
    text: "Movies",
    path: "/movies",
  },
];
const settings = ["Sign In"];

const StyledNavLink = styled(Button)((theme) => ({
  my: 2,
  color: "white",
  fontWeight: "normal",
  display: "block",
  textTransform: "capitalize",
}));

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "0ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <AppBar color="black" position="sticky">
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <Stack
            sx={{ padding: "25px 60px", width: "100%" }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={4}
          >
            <img src="/assets/logo.png" alt="Logo" width="36" height="44" />
            <Box sx={{ display: "flex" }}>
              {pages.map((page, idx) => (
                <StyledNavLink
                  key={idx}
                  //   to={page.path}
                  component={"a"}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.text}
                  </Typography>
                </StyledNavLink>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Typography variant="span">Satya Wibawa</Typography>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "white" }}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
