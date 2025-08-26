import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { getEnhancedUTMData } from '../../utils/utmTracking';

const EmbedSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-top: 1px solid #dee2e6;
`;

const EmbedContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const EmbedTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EmbedSubtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #666;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const TypeformContainer = styled.div`
  width: 100%;
  height: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    height: 500px;
  }
  
  @media (max-width: 480px) {
    height: 450px;
  }
`;

const TypeformEmbed = ({ title = "Book Your Test Drive", subtitle = "Experience the power and comfort of our vehicles. Schedule your test drive today." }) => {
  const [utmData, setUtmData] = useState({});
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Get UTM data when component mounts
    const currentUTMData = getEnhancedUTMData();
    setUtmData(currentUTMData);
    
    // Load Typeform script
    const script = document.createElement('script');
    script.src = 'https://embed.typeform.com/next/embed.js';
    script.async = true;
    script.onload = () => {
      console.log('✅ Typeform script loaded');
      setScriptLoaded(true);
      
      // Send analytics events
      if (window.gtag) {
        window.gtag('event', 'lead_form_displayed', {
          event_category: 'Form',
          event_label: 'Test Drive Form Embed',
          utm_source: currentUTMData.utm_source || 'direct',
          utm_medium: currentUTMData.utm_medium || 'none',
          utm_campaign: currentUTMData.utm_campaign || 'none',
          utm_content: currentUTMData.utm_content || 'none',
          campaign_bucket: currentUTMData.campaignBucket || 'other',
          target_model: currentUTMData.targetModel || 'unknown',
          campaign_type: currentUTMData.campaignType || 'other'
        });
      }

      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'lead_form_displayed',
          form_name: 'Test Drive Form Embed',
          utm_source: currentUTMData.utm_source || 'direct',
          utm_medium: currentUTMData.utm_medium || 'none', 
          utm_campaign: currentUTMData.utm_campaign || 'none',
          utm_content: currentUTMData.utm_content || 'none',
          campaign_bucket: currentUTMData.campaignBucket || 'other',
          target_model: currentUTMData.targetModel || 'unknown',
          campaign_type: currentUTMData.campaignType || 'other',
          is_known_campaign: currentUTMData.isKnownCampaign || false
        });
      }
    };
    
    script.onerror = () => {
      console.error('Failed to load Typeform script');
    };
    
    document.body.appendChild(script);
    
    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Create hidden fields for UTM data - same as TypeformModal
  const getHiddenFields = () => {
    console.log('TypeformEmbed: getHiddenFields called with utmData:', utmData);
    
    if (!utmData.hasUTMData) {
      console.log('TypeformEmbed: No UTM data available, returning empty string');
      return '';
    }
    
    const hiddenFields = [];
    if (utmData.utm_source) hiddenFields.push(`utm_source=${encodeURIComponent(utmData.utm_source)}`);
    if (utmData.utm_medium) hiddenFields.push(`utm_medium=${encodeURIComponent(utmData.utm_medium)}`);
    if (utmData.utm_campaign) hiddenFields.push(`utm_campaign=${encodeURIComponent(utmData.utm_campaign)}`);
    if (utmData.utm_content) hiddenFields.push(`utm_content=${encodeURIComponent(utmData.utm_content)}`);
    if (utmData.utm_term) hiddenFields.push(`utm_term=${encodeURIComponent(utmData.utm_term)}`);
    
    const result = hiddenFields.length > 0 ? `#${hiddenFields.join('&')}` : '';
    console.log('TypeformEmbed: Generated hidden fields string:', result);
    
    return result;
  };
  
  return (
    <EmbedSection id="typeform-section">
      <EmbedContainer>
        <EmbedTitle>{title}</EmbedTitle>
        <EmbedSubtitle>{subtitle}</EmbedSubtitle>
        
        <TypeformContainer ref={containerRef}>
          <div 
            data-tf-live="01JPEYYA5810GD51WEN8QMQAEJ"
            data-tf-width="100%"
            data-tf-height="100%"
            data-tf-opacity="100"
            data-tf-iframe-props="title=BAIC Test Drive Form"
            data-tf-medium="embed-inline"
            data-tf-hidden={getHiddenFields()}
          ></div>
        </TypeformContainer>
      </EmbedContainer>
    </EmbedSection>
  );
};

export default TypeformEmbed;
