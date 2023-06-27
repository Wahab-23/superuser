import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../add-new-property/property.css';

//MUI Imports
import { Button, Switch, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Divider from '@mui/material/Divider';

//Router Dom Imports
import { Link } from 'react-router-dom';
//import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

//Components Import
import { Jodit } from '../SupportingComponents/Jodit';
import FotoUploader from '../SupportingComponents/FotoUploader';

//Need Image Uploader Component

const EditProperty = ({ loading, handleLoading }) => {
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

  // const shouldNavigate = () => {
  //   if (propertyId !== null) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // };

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://superuser.jsons.ae/properties/${id}`)
      .then(res => {
        const propertyData = res.data;
        setFormData(prevFormData => ({
          ...prevFormData,
          Image_Link: propertyData[0].Image_Link || '',
          Size: propertyData[0].Size || '',
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

  const handleImageUpload = async (name, folder, file) => {
    const formData = new FormData();
    formData.append('images', file);

    try {
      const response = await axios.post(
        `https://superuser.jsons.ae/upload/images?folder=${folder}`,
        formData
      );
      console.log(response); // This has to be deleted in production
      return response.data; // Assuming the response itself is an array
    } catch (error) {
      console.error(error); // This has to be deleted in production
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLoading(true);

    try {
      const uploadPromises = [];
      const updatedFormData = { ...formData }; // Create a copy of the formData

      if (imagesUpload.Image_Link !== formData.Image_Link) {
        const imageLinkPromise = handleImageUpload(
          'Image_Link',
          JSON.stringify(formData.SubDomain.trim())
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase(),
          imagesUpload.Image_Link
        ).then((response) => {
          updatedFormData.Image_Link = response[0]; // Update the copy of formData
        });
        uploadPromises.push(imageLinkPromise);
      }

      if (imagesUpload.Hero_img !== formData.Hero_img) {
        const HeroImgData = handleImageUpload(
          'Hero_img',
          JSON.stringify(formData.SubDomain.trim())
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase(),
          imagesUpload.Hero_img
        ).then((response) => {
          updatedFormData.Hero_img = response[0]; // Update the copy of formData
        });
        uploadPromises.push(HeroImgData);
      }

      if (imagesUpload.Logo !== formData.Logo) {
        const LogoData = handleImageUpload(
          'Logo',
          JSON.stringify(formData.SubDomain.trim())
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase(),
          imagesUpload.Logo
        ).then((response) => {
          updatedFormData.Logo = response[0]; // Update the copy of formData
        });
        uploadPromises.push(LogoData);
      }

      await Promise.all(uploadPromises); // Wait for all handleImageUpload promises to resolve

      console.log(formData);

      const response = await axios.put(
        `https://superuser.jsons.ae/properties/${id}`,
        updatedFormData // Use the updated copy of formData
      );

      handleLoading(false);
      console.log(response);
    } catch (error) {
      setButton('error');
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
            name="SubDomain"
            label="SubDomain"
            value={formData.SubDomain}
            onChange={handleChange}
            disabled
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
            <Jodit handleOverviewChange={handleOverviewChange} HandleValue={formData.Overview} />
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
            key={formData.Title}
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
              "Save Changes"
          }
        </Button>
      </form>
    </div>
  );
};

export default EditProperty;