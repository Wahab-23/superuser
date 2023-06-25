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


function App() {

  const [loading, setLoading] = useState(false);

  const handleLoading = (Boolean) => {
    setLoading(Boolean);
  }
  
  const router = createBrowserRouter([
    {
      path: '/add-new-property',
      element: <AddNewPropertyForm loading={loading} handleLoading={handleLoading} /> 
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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
