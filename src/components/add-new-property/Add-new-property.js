import React, { useState } from 'react';
import axios from 'axios';
import './property.css';

//MUI Imports
import { Button, Switch, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Divider from '@mui/material/Divider';

//Router Dom Imports
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";

//Components Import
import { Jodit } from '../SupportingComponents/Jodit';
import FotoUploader from '../SupportingComponents/FotoUploader';

//Need Image Uploader Component

const AddNewPropertyForm = ({ loading, handleLoading }) => {
  const [formData, setFormData] = useState({
    Title: '',
    Tag_Line: '',
    SubDomain: '',
    Size: '',
    p_Group: '',
    Property_Type: '',
    Bedroom: '',
    Handover_Date: '',
    Payment_Plan: '',
    Location: '',
    Price: '',
    isEnable: false,
    Down_Payment: '',
    Overview: '', 
    Image_Link: null, 
    Hero_img: null, 
    Logo: null, 
    Key_Highlight: '{"LushGreenParks":0,"KidsPlayArea":0,"SwimmingPool":0,"Gymnasium":0,"OutdoorSittingArea":0,"Freehold":0,"Firefighting":0,"ReturnOnInvestment":0,"InternationalAirport":0,"JoggingTrack":0,"SmartHome":0,"TranquilCommunity":0}', //need multiple switcher for this input
    Downloads: '',
    Gallery: '',  //Need Photo Uploader that can upload multiple photos
    meta_Title: '',
    meta_Description: '',
    meta_Keyword: '',
  });

  const [button, setButton] = useState("primary");
  const [propertyId, setPropertyId] = useState(null)

  const shouldNavigate = () => {
    if (propertyId !== null) {
      return true;
    }
    else {
      return false;
    }
  };

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

  const handleToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      isEnable: prevData.isEnable === 1 ? 0 : 1 // Toggle between 1 and 0
    }));
  };

  const handleOverviewChange = (newOverview) => {
    setFormData(prevState => {
      const updatedProperty = { ...prevState, Overview: newOverview };
      return updatedProperty;
    });
  };

  console.log(formData);
  const handleImageUpload = (name, file) => {
    const formData = new FormData();
    formData.append('images', file);

    axios.post(`https://superuser.jsons.ae/upload/images?folder=${name}`, formData)
      .then(response => {
        setFormData((prevData) => ({ ...prevData, [name]: response.data[0] }))
        console.log(response.data); //This has to deleted in production
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
          console.log(`/edit-property/${response.data.id}`);
          setPropertyId(response.data.id)   //This is where we are using navigator
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
      {/* {shouldNavigate() && <Navigate to={`/edit-property/${propertyId}`} replace={true} />} */}
      <form onSubmit={handleSubmit} className='form-Container'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'black', textDecoration: 'none', justifyContent: 'flex-end' }}>
          <Link to={`/`}>
            <CloseOutlinedIcon style={{ cursor: 'pointer', margin: '0px 5px' }} color='error' />
          </Link>
        </div>
        <h1 style={{ textAlign: 'center', marginTop: '5px' }}>Add New Property</h1>
        <FormGroup>
          <FormControlLabel
            style={{ width: '150px' }}
            control={
              <Switch
                sx={{ m: 1 }}
                checked={formData.isEnable === 1}
                name="isEnable"
                label="isEnable"
                onClick={handleToggle}
                value={formData.isEnable}
              />}
            label="Is Enable"
          />

          <TextField
            name="SubDomain"
            label="SubDomain"
            value={formData.SubDomain}
            onChange={handleChange}
            required
          />

          <TextField
            name="Title"
            label="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />

          <TextField
            name="Tag_Line"
            label="Tag Line"
            value={formData.Tag_Line}
            onChange={handleChange}
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
            name="Size"
            label="Size"
            value={formData.Size}
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
            name="Price"
            label="Starting Price"
            value={formData.Price}
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
            name="Handover_Date"
            label="Handover Date"
            value={formData.Handover_Date}
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
            name="Down_Payment"
            label="Down Payment"
            value={formData.Down_Payment}
            onChange={handleChange}
            required
          />
          <Divider>Overview</Divider>
          <div style={{ marginTop: '10px' }}>
            <Jodit handleOverviewChange={handleOverviewChange} />
          </div>
          
          <Divider>Meta Section</Divider>
          
          <TextField
            name="meta_Title"
            label="Meta Title"
            value={formData.meta_Title}
            onChange={handleChange}
            required
          />

          <TextField
            name="meta_Description"
            label="Meta Description"
            value={formData.meta_Description}
            onChange={handleChange}
            required
          />

          <TextField
            name="meta_Keyword"
            label="Meta Keyword"
            value={formData.meta_Keyword}
            onChange={handleChange}
            required
          />
          
        </FormGroup>

        <Divider>Images Section</Divider>

        <div className="FotoUploader">
          <FotoUploader
            HeroImg={formData.Hero_img}
            LogoImg={formData.Logo}
            SmallImg={formData.Image_Link}
            handleiImageChange={handleiImageChange}
          />

        </div>

        <Button className='subButton' type="submit" variant="contained" color={button} disabled={loading === true ? true : false}>
          {button === 'error'
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

export default AddNewPropertyForm;