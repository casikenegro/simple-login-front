import { Box, Typography } from "@mui/material";

const NotFount = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img src="/404.svg" style={{ width: "25vw" }} />
      <Typography variant="h2">404</Typography>
    </Box>
  );
};

export { NotFount };
