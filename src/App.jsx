import React from 'react'
import Index from './pages'
import Events_Upcoming from './pages/EventsUpcoming.jsx';
import Events_Past from './pages/EventsPast.jsx';
import Events_Gallery from './pages/EventsGallery.jsx';
import Events_Layout from './layouts/events.jsx';
import Auth from './pages/auth.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import Page_Not_Found from './pages/404';
import App_Layout from './layouts/app.jsx';
import Feed from './pages/feed.jsx';


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
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/feed',
        element: <Feed />
      }
    ]
  },
  {
    path: '/*',
    element: <Page_Not_Found />
  }
]);



const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App