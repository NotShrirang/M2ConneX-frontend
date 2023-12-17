import React, { useContext } from "react";
import Index from "./pages";
import Events from "./layouts/events.jsx";
import Auth from "./pages/auth.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Page_Not_Found from "./pages/404";
import App_Layout from "./layouts/app.jsx";
import Feed from "./pages/feed.jsx";
import AuthContext from "./authContext.jsx";

const noAuthRouter = createBrowserRouter([
  {
    element: <App_Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
  {
    path: "/*",
    element: <Page_Not_Found />,
  },
]);

const AuthRouter = createBrowserRouter([
  {
    element: <App_Layout />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/events",
        element: <Events />,
      },
    ],
  },
  {
    path: "/*",
    element: <Page_Not_Found />,
  },
]);

const App = () => {
  const { auth } = useContext(AuthContext);
  console.log("from App: " + auth.login);
  return (
    <>
      {auth.login ? (
        <>
          <RouterProvider router={AuthRouter} />
        </>
      ) : (
        <>
          <RouterProvider router={noAuthRouter} />
        </>
      )}
    </>
  );
};

export default App;
