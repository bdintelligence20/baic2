import React, { useState, useEffect, memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SectionContainer = styled.section`
  padding: 6rem 0 4rem;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, #e0e0e0 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.3;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  color: #222;
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
    background-color: var(--primary-color);
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 1.5rem auto 0;
  line-height: 1.6;
`;

const ModelsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 1rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 2rem;
  }
`;

const ModelCard = styled.div`
  flex: 0 0 auto;
  width: 220px;
  cursor: pointer;
  transition: all 0.4s ease;
  opacity: ${props => props.$active ? 1 : 0.7};
  
  &:hover {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    width: 180px;
  }
`;

const ModelImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  margin: 0 auto;
  /* Apply specific scaling for B30 model */
  transform: ${props => props.$isB30 ? 'scale(0.8)' : 'none'};
  transition: opacity 0.3s ease;
`;

const ModelImageFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.$color};
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0 auto;
  /* Apply specific scaling for B30 model */
  transform: ${props => props.$isB30 ? 'scale(0.8)' : 'none'};
`;

const ModelInfo = styled.div`
  text-align: center;
`;

const ModelName = styled.h3`
  font-size: 1.3rem;
  margin: 0 0 0.3rem;
  color: ${props => props.$active ? '#000' : '#555'};
  transition: color 0.3s ease;
  font-weight: ${props => props.$active ? '700' : '500'};
`;

const ModelTagline = styled.p`
  font-size: 0.85rem;
  color: #777;
  margin: 0;
  transition: opacity 0.3s ease;
  opacity: ${props => props.$active ? 1 : 0.7};
`;

const ActiveIndicator = styled.div`
  width: 40px;
  height: 3px;
  background-color: var(--primary-color);
  margin: 0.8rem auto 0;
  transition: all 0.3s ease;
  opacity: ${props => props.$active ? 1 : 0};
  transform: ${props => props.$active ? 'scaleX(1)' : 'scaleX(0)'};
`;

const FeaturedModelContainer = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.5s ease;
`;

const ColorSelectionContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColorSelectionTitle = styled.h4`
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: #333;
`;

const ColorsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const ColorOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  border: 2px solid ${props => props.$active ? '#000' : '#ddd'};
  transition: all 0.3s ease;
  box-shadow: ${props => props.$active ? '0 0 10px rgba(0,0,0,0.2)' : 'none'};
  position: relative;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) ${props => props.$active ? 'scale(1)' : 'scale(0)'};
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${props => props.$isDark ? 'white' : 'black'};
    transition: transform 0.3s ease;
  }
`;

const ColorName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-top: 0.5rem;
`;

const ColorSelectionNote = styled.p`
  font-size: 0.8rem;
  color: #777;
  font-style: italic;
  text-align: center;
  margin-top: 1rem;
`;

const FeaturedModelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const FeaturedModelTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #222;
`;


const FeaturedModelImageContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const FeaturedModelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  position: relative;
  transition: opacity 0.3s ease;
`;

const FeaturedModelImageFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.$color};
  font-weight: bold;
  font-size: 2.5rem;
  position: relative;
`;

const SpecsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 2.5rem 0;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    flex: 0 0 45%;
  }
`;

const SpecIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.8rem;
  color: #333;
  font-size: 1.5rem;
`;

const SpecValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: #222;
`;

const SpecLabel = styled.div`
  font-size: 0.85rem;
  color: #777;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  padding: 1rem 2.5rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  font-weight: 600;
  
  &:hover {
    background-color: var(--primary-color);
    color: var(--primary-color-text);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Adjusted shadow to be more neutral */
  }
  
  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: var(--text-color);
  border: 2px solid var(--text-color);
  padding: 1rem 2.5rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  font-weight: 600;
  
  &:hover {
    background-color: var(--text-color);
    color: var(--background-color);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
  }
`;

// Helper function to determine if a color is dark
const isDarkColor = (hex) => {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Calculate brightness (HSP)
  const hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );
  
  // Return true if dark
  return hsp < 127.5;
};

