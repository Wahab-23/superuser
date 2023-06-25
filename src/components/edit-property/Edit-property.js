import React, { useState } from 'react';
import axios from 'axios';
import '../add-new-property/property.css';

//MUI Imports
import { Button, Switch, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

//Router Dom Imports
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

//Components Import
import { Jodit } from '../SupportingComponents/Jodit';
import FotoUploader from '../SupportingComponents/FotoUploader';

//Need Image Uploader Component

const EditProperty = ({loading, handleLoading}) => {
  const [formData, setFormData] = useState({
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
    Down_Payment: '',
    Overview: '', //need to import jodit here
    Image_Link: null, //Need image uploader component for this input
    Hero_img: null, //Need image uploader component for this input
    Logo: null, //Need image uploader component for this input
    Key_Highlight: '{"LushGreenParks":0,"KidsPlayArea":0,"SwimmingPool":0,"Gymnasium":0,"OutdoorSittingArea":0,"Freehold":0,"Firefighting":0,"ReturnOnInvestment":0,"InternationalAirport":0,"JoggingTrack":0,"SmartHome":0,"TranquilCommunity":0}', //need multiple switcher for this input
    Downloads: '',
  });

  const [button, setButton] = useState("primary");

  const navigate = useNavigate();

  const [imagesUpload, setImagesUpload] = useState({
    Image_Link: null,
    Hero_img: null,
    Logo: null,
  })

  const handleiImageChange = (name, file) => {
    setImagesUpload((prevData) => ({ ...prevData, [name]: file }))
  }

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

  const handleImageUpload = (name, file) => {
    const formData = new FormData();
    formData.append('images', file);

    axios.post(`https://superuser.jsons.ae/upload/images?folder=${name}`, formData)
      .then(response => {
        setFormData((prevData) => ({...prevData, [name]: response.data[0]}));
        console.log(response.data[0]); //This has to deleted in production
      })
      .catch(error => {
        setButton("error")
        console.error(error); //This has to deleted in production
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLoading(true);
  
    const uploadPromises = [];
  
    if (imagesUpload.Image_Link !== formData.Image_Link) {
      uploadPromises.push(handleImageUpload('Image_Link', imagesUpload.Image_Link));
    }
    if (imagesUpload.Hero_img !== formData.Hero_img) {
      uploadPromises.push(handleImageUpload('Hero_img', imagesUpload.Hero_img));
    }
    if (imagesUpload.Logo !== formData.Logo) {
      uploadPromises.push(handleImageUpload('Logo', imagesUpload.Logo));
    }
  
    try {
      await Promise.all(uploadPromises);
  
      axios.post('https://superuser.jsons.ae/properties-add-new-property', formData)
        .then((response) => {
          handleLoading(false);
          navigate(`/edit-property/${response.data.id}`);        //This is where we are using navigator
        })
        .catch((error) => {
          setButton('error')
          handleLoading(false);
        });
    } catch (error) {
      setButton('error')
      handleLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="addNewContainer">
    <form onSubmit={handleSubmit} className='form-Container'>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'black', textDecoration: 'none', justifyContent: 'flex-end' }}>
        <Link to={`/`}>
          <CloseOutlinedIcon style={{ cursor: 'pointer', margin: '0px 5px' }} color='error' />
        </Link>
      </div>
      <h1 style={{ textAlign: 'center', marginTop: '5px' }}>Edit Property</h1>
      <FormGroup>
        <FormControlLabel
          style={{ width: '150px' }}
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

      <div className="FotoUploader">
        <FotoUploader
          HeroImg={formData.Hero_img}
          LogoImg={formData.Logo}
          SmallImg={formData.Image_Link}
          handleiImageChange={handleiImageChange}
        />

      </div>

      <Button className='subButton' type="submit" variant="contained" color={button} disabled={loading === true ? true : false}>
        { button === 'error'
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
    </div>
  );
};

export default EditProperty;