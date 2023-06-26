import React, { useState } from 'react';

// MUI Imports
import Grid from '@mui/material/Unstable_Grid2';
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
      const file = event.target.files[0];
      const reader = new FileReader();
      handleiImageChange(event.target.name, event.target.files[0]);

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

      const file = event.target.files[0];
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
      <ThemeProvider theme={lightTheme}>
        <Box sx={{
          width: '100%'
        }}>
          <Grid container sx={{ pb: 2, pt: 2 }}>

          <Grid xs={12} sx={{ p: 1 }}>
              <Item elevation={4} onClick={() => handleItemClick('hero-upload')}>
                {heroImage !== "null" ? (
                  <img src={heroImage} alt="Hero" style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
                ) : (
                  <>
                    <FileUploadRoundedIcon />
                    <p>Hero image</p>
                  </>
                )}
              </Item>
            </Grid>

            <Grid xs={6} sx={{ p: 1 }}>
              <Item elevation={4} onClick={() => handleItemClick('logo-upload')}>
                {logoImage !== "null" ? (
                  <img src={logoImage} alt="Logo" style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
                ) : (
                  <>
                    <FileUploadRoundedIcon />
                    <p>Logo image</p>
                  </>
                )}
              </Item>
            </Grid>

            <Grid xs={6} sx={{ p: 1 }}>
              <Item elevation={4} onClick={() => handleItemClick('small-upload')}>
                {smallImage !== "null" ? (
                  <img src={smallImage} alt="Small" style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
                ) : (
                  <>
                    <FileUploadRoundedIcon />
                    <p>Small image</p>
                  </>
                )}
              </Item>
            </Grid>
            <input
              id="logo-upload"
              name="Logo"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageSelect(e, setLogoImage, logoImage)}
            />

            <input
              id="hero-upload"
              type="file"
              name="Hero_img"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageSelect(e, setHeroImage, heroImage)}
            />

            <input
              id="small-upload"
              type="file"
              name="Image_Link"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageSelect(e, setSmallImage, smallImage)}
            />
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
}
