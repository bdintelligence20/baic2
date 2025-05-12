import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
`;

const SectionContainer = styled.section`
  padding: 6rem 0;
  background-color: #0a0a14;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a14 70%);
  opacity: 0.7;
  z-index: 1;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled.div`
  margin-bottom: 4rem;
  animation: ${fadeIn} 0.8s ease forwards;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #e60012, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const WorldMapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 550px;
  margin-bottom: 3rem;
  background-color: #111122;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
`;

const WorldMapBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #111122;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(50, 50, 100, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 90% 80%, rgba(50, 50, 100, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 50% 50%, rgba(50, 50, 100, 0.05) 0%, transparent 50%);
  }
`;

const WorldMapGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(100, 100, 150, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(100, 100, 150, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
`;

const Continent = styled.div`
  position: absolute;
  background-color: rgba(70, 70, 100, 0.3);
  border-radius: 50%;
`;

const LocationMarker = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  background-color: #e60012;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 3;
  transition: transform 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 36px;
    height: 36px;
    background-color: rgba(230, 0, 18, 0.4);
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

const LocationTooltip = styled.div`
  position: absolute;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  font-size: 0.9rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 4;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  ${LocationMarker}:hover & {
    opacity: 1;
    transform: translateX(-50%) translateY(-5px);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
  }
`;

const LocationName = styled.div`
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const LocationInfo = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 3rem 0;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
`;

const StatItem = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: transform 0.3s ease, background-color 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

const StatValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #e60012, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
`;

const GlobalPresenceInfo = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.6s;
  opacity: 0;
`;

const GlobalPresenceTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const GlobalPresenceText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  opacity: 0.8;
`;

const GlobalPresenceSection = () => {
  const continents = [
    { id: 'asia', left: '75%', top: '40%', width: '150px', height: '120px' },
    { id: 'africa', left: '55%', top: '55%', width: '120px', height: '150px' },
    { id: 'europe', left: '50%', top: '30%', width: '100px', height: '80px' },
    { id: 'northamerica', left: '25%', top: '35%', width: '120px', height: '100px' },
    { id: 'southamerica', left: '30%', top: '65%', width: '80px', height: '120px' },
    { id: 'australia', left: '85%', top: '70%', width: '80px', height: '60px' },
  ];
  
  const locations = [
    { 
      id: 'china', 
      name: 'Beijing, China', 
      info: 'Global Headquarters',
      x: 78, 
      y: 40 
    },
    { 
      id: 'southafrica', 
      name: 'Johannesburg, South Africa', 
      info: 'African Operations Hub',
      x: 55, 
      y: 70 
    },
    { 
      id: 'russia', 
      name: 'Moscow, Russia', 
      info: 'Eastern European Market',
      x: 60, 
      y: 30 
    },
    { 
      id: 'brazil', 
      name: 'São Paulo, Brazil', 
      info: 'South American Headquarters',
      x: 30, 
      y: 65 
    },
    { 
      id: 'mexico', 
      name: 'Mexico City, Mexico', 
      info: 'Central American Operations',
      x: 20, 
      y: 50 
    },
    { 
      id: 'uae', 
      name: 'Dubai, UAE', 
      info: 'Middle East Distribution Center',
      x: 65, 
      y: 48 
    },
    { 
      id: 'australia', 
      name: 'Sydney, Australia', 
      info: 'Oceania Regional Office',
      x: 85, 
      y: 75 
    },
    { 
      id: 'germany', 
      name: 'Berlin, Germany', 
      info: 'European Design Center',
      x: 50, 
      y: 32 
    },
    { 
      id: 'india', 
      name: 'Mumbai, India', 
      info: 'South Asian Market',
      x: 70, 
      y: 50 
    },
  ];
  
  const stats = [
    { value: '30+', label: 'Countries' },
    { value: '5', label: 'Continents' },
    { value: '12', label: 'Manufacturing Plants' },
    { value: '1.2M+', label: 'Vehicles Sold Annually' },
  ];
  
  return (
    <SectionContainer>
      <BackgroundGradient />
      <ContentContainer>
        <SectionHeader>
          <SectionTitle>BAIC IN THE WORLD</SectionTitle>
          <SectionSubtitle>
            With a growing global presence across five continents, BAIC is committed to 
            delivering innovative automotive solutions to customers worldwide.
          </SectionSubtitle>
        </SectionHeader>
        
        <WorldMapContainer>
          <WorldMapBackground />
          <WorldMapGrid />
          
          {continents.map(continent => (
            <Continent 
              key={continent.id}
              style={{ 
                left: continent.left, 
                top: continent.top, 
                width: continent.width, 
                height: continent.height 
              }}
            />
          ))}
          
          {locations.map(location => (
            <LocationMarker 
              key={location.id}
              style={{ left: `${location.x}%`, top: `${location.y}%` }}
            >
              <LocationTooltip>
                <LocationName>{location.name}</LocationName>
                <LocationInfo>{location.info}</LocationInfo>
              </LocationTooltip>
            </LocationMarker>
          ))}
        </WorldMapContainer>
        
        <StatsContainer>
          {stats.map((stat, index) => (
            <StatItem key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsContainer>
        
        <GlobalPresenceInfo>
          <GlobalPresenceTitle>EXPANDING OUR GLOBAL FOOTPRINT</GlobalPresenceTitle>
          <GlobalPresenceText>
            BAIC's international strategy focuses on building strong local partnerships, 
            understanding regional market needs, and delivering vehicles that exceed customer 
            expectations in every corner of the world. Our global network of dealerships, 
            service centers, and manufacturing facilities ensures that BAIC customers receive 
            the highest level of service and support, wherever they are.
          </GlobalPresenceText>
        </GlobalPresenceInfo>
      </ContentContainer>
    </SectionContainer>
  );
};

export default GlobalPresenceSection;
