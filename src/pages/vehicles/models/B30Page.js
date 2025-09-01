import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeritageSection from '../../../components/sections/HeritageSection';
import { useModal } from '../../../context/ModalContext';
import ResponsiveImage from '../../../components/common/ResponsiveImage';

const PageContainer = styled.div`
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  position: relative;
  height: 80vh;
  min-height: 600px;
  background-color: #000;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 62px; /* Add margin to account for fixed header height */
  
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
  background-image: url('/images/models/b30/WEBSITE LANDSCAPE B30.jpg');
  background-size: cover;
  background-position: center 50%;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.05) 100%);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: absolute;
  z-index: 2;
  left: 8%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  
  @media (max-width: 1200px) {
    left: 7%;
    gap: 18px;
  }
  
  @media (max-width: 768px) {
    left: 6%;
    gap: 15px;
    align-items: center;
  }
  
  @media (max-width: 480px) {
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    gap: 12px;
    align-items: center;
    width: 90%;
  }
`;

const HeroHeadline = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: left;
  line-height: 1.3;
  
  @media (max-width: 1200px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const HeroSubheadline = styled.p`
  font-size: 1rem;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  max-width: 500px;
  text-align: left;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    text-align: center;
    max-width: 400px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const LogoContainer = styled.div`
  max-width: 225px;
  height: auto;
  
  @media (max-width: 1200px) {
    max-width: 188px;
  }
  
  @media (max-width: 768px) {
    max-width: 150px;
  }
  
  @media (max-width: 480px) {
    max-width: 113px;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    gap: 1.2rem;
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

const CTAButtonScroll = styled.button`
  background-color: ${props => props.$primary ? 'rgba(230, 0, 18, 0.9)' : 'rgba(255, 255, 255, 0.15)'};
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: ${props => props.$primary ? '2px solid rgba(230, 0, 18, 0.9)' : '2px solid rgba(255, 255, 255, 0.3)'};
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.$primary ? 'rgba(230, 0, 18, 1)' : 'rgba(255, 255, 255, 0.25)'};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    border-color: ${props => props.$primary ? 'rgba(230, 0, 18, 1)' : 'rgba(255, 255, 255, 0.5)'};
  }
  
  @media (max-width: 992px) {
    padding: 0.9rem 1.8rem;
    font-size: 0.85rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
    padding: 1rem;
    font-size: 0.85rem;
  }
`;

const FeatureSection = styled.section`
  padding: 0;
  margin: 0;
  background-color: ${props => props.$dark ? '#d6dfe8' : '#fff'};
  color: ${props => props.$dark ? '#333' : '#000'};
  position: relative;
  overflow: hidden;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const FeatureContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: ${props => props.$reverse ? 'row-reverse' : 'row'};
  align-items: stretch;
  height: 500px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`;

const FeatureContent = styled.div`
  flex: 1;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  
  @media (max-width: 992px) {
    padding: 3rem 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 3rem 2rem;
    max-width: 100%;
    width: 100%;
  }
`;

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const FeatureSubtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: center;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const FeatureCTAButtonScroll = styled.button`
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: none;
  display: inline-block;
  width: fit-content;
  max-width: 200px;
  text-align: center;
  margin: 0 auto;
  align-self: center;
  cursor: pointer;
  
  &:hover {
    background-color: var(--primary-color-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 992px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.8rem;
    width: fit-content;
    max-width: 180px;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
    width: fit-content;
    max-width: 160px;
    display: block;
  }
  
  @media (max-width: 480px) {
    width: fit-content;
    max-width: 150px;
  }
`;

const FeatureImage = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    object-position: center;
    margin: 0;
    padding: 0;
  }
  
  @media (max-width: 1024px) {
    height: 300px;
    min-height: 300px;
    margin: 0;
    padding: 0;
    
    img {
      position: relative;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  }
`;


const TechSpecsSection = styled.section`
  padding: 8rem 0;
  background-color: #fff;
`;

const TechSpecsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const TechSpecsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: var(--primary-color);
    margin: 1rem auto 0;
  }
`;

const TechSpecsDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
  color: #666;
`;

const TechSpecsImageContainer = styled.div`
  margin: 0 auto 3rem;
  text-align: center;
`;

const IntroSection = styled.section`
  padding: 8rem 0;
  background-color: #fff;
  color: #333;
`;

const IntroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const IntroTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto 3rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const IntroImageContainer = styled.div`
  margin: 3rem auto;
  max-width: 800px;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const TypeformSection = styled.section`
  padding: 6rem 0;
  background-color: #f8f9fa;
`;

const TypeformContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const TypeformTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const TypeformSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const TypeformEmbed = styled.div`
  width: 100%;
  min-height: 500px;
  margin: 0 auto;
`;

const B30Page = () => {
  const { openTypeformModal } = useModal();
  
  // Load typeform script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script if component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  // Scroll to form function
  const scrollToForm = () => {
    const element = document.getElementById('typeform-section');
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };


  return (
    <PageContainer>
      <HeroSection>
        <HeroBackground />
        <HeroOverlay />
        <HeroContent>
          <LogoContainer>
            <ResponsiveImage 
              src="/images/models/b30/LOGO WHITE - COMING SOON (1).png" 
              alt="B30 Coming Soon Logo"
              priority={true}
              objectFit="contain"
              sizes="450px"
            />
          </LogoContainer>
          
          <HeroHeadline>A New Kind of Courage.<br />A New Kind of Car.</HeroHeadline>
          <HeroSubheadline>The empowering SUV is on the horizon. A new perspective dawns, where capability meets aspiration.</HeroSubheadline>
          
          <CTAContainer>
            <CTAButtonScroll onClick={scrollToForm} $primary>Get The Spark. Sign Up Now.</CTAButtonScroll>
          </CTAContainer>
        </HeroContent>
      </HeroSection>
      
      <IntroSection>
        <IntroContainer>
          <IntroTitle>Hybrid Leader in Versatility</IntroTitle>
          <IntroText>
            A new presence is stirring. For those who dare to create their own path, the BAIC B30 is coming. With impressive design, intelligent systems and dual power, it delivers a comfortable and confident journey for both city and off-road.
          </IntroText>
          
          <IntroImageContainer>
            <ResponsiveImage 
              src="/images/models/b30/B30 PAGE.jpg" 
              alt="BAIC B30 - Hybrid Leader"
              lazy={true}
              objectFit="cover"
              sizes="800px"
            />
          </IntroImageContainer>
        </IntroContainer>
      </IntroSection>
      
      <FeatureSection $dark={true}>
        <FeatureContainer>
          <FeatureContent>
            <FeatureTitle>Power To Go Beyond</FeatureTitle>
            <FeatureDescription>
              A dual power system and advanced all-terrain provide versatile performance for a variety of conditions, ensuring power and confidence.
            </FeatureDescription>
            <FeatureCTAButtonScroll onClick={scrollToForm}>Enquire Today</FeatureCTAButtonScroll>
          </FeatureContent>
          <FeatureImage>
            <ResponsiveImage 
              src="/images/models/b30/B30 PAGE2.jpg" 
              alt="Power To Go Beyond"
              lazy={true}
              objectFit="cover"
              sizes="50vw"
            />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection>
        <FeatureContainer $reverse>
          <FeatureContent>
            <FeatureTitle>Power To Truly Escape</FeatureTitle>
            <FeatureDescription>
              With class-leading interior space and flexible lay-flat seating, the B30 offers the ultimate versatility for both comfort and getaways.
            </FeatureDescription>
            <FeatureCTAButtonScroll onClick={openTypeformModal}>Find a dealer</FeatureCTAButtonScroll>
          </FeatureContent>
          <FeatureImage>
            <ResponsiveImage 
              src="/images/models/b30/B30 PAGE3.jpg" 
              alt="Power To Truly Escape"
              lazy={true}
              objectFit="cover"
              sizes="50vw"
            />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection $dark={true}>
        <FeatureContainer>
          <FeatureContent>
            <FeatureTitle>Power To Seamlessly Control</FeatureTitle>
            <FeatureDescription>
              Advanced intelligent systems and intuitive infotainment screen put effortless control at your fingertips.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <ResponsiveImage 
              src="/images/models/b30/B30 PAGE4.jpg" 
              alt="Power To Seamlessly Control"
              lazy={true}
              objectFit="cover"
              sizes="50vw"
            />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      
      <TechSpecsSection>
        <TechSpecsContainer>
          <TechSpecsTitle>Your Brave New Roads Begin Here</TechSpecsTitle>
          <TechSpecsDescription>
            The B30 is engineered for those who dare to create their own path. Be the first to know when it arrives in South Africa.
          </TechSpecsDescription>
          <TechSpecsImageContainer>
            <ResponsiveImage 
              src="/images/models/b30/B30 PAGE5.jpg" 
              alt="B30 Coming Soon"
              lazy={true}
              objectFit="contain"
              sizes="800px"
            />
          </TechSpecsImageContainer>
        </TechSpecsContainer>
      </TechSpecsSection>
      
      <TypeformSection id="typeform-section">
        <TypeformContainer>
          <TypeformTitle>Experience the B30</TypeformTitle>
          <TypeformSubtitle>
            <strong>A Brave Reward</strong><br />
            Secure your new B30 and get rewarded for your courage.<br /><br />
            
            By placing a fully refundable deposit of just R5,000, you will receive an exclusive R25,000 expansion benefit when purchasing your B30 within 15 days of its official launch.<br /><br />
            
            <strong>Your Seat at the Journey's Start</strong><br />
            Be part of the inaugural chapter.<br /><br />
            
            We are inviting 10 lucky pre-order customers to attend the official B30 South Africa Launch Event. 
            You will take part in an exclusive First Batch Customer Handover Ceremony and receive a selection of exclusive gifts to begin your Brave New Road.
          </TypeformSubtitle>
          <TypeformEmbed>
            <div data-tf-live="01K3NPSM8ZPTH19PA8E752PX9A"></div>
          </TypeformEmbed>
        </TypeformContainer>
      </TypeformSection>
    </PageContainer>
  );
};

export default B30Page;
