import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//import AddNewPropertyForm from './components/add-new-property/Addnewpropertyform';
import Testchild from './components/add-new-property/testchild';
import AddNewPropertyForm from './components/add-new-property/Add-new-property';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/child',
        element: <Testchild />
      },
      {
        path: '/add-new-property',
        element: <AddNewPropertyForm />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);