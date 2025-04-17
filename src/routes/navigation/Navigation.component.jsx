import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import NavbarItems from "./NavbarItems.component";
import ThemeSelectBox from "./ThemeSelectBox.component";

import { useOpenClose } from "../../hooks/useModalToggle";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import qualityCharging from "../../assets/qualityCharging.png";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import "./Navigation.styles";

import {
  DRAWER_WIDTH,
  Main,
  AppBar,
  DrawerHeader,
  LogoImage,
  LogoContainerBox,
} from "./Navigation.styles";

const Navigation = () => {
  const {
    palette: { primary },
    spacing,
  } = useTheme();

  const {
    isOpen: isDrawerOpen,
    open: openDrawer,
    close: closeDrawer,
  } = useOpenClose();

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <CssBaseline />
      <AppBar position="fixed" open={isDrawerOpen}>
        <Toolbar id="drawer">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ p: spacing(1), margin: "auto 0", display: "flex" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={openDrawer}
                edge="start"
                sx={{
                  mt: spacing(1),
                  ...(isDrawerOpen && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>

              <LogoContainerBox>
                <LogoImage src={qualityCharging} alt="logo" />
              </LogoContainerBox>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Smart Meal Planner
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeSelectBox />

              <ManageAccountsIcon
                sx={{ margin: "0 20px", cursor: "pointer" }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <DrawerHeader>
          <IconButton onClick={closeDrawer}>
            <ChevronLeftIcon sx={{ color: primary.main }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NavbarItems />
      </Drawer>
      <Main open={isDrawerOpen}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default Navigation;
