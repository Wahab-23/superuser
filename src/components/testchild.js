import React, { Component } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default class Testchild extends Component {
  render() {
    return (
      <div>
        <Stack spacing={2} direction="row">
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
        </Stack>
      </div>
    )
  }
}
