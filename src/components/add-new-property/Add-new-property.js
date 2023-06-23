import React, { useState } from 'react';
import axios from 'axios';
import './property.css';
import { Button, Switch, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

//Need to import and create other components

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
    Key_Highlight: '', //need multiple switcher for this input
    Downloads: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleToggle = (e) => {
    const { name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: !prevData[name] // Toggle the value of the property
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/properties-add-new-property', formData)
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., show a success message or redirect
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., show an error message
      });
  };

  return (
    <FormGroup onSubmit={handleSubmit} className='form-Container'>

      <FormControlLabel
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
      />

      <TextField
        name="SubDomain"
        label="SubDomain"
        value={formData.SubDomain}
        onChange={handleChange}
      />

      <TextField
        name="p_Group"
        label="Group"
        value={formData.p_Group}
        onChange={handleChange}
      />

      <TextField
        name="Property_Type"
        label="Property Type"
        value={formData.Property_Type}
        onChange={handleChange}
      />

      <TextField
        name="Bedroom"
        label="Bedrooms"
        value={formData.Bedroom}
        onChange={handleChange}
      />

      <TextField
        name="Handover_Date"
        label="Handover Date"
        value={formData.Handover_Date}
        onChange={handleChange}
      />
      <TextField
        name="Payment_Plan"
        label="Payment Plan"
        value={formData.Payment_Plan}
        onChange={handleChange}
      />
      <TextField
        name="Location"
        label="Location"
        value={formData.Location}
        onChange={handleChange}
      />

      <TextField
        name="Down_Payment"
        label="Down Payment"
        value={formData.Down_Payment}
        onChange={handleChange}
      />
      
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      
    </FormGroup>
  );
};

export default AddNewPropertyForm;