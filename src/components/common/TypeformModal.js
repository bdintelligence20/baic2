import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useModal } from '../../context/ModalContext';
import { getEnhancedUTMData } from '../../utils/utmTracking';

// Global styles to ensure Typeform takes up full height with mobile viewport support
const TypeformStyles = createGlobalStyle`
  .tf-v1-popup, 
  .tf-v1-popup-wrapper, 
  .tf-v1-iframe-wrapper, 
  .tf-v1-iframe {
    height: 100vh !important;
    height: 100dvh !important; /* Dynamic viewport height for mobile */
    width: 100vw !important;
    max-height: none !important;
    max-width: none !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }
  
  /* Mobile specific adjustments */
  @media (max-width: 768px) {
    .tf-v1-popup, 
    .tf-v1-popup-wrapper, 
    .tf-v1-iframe-wrapper, 
    .tf-v1-iframe {
      height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom)) !important;
      height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom)) !important;
      min-height: calc(100vh - 120px) !important; /* Fallback for older browsers */
      padding-top: env(safe-area-inset-top) !important;
      padding-bottom: env(safe-area-inset-bottom) !important;
    }
  }
  
  /* iOS specific fixes */
  @supports (-webkit-touch-callout: none) {
    .tf-v1-popup, 
    .tf-v1-popup-wrapper, 
    .tf-v1-iframe-wrapper, 
    .tf-v1-iframe {
      height: -webkit-fill-available !important;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height for mobile */
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  
  /* Mobile specific adjustments */
  @media (max-width: 768px) {
    height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    min-height: calc(100vh - 120px); /* Fallback for older browsers */
  }
  
  /* iOS specific fixes */
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;

const ModalContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height for mobile */
  background-color: transparent;
  overflow: hidden;
  
  /* Mobile specific adjustments */
  @media (max-width: 768px) {
    height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    min-height: calc(100vh - 120px); /* Fallback for older browsers */
  }
  
  /* iOS specific fixes */
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: #e60012;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  font-size: 18px;
  font-weight: bold;
  
  &:hover {
    background-color: #c5000f;
  }
`;

const TypeformContainer = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height for mobile */
  position: fixed;
  top: 0;
  left: 0;
  
  /* Mobile specific adjustments */
  @media (max-width: 768px) {
    height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    min-height: calc(100vh - 120px); /* Fallback for older browsers */
  }
  
  /* iOS specific fixes */
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;

const TypeformModal = () => {
  const { isTypeformModalOpen: isOpen, closeTypeformModal: onClose } = useModal();
  const [utmData, setUtmData] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Get enhanced UTM data when modal opens (includes campaign buckets)
      const currentUTMData = getEnhancedUTMData();
      setUtmData(currentUTMData);
      
      // Send conversion event to Google Analytics/GTM with enhanced data
      if (window.gtag) {
        window.gtag('event', 'lead_form_opened', {
          event_category: 'Form',
          event_label: 'Test Drive Form',
          utm_source: currentUTMData.utm_source || 'direct',
          utm_medium: currentUTMData.utm_medium || 'none',
          utm_campaign: currentUTMData.utm_campaign || 'none',
          utm_content: currentUTMData.utm_content || 'none',
          campaign_bucket: currentUTMData.campaignBucket || 'other',
          target_model: currentUTMData.targetModel || 'unknown',
          campaign_type: currentUTMData.campaignType || 'other'
        });
      }

      // Send to GTM dataLayer with enhanced campaign data
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'lead_form_opened',
          form_name: 'Test Drive Form',
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

      console.log('TypeformModal: Enhanced UTM data for form submission:', currentUTMData);
      console.log('TypeformModal: Has UTM Data?', currentUTMData.hasUTMData);
      console.log('TypeformModal: Campaign Analysis:', {
        campaign_bucket: currentUTMData.campaignBucket,
        target_model: currentUTMData.targetModel,
        campaign_type: currentUTMData.campaignType,
        is_known_campaign: currentUTMData.isKnownCampaign
      });
      console.log('TypeformModal: Individual UTM values:', {
        utm_source: currentUTMData.utm_source,
        utm_medium: currentUTMData.utm_medium,
        utm_campaign: currentUTMData.utm_campaign,
        utm_content: currentUTMData.utm_content,
        utm_term: currentUTMData.utm_term
      });

      // Create and append the Typeform script when modal is opened
      const script = document.createElement('script');
      script.src = 'https://embed.typeform.com/next/embed.js';
      script.async = true;
      document.body.appendChild(script);
      
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      // Add additional styling to ensure Typeform takes up full height
      const style = document.createElement('style');
      style.textContent = `
        html, body {
          height: 100% !important;
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `;
      document.head.appendChild(style);
      
      // Clean up function
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
        // Restore body scrolling when modal is closed
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Create hidden fields for UTM data to pass to Typeform
  const getHiddenFields = () => {
    console.log('TypeformModal: getHiddenFields called with utmData:', utmData);
    console.log('TypeformModal: utmData.hasUTMData =', utmData.hasUTMData);
    
    if (!utmData.hasUTMData) {
      console.log('TypeformModal: No UTM data available, returning empty string');
      return '';
    }
    
    const hiddenFields = [];
    if (utmData.utm_source) hiddenFields.push(`utm_source=${encodeURIComponent(utmData.utm_source)}`);
    if (utmData.utm_medium) hiddenFields.push(`utm_medium=${encodeURIComponent(utmData.utm_medium)}`);
    if (utmData.utm_campaign) hiddenFields.push(`utm_campaign=${encodeURIComponent(utmData.utm_campaign)}`);
    if (utmData.utm_content) hiddenFields.push(`utm_content=${encodeURIComponent(utmData.utm_content)}`);
    if (utmData.utm_term) hiddenFields.push(`utm_term=${encodeURIComponent(utmData.utm_term)}`);
    
    const result = hiddenFields.length > 0 ? `#${hiddenFields.join('&')}` : '';
    console.log('TypeformModal: Generated hidden fields string:', result);
    console.log('TypeformModal: Final Typeform URL would be: https://form.typeform.com/to/01JPEYYA5810GD51WEN8QMQAEJ' + result);
    
    return result;
  };
  
  if (!isOpen) return null;
  
  return (
    <>
      <TypeformStyles />
      <ModalOverlay>
        <ModalContent>
          <CloseButton onClick={onClose}>×</CloseButton>
          <TypeformContainer>
            <div 
              data-tf-live="01JPEYYA5810GD51WEN8QMQAEJ"
              data-tf-width="100%"
              data-tf-height="100%"
              data-tf-opacity="100"
              data-tf-iframe-props="title=BAIC Test Drive Form"
              data-tf-auto-focus
              data-tf-medium="embed-fullpage"
              data-tf-full-screen
              data-tf-hidden={getHiddenFields()}
            ></div>
          </TypeformContainer>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default TypeformModal;
