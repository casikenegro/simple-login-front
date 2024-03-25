import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Auth, Login, SingUp } from "./pages/auth";
import { NotFount } from "./404";
import { Home, Private } from "./pages/private";
import { Update } from "./pages/private/home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "", element: <Login /> },
      { path: "sing-up", element: <SingUp /> },
      { path: "*", element: <NotFount /> },
    ],
  },
  {
    path: "/home",
    element: <Private />,
    children: [
      { path: "", element: <Home /> },
      { path: "create", element: <Update /> },
      { path: "edit/:id", element: <Update /> },
    ],
  },
  { path: "*", element: <NotFount /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <RouterProvider router={router} />
  </>
);
