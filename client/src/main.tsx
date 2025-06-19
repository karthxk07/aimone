import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import Dashboard from "./pages/StudentDashboard.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import App from "./App.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "dashboard",
    Component: Dashboard,
  },
  {
    path: "login",
    Component: LoginPage,
  },
  {
    path:"admin",
    children : [
      {
        path : "dashboard",
        Component : AdminDashboard
      },
      
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
