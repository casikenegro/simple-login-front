import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

export const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("tokenInterview");

    if (token?.length) {
      navigate("/home");
    }
  }, []);

  return (
    <Box
      sx={{
        background: "url(/wave.svg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <Outlet />
    </Box>
  );
};
