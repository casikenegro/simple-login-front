import { Box } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("tokenInterview");

    if (token === null) {
      navigate("/");
    }
  }, []);

  return (
    <div
      style={{
        background: "url(/wave.svg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
};
