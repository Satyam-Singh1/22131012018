import { useEffect, useState } from 'react';
import {
  Container, Typography, Card, CardContent, Table, TableHead,
  TableRow, TableCell, TableBody, Divider, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Log } from '../middleware/logMiddleware';

const StatsPage = () => {
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedLinks = JSON.parse(localStorage.getItem('shortlinks') || '{}');
      const entries = Object.entries(storedLinks).map(([code, data]) => ({
        shortcode: code,
        ...data,
      }));

      setUrls(entries);

      Log("frontend", "info", "component", `Loaded ${entries.length} shortened URLs`);
    } catch (error) {
      Log("frontend", "error", "component", `Failed to load stats: ${error.message}`);
    }
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener Analytics
      </Typography>

      <Button variant="outlined" sx={{ my: 2 }} onClick={() => navigate('/')}>
        Back to Shortener
      </Button>

      {urls.length === 0 ? (
        <Typography>No shortened URLs found.</Typography>
      ) : (
        urls.map((item, idx) => (
          <Card sx={{ mt: 4 }} key={idx}>
            <CardContent>
              <Typography variant="h6">Shortcode: {item.shortcode}</Typography>
              <Typography>
                Short URL:{" "}
                <a
                  href={`http://localhost:3000/${item.shortcode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://localhost:3000/{item.shortcode}
                </a>
              </Typography>
              <Typography>Original URL: {item.originalUrl}</Typography>
              <Typography>
                Created: {new Date(item.createdAt).toLocaleString()}
              </Typography>
              <Typography>
                Expires: {new Date(item.expiry).toLocaleString()}
              </Typography>
              <Typography>Total Clicks: {item.clicks.length}</Typography>

              <Divider sx={{ my: 2 }} />

              {item.clicks.length > 0 ? (
                <>
                  <Typography variant="subtitle1">Click Details:</Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Referrer</TableCell>
                        <TableCell>Location</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item.clicks.map((click, i) => (
                        <TableRow key={i}>
                          <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                          <TableCell>{click.referrer || 'Direct'}</TableCell>
                          <TableCell>{click.location || 'Unknown'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <Typography>No clicks recorded yet.</Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default StatsPage;
