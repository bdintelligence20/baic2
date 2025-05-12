import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding-top: 80px;
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  position: relative;
  height: 100vh;
  min-height: 600px;
  background-color: #000;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/models/x55-plus/14_20240708121758A006.png');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 5rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  color: white;
`;

const TaglineSmall = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
  letter-spacing: 1px;
`;

const ModelName = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
`;

const TaglineLarge = styled.p`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 3rem;
  letter-spacing: 1px;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const ColorOption = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${props => props.$active ? 'white' : 'transparent'};
  background-color: ${props => props.$color};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const CTAContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const CTAButton = styled(Link)`
  padding: 1rem 2.5rem;
  border: 2px solid white;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  color: white;
  background-color: ${props => props.$primary ? 'white' : 'transparent'};
  color: ${props => props.$primary ? '#000' : 'white'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: ${props => props.$primary ? 'white' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const FeatureSection = styled.section`
  padding: 8rem 0;
  background-color: ${props => props.$dark ? '#000' : '#fff'};
  color: ${props => props.$dark ? '#fff' : '#000'};
  position: relative;
  overflow: hidden;
`;

const FeatureContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: ${props => props.$reverse ? 'row-reverse' : 'row'};
  align-items: center;
  gap: 4rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const FeatureSubtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const FeatureImage = styled.div`
  flex: 1;
  height: 400px;
  background-color: #333;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SpecsSection = styled.section`
  padding: 8rem 0;
  background-color: #f8f8f8;
`;

const SpecsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SpecsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const SpecCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const SpecIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #e60012;
`;

const SpecTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SpecValue = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #e60012;
`;

const SpecUnit = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: #666;
`;

const SpecDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
`;

const SafetySection = styled.section`
  padding: 8rem 0;
  background-color: #000;
  color: white;
`;

const SafetyContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const SafetyTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const SafetySubtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const SafetyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
`;

const SafetyCard = styled.div`
  text-align: left;
`;

const SafetyCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #e60012;
`;

const SafetyCardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.8;
`;

