import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SectionContainer = styled.section`
  padding: 5rem 0;
  background-color: #111;
  color: white;
  position: relative;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  color: white;
  font-weight: 700;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #e60012;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #aaa;
  max-width: 700px;
  margin: 1.5rem auto 0;
  line-height: 1.6;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(6, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FeatureItem = styled.div`
  position: relative;
  overflow: hidden;
  height: ${props => props.$large ? '500px' : '250px'};
  grid-column: ${props => {
    if (props.$fullWidth) return 'span 12';
    if (props.$large) return 'span 8';
    return 'span 4';
  }};
  border-radius: 8px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  animation: ${fadeIn} 0.6s ease forwards;
  animation-delay: ${props => props.$index * 0.1 + 0.2}s;
  opacity: 0;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    
    .feature-overlay {
      opacity: 0.8;
    }
    
    .feature-content {
      transform: translateY(-10px);
    }
    
    .feature-icon {
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 992px) {
    grid-column: ${props => {
      if (props.$fullWidth) return 'span 6';
      if (props.$large) return 'span 6';
      return 'span 3';
    }};
    height: ${props => props.$large ? '400px' : '250px'};
  }
  
  @media (max-width: 768px) {
    grid-column: 1;
    height: ${props => props.$large ? '350px' : '250px'};
  }
`;

const FeatureImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.$bgColor};
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%);
  }
`;

const FeatureOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  transition: opacity 0.3s ease;
  z-index: 1;
`;

const FeatureContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 2rem;
  text-align: left;
  color: white;
  width: 100%;
  z-index: 2;
  transition: transform 0.4s ease;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e60012;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  transition: transform 0.3s ease;
  box-shadow: 0 5px 15px rgba(230, 0, 18, 0.3);
`;

const FeatureTitle = styled.h3`
  font-size: ${props => props.$large ? '2.2rem' : '1.8rem'};
  margin: 0 0 0.8rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const FeatureDescription = styled.p`
  font-size: ${props => props.$large ? '1.1rem' : '1rem'};
  margin: 0;
  opacity: 0.9;
  line-height: 1.6;
  max-width: ${props => props.$large ? '500px' : '100%'};
`;

const FeatureShowcaseSection = () => {
  const features = [
    {
      id: 'safety',
      title: 'Advanced Safety',
      description: 'Comprehensive safety features including multiple airbags, ABS, EBD, and advanced driver assistance systems to protect you and your loved ones.',
      bgColor: '#c53030',
      icon: 'fa-shield-alt',
      large: true,
      fullWidth: false
    },
    {
      id: 'performance',
      title: 'Powerful Performance',
      description: 'Turbocharged engines delivering exceptional power and efficiency for a thrilling driving experience.',
      bgColor: '#2b6cb0',
      icon: 'fa-tachometer-alt',
      large: false,
      fullWidth: false
    },
    {
      id: 'tech',
      title: 'Smart Technology',
      description: 'Cutting-edge infotainment systems with smartphone integration, voice control, and navigation.',
      bgColor: '#4c51bf',
      icon: 'fa-microchip',
      large: false,
      fullWidth: false
    },
    {
      id: 'comfort',
      title: 'Premium Comfort',
      description: 'Luxurious interiors with premium materials, ergonomic design, and climate control for maximum comfort.',
      bgColor: '#6b46c1',
      icon: 'fa-couch',
      large: false,
      fullWidth: false
    },
    {
      id: 'design',
      title: 'Striking Design',
      description: 'Bold, contemporary styling with attention to every detail, creating a distinctive presence on the road.',
      bgColor: '#805ad5',
      icon: 'fa-pencil-ruler',
      large: false,
      fullWidth: false
    },
    {
      id: 'offroad',
      title: 'Off-Road Capability',
      description: 'Conquer challenging terrain with confidence thanks to advanced 4x4 systems, high ground clearance, and robust construction.',
      bgColor: '#4a5568',
      icon: 'fa-mountain',
      large: true,
      fullWidth: false
    }
  ];
  
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>FEATURE HIGHLIGHTS</SectionTitle>
        <SectionSubtitle>
          Discover the innovative features that make BAIC vehicles stand out from the competition,
          combining cutting-edge technology with exceptional design and performance.
        </SectionSubtitle>
      </SectionHeader>
      
      <ContentContainer>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureItem 
              key={feature.id} 
              $large={feature.large}
              $fullWidth={feature.fullWidth}
              $index={index}
            >
              <FeatureImage $bgColor={feature.bgColor} />
              <FeatureOverlay className="feature-overlay" />
              <FeatureContent className="feature-content">
                <FeatureIcon className="feature-icon">
                  <i className={`fas ${feature.icon}`}></i>
                </FeatureIcon>
                <FeatureTitle $large={feature.large}>{feature.title}</FeatureTitle>
                <FeatureDescription $large={feature.large}>
                  {feature.description}
                </FeatureDescription>
              </FeatureContent>
            </FeatureItem>
          ))}
        </FeaturesGrid>
      </ContentContainer>
    </SectionContainer>
  );
};

export default FeatureShowcaseSection;
