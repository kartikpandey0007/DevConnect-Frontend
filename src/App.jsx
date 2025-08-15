// App.js
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

const AppLayout = () => {
  return (
    <Provider store={appStore}>
    <div>
      <NavBar />
      {/* Outlet renders the matching child route */}
      <Outlet />
      <Footer/>
    </div>
    </Provider>
  );
};

// Route Configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, 
    children: [
      {path: "/", element: <Feed/>},
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <Profile />},
    ],
  },
]);

// Root Render
const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
