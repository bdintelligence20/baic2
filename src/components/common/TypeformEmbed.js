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

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const LazyLoadTrigger = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  cursor: pointer;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const TriggerButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: var(--primary-color-hover);
  }
`;

const TriggerText = styled.p`
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.1rem;
`;

const TypeformEmbed = ({ title = "Book Your Test Drive", subtitle = "Experience the power and comfort of our vehicles. Schedule your test drive today." }) => {
  const [utmData, setUtmData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        rootMargin: '100px 0px', // Load when 100px away from viewport
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load UTM data when in view
  useEffect(() => {
    if (inView && !utmData.hasUTMData) {
      const currentUTMData = getEnhancedUTMData();
      setUtmData(currentUTMData);
      console.log('TypeformEmbed: Enhanced UTM data for form embed:', currentUTMData);
    }
  }, [inView, utmData.hasUTMData]);

  // Load Typeform scripts only when user interacts or form is in view
  const loadTypeform = () => {
    if (isLoaded) return;
    
    setIsLoading(true);
    
    // Send analytics event
    const currentUTMData = utmData.hasUTMData ? utmData : getEnhancedUTMData();
    
    if (window.gtag) {
      window.gtag('event', 'lead_form_loaded', {
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
        event: 'lead_form_loaded',
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

    // Load Typeform script
    const script = document.createElement('script');
    script.src = 'https://embed.typeform.com/next/embed.js';
    script.async = true;
    
    script.onload = () => {
      setIsLoading(false);
      setIsLoaded(true);
    };
    
    script.onerror = () => {
      setIsLoading(false);
      console.error('Failed to load Typeform script');
    };
    
    document.body.appendChild(script);
  };

  // Auto-load when in view (with delay to prioritize above-the-fold content)
  useEffect(() => {
    if (inView && !isLoaded) {
      const timer = setTimeout(() => {
        loadTypeform();
      }, 1000); // 1 second delay to let critical content load first
      
      return () => clearTimeout(timer);
    }
  }, [inView, isLoaded]);

  // Create hidden fields for UTM data to pass to Typeform
  const getHiddenFields = () => {
    console.log('TypeformEmbed: getHiddenFields called with utmData:', utmData);
    console.log('TypeformEmbed: utmData.hasUTMData =', utmData.hasUTMData);
    
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
    console.log('TypeformEmbed: Final Typeform URL would be: https://form.typeform.com/to/01JPEYYA5810GD51WEN8QMQAEJ' + result);
    
    return result;
  };
  
  return (
    <EmbedSection id="typeform-section" ref={containerRef}>
      <EmbedContainer>
        <EmbedTitle>{title}</EmbedTitle>
        <EmbedSubtitle>{subtitle}</EmbedSubtitle>
        
        <TypeformContainer>
          {!isLoaded && !isLoading && (
            <LazyLoadTrigger onClick={loadTypeform}>
              <TriggerText>Ready to schedule your test drive?</TriggerText>
              <TriggerButton>Load Form</TriggerButton>
            </LazyLoadTrigger>
          )}
          
          {isLoading && <LoadingSpinner />}
          
          {isLoaded && (
            <div 
              data-tf-live="01JPEYYA5810GD51WEN8QMQAEJ"
              data-tf-width="100%"
              data-tf-height="100%"
              data-tf-opacity="100"
              data-tf-iframe-props="title=BAIC Test Drive Form"
              data-tf-medium="embed-widget"
              data-tf-hidden={getHiddenFields()}
            ></div>
          )}
        </TypeformContainer>
      </EmbedContainer>
    </EmbedSection>
  );
};

export default TypeformEmbed;
