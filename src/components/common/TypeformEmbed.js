import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { getEnhancedUTMData } from '../../utils/utmTracking';
import { loadTypeform } from '../../utils/scriptLoader';

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
  border-top: 4px solid #e60012;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const PlaceholderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
  }
`;

const PlaceholderIcon = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  background: #e60012;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const PlaceholderText = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const PlaceholderSubtext = styled.p`
  font-size: 0.9rem;
  color: #999;
  text-align: center;
`;

const TypeformEmbed = ({ title = "Book Your Test Drive", subtitle = "Experience the power and comfort of our vehicles. Schedule your test drive today." }) => {
  const [utmData, setUtmData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [typeformLoaded, setTypeformLoaded] = useState(false);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  
  // Generate unique ID for this instance to avoid conflicts
  const instanceId = useRef(`typeform-${Math.random().toString(36).substr(2, 9)}`).current;

  useEffect(() => {
    // Get enhanced UTM data when component mounts
    const currentUTMData = getEnhancedUTMData();
    setUtmData(currentUTMData);

    // Set up intersection observer for lazy loading
    if (containerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Stop observing once in view
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        },
        {
          rootMargin: '100px', // Start loading 100px before it comes into view
          threshold: 0.1
        }
      );

      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Create hidden fields object for UTM data to pass to Typeform programmatically
  const getHiddenFields = useCallback(() => {
    console.log('TypeformEmbed: getHiddenFields called with utmData:', utmData);
    console.log('TypeformEmbed: utmData.hasUTMData =', utmData.hasUTMData);
    
    if (!utmData.hasUTMData) {
      console.log('TypeformEmbed: No UTM data available, returning empty object');
      return {};
    }
    
    const hiddenFields = {};
    if (utmData.utm_source) hiddenFields.utm_source = utmData.utm_source;
    if (utmData.utm_medium) hiddenFields.utm_medium = utmData.utm_medium;
    if (utmData.utm_campaign) hiddenFields.utm_campaign = utmData.utm_campaign;
    if (utmData.utm_content) hiddenFields.utm_content = utmData.utm_content;
    if (utmData.utm_term) hiddenFields.utm_term = utmData.utm_term;
    
    console.log('TypeformEmbed: Generated hidden fields object:', hiddenFields);
    
    return hiddenFields;
  }, [utmData]);

  // Define sendAnalyticsEvents 
  const sendAnalyticsEvents = useCallback(() => {
    if (window.gtag) {
      window.gtag('event', 'lead_form_displayed', {
        event_category: 'Form',
        event_label: 'Test Drive Form Embed',
        utm_source: utmData.utm_source || 'direct',
        utm_medium: utmData.utm_medium || 'none',
        utm_campaign: utmData.utm_campaign || 'none',
        utm_content: utmData.utm_content || 'none',
        campaign_bucket: utmData.campaignBucket || 'other',
        target_model: utmData.targetModel || 'unknown',
        campaign_type: utmData.campaignType || 'other'
      });
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'lead_form_displayed',
        form_name: 'Test Drive Form Embed',
        utm_source: utmData.utm_source || 'direct',
        utm_medium: utmData.utm_medium || 'none', 
        utm_campaign: utmData.utm_campaign || 'none',
        utm_content: utmData.utm_content || 'none',
        campaign_bucket: utmData.campaignBucket || 'other',
        target_model: utmData.targetModel || 'unknown',
        campaign_type: utmData.campaignType || 'other',
        is_known_campaign: utmData.isKnownCampaign || false
      });
    }
  }, [utmData]);

  // Load Typeform when in view or when user clicks
  const handleLoadTypeform = useCallback(async () => {
    if (typeformLoaded || isLoading) return;
    
    setIsLoading(true);
    console.log(`Loading Typeform for instance: ${instanceId}`);
    
    try {
      await loadTypeform();
      
      // Use programmatic widget creation to avoid conflicts
      setTimeout(() => {
        try {
          if (window.tf && window.tf.createWidget) {
            const container = containerRef.current;
            if (container) {
              // Clear any existing content
              container.innerHTML = '';
              
              // Create unique widget programmatically  
              const widget = window.tf.createWidget('01JPEYYA5810GD51WEN8QMQAEJ', {
                container: container,
                width: '100%',
                height: '100%',
                opacity: 100,
                medium: 'embed-widget',
                hideHeaders: true,
                hideFooter: true,
                hidden: getHiddenFields()
              });
              
              if (widget) {
                console.log(`✅ Typeform widget created successfully for instance: ${instanceId}`);
                setTypeformLoaded(true);
                setIsLoading(false);
                sendAnalyticsEvents();
              } else {
                throw new Error('Widget creation failed');
              }
            }
          } else {
            throw new Error('Typeform API not available');
          }
        } catch (error) {
          console.error(`❌ Failed to create Typeform widget for ${instanceId}:`, error);
          setIsLoading(false);
          setTypeformLoaded(true); // Show fallback
        }
      }, 1000);
      
    } catch (error) {
      console.error(`❌ Failed to load Typeform script for ${instanceId}:`, error);
      setIsLoading(false);
      setTypeformLoaded(true);
    }
  }, [instanceId, isLoading, typeformLoaded, sendAnalyticsEvents, getHiddenFields]);

  // Auto-load when in view
  useEffect(() => {
    if (isInView && !typeformLoaded && !isLoading) {
      handleLoadTypeform();
    }
  }, [isInView, typeformLoaded, isLoading, handleLoadTypeform]);
  
  return (
    <EmbedSection id="typeform-section">
      <EmbedContainer>
        <EmbedTitle>{title}</EmbedTitle>
        <EmbedSubtitle>{subtitle}</EmbedSubtitle>
        
        <TypeformContainer ref={containerRef}>
          {!typeformLoaded && !isLoading && (
            <PlaceholderContainer onClick={handleLoadTypeform}>
              <PlaceholderIcon>📋</PlaceholderIcon>
              <PlaceholderText>Load Test Drive Form</PlaceholderText>
              <PlaceholderSubtext>Click to load the booking form</PlaceholderSubtext>
            </PlaceholderContainer>
          )}
          
          {isLoading && <LoadingSpinner />}
          
          {typeformLoaded && (
            <div 
              id={instanceId}
              style={{ width: '100%', height: '100%' }}
              data-instance-id={instanceId}
            ></div>
          )}
        </TypeformContainer>
      </EmbedContainer>
    </EmbedSection>
  );
};

export default TypeformEmbed;
