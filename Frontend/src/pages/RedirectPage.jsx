import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Log } from '../utils/logMiddleware';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const allLinks = JSON.parse(localStorage.getItem('shortlinks') || '{}');
    const entry = allLinks[shortcode];

    if (!entry) {
      Log("frontend", "error", "component", `Shortcode not found: ${shortcode}`);
      alert("Shortcode not found.");
      navigate('/');
      return;
    }

    const now = new Date();
    const expiry = new Date(entry.expiry);

    if (now > expiry) {
      Log("frontend", "warn", "component", `Expired link accessed: ${shortcode}`);
      alert("This link has expired.");
      navigate('/');
      return;
    }

    // Log click event
    const click = {
      timestamp: now.toISOString(),
      referrer: document.referrer || 'Direct',
      location: 'Unknown', // Optional: use a geo-IP API if allowed
    };

    entry.clicks = entry.clicks || [];
    entry.clicks.push(click);

    // Update localStorage
    const updatedLinks = {
      ...allLinks,
      [shortcode]: entry,
    };
    localStorage.setItem('shortlinks', JSON.stringify(updatedLinks));

    Log("frontend", "info", "component", `Redirected: ${shortcode} -> ${entry.originalUrl}`);

    // Redirect to the original URL
    window.location.href = entry.originalUrl;
  }, [shortcode, navigate]);

  return null;
};

export default RedirectPage;
