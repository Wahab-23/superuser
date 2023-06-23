import React, { useState } from 'react';
import axios from 'axios';
import './property.css';
import { Button, Switch, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from 'react-router-dom';


//Jodit Editor Implemented
import { Jodit } from '../SupportingComponents/Jodit';

//Need Image Uploader Component

const AddNewPropertyForm = () => {
  const [formData, setFormData] = useState({
    Image_Link: '', //Need image uploader component for this input
    Title: '',
    SubDomain: '',
    p_Group: '',
    Property_Type: '',
    Bedroom: '',
    Handover_Date: '',
    Payment_Plan: '',
    Location: '',
    Price: '',
    isEnable: false,
    Overview: '', //need to import jodit here
    Down_Payment: '',
    Hero_img: '', //Need image uploader component for this input
    Logo: '', //Need image uploader component for this input
    Key_Highlight: '{"LushGreenParks":0,"KidsPlayArea":0,"SwimmingPool":0,"Gymnasium":0,"OutdoorSittingArea":0,"Freehold":0,"Firefighting":0,"ReturnOnInvestment":0,"InternationalAirport":0,"JoggingTrack":0,"SmartHome":0,"TranquilCommunity":0}', //need multiple switcher for this input
    Downloads: '',
  });

  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState("primary");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleToggle = (e) => {
    const { name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: !prevData[name] // Toggle the value of the property 
    }))
  };

  const handleOverviewChange = (newOverview) => {
    setFormData(prevState => {
      const updatedProperty = { ...prevState, Overview: newOverview };
      return updatedProperty;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post('/properties-add-new-property', formData)
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        setButton('error')
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='form-Container'>
      <Link to={`/`} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'black', textDecoration: 'none', justifyContent: 'flex-end'}}>
        <CloseOutlinedIcon style={{cursor: 'pointer', margin: '0px 5px'}} />
        <p>Cancel</p>
      </Link>
      <h1 style={{ textAlign: 'center', marginTop: '5px' }}>Add New Property</h1>
      <FormGroup>
        <FormControlLabel
          style={{width: '145px'}}
          control={
            <Switch
              sx={{ m: 1 }}
              checked={formData.isEnable}
              name="isEnable"
              label="isEnable"
              onClick={handleToggle}
              value={formData.isEnable}
            />}
          label="Is Enable"
        />

        <TextField
          name="Title"
          label="Title"
          value={formData.Title}
          onChange={handleChange}
          required
        />

        <TextField
          name="SubDomain"
          label="SubDomain"
          value={formData.SubDomain}
          onChange={handleChange}
          required
        />

        <TextField
          name="p_Group"
          label="Group"
          value={formData.p_Group}
          onChange={handleChange}
          required
        />

        <TextField
          name="Property_Type"
          label="Property Type"
          value={formData.Property_Type}
          onChange={handleChange}
          required
        />

        <TextField
          name="Bedroom"
          label="Bedrooms"
          value={formData.Bedroom}
          onChange={handleChange}
          required
        />

        <TextField
          name="Handover_Date"
          label="Handover Date"
          value={formData.Handover_Date}
          onChange={handleChange}
          required
        />
        <TextField
          name="Payment_Plan"
          label="Payment Plan"
          value={formData.Payment_Plan}
          onChange={handleChange}
          required
        />
        <TextField
          name="Location"
          label="Location"
          value={formData.Location}
          onChange={handleChange}
          required
        />

        <TextField
          name="Price"
          label="Price"
          value={formData.Price}
          onChange={handleChange}
          required
        />

        <TextField
          name="Down_Payment"
          label="Down Payment"
          value={formData.Down_Payment}
          onChange={handleChange}
          required
        />

        <div style={{ marginTop: '10px' }}>
          <label>Overview</label>
          <Jodit handleOverviewChange={handleOverviewChange} />
        </div>


      </FormGroup>

      <Button className='subButton' type="submit" variant="contained" color={button} disabled={loading === true ?true :false}>
        {loading === true
          ?
            <CircularProgress sx={{ color: blue[50], }} />
          :
            button === 'error'
            ?
              "error"
            :
              button === 'success'
              ?
                "Submitted"
              :
                "Submit"
        }

      </Button>
    </form>
  );
};

export default AddNewPropertyForm;