import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./error-page";
import Index from "./routes/index";

import Root, { 
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import Note, {
  loader as noteLoader,
} from "./routes/note";

import EditNote, {
  loader as editLoader,
  action as editAction,
} from "./routes/edit";

import {
  loader as deleteLoader,
  action as deleteAction,
} from "./routes/delete";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "notes/:noteId",
            element: <Note />,
            loader: noteLoader,
          },
          {
            path: "notes/:noteId/edit",
            element: <EditNote />,
            loader: editLoader,
            action: editAction,
          },
          {
            path: "notes/:noteId/destroy",
            // element: <EditNote />,
            loader: deleteLoader,
            action: deleteAction,
            errorElement: <div>Weird, we couldn't delete that note for some reason.</div>,
          },
        ] 
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
