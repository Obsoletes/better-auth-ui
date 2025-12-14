import { Box } from '@mui/material';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify/unstyled';
import 'react-toastify/ReactToastify.css';

export const Layout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ToastContainer position="top-right" theme="dark" />
      <Outlet />
    </Box>
  );
};
