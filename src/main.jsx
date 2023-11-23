import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Events_Upcoming from './pages/events_upcoming';
import Events_Past from './pages/events_past';
import Events_Gallery from './pages/events_gallery';
import Events_Layout from './layouts/events.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Page_Not_Found from './pages/404';
import Index from './pages/index.jsx';
import App_Layout from './layouts/app.jsx';



const router = createBrowserRouter([
  {
    element: <App_Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
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