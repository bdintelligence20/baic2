import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SpecificationsSection from '../../../components/vehicles/SpecificationsSection';

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
  background-image: url('/images/models/b40-plus/b40-plus-camo-green.png');
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

const OffRoadSection = styled.section`
  padding: 8rem 0;
  background-color: #f8f8f8;
`;

const OffRoadContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const OffRoadTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OffRoadSubtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const OffRoadSpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

const OffRoadSpecCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const OffRoadSpecValue = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  color: #e60012;
  margin-bottom: 1rem;
`;

const OffRoadSpecTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const B40PlusPage = () => {
  const [activeColor, setActiveColor] = useState('green');
  
  const colors = [
    { id: 'green', hex: '#4B6F44', name: 'Camo Green' },
    { id: 'red', hex: '#C41E3A', name: 'Racing Red' },
    { id: 'blue', hex: '#1E4D8C', name: 'Ocean Blue' },
    { id: 'black', hex: '#222222', name: 'Phantom Black' },
    { id: 'grey', hex: '#808080', name: 'Gunmetal Grey' },
    { id: 'white', hex: '#FFFFFF', name: 'Crystal White' }
  ];
  
  const engineSpecs = [
    { title: 'Engine Type', value: '2.0L', unit: 'Turbo Diesel', description: 'Powerful and efficient turbo diesel engine' },
    { title: 'Maximum Power', value: '220', unit: 'hp', description: 'Impressive power output for all driving conditions' },
    { title: 'Maximum Torque', value: '480', unit: 'N·m', description: 'High torque for exceptional off-road capability' },
    { title: 'Acceleration', value: '8.5', unit: 's (0-100 km/h)', description: 'Quick acceleration for responsive driving' }
  ];
  
  const safetyFeatures = [
    {
      title: 'Active and Passive Safety',
      description: 'Drive with confidence, knowing the B40 Plus is equipped with ESP and 8 major safety features for both off-road and urban adventures.'
    },
    {
      title: 'Non-Bearing 3D Protective Body',
      description: 'The high-strength roll cage, strengthening joint structure, and integrated molding B-pillar provide robust protection, exceeding rule standards in static roof pressure tests.'
    },
    {
      title: 'Crash Energy Absorption',
      description: 'Advanced design efficiently absorbs crash energy, providing enhanced protection for all occupants in the event of a collision.'
    },
    {
      title: 'Electronic Stability Program',
      description: 'Sophisticated ESP system helps maintain control in challenging driving conditions, providing an extra layer of safety on and off the road.'
    }
  ];
  
  const offRoadSpecs = [
    { title: 'Approach Angle', value: '37°' },
    { title: 'Departure Angle', value: '31°' },
    { title: 'Ramp Angle', value: '23°' },
    { title: 'Fording Depth', value: '>600mm' },
    { title: 'Trench-Crossing Width', value: '500mm' },
    { title: 'Roadblock-Crossing Height', value: '350mm' }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <TaglineSmall>BAIC B40 PLUS</TaglineSmall>
          <ModelName>BRAVE ANY TERRAIN</ModelName>
          <TaglineLarge>OWN EVERY ROAD</TaglineLarge>
          
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
            <CTAButton to="/vehicles/promotions/b40-plus">View Offers</CTAButton>
          </CTAContainer>
        </HeroContent>
      </HeroSection>
      
      <FeatureSection $dark={true}>
        <FeatureContainer>
          <FeatureContent>
            <FeatureTitle>Rugged Appearance with Bold Style</FeatureTitle>
            <FeatureSubtitle>Light-ring shaped LED headlights</FeatureSubtitle>
            <FeatureDescription>
              The B40 Plus makes a bold statement with its 'light-ring' shaped LED headlights and nearly 200 exterior LED light sources, 
              creating a distinctive and commanding presence. Its 'disconnected' light strip design inspiration adds a touch of modern 
              flair to its rugged aesthetic.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/models/b40-plus/b40-plus-camo-green.png" alt="Rugged Appearance" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection>
        <FeatureContainer $reverse>
          <FeatureContent>
            <FeatureTitle>Hidden Details with Mechanical Aesthetics</FeatureTitle>
            <FeatureSubtitle>Exposed hinge structures and versatile design</FeatureSubtitle>
            <FeatureDescription>
              Exposed hinge structures and a three-section opening body with an independent opening trunk window showcase 
              the B40 Plus's functional beauty and versatile shape. These thoughtful design elements combine form and function 
              in a way that enhances both the vehicle's appearance and its practical utility.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/models/b40-plus/b40plus-black.png" alt="Mechanical Aesthetics" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection $dark={true}>
        <FeatureContainer>
          <FeatureContent>
            <FeatureTitle>Striking Interior Tech</FeatureTitle>
            <FeatureSubtitle>Modern displays for an intuitive driving experience</FeatureSubtitle>
            <FeatureDescription>
              Inside, a 12.3-inch full-size LCD dashboard and a 10-inch center control display provide a modern and intuitive 
              driving experience. Set the mood with 256-color ambient lighting, featuring 5 recommended colors (red, green, 
              ice blue, white, and orange) and three modes: single-color static, single-color breathing, and multi-color breathing.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/models/b40-plus/b40plus-dark-blue.png" alt="Interior Tech" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection>
        <FeatureContainer $reverse>
          <FeatureContent>
            <FeatureTitle>Stylish Gear Lever</FeatureTitle>
            <FeatureSubtitle>Sophisticated design with enhanced safety</FeatureSubtitle>
            <FeatureDescription>
              The electronic gear lever with integrated gear display, functioning gear lighting, and backlight prompt adds 
              a touch of sophistication and enhances safety with its automatic return to P-gear function. This thoughtful 
              design element combines modern aesthetics with practical functionality for an enhanced driving experience.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/models/b40-plus/b40plus-white.png" alt="Stylish Gear Lever" />
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
            The B40 Plus is equipped with cutting-edge safety technologies to protect you and your passengers
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
      
      <SpecificationsSection />
      
      <OffRoadSection>
        <OffRoadContainer>
          <OffRoadTitle>Intrepid Passing Ability</OffRoadTitle>
          <OffRoadSubtitle>
            Conquer any challenge with impressive off-road capabilities
          </OffRoadSubtitle>
          
          <OffRoadSpecsGrid>
            {offRoadSpecs.map((spec, index) => (
              <OffRoadSpecCard key={index}>
                <OffRoadSpecValue>{spec.value}</OffRoadSpecValue>
                <OffRoadSpecTitle>{spec.title}</OffRoadSpecTitle>
              </OffRoadSpecCard>
            ))}
          </OffRoadSpecsGrid>
        </OffRoadContainer>
      </OffRoadSection>
    </PageContainer>
  );
};

export default B40PlusPage;
