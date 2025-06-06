import React from 'react';
import styled from 'styled-components';
import Placeholder from '../../../components/common/Placeholder';

const PageContainer = styled.div`
  width: 100%;
  padding-top: 80px; /* Account for fixed header */
`;

const HeroSection = styled.div`
  width: 100%;
  height: 500px;
  background-image: url('/images/hero/web banners/WEBSITE_1920X1080PX_HOMEPAGE3 (2)b30.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  color: white;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: absolute;
  z-index: 2;
  text-align: left;
  color: #333;
  padding: 1.5rem 2rem;
  bottom: 3rem;
  left: 3rem;
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
  @media (max-width: 1200px) {
    left: 2rem;
    bottom: 2.5rem;
  }
  
  @media (max-width: 992px) {
    left: 1.5rem;
    bottom: 2rem;
    padding: 1.2rem 1.8rem;
  }
  
  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 1.5rem;
    flex-direction: column;
    text-align: center;
    width: 90%;
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.2rem;
    bottom: 1.5rem;
  }
`;

const ModelName = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 1px;
  margin-right: 1.5rem;
  text-transform: uppercase;
  
  @media (max-width: 1200px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 992px) {
    font-size: 1.4rem;
    margin-right: 1.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }
`;

const TagLine = styled.p`
  font-size: 1.4rem;
  font-weight: 300;
  margin: 0;
  letter-spacing: 1px;
  
  @media (max-width: 1200px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
`;

const ComingSoonContainer = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin: 2rem 0;
`;

const ComingSoonTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const ComingSoonText = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const NotifyButton = styled.button`
  background-color: transparent;
  color: #222;
  border: 2px solid #222;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    background-color: #222;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const B30Page = () => {
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <ModelName>B30</ModelName>
          <TagLine>The Future of Urban Mobility</TagLine>
        </HeroContent>
      </HeroSection>
      
      <ContentSection>
        <ComingSoonContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
          <ComingSoonText>
            We're excited to announce that the all-new BAIC B30 is coming soon to our lineup.
            Stay tuned for more information about this innovative vehicle that will redefine
            urban mobility with its cutting-edge features and elegant design.
          </ComingSoonText>
          <NotifyButton>Notify Me</NotifyButton>
        </ComingSoonContainer>
        
        <Placeholder 
          label="B30 Specifications" 
          height="400px" 
          bgColor="#f5f5f5" 
          textColor="#333"
        />
      </ContentSection>
    </PageContainer>
  );
};

export default B30Page;
