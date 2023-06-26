import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../add-new-property/property.css';

//MUI Imports
import { Button, Switch, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

//Router Dom Imports
import { Link, useParams } from 'react-router-dom';

//Components Import
import { Jodit } from '../SupportingComponents/Jodit';
import FotoUploader from '../SupportingComponents/FotoUploader';

//Need Image Uploader Component

const EditProperty = ({ loading, handleLoading }) => {
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

  const [imagesUpload, setImagesUpload] = useState({
    Image_Link: null,
    Hero_img: null,
    Logo: null,
  })

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://superuser.jsons.ae/properties/${id}`)
      .then(res => {
        const propertyData = res.data;
        setFormData(prevFormData => ({
          ...prevFormData,
          Image_Link: propertyData[0].Image_Link || '',
          Title: propertyData[0].Title || '',
          Tag_Line: propertyData[0].Tag_Line,
          p_Group: propertyData[0].p_Group || '',
          Property_Type: propertyData[0].Property_Type || '',
          Bedroom: propertyData[0].Bedroom || '',
          Handover_Date: propertyData[0].Handover_Date || '',
          Payment_Plan: propertyData[0].Payment_Plan || '',
          Down_Payment: propertyData[0].Down_Payment || '',
          Location: propertyData[0].Location || '',
          Price: propertyData[0].Price || '',
          isEnable: JSON.parse(propertyData[0].isEnable) || '',
          Overview: propertyData[0].Overview || '',
          SubDomain: propertyData[0].SubDomain || '',
          Hero_img: propertyData[0].Hero_img || '',
          Logo: propertyData[0].Logo || '',
          Key_Highlight: propertyData[0].Key_Highlight || '',
          Downloads: propertyData[0].Downloads || '',
          meta_Title: propertyData[0].meta_Title || '',
          meta_Description: propertyData[0].meta_Description || '',
          meta_Keyword: propertyData[0].meta_Keyword || ''
        }));
        setImagesUpload({
          Image_Link: propertyData[0].Image_Link || '',
          Hero_img: propertyData[0].Hero_img || '',
          Logo: propertyData[0].Logo || ''
        })
      })
      .catch(err => {
        console.log(err);
      });
  }, [id, setFormData]);

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

  const handleImageUpload = (name, file) => {
    const formData = new FormData();
    formData.append('images', file);

    axios.post(`https://superuser.jsons.ae/upload/images?folder=${name}`, formData)
      .then(response => {
        setFormData((prevData) => ({ ...prevData, [name]: response.data[0] }));
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

      axios.put(`https://superuser.jsons.ae/properties/${id}`, formData)
        .then((response) => {
          handleLoading(false);
          console.log(response);
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
                checked={formData.isEnable === 1}
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
            <Jodit handleOverviewChange={handleOverviewChange} HandleValue={formData.Overview} />
          </div>

        </FormGroup>

        <div className="FotoUploader">
          {formData && (
            <FotoUploader
              key={formData.Title}
              HeroImg={formData.Hero_img}
              LogoImg={formData.Logo}
              SmallImg={formData.Image_Link}
              handleiImageChange={handleiImageChange}
            />
          )}
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

export default EditProperty;