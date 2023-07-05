import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//import AddNewPropertyForm from './components/add-new-property/Addnewpropertyform';
import AddNewPropertyForm from './components/add-new-property/Add-new-property';
import { useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import EditProperty from './components/edit-property/Edit-property';
import { RootElement } from './root-element'
import ErrorPage from './components/Error/error-page';
import { PropertiesList } from './components/Properties-List/PropertiesList';
//import { SignIn } from './components/Authentication/SignIn';


function App() {

  const [loading, setLoading] = useState(false);
  // const [ userAuth, setUserAuth ] = useState(false);

  // const Authenticated = (Boolean) => {
  //   setUserAuth(Boolean);
  // }
  
  const handleLoading = (Boolean) => {
    setLoading(Boolean);
  }
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootElement />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/add-new-property',
          element: <AddNewPropertyForm loading={loading} handleLoading={handleLoading} /> 
        },
        {
          path: '/edit-property/:id',
          element: <EditProperty loading={loading} handleLoading={handleLoading} /> 
        },
        {
          path: '/properties-list',
          element: <PropertiesList />
        }
      ]
    }
  ])

  return (
    <div className="App">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* {
        userAuth
        ?<RouterProvider router={router} />
        :<SignIn Authenticated={Authenticated} />
      } */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;