import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SectionContainer = styled.section`
  padding: 6rem 0;
  background-image: url('/images/home/WEBSITE_1920X1080PX_HOMEPAGE3 (2).jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align */
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  color: white; /* Changed to white */
  font-weight: 700;
  position: relative;
  display: inline-block;
  text-align: center; /* Center align */
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%; /* Center align */
    transform: translateX(-50%); /* Center align */
    width: 80px;
    height: 3px;
    background-color: #e60012;
  }
`;

const SectionContent = styled.div`
  max-width: 600px; /* Reduced width for content */
  margin: 0 auto; /* Center align */
  text-align: center; /* Center align */
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: white; /* Changed to white */
  margin-bottom: 2rem;
`;

const ExploreButton = styled(Link)`
  display: inline-block;
  background-color: #e60012;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background-color: #ff1a2d;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(230, 0, 18, 0.3);
  }
`;

const PageTiles = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Tile = styled(Link)`
  width: 300px;
  height: 200px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
  }
`;

const TileImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%);
  }
`;

const TileTitle = styled.h3`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  z-index: 2;
  margin: 0;
`;

const HeritageSection = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <SectionTitle>A Heritage of Bravery</SectionTitle>
        <SectionContent>
          <Paragraph>
            Since 1958, BAIC has been driven by a pioneering spirit, constantly pushing the boundaries of automotive innovation.
          </Paragraph>
          <Paragraph>
            From the first Sino-foreign joint venture in China's automotive industry to ongoing collaborations with global motor giants, that boldness is embedded in our DNA.
          </Paragraph>
          <Paragraph>
            This is what fuels our commitment to creating vehicles for those who dare to Brave New Roads.
          </Paragraph>
          
          <ExploreButton to="/about/company-overview">Explore Brave New Roads</ExploreButton>
        </SectionContent>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default HeritageSection;
