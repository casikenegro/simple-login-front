import { Delete, Edit, Logout } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate(data);
  const columns = useMemo(() => {
    let res = [
      {
        accessorKey: "name",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastname",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "username",
        header: "User name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 100,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 150,
      },
    ];

    let id = window.localStorage.getItem("idInterview");

    if (id === "1") {
      res = [
        ...res,
        {
          accessorKey: "id",
          header: "Editar",
          size: 10,
          Cell: ({ renderedCellValue }) => (
            <IconButton onClick={() => navigate("edit/" + renderedCellValue)}>
              <Edit color="primary" />
            </IconButton>
          ),
        },
        {
          accessorKey: "id",
          header: "Delete",
          size: 10,
          Cell: ({ renderedCellValue }) => (
            <IconButton onClick={() => deleteItem(renderedCellValue)}>
              <Delete color="error" />
            </IconButton>
          ),
        },
      ];
    }

    return res;
  }, []);

  const table = useMaterialReactTable({
    columns,
    data,
  });

  const init = async () => {
    let token = window.localStorage.getItem("tokenInterview");

    let res = await fetch(
      "https://simple-login-e546.onrender.com/api/v1/users",
      {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      res = await res.json();
      console.log(res);
      setData(res);

      res = await fetch(
        "https://simple-login-e546.onrender.com/api/v1/users/" + 1,
        {
          method: "get",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        res = await res.json();
        setUser({ ...res });
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  const deleteItem = async (id) => {
    let token = window.localStorage.getItem("tokenInterview");
    let res = await fetch(
      "https://simple-login-e546.onrender.com/api/v1/users/" + id,
      {
        method: "delete",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      init();
    }
  };

  const logout = () => {
    localStorage.removeItem("idInterview");
    localStorage.removeItem("tokenInterview");
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: "75vw",
        margin: "auto",
        pt: 5,
        pb: 5,
        height: "100vh",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pb={3}
      >
        <Box display={"flex"} alignItems={"center"} gap={1} color={"#fff"}>
          <Box display={"flex"} flexDirection={"column"} color={"#fff"}>
            <Typography variant="h5">
              {user?.name} {user?.lastname}
            </Typography>
            <Typography variant="caption">{user?.email}</Typography>
          </Box>

          <IconButton onClick={logout}>
            <Logout sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          sx={{
            background: "#fff",
            color: (theme) => theme.palette.primary.main,
          }}
          onClick={() => navigate("create")}
        >
          Add user
        </Button>
      </Box>
      <MaterialReactTable table={table} />
    </Box>
  );
};
