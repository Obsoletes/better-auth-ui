import { Box } from "@mui/material";
import { Outlet } from "react-router";
export const Layout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Outlet />
    </Box>
  );
};
