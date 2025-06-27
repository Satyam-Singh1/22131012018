import { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box
} from '@mui/material';
import UrlForm from '../components/UrlForm';
import UrlCard from '../components/UrlCard';
import { Log } from '../../../Middleware/logMiddleware.js';
import { generateShortcode } from '../utils/generateShortcode';
import { isValidURL, isValidShortcode } from '../utils/validate';

const HomePage = () => {
  const [inputs, setInputs] = useState([
    { url: '', validity: '', shortcode: '', error: '' },
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    updated[index].error = '';
    setInputs(updated);
  };

  const handleAddInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', validity: '', shortcode: '', error: '' }]);
    } else {
      Log("frontend", "warn", "component", "User tried to add more than 5 input rows");
    }
  };

  const handleShorten = () => {
    try {
      const updatedLinks = JSON.parse(localStorage.getItem('shortlinks') || '{}');
      const now = new Date();
      const newResults = [];
      let valid = true;

      const newInputs = inputs.map((input) => {
        const { url, validity, shortcode } = input;
        const code = shortcode.trim() || generateShortcode();

        // Validate URL
        if (!isValidURL(url)) {
          Log("frontend", "warn", "component", `Invalid URL: ${url}`);
          valid = false;
          return { ...input, error: 'Invalid URL format' };
        }

        // Validate shortcode
        if (!isValidShortcode(code)) {
          Log("frontend", "warn", "component", `Invalid shortcode: ${code}`);
          valid = false;
          return { ...input, error: 'Shortcode must be 4-10 alphanumeric characters' };
        }

        // Check for shortcode collision
        if (updatedLinks[code]) {
          Log("frontend", "warn", "component", `Shortcode collision: ${code}`);
          valid = false;
          return { ...input, error: 'Shortcode already exists' };
        }

        // All good, store link
        const createdAt = now.toISOString();
        const expiry = new Date(now.getTime() + ((parseInt(validity) || 30) * 60000)).toISOString();

        const shortUrl = `${window.location.origin}/${code}`;
        updatedLinks[code] = {
          originalUrl: url,
          createdAt,
          expiry,
          clicks: [],
        };

        newResults.push({
          originalUrl: url,
          shortUrl,
          expiry,
        });

        Log("frontend", "info", "component", `Shortened URL created: ${code} -> ${url}`);
        return { url: '', validity: '', shortcode: '', error: '' };
      });

      if (!valid) {
        setInputs(newInputs);
        return;
      }

      setInputs([{ url: '', validity: '', shortcode: '', error: '' }]);
      setResults(newResults);
      localStorage.setItem('shortlinks', JSON.stringify(updatedLinks));
    } catch (err) {
      Log("frontend", "error", "component", `Unexpected error in shortening: ${err.message}`);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      {inputs.map((input, index) => (
        <UrlForm
          key={index}
          index={index}
          input={input}
          onChange={handleChange}
        />
      ))}

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={handleShorten}>
          Shorten URLs
        </Button>
        <Button variant="outlined" onClick={handleAddInput}>
          Add More
        </Button>
      </Box>

      {results.map((res, idx) => (
        <UrlCard
          key={idx}
          originalUrl={res.originalUrl}
          shortUrl={res.shortUrl}
          expiry={res.expiry}
        />
      ))}
    </Container>
  );
};

export default HomePage;
