import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getUTMData, sendUTMToDataLayer } from '../utils/utmTracking';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ThankYouCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 60px 40px;
  text-align: center;
  max-width: 600px;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #e60012 0%, #ff4757 100%);
  }
`;

const CheckIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  animation: checkAnimation 0.6s ease-out;
  
  @keyframes checkAnimation {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  &::after {
    content: '✓';
    color: white;
    font-size: 40px;
    font-weight: bold;
  }
`;

const MainTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 40px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InfoSection = styled.div`
  background: #f8f9fc;
  border-radius: 15px;
  padding: 30px;
  margin: 30px 0;
  border-left: 4px solid #e60012;
`;

const InfoTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: 600;
`;

const InfoText = styled.p`
  color: #5a6c7d;
  line-height: 1.6;
  margin-bottom: 10px;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const ContactCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #f1f2f6;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #e60012;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(230, 0, 18, 0.1);
  }
`;

const ContactTitle = styled.h4`
  color: #e60012;
  font-size: 1.1rem;
  margin-bottom: 8px;
  font-weight: 600;
`;

const ContactDetail = styled.p`
  color: #5a6c7d;
  font-size: 0.95rem;
  margin: 5px 0;
`;

const HomeButton = styled.button`
  background: linear-gradient(135deg, #e60012 0%, #ff4757 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 30px;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(230, 0, 18, 0.3);
  }
`;

const ThankYouPage = () => {
  useEffect(() => {
    // Track conversion completion
    const utmData = getUTMData();
    
    // Send conversion event to Google Analytics
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-16850199888/conversion',
        event_category: 'Test Drive',
        event_label: 'Thank You Page Viewed',
        utm_source: utmData.utm_source || 'direct',
        utm_medium: utmData.utm_medium || 'none',
        utm_campaign: utmData.utm_campaign || 'none',
        utm_content: utmData.utm_content || 'none'
      });
    }

    // Send to GTM dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'test_drive_conversion_complete',
        page_title: 'Thank You - Test Drive Request',
        utm_source: utmData.utm_source || 'direct',
        utm_medium: utmData.utm_medium || 'none',
        utm_campaign: utmData.utm_campaign || 'none',
        utm_content: utmData.utm_content || 'none'
      });
    }

    // Send UTM data to dataLayer
    sendUTMToDataLayer();

    console.log('Thank You Page: Conversion tracked with UTM data:', utmData);
  }, []);

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <Container>
      <ThankYouCard>
        <CheckIcon />
        
        <MainTitle>Thank You!</MainTitle>
        <Subtitle>
          Your test drive request has been successfully submitted. 
          We're excited to help you experience the BAIC difference!
        </Subtitle>


        <HomeButton onClick={handleHomeClick}>
          Return to Homepage
        </HomeButton>
      </ThankYouCard>
    </Container>
  );
};

export default ThankYouPage;
