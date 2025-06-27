import { Card, CardContent, Typography, Box } from '@mui/material';

const UrlCard = ({ originalUrl, shortUrl, expiry }) => {
  return (
    <Card sx={{ mb: 3, p: 2 }}>
      <CardContent>
        <Typography variant="subtitle1"><strong>Original URL:</strong> {originalUrl}</Typography>
        <Typography variant="subtitle1" color="primary">
          <strong>Short URL:</strong>{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </Typography>
        <Typography variant="body2"><strong>Expires At:</strong> {new Date(expiry).toLocaleString()}</Typography>
      </CardContent>
    </Card>
  );
};

export default UrlCard;
