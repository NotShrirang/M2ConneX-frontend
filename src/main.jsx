import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Events_Layout from './pages/events_layout';
import Events_Upcoming from './pages/events_upcoming';
import Events_Past from './pages/events_past';
import Events_Gallery from './pages/events_gallery';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Page_Not_Found from './pages/404';
import Header from './components/header.jsx';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: '/events',
        element: <Events_Layout />,
        children: [
          {
            path: '',
            loader: () => redirect('/events/upcoming')
          },
          {
            path: 'upcoming',
            element: <Events_Upcoming />
          },
          {
            path: 'past',
            element: <Events_Past />

          }, {
            path: 'gallery',
            element: <Events_Gallery />

          }
        ]
      }
    ]
  },
  {
    path: '/*',
    element: <Page_Not_Found />
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);