import React from 'react';
import styled from 'styled-components';

// Styled components for the finance page
const PageContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

// Hero section styling
const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 70vh;
    min-height: 500px;
  }
  
  @media (max-width: 480px) {
    height: 60vh;
    min-height: 400px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 20, 40, 0.8), rgba(0, 20, 40, 0.4));
  z-index: 1;
`;

const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 5rem;
  max-width: 800px;
  
  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

// Finance intro section styling
const FinanceIntroSection = styled.section`
  padding: 5rem 0;
  background-color: white;
  text-align: center;
`;

const FinanceIntroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FinanceIntroTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const FinanceIntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Apply online section styling
const ApplyOnlineSection = styled.section`
  padding: 5rem 0;
  background-color: #f0f0f0;
`;

const ApplyOnlineWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ApplyOnlineContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ApplyOnlineContent = styled.div`
  flex: 1;
  padding: 3rem;
  text-align: center;
  
  @media (max-width: 992px) {
    padding: 2.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

const ApplyOnlineImageContainer = styled.div`
  flex: 1;
  position: relative;
  min-height: 450px;
  
  @media (max-width: 992px) {
    min-height: 350px;
  }
  
  @media (max-width: 480px) {
    min-height: 300px;
  }
`;

const ApplyOnlineImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const ApplyOnlineOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 100, 0.3), rgba(0, 0, 100, 0.1));
`;

const ApplyOnlineTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const ApplyOnlineText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ApplyButton = styled.a`
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: #333;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  margin: 2rem 0;
  width: 100%;
  max-width: 300px;
  
  &:hover {
    background-color: #222;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  max-width: 150px;
  height: auto;
`;

const DisclaimerText = styled.p`
  font-size: 0.75rem;
  color: #777;
  text-align: left;
  line-height: 1.4;
  max-width: 300px;
  padding-left:8px;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FinancePage = () => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroImage src="/images/vehicles/x55-plus/gallery/baic_exterior_x55_plus_3.jpg" alt="BAIC Finance" />
        <HeroBackground />
        <HeroContent>
          <HeroTitle>BAIC FINANCE OPTIONS</HeroTitle>
        </HeroContent>
      </HeroSection>
      
      {/* Finance Intro Section */}
      <FinanceIntroSection>
        <FinanceIntroContainer>
          <FinanceIntroTitle>BAIC FINANCE</FinanceIntroTitle>
          <FinanceIntroText>
            Getting behind the wheel of your BAIC is an exciting adventure. That's why we offer a variety 
            of financial solutions to fit your needs, just like the unique style and features of every BAIC.
          </FinanceIntroText>
        </FinanceIntroContainer>
      </FinanceIntroSection>
      
      {/* Apply Online Section */}
      <ApplyOnlineSection>
        <ApplyOnlineWrapper>
          <ApplyOnlineContainer>
            <ApplyOnlineContent>
              <ApplyOnlineTitle>APPLYING ONLINE</ApplyOnlineTitle>
              <ApplyOnlineText>
                Ready to start your BAIC journey?
              </ApplyOnlineText>
              <ApplyOnlineText>
                Our online application process is seamless and straightforward.
              </ApplyOnlineText>
              <ApplyOnlineText>
                Take your first step towards owning a BAIC.
              </ApplyOnlineText>
              <ApplyButton href="https://efinancing.co.za/vehiclefin/applyonline/getting-started?origin=baic" target="_blank" rel="noopener noreferrer">
                Apply Online
              </ApplyButton>
              <FooterContainer>
                <LogoContainer>
                  <Logo src="/images/finance/Screenshot 2025-05-30 123238.png" alt="ABSA BAIC Finance" />
                </LogoContainer>
                <DisclaimerText>
                  ABSA Vehicle and Asset Finance (a division of ABSA)
                  Authorised Financial Service Provider and registered credit provider (NCRCP7)
                </DisclaimerText>
              </FooterContainer>
            </ApplyOnlineContent>
            
            <ApplyOnlineImageContainer>
              <ApplyOnlineImage src="/images/vehicles/x55-plus/gallery/baic-x55-plus-overview9.jpg" alt="BAIC Finance Application" />
              <ApplyOnlineOverlay />
            </ApplyOnlineImageContainer>
          </ApplyOnlineContainer>
        </ApplyOnlineWrapper>
      </ApplyOnlineSection>
    </PageContainer>
  );
};

export default FinancePage;
