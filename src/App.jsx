// App.js
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Profile from "./Profile";
import Footer from "./Footer";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

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
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

// Root Render
const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
