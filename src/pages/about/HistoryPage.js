import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the Company Overview page which now contains the timeline
    navigate('/about/company-overview');
  }, [navigate]);
  
  return null; // This component will not render as it redirects immediately
};

export default HistoryPage;
