import React from 'react';
import styled from 'styled-components';
import Placeholder from '../components/common/Placeholder';

const VehicleContainer = styled.div`
  padding: 120px 0 4rem;
  overflow: hidden;
`;

const HeroSection = styled.div`
  position: relative;
  height: 70vh;
  min-height: 500px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
`;

const HeroImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #333;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: #333;
  padding: 2rem 2.5rem;
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    max-width: 90%;
    width: 90%;
  }
  
  @media (max-width: 480px) {
    padding: 1.2rem 1.5rem;
  }
`;

const VehicleTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const VehicleTagline = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 300;
`;

const CTAButton = styled.button`
  background-color: ${props => props.$primary ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$primary ? 'white' : '#333'};
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid ${props => props.$primary ? 'var(--primary-color)' : 'var(--primary-color)'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 0.5rem;
  
  &:hover {
    background-color: ${props => props.$primary ? 'var(--primary-color-hover)' : 'rgba(230, 0, 18, 0.1)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 480px) {
    margin: 0.5rem;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 5rem;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
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

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const SpecCard = styled.div`
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const SpecTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const SpecValue = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: #e60012;
`;

const SpecUnit = styled.span`
  font-size: 1rem;
  color: #666;
  font-weight: 400;
`;

const VehicleTemplate = ({ vehicleData }) => {
  // In a real implementation, vehicleData would be passed as props
  // For now, we'll use placeholder data
  const vehicle = vehicleData || {
    name: 'Vehicle Name',
    tagline: 'Vehicle Tagline',
    specs: [
      { title: 'Engine', value: '2.0L', unit: 'Turbo' },
      { title: 'Horsepower', value: '250', unit: 'hp' },
      { title: 'Torque', value: '350', unit: 'Nm' },
      { title: '0-100 km/h', value: '7.5', unit: 's' }
    ]
  };

  return (
    <VehicleContainer>
      <HeroSection>
        <HeroImage>
          <Placeholder height="100%" label={`${vehicle.name} Hero Image`} />
        </HeroImage>
        <HeroContent>
          <VehicleTitle>{vehicle.name}</VehicleTitle>
          <VehicleTagline>{vehicle.tagline}</VehicleTagline>
          <div>
            <CTAButton $primary>Build Your Own</CTAButton>
            <CTAButton>Book a Test Drive</CTAButton>
          </div>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SectionTitle>Overview</SectionTitle>
        {vehicle.overview || <Placeholder height="400px" label="Vehicle Overview Content" />}
      </ContentSection>

      <ContentSection>
        <SectionTitle>Key Specifications</SectionTitle>
        <SpecsGrid>
          {vehicle.specs.map((spec, index) => (
            <SpecCard key={index}>
              <SpecTitle>{spec.title}</SpecTitle>
              <SpecValue>
                {spec.value} <SpecUnit>{spec.unit}</SpecUnit>
              </SpecValue>
            </SpecCard>
          ))}
        </SpecsGrid>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Features</SectionTitle>
        {vehicle.features || <Placeholder height="500px" label="Vehicle Features Content" />}
      </ContentSection>

      <ContentSection>
        <SectionTitle>Gallery</SectionTitle>
        <Placeholder height="400px" label="Vehicle Gallery" />
      </ContentSection>

      <ContentSection>
        <SectionTitle>Compare Models</SectionTitle>
        <Placeholder height="350px" label="Model Comparison Table" />
      </ContentSection>
    </VehicleContainer>
  );
};

export default VehicleTemplate;
