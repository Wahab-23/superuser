import React, { useState } from 'react';

// MUI Imports
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

export default function FotoUploader({ HeroImg, LogoImg, SmallImg, handleiImageChange }) {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: theme.palette.text.secondary,
    height: 180,
    lineHeight: '0px',
    cursor: 'pointer',
  }));

  const lightTheme = createTheme({ palette: { mode: 'light' } });

  const [logoImage, setLogoImage] = useState(LogoImg);
  const [heroImage, setHeroImage] = useState(HeroImg);
  const [smallImage, setSmallImage] = useState(SmallImg);
  var deleteImage = []

  const handleImageSelect = (event, setImage, image) => {
    if (image === null) {
      const name = event.target.name;
      const file = event.target.files[0];
      handleiImageChange(name, file);
      const reader = new FileReader();
  
      reader.onload = (e) => {
        setImage(e.target.result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    }

    else if (JSON.stringify(image).includes('http') === true) {
      deleteImage.push(image);
      console.log(deleteImage);

      const name = event.target.name;
      const file = event.target.files[0];
      handleiImageChange(name, file);
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }

    else {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        setImage(e.target.result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleItemClick = (inputId) => {
    document.getElementById(inputId).click();
  };

  return (
    <div>
      <Grid item xs={6} key={1}>
        <ThemeProvider theme={lightTheme}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: { md: '1fr 1fr 1fr' },
              gap: 2,
            }}
          >
            <Item elevation={4} name="Logo" onClick={() => handleItemClick('logo-upload')}>
              {logoImage ? (
                <img src={logoImage} alt="Logo" style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
              ) : (
                <>
                  <FileUploadRoundedIcon />
                  <p>Logo image</p>
                </>
              )}
            </Item>

            <Item elevation={4} name="Hero_img" onClick={() => handleItemClick('hero-upload')}>
              {heroImage ? (
                <img src={heroImage} alt="Hero" style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
              ) : (
                <>
                  <FileUploadRoundedIcon />
                  <p>Hero image</p>
                </>
              )}
            </Item>

            <Item elevation={4} name="Image_Link" onClick={() => handleItemClick('small-upload')}>
              {smallImage ? (
                <img src={smallImage} alt="Small" style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
              ) : (
                <>
                  <FileUploadRoundedIcon />
                  <p>Small image</p>
                </>
              )}
            </Item>

            <input
              name='Logo'
              id="logo-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageSelect(e, setLogoImage, logoImage)}
            />

            <input
              name='Hero_img'
              id="hero-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageSelect(e, setHeroImage, heroImage)}
            />

            <input
              name='Image_Link'
              id="small-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageSelect(e, setSmallImage, smallImage)}
            />
          </Box>
        </ThemeProvider>
      </Grid>
    </div>
  );
}