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
import UserProfile from "./pages/UserProfile.jsx";
import Batchmates from "./pages/Batchmates.jsx";
import Batches from "./components/Batches.jsx";
import Blogs from "./pages/Blogs.jsx";
import Oppurtunities from "./pages/oppurtunities.jsx";
import Profile from "./components/profile/profile.jsx";
import NotificationPage from "./pages/NotificationsPage.jsx";

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
      {
        path: "/blogs",
        element: <Blogs />,
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
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/batches",
        element: <Batchmates />,
      },
      {
        path: "/batches/:year",
        element: <Batches />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/oppurtunities",
        element: <Oppurtunities />,
      },
      {
        path: "/users/:userId",
        element: <Profile />,
      },
      {
        path: "/notifications",
        element: <NotificationPage />,
      },
      {
        path: "/*",
        element: <Page_Not_Found />,
      },
    ],
  },
]);

const App = () => {
  const { auth } = useContext(AuthContext);
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
