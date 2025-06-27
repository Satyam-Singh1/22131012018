import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Link
} from '@mui/material';

const UrlCard = ({ originalUrl, shortUrl, expiry }) => {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="body2" gutterBottom>
          <strong>Original URL:</strong> {originalUrl}
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>Short URL:</strong>{' '}
          <Link href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </Link>
        </Typography>

        <Typography variant="body2" color="textSecondary">
          <strong>Expires At:</strong> {new Date(expiry).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UrlCard;
