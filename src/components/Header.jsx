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
import { NavLink, useNavigate, createSearchParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

import { logoutUser } from "../authentication/firebase.js";
import { auth } from "../authentication/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: 0,
  marginRight: 0,
  width: "100%",
  [theme.breakpoints.up("md")]: {
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
    [theme.breakpoints.up("md")]: {
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
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const isMenuOpen = Boolean(anchorElUser);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function onQueryChange(event) {
    setQuery(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      navigate(
        `/src/all?${createSearchParams({
          query: query,
          page: 1,
        })}`
      );
      setQuery("");
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  async function logout() {
    handleCloseUserMenu();
    await logoutUser();
    navigate("/login");
  }

  async function login() {
    handleCloseUserMenu();
    navigate("/login");
  }

  const menuId = "menu-appbar";
  const renderMenu = (
    <Menu
      sx={{ mt: "45px" }}
      id={menuId}
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
      open={isMenuOpen}
      onClose={handleCloseUserMenu}
    >
      {!user && (
        <MenuItem onClick={login}>
          <Typography textAlign="center">Login</Typography>
        </MenuItem>
      )}
      {user && (
        <MenuItem onClick={logout}>
          <Typography textAlign="center">Log out</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem containerelement={<NavLink to="/profiles" />}>
        <IconButton size="large" color="inherit">
          <PeopleOutlineIcon />
        </IconButton>
        <p>Profiles</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <NotificationsIcon />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleOpenUserMenu}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {!user && <AccountCircleIcon />}
          {user && (
            <Avatar
              alt="User Profile"
              src="/assets/images/ProfilePicture.png"
              variant="square"
            />
          )}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        sx={(theme) => ({
          backgroundColor: theme.palette.black.main,
          color: theme.palette.black.contrastText,
        })}
        position="fixed"
        elevation={0}
      >
        <Box
          sx={{
            padding: {
              sm: "5px 15px",
              md: "25px 50px",
            },
            width: "100%",
            position: "relative",
          }}
        >
          <Toolbar sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, idx) => (
                  <MenuItem
                    key={idx}
                    onClick={handleCloseNavMenu}
                    to={page.path}
                    component={NavLink}
                  >
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              component="img"
              src="/assets/logo.png"
              alt="Logo"
              sx={{
                width: "36px",
                display: { md: "initial", xs: "none" },
              }}
            />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, idx) => (
                <StyledNavLink key={idx} to={page.path} component={NavLink}>
                  {page.text}
                </StyledNavLink>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: { xs: 1, md: "initial" },
                gap: { xs: "0", md: "20px" },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={query}
                  onChange={onQueryChange}
                  onKeyDown={handleKeyPress}
                />
              </Search>
              <Box sx={{ display: { xs: "none", xl: "flex", gap: "15px" } }}>
                {user && (
                  <Button
                    variant="span"
                    component={NavLink}
                    to="/profiles"
                    sx={{ textTransform: "none" }}
                  >
                    {user.email}
                  </Button>
                )}
                {!user && (
                  <Button
                    variant="span"
                    disabled
                    sx={{ textTransform: "none" }}
                  >
                    Guest
                  </Button>
                )}
                {user && (
                  <IconButton size="large" color="inherit">
                    <NotificationsIcon />
                  </IconButton>
                )}
                <Tooltip title="Profile">
                  <IconButton
                    size="large"
                    edge="end"
                    aria-haspopup="true"
                    aria-controls={menuId}
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, color: "white" }}
                  >
                    {!user && <AccountCircleIcon />}
                    {user && (
                      <Avatar
                        alt="User Profile"
                        src="/assets/images/ProfilePicture.png"
                        variant="square"
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: { xs: "initial", xl: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}

export default Header;
