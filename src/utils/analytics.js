import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from "react-router-dom";

function initialiseAnalytics() {
	const TRACKING_ID = "G-WFZ1GG77V2";
  ReactGA.initialize(TRACKING_ID);
}

export function usePageTracking() {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initialiseAnalytics();
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
			console.log('location.pathname + location.search', location.pathname + location.search)
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
}
