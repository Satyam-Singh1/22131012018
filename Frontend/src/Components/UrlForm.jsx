import React from 'react';
import { Grid, TextField } from '@mui/material';

const UrlForm = ({ index, input, onChange }) => {
  const handleInputChange = (field) => (event) => {
    onChange(index, field, event.target.value);
  };

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={5}>
        <TextField
          label="Long URL"
          fullWidth
          value={input.url}
          onChange={handleInputChange('url')}
          error={!!input.error}
          helperText={input.error || ''}
        />
      </Grid>

      <Grid item xs={12} sm={2}>
        <TextField
          label="Validity (min)"
          fullWidth
          type="number"
          value={input.validity}
          onChange={handleInputChange('validity')}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField
          label="Custom Shortcode"
          fullWidth
          value={input.shortcode}
          onChange={handleInputChange('shortcode')}
        />
      </Grid>
    </Grid>
  );
};

export default UrlForm;
