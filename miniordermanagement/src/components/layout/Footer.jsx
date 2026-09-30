import { Box, Typography } from "@mui/material";

// ============================================================
// APPLICATION FOOTER
// ============================================================
//
// Footer is displayed at the bottom of every page.
//
// Keeping the Footer inside AppLayout means we don't need to
// manually add it to CustomersPage, OrdersPage, DashboardPage,
// etc.
//
// ============================================================

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        padding: 2,
        textAlign: "center",
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Mini Order Management
      </Typography>
    </Box>
  );
}

export default Footer;