const X55PlusPage = () => {
  const [activeColor, setActiveColor] = useState('yellow');
  
  const colors = [
    { id: 'yellow', hex: '#E1C725' },
    { id: 'red', hex: '#C41E3A' },
    { id: 'teal', hex: '#008080' },
    { id: 'black', hex: '#222222' },
    { id: 'silver', hex: '#C0C0C0' },
    { id: 'white', hex: '#FFFFFF' }
  ];
  
  const engineSpecs = [
    { title: 'Engine Type', value: '1.5T', unit: 'Turbo', description: 'Co-developed by BAIC and Germany Meta for optimal performance' },
    { title: 'Maximum Power', value: '138', unit: 'kW', description: 'Powerful engine delivering exceptional performance' },
    { title: 'Maximum Torque', value: '305', unit: 'N·m', description: 'High torque for responsive acceleration and driving dynamics' },
    { title: 'Acceleration', value: '7.84', unit: 's (0-100 km/h)', description: 'Quick acceleration for a dynamic driving experience' }
  ];
  
  const safetyFeatures = [
    {
      title: 'Space Fortress Body Design',
      description: 'Vehicle body rigidity could reach 21972N·m/deg, strengthening safety protection in crash reduction and deformation.'
    },
    {
      title: 'Multiple Sensors',
      description: 'Advanced sensor system including Bosch 5th generation radar, 12 ultrasonic radars, and 5 driving assistance cameras for comprehensive safety.'
    },
    {
      title: 'Super Low Cd Design',
      description: '0.32 Cd aerodynamic coefficient, excellent performance in the same vehicle class for improved efficiency and stability.'
    },
    {
      title: 'Inductive Hidden Door Handles',
      description: 'Automatically pop out when needed with ice-break mode for convenience in all weather conditions.'
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <TaglineSmall>Enjoy Young and Fun</TaglineSmall>
          <ModelName>X55 Plus</ModelName>
          <TaglineLarge>Vogue Beast Arrival</TaglineLarge>
          
          <ColorOptions>
            {colors.map(color => (
              <ColorOption 
                key={color.id}
                $color={color.hex}
                $active={activeColor === color.id}
                onClick={() => setActiveColor(color.id)}
              />
            ))}
          </ColorOptions>
          
          <CTAContainer>
            <CTAButton to="/book-test-drive" $primary>Test Drive</CTAButton>
            <CTAButton to="/vehicles/promotions/x55-plus">View Offers</CTAButton>
          </CTAContainer>
        </HeroContent>
      </HeroSection>
      
      <FeatureSection $dark={true}>
        <FeatureContainer>
          <FeatureContent>
            <FeatureTitle>Crystal Star Design</FeatureTitle>
            <FeatureSubtitle>Crystal Diamond Interstellar Grille</FeatureSubtitle>
            <FeatureDescription>
              The X55 Plus features a stunning Crystal Diamond Interstellar Grille that creates a bold and distinctive front fascia. 
              The intricate diamond pattern catches and reflects light, giving the vehicle a premium and sophisticated appearance that 
              stands out on the road.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/models/x55-plus/14_20240708121758A006.png" alt="Crystal Star Design" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection>
        <FeatureContainer $reverse>
          <FeatureContent>
            <FeatureTitle>Star Trails Ambient Light</FeatureTitle>
            <FeatureSubtitle>Colorful light strip + Sculpture door sheet</FeatureSubtitle>
            <FeatureDescription>
              Build up a diamond feel ambient light experience with customizable color options. The interior ambient lighting 
              creates a premium atmosphere and enhances the driving experience, especially during night drives. The sculptured 
              door panels with integrated lighting add an extra touch of sophistication.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/models/x55-plus/15_20240708121819A007.png" alt="Star Trails Ambient Light" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection $dark={true}>
        <FeatureContainer>
          <FeatureContent>
            <FeatureTitle>Panoramic Sunroof</FeatureTitle>
            <FeatureSubtitle>Intelligent sunroof with self-induced closure during rainy weather</FeatureSubtitle>
            <FeatureDescription>
              The X55 Plus comes equipped with a large panoramic sunroof that floods the cabin with natural light, 
              creating an open and airy feeling. The intelligent system automatically closes during rainy weather, 
              ensuring your comfort and convenience in all conditions.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/models/x55-plus/16_20240708121837A008.png" alt="Panoramic Sunroof" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <SpecsSection>
        <SpecsContainer>
          <SpecsTitle>Engine Specifications</SpecsTitle>
          <SpecsGrid>
            {engineSpecs.map((spec, index) => (
              <SpecCard key={index}>
                <SpecIcon>
                  <i className={`fas fa-${index === 0 ? 'engine' : index === 1 ? 'tachometer-alt' : index === 2 ? 'bolt' : 'stopwatch'}`}></i>
                </SpecIcon>
                <SpecTitle>{spec.title}</SpecTitle>
                <SpecValue>
                  {spec.value} <SpecUnit>{spec.unit}</SpecUnit>
                </SpecValue>
                <SpecDescription>{spec.description}</SpecDescription>
              </SpecCard>
            ))}
          </SpecsGrid>
        </SpecsContainer>
      </SpecsSection>
      
      <SafetySection>
        <SafetyContainer>
          <SafetyTitle>Advanced Safety Features</SafetyTitle>
          <SafetySubtitle>
            The X55 Plus is equipped with cutting-edge safety technologies to protect you and your passengers
          </SafetySubtitle>
          
          <SafetyGrid>
            {safetyFeatures.map((feature, index) => (
              <SafetyCard key={index}>
                <SafetyCardTitle>{feature.title}</SafetyCardTitle>
                <SafetyCardDescription>{feature.description}</SafetyCardDescription>
              </SafetyCard>
            ))}
          </SafetyGrid>
        </SafetyContainer>
      </SafetySection>
      
      <FeatureSection>
        <FeatureContainer $reverse>
          <FeatureContent>
            <FeatureTitle>First-class Comfort</FeatureTitle>
            <FeatureSubtitle>Heating, ventilation and massage seats</FeatureSubtitle>
            <FeatureDescription>
              Experience ultimate comfort with premium seats featuring heating, ventilation, and massage functions. 
              The X55 Plus interior is designed with high-quality materials and meticulous attention to detail, 
              ensuring a luxurious experience for both driver and passengers on every journey.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/models/x55-plus/17_20240708121853A009.png" alt="First-class Comfort" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
    </PageContainer>
  );
};

export default X55PlusPage;
