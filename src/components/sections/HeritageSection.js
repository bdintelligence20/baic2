import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SectionContainer = styled.section`
  padding: 6rem 0;
  background-image: url('/images/home/WEBSITE_1920X1080PX_HOMEPAGE3 (2).jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: 600px; /* Ensure enough height for the content */
  
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
  height: 100%;
`;

const SectionContent = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 3rem;
  max-width: 600px;
  text-align: left;
  background-color: white;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  border-radius: 8px;
  
  @media (max-width: 1200px) {
    left: 2rem;
    bottom: 2.5rem;
  }
  
  @media (max-width: 992px) {
    left: 1.5rem;
    bottom: 2rem;
    padding: 1.8rem;
  }
  
  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    max-width: 90%;
    width: 90%;
    text-align: center;
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.2rem;
    bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 700;
  position: relative;
  display: inline-block;
  text-align: left;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 3px;
    background-color: #e60012;
  }
  
  @media (max-width: 768px) {
    text-align: center;
    
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 1rem;
  
  @media (max-width: 992px) {
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const ExploreButton = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.7rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: var(--primary-color-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 992px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
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
      </ContentWrapper>
      <SectionContent>
        <SectionTitle>A Heritage of Bravery</SectionTitle>
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
    </SectionContainer>
  );
};

export default HeritageSection;
