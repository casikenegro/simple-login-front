import { Box } from "@mui/material";

const Container = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          maxHeight: "80%",
          height: "auto",
          background: "#fff",
          p: 3,
          borderRadius: 5,
          maxWidth: "500px",
          width: "85vw",
          boxShadow: "0px 0px 20px #0005",
          position: "absolute",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export { Container };
