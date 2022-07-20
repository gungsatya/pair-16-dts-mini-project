import {
  AppBar,
  Box,
  Button,
  alpha,
  Stack,
  styled,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { logoutUser } from "../authentication/firebase.js";
import { auth } from "../authentication/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

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

const pages = [
  {
    text: "Dashboard",
    path: "/",
  },
  {
    text: "Movies",
    path: "/src/movies",
  },
  {
    text: "TV Shows",
    path: "/src/tv-shows",
  },
  {
    text: "Persons",
    path: "/src/persons",
  },
];

const StyledNavLink = styled(Button)(({ theme }) => ({
  my: 2,
  fontWeight: "normal",
  display: "block",
  textTransform: "capitalize",
  color: theme.palette.gray.main,
  "&.active": {
    fontWeight: "bold",
    color: "#fff",
  },
}));

function Header() {
  const [user] = useAuthState(auth);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function logout() {
    handleCloseUserMenu();
    await logoutUser();
    navigate("/login");
  }

  return (
    <AppBar color="black" position="fixed" elevation={0}>
      <Box sx={{ padding: "25px 50px" }}>
        <Toolbar disableGutters>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={4}
          >
            <Box
              component="img"
              src="/assets/logo.png"
              alt="Logo"
              sx={{ width: "36px" }}
            />
            <Box sx={{ display: "flex" }}>
              {pages.map((page, idx) => (
                <StyledNavLink key={idx} to={page.path} component={NavLink}>
                  {page.text}
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
              <Button
                variant="span"
                component={NavLink}
                to="/profiles"
                sx={{ textTransform: "none" }}
              >
                {user.email}
              </Button>
              <IconButton size="large" color="inherit">
                <NotificationsIcon />
              </IconButton>
              <Tooltip title="User">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "white" }}
                >
                  <Avatar
                    alt="User Profile"
                    src="/assets/images/ProfilePicture.png"
                    variant="square"
                  />
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
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default Header;
