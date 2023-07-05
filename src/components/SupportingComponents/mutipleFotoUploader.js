import React, { useState } from 'react';

// MUI Imports
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import DeleteIcon from '@mui/icons-material/Delete';

export default function GalleryUploader({ Gallery }) {
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

  const [galleryImages, setGalleryImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);

  Gallery 
    ?console.log(Gallery) 
    :console.log('nothing in Gallery') 
  ;

  const handleImageSelect = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
  
    const loadImage = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          resolve(e.target.result);
        };
  
        reader.readAsDataURL(file);
      });
    };
  
    const loadImages = async () => {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const image = await loadImage(file);
        uploadedImages.push(image);
      }
  
      setGalleryImages((prevImages) => [...prevImages, ...uploadedImages]);
    };
  
    loadImages();
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = galleryImages[index];
    setDeleteImages((prevImages) => [...prevImages, imageToRemove]);
    setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));
    console.log(deleteImages);
  };

  return (
    <div>
      <Grid item xs={12}>
        <ThemeProvider theme={lightTheme}>
          <Box
            sx={{
              p: 1,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
            }}
          >
            {galleryImages.map((image, index) => (
              <Item elevation={4} key={index} style={{cursor: 'unset'}}>
                <img
                  src={image}
                  alt={`${index + 1}`}
                  style={{ width: '90%', height: '60%', objectFit: 'contain', marginBottom: '5px' }}
                />
                <DeleteIcon onClick={() => handleRemoveImage(index)} style={{cursor: 'pointer'}} color='error' />
              </Item>
            ))}

            <Item
              elevation={4}
              onClick={() => document.getElementById('gallery-upload').click()}
              style={{ cursor: 'pointer' }}
            >
              <FileUploadRoundedIcon />
              <p>Add Images</p>
            </Item>

            <input
              id="gallery-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              multiple
              onChange={handleImageSelect}
            />
          </Box>
        </ThemeProvider>
      </Grid>
    </div>
  );
}
