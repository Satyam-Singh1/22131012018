import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import RedirectPage from './pages/RedirectPage';
import { Log } from './middleware/logMiddleware';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === '/') {
      Log('frontend', 'info', 'page', 'Visited Home Page');
    } else if (path === '/stats') {
      Log('frontend', 'info', 'page', 'Visited Stats Page');
    } else if (/^\/[a-zA-Z0-9]+$/.test(path)) {
      Log('frontend', 'info', 'page', `Visited Redirect Page with shortcode: ${path.slice(1)}`);
    } else {
      Log('frontend', 'warn', 'page', `Visited unknown route: ${path}`);
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/:shortcode" element={<RedirectPage />} />
    </Routes>
  );
};

export default App;
