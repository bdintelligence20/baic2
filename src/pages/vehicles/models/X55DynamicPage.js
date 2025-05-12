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
  background-image: url('/images/models/x55-dynamic/14_20240708121758A006.png');
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

const X55DynamicPage = () => {
  const [activeColor, setActiveColor] = useState('black');
  
  const colors = [
    { id: 'black', hex: '#222222', name: 'Phantom Black' },
    { id: 'white', hex: '#FFFFFF', name: 'Crystal White' }
  ];
  
  const engineSpecs = [
    { title: 'Engine Type', value: '3.0L', unit: 'Twin-Turbo', description: 'High-performance twin-turbocharged engine' },
    { title: 'Maximum Power', value: '350', unit: 'hp', description: 'Exceptional power output for thrilling performance' },
    { title: 'Maximum Torque', value: '450', unit: 'N·m', description: 'Impressive torque for instant acceleration' },
    { title: 'Acceleration', value: '5.2', unit: 's (0-100 km/h)', description: 'Exhilarating acceleration for a sporty driving experience' }
  ];
  
  const safetyFeatures = [
    {
      title: 'Dynamic Stability Control',
      description: 'Advanced stability control system with sport-tuned settings for enhanced handling and safety in all driving conditions.'
    },
    {
      title: 'Performance Braking System',
      description: 'High-performance braking system with larger discs and multi-piston calipers for exceptional stopping power and fade resistance.'
    },
    {
      title: 'Adaptive Driving Modes',
      description: 'Multiple driving modes that adjust vehicle dynamics, including throttle response, steering feel, and suspension settings.'
    },
    {
      title: 'Advanced Driver Assistance',
      description: 'Comprehensive suite of driver assistance features including adaptive cruise control, lane keeping assist, and automatic emergency braking.'
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <TaglineSmall>BAIC X55 DYNAMIC</TaglineSmall>
          <ModelName>PERFORMANCE REDEFINED</ModelName>
          <TaglineLarge>LUXURY REIMAGINED</TaglineLarge>
          
          <ColorOptions>
            {colors.map(color => (
              <ColorOption 
                key={color.id}
                $color={color.hex}
                $active={activeColor === color.id}
                onClick={() => setActiveColor(color.id)}
                title={color.name}
              />
            ))}
          </ColorOptions>
          
          <CTAContainer>
            <CTAButton to="/book-test-drive" $primary>Test Drive</CTAButton>
            <CTAButton to="/vehicles/promotions/x55-dynamic">View Offers</CTAButton>
          </CTAContainer>
        </HeroContent>
      </HeroSection>
      
      <FeatureSection $dark={true}>
        <FeatureContainer>
          <FeatureContent>
            <FeatureTitle>Sport-Tuned Performance</FeatureTitle>
            <FeatureSubtitle>Engineered for driving enthusiasts</FeatureSubtitle>
            <FeatureDescription>
              The X55 Dynamic features a sport-tuned suspension, responsive steering, and a powerful 
              twin-turbocharged engine that delivers exhilarating performance. Every aspect of the 
              driving dynamics has been refined to provide a more engaging and thrilling experience 
              behind the wheel.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/models/x55-dynamic/14_20240708121758A006.png" alt="Sport-Tuned Performance" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection>
        <FeatureContainer $reverse>
          <FeatureContent>
            <FeatureTitle>Dynamic Styling</FeatureTitle>
            <FeatureSubtitle>Aggressive design elements</FeatureSubtitle>
            <FeatureDescription>
              The X55 Dynamic stands out with its distinctive styling cues, including a more aggressive 
              front fascia, larger air intakes, unique wheel design, and dual exhaust outlets. These 
              design elements not only enhance the vehicle's appearance but also improve aerodynamic 
              performance.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/models/x55-dynamic/15_20240708121819A007.png" alt="Dynamic Styling" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection $dark={true}>
        <FeatureContainer>
          <FeatureContent>
            <FeatureTitle>Sport Interior</FeatureTitle>
            <FeatureSubtitle>Driver-focused cockpit</FeatureSubtitle>
            <FeatureDescription>
              Step inside the X55 Dynamic and experience a cabin designed with the driving enthusiast in mind. 
              Sport seats with enhanced bolstering provide excellent support during spirited driving, while 
              the flat-bottom steering wheel, aluminum pedals, and unique trim accents create a sporty atmosphere.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/models/x55-dynamic/16_20240708121837A008.png" alt="Sport Interior" />
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
          <SafetyTitle>Performance & Safety Features</SafetyTitle>
          <SafetySubtitle>
            The X55 Dynamic combines exhilarating performance with advanced safety technologies
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
            <FeatureTitle>Advanced Technology</FeatureTitle>
            <FeatureSubtitle>Cutting-edge features for the modern driver</FeatureSubtitle>
            <FeatureDescription>
              The X55 Dynamic is equipped with the latest technology features, including a high-resolution 
              digital instrument cluster with sport-specific displays, a premium infotainment system with 
              navigation, and a performance data recorder that allows you to analyze your driving on the track.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/models/x55-dynamic/17_20240708121853A009.png" alt="Advanced Technology" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
    </PageContainer>
  );
};

export default X55DynamicPage;
