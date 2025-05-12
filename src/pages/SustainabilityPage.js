import React from 'react';
import styled from 'styled-components';
import Placeholder from '../components/common/Placeholder';

const SustainabilityContainer = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const IntroSection = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
`;

const SectionContainer = styled.div`
  margin-bottom: 5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #e60012;
  }
`;

const SustainabilityPage = () => {
  return (
    <SustainabilityContainer>
      <PageTitle>Sustainability</PageTitle>
      
      <IntroSection>
        <IntroText>
          At BAIC, we are committed to sustainable practices and reducing our environmental footprint. 
          Our approach to sustainability encompasses every aspect of our business, from manufacturing 
          to product design and community engagement.
        </IntroText>
      </IntroSection>
      
      <SectionContainer>
        <SectionTitle>Our Sustainability Commitment</SectionTitle>
        <Placeholder height="400px" label="Sustainability Commitment Content" />
      </SectionContainer>
      
      <SectionContainer>
        <SectionTitle>Sustainable Manufacturing</SectionTitle>
        <Placeholder height="350px" label="Sustainable Manufacturing Content" />
      </SectionContainer>
      
      <SectionContainer>
        <SectionTitle>Future Initiatives</SectionTitle>
        <Placeholder height="300px" label="Future Initiatives Content" />
      </SectionContainer>
    </SustainabilityContainer>
  );
};

export default SustainabilityPage;
