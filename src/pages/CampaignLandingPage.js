import React from 'react';
import styled from 'styled-components';
import TypeformEmbed from '../components/common/TypeformEmbed';

const LandingPageContainer = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 100px 1rem 3rem;
  }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const MainHeadline = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background-color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const SubHeadline = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  margin-top: 2rem;
  margin-bottom: 3rem;
  color: #666;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const FormSection = styled.section`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CampaignLandingPage = () => {
  return (
    <LandingPageContainer>
      <HeroSection>
        <MainHeadline>Built for the Brave!</MainHeadline>
        <SubHeadline>Book a Test Drive below.</SubHeadline>
      </HeroSection>
      
      <FormSection>
        <TypeformEmbed 
          title="Ready to Experience BAIC?"
          subtitle="Book your test drive today and discover why BAIC vehicles are the perfect choice for your journey."
        />
      </FormSection>
    </LandingPageContainer>
  );
};

export default CampaignLandingPage;
