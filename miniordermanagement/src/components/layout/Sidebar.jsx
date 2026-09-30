import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { NavLink } from "react-router-dom";

// ============================================================
// APPLICATION SIDEBAR
// ============================================================
//
// Sidebar provides navigation to the major sections of the
// application.
//
// Current navigation:
//
// 1. Dashboard
// 2. Customers
// 3. Orders
//
// NavLink is used instead of normal <a> tags because this is a
// React Router application.
//
// NavLink also allows us to identify the currently active page.
// ============================================================

function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: 240,
        flexShrink: 0,
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      {/* ======================================================
          SIDEBAR TITLE
          ====================================================== */}

      <Box
        sx={{
          padding: 2,
          borderBottom: "1px solid #eeeeee",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
          }}
        >
          Navigation
        </Typography>
      </Box>

      {/* ======================================================
          NAVIGATION MENU
          ====================================================== */}

      <List
        disablePadding
        sx={{
          paddingTop: 1,
        }}
      >
        {/* ----------------------------------------------------
            DASHBOARD
            ---------------------------------------------------- */}

        <ListItemButton
          component={NavLink}
          to="/"
          sx={{
            "&.active": {
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>

          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* ----------------------------------------------------
            CUSTOMERS
            ---------------------------------------------------- */}

        <ListItemButton
          component={NavLink}
          to="/customers"
          sx={{
            "&.active": {
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
            },
          }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>

          <ListItemText primary="Customers" />
        </ListItemButton>

        {/* ----------------------------------------------------
            ORDERS
            ---------------------------------------------------- */}

        <ListItemButton
          component={NavLink}
          to="/orders"
          sx={{
            "&.active": {
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
            },
          }}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>

          <ListItemText primary="Orders" />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default Sidebar;