const ExploreModelsSection = () => {
  // Model-specific color configurations
  const modelColors = {
    x55: [
      { 
        id: 'white', 
        name: 'Crystal White', 
        hex: '#ffffff',
        image: '/images/models/x55/x55-white.png',
      },
      { 
        id: 'silver', 
        name: 'Lunar Silver', 
        hex: '#c0c0c0',
        image: '/images/models/x55/x55-silver.png',
      },
      { 
        id: 'grey', 
        name: 'Titanium Grey', 
        hex: '#6e7275',
        image: '/images/models/x55/x55-grey.png',
      },
      { 
        id: 'red', 
        name: 'Racing Red', 
        hex: '#a51c30',
        image: '/images/models/x55/x55-red.png',
      },
      { 
        id: 'turqoise', 
        name: 'Turquoise Blue', 
        hex: '#2a9d8f',
        image: '/images/models/x55/x55-turqoise.png',
      },
      { 
        id: 'yellow', 
        name: 'Sunshine Yellow', 
        hex: '#e9c46a',
        image: '/images/models/x55/x55-yellow.png',
      }
    ],
    x55plus: [
      { 
        id: 'white', 
        name: 'Crystal White', 
        hex: '#ffffff',
        image: '/images/models/x55/x55-white.png',
      },
      { 
        id: 'silver', 
        name: 'Lunar Silver', 
        hex: '#c0c0c0',
        image: '/images/models/x55/x55-silver.png',
      },
      { 
        id: 'grey', 
        name: 'Titanium Grey', 
        hex: '#6e7275',
        image: '/images/models/x55/x55-grey.png',
      },
      { 
        id: 'red', 
        name: 'Racing Red', 
        hex: '#a51c30',
        image: '/images/models/x55/x55-red.png',
      },
      { 
        id: 'turqoise', 
        name: 'Turquoise Blue', 
        hex: '#2a9d8f',
        image: '/images/models/x55/x55-turqoise.png',
      },
      { 
        id: 'yellow', 
        name: 'Sunshine Yellow', 
        hex: '#e9c46a',
        image: '/images/models/x55/x55-yellow.png',
      }
    ],
    x55dynamic: [
      { 
        id: 'white', 
        name: 'Crystal White', 
        hex: '#ffffff',
        image: '/images/colors/x55-dynamic/crystal-white/14_20240708121758A006.png',
      },
      { 
        id: 'black', 
        name: 'Phantom Black', 
        hex: '#111111',
        image: '/images/colors/x55-dynamic/phantom-black/15_20240708121819A007.png',
      }
    ],
    b40plus: [
      { 
        id: 'white', 
        name: 'Crystal White', 
        hex: '#ffffff',
        image: '/images/models/b40-plus/b40plus-white.png',
      },
      { 
        id: 'black', 
        name: 'Phantom Black', 
        hex: '#111111',
        image: '/images/models/b40-plus/b40plus-black.png',
      },
      { 
        id: 'red', 
        name: 'Racing Red', 
        hex: '#a51c30',
        image: '/images/models/b40-plus/BJ40-plus-RED.png',
      },
      { 
        id: 'dark-blue', 
        name: 'Deep Ocean Blue', 
        hex: '#1a3a5f',
        image: '/images/models/b40-plus/b40plus-dark-blue.png',
      },
      { 
        id: 'light-blue', 
        name: 'Sky Blue', 
        hex: '#4a7a9b',
        image: '/images/models/b40-plus/b40plus-light-blue.png',
      },
      { 
        id: 'grey', 
        name: 'Titanium Grey', 
        hex: '#6e7275',
        image: '/images/models/b40-plus/B40-plus-grey.png',
      },
      { 
        id: 'green', 
        name: 'Forest Green', 
        hex: '#2d5f5d',
        image: '/images/models/b40-plus/b40plus-green.png',
      },
      { 
        id: 'camo-green', 
        name: 'Camo Green', 
        hex: '#4b5320',
        image: '/images/models/b40-plus/b40-plus-camo-green.png',
      }
    ],
    b40honoredition: [
      { 
        id: 'white', 
        name: 'Crystal White', 
        hex: '#ffffff',
        image: '/images/models/b40-plus/b40plus-white.png', // Using B40 PLUS image as placeholder
      },
      { 
        id: 'black', 
        name: 'Phantom Black', 
        hex: '#111111',
        image: '/images/models/b40-honor-edition/b40-honor-edition-black.png',
      },
      { 
        id: 'red', 
        name: 'Racing Red', 
        hex: '#a51c30',
        image: '/images/models/b40-plus/BJ40-plus-RED.png', // Using B40 PLUS image as placeholder
      },
      { 
        id: 'dark-blue', 
        name: 'Deep Ocean Blue', 
        hex: '#1a3a5f',
        image: '/images/models/b40-plus/b40plus-dark-blue.png', // Using B40 PLUS image as placeholder
      },
      { 
        id: 'light-blue', 
        name: 'Sky Blue', 
        hex: '#4a7a9b',
        image: '/images/models/b40-plus/b40plus-light-blue.png', // Using B40 PLUS image as placeholder
      },
      { 
        id: 'grey', 
        name: 'Titanium Grey', 
        hex: '#6e7275',
        image: '/images/models/b40-plus/B40-plus-grey.png', // Using B40 PLUS image as placeholder
      },
      { 
        id: 'green', 
        name: 'Forest Green', 
        hex: '#2d5f5d',
        image: '/images/models/b40-plus/b40plus-green.png', // Using B40 PLUS image as placeholder
      },
      { 
        id: 'camo-green', 
        name: 'Camo Green', 
        hex: '#4b5320',
        image: '/images/models/b40-plus/b40-plus-camo-green.png', // Using B40 PLUS image as placeholder
      }
    ]
  };

  const models = [
    { 
      id: 'x55plus', 
      name: 'X55 PLUS', 
      color: '#4a7a9b',
      image: '/images/models/x55/x55-turqoise.png',
      tagline: 'Premium Performance',
      specs: {
        engine: '1.5L Turbo',
        power: '138 kW',
        acceleration: '7.9s',
        economy: '7.2L/100km'
      }
    },
    { 
      id: 'b40honoredition', 
      name: 'B40 HONOR EDITION', 
      color: '#c9a540',
      image: '/images/models/b40-plus/BJ40-plus-RED.png',
      tagline: 'Next Level Bravery',
      specs: {
        engine: '2.0L Petrol Turbo',
        power: '165 kW',
        acceleration: '8.5s',
        economy: '8.5L/100km'
      }
    },
    { 
      id: 'b30', 
      name: 'B30', 
      color: '#4a7a9b',
      image: '/images/models/b30/导航_20240924095856A090_20250108160710A181_20250108171254A795.png',
      tagline: 'Coming Soon',
      specs: {
        engine: 'Coming Soon',
        power: 'Coming Soon',
        acceleration: 'Coming Soon',
        economy: 'Coming Soon'
      }
    }
  ];
  
  const [activeModel, setActiveModel] = useState(models[0].id);
  const [animating, setAnimating] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  
  const activeModelData = models.find(model => model.id === activeModel);
  const colors = modelColors[activeModel] || [];
  
  // Set default active color when model changes
  useEffect(() => {
    if (colors && colors.length > 0) {
      setActiveColor(colors[0]);
    }
  }, [activeModel]);
  
  const handleModelChange = (modelId) => {
    // Don't allow selecting B30 since it's coming soon
    if (modelId === 'b30') {
      return;
    }
    
    if (modelId !== activeModel && !animating) {
      setAnimating(true);
      setActiveModel(modelId);
      setTimeout(() => setAnimating(false), 500);
    }
  };
  
  const handleColorChange = (color) => {
    if (color.id !== activeColor?.id && !animating) {
      setAnimating(true);
      setActiveColor(color);
      setTimeout(() => setAnimating(false), 500);
    }
  };
  
  return (
    <SectionContainer>
      <BackgroundPattern />
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle>EXPLORE YOUR BAIC</SectionTitle>
          <SectionSubtitle>
            Discover our range of innovative vehicles designed to meet your needs,
            from urban commuting to off-road adventures.
          </SectionSubtitle>
        </SectionHeader>
        
        <ModelsContainer>
          {models.map(model => (
            <ModelCard 
              key={model.id}
              $active={activeModel === model.id}
              onClick={() => handleModelChange(model.id)}
            >
              <ModelImageWrapper $color={model.color}>
                {model.image ? (
                  <ModelImage 
                    src={model.image}
                    alt={model.name}
                    $isB30={model.id === 'b30'}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <ModelImageFallback 
                    $color={model.color}
                    $isB30={model.id === 'b30'}
                  >
                    {model.name}
                  </ModelImageFallback>
                )}
              </ModelImageWrapper>
              <ModelInfo>
                <ModelName $active={activeModel === model.id}>
                  {model.name}
                </ModelName>
                <ModelTagline $active={activeModel === model.id}>
                  {model.tagline}
                </ModelTagline>
                <ActiveIndicator $active={activeModel === model.id} />
              </ModelInfo>
            </ModelCard>
          ))}
        </ModelsContainer>
        
        <FeaturedModelContainer key={activeModel}>
          <FeaturedModelHeader>
            <FeaturedModelTitle>{activeModelData.name}</FeaturedModelTitle>
          </FeaturedModelHeader>
          
          <FeaturedModelImageContainer>
            {(activeColor?.image || activeModelData.image) ? (
              <FeaturedModelImage 
                src={activeColor?.image || activeModelData.image}
                alt={`${activeModelData.name} ${activeColor ? `in ${activeColor.name}` : ''}`}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <FeaturedModelImageFallback $color={activeColor?.hex || activeModelData.color}>
                {activeModelData.name}
              </FeaturedModelImageFallback>
            )}
          </FeaturedModelImageContainer>
          
          <ColorSelectionContainer>
            <ColorSelectionTitle>Available Colors</ColorSelectionTitle>
            <ColorsContainer>
              {colors.map(color => {
                const dark = isDarkColor(color.hex);
                return (
                  <ColorOption 
                    key={color.id}
                    $color={color.hex}
                    $active={activeColor?.id === color.id}
                    $isDark={dark}
                    onClick={() => handleColorChange(color)}
                  />
                );
              })}
            </ColorsContainer>
            {activeColor && <ColorName>{activeColor.name}</ColorName>}
            <ColorSelectionNote>
              * Colors may vary slightly from those shown. Please consult your local dealer for actual color samples.
            </ColorSelectionNote>
          </ColorSelectionContainer>
          
          <SpecsContainer>
            <SpecItem>
              <SpecIcon>
                <i className="fas fa-cog"></i>
              </SpecIcon>
              <SpecValue>{activeModelData.specs.engine}</SpecValue>
              <SpecLabel>Engine</SpecLabel>
            </SpecItem>
            <SpecItem>
              <SpecIcon>
                <i className="fas fa-bolt"></i>
              </SpecIcon>
              <SpecValue>{activeModelData.specs.power}</SpecValue>
              <SpecLabel>Power</SpecLabel>
            </SpecItem>
            <SpecItem>
              <SpecIcon>
                <i className="fas fa-tachometer-alt"></i>
              </SpecIcon>
              <SpecValue>{activeModelData.specs.acceleration}</SpecValue>
              <SpecLabel>0-100 km/h</SpecLabel>
            </SpecItem>
            <SpecItem>
              <SpecIcon>
                <i className="fas fa-gas-pump"></i>
              </SpecIcon>
              <SpecValue>{activeModelData.specs.economy}</SpecValue>
              <SpecLabel>Fuel Economy</SpecLabel>
            </SpecItem>
          </SpecsContainer>
          
          <ActionButtons>
            <PrimaryButton 
              to={
                activeModelData.id === 'x55plus' 
                  ? '/vehicles/models/x55-plus' 
                  : activeModelData.id === 'b40honoredition'
                    ? '/vehicles/models/b40-honor-edition'
                    : `/vehicles/models/${activeModel.toLowerCase()}`
              }
            >
              Explore {activeModelData.name}
            </PrimaryButton>
            {activeModelData.id !== 'x55plus' && activeModelData.id !== 'b40plus' && activeModelData.id !== 'b40honoredition' && (
              <SecondaryButton to="/vehicles/comparison">
                Compare Models
              </SecondaryButton>
            )}
          </ActionButtons>
        </FeaturedModelContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default memo(ExploreModelsSection);
