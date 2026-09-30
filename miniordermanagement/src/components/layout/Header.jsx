import { AppBar, Toolbar, Typography, Box } from "@mui/material";

// ============================================================
// APPLICATION HEADER
// ============================================================
//
// Header is displayed at the top of every application page.
//
// Currently it contains:
//
// - Application name
// - Application description
//
// User/profile functionality can be added later if required.
// ============================================================

function Header() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* ====================================================
            APPLICATION NAME
            ==================================================== */}

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          Mini Order Management
        </Typography>

        {/* ====================================================
            HEADER RIGHT SIDE
            ==================================================== */}

        <Box>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.9,
            }}
          >
            Order Management System
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
