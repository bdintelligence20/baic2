import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const SectionContainer = styled.section`
  padding: 7rem 0;
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
  background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0),
                    linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0);
  background-size: 60px 60px;
  background-position: 0 0, 30px 30px;
  opacity: 0.4;
  z-index: 1;
`;

const BackgroundText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20rem;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.03);
  text-transform: uppercase;
  white-space: nowrap;
  z-index: 1;
  
  @media (max-width: 992px) {
    font-size: 15rem;
  }
  
  @media (max-width: 768px) {
    font-size: 10rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.8s ease forwards;
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

const ModelTitle = styled.h3`
  font-size: 3rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: 800;
  color: #222;
  letter-spacing: 2px;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
`;

const ModelSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.3s;
  opacity: 0;
`;

const ColorSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
  }
`;

const CarImageContainer = styled.div`
  flex: 1;
  position: relative;
  margin-bottom: 3rem;
  
  @media (min-width: 992px) {
    margin-bottom: 0;
  }
`;

const CarImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
  background-color: ${props => props.$color};
  background-image: ${props => props.$image ? `url(${props.$image})` : 'none'};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.1) 100%);
  }
  
  @media (min-width: 992px) {
    height: 500px;
  }
`;

const CarImageText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${props => props.$isDark ? 'white' : '#333'};
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: ${props => props.$isDark ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'};
  display: ${props => props.$hideText ? 'none' : 'block'};
`;

const ColorSelectionPanel = styled.div`
  flex: 0 0 300px;
  animation: ${slideIn} 0.8s ease forwards;
  animation-delay: 0.6s;
  opacity: 0;
`;

const ColorSelectionTitle = styled.h4`
  font-size: 1.5rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-weight: 600;
  color: #333;
`;

const ColorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ColorOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: ${props => props.$active ? 'rgba(0,0,0,0.05)' : 'transparent'};
  
  &:hover {
    background-color: rgba(0,0,0,0.05);
  }
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

const ColorInfo = styled.div`
  flex: 1;
`;

const ColorName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.3rem;
`;

const ColorDescription = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const ModelSelectionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const ModelTab = styled.div`
  padding: 0.8rem 1.5rem;
  background-color: ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$active ? 'var(--primary-color-text)' : 'var(--text-color)'};
  border: 2px solid ${props => props.$active ? 'var(--primary-color)' : 'var(--border-color)'};
  border-radius: 4px;
  font-weight: ${props => props.$active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-color-hover)' : 'rgba(0,0,0,0.05)'};
    border-color: ${props => props.$active ? 'var(--primary-color-hover)' : '#999'};
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    flex: 1 0 40%;
    text-align: center;
  }
`;

const ColorSelectionFooter = styled.div`
  margin-top: 3rem;
  text-align: center;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.8s;
  opacity: 0;
`;

const ColorSelectionNote = styled.p`
  font-size: 0.9rem;
  color: #777;
  font-style: italic;
`;

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

const ColorSelectionSection = () => {
// Define available models
const modelOptions = [
  { id: 'x55', name: 'X55', colorCount: 6 },
  { id: 'x55Plus', name: 'X55 Plus', colorCount: 2 },
  { id: 'x55Dynamic', name: 'X55 Dynamic', colorCount: 2 },
  { id: 'b40Plus', name: 'B40 Plus', colorCount: 7 }
];

// Use state to manage the active model
const [activeModel, setActiveModel] = useState('x55'); // Default to X55

// Model-specific color configurations
const modelColors = {
  x55: [
    { 
      id: 'white', 
      name: 'Crystal White', 
      hex: '#ffffff',
      image: '/images/models/x55/14_20240708121758A006.png',
      description: 'Elegant and timeless, perfect for any occasion'
    },
    { 
      id: 'black', 
      name: 'Phantom Black', 
      hex: '#111111',
      image: '/images/models/x55/15_20240708121819A007.png',
      description: 'Sophisticated and bold, commanding attention'
    },
    { 
      id: 'silver', 
      name: 'Lunar Silver', 
      hex: '#c0c0c0',
      image: '/images/models/x55/16_20240708121837A008.png',
      description: 'Modern and versatile, highlighting the vehicle\'s lines'
    },
    { 
      id: 'blue', 
      name: 'Ocean Blue', 
      hex: '#1a3a5f',
      image: '/images/models/x55/17_20240708121853A009.png',
      description: 'Deep and mysterious, inspired by the depths of the sea'
    },
    { 
      id: 'red', 
      name: 'Racing Red', 
      hex: '#a51c30',
      image: '/images/models/x55/18_20240708121917A010.png',
      description: 'Passionate and energetic, making a powerful statement'
    },
    { 
      id: 'green', 
      name: 'Emerald Green', 
      hex: '#1e5945',
      image: '/images/models/x55/19_20240708121939A011.png',
      description: 'Rich and distinctive, connecting with nature'
    }
  ],
  x55Plus: [
    { 
      id: 'white', 
      name: 'Crystal White', 
      hex: '#ffffff',
      image: '/images/models/x55-plus/14_20240708121758A006.png',
      description: 'Elegant and timeless, perfect for any occasion'
    },
    { 
      id: 'black', 
      name: 'Phantom Black', 
      hex: '#111111',
      image: '/images/models/x55-plus/15_20240708121819A007.png',
      description: 'Sophisticated and bold, commanding attention'
    }
  ],
  x55Dynamic: [
    { 
      id: 'white', 
      name: 'Crystal White', 
      hex: '#ffffff',
      image: '/images/models/x55-dynamic/14_20240708121758A006.png',
      description: 'Elegant and timeless, perfect for any occasion'
    },
    { 
      id: 'black', 
      name: 'Phantom Black', 
      hex: '#111111',
      image: '/images/models/x55-dynamic/15_20240708121819A007.png',
      description: 'Sophisticated and bold, commanding attention'
    }
  ],
  b40Plus: [
    { 
      id: 'white', 
      name: 'Crystal White', 
      hex: '#ffffff',
      image: '/images/models/b40-plus/111111111_20230519152945A075_20241216160314A660.png',
      description: 'Elegant and timeless, perfect for any occasion'
    },
    { 
      id: 'black', 
      name: 'Phantom Black', 
      hex: '#111111',
      image: '/images/models/b40-plus/111111111_20230519152945A075_20241216160314A660.png',
      description: 'Sophisticated and bold, commanding attention'
    },
    { 
      id: 'red', 
      name: 'Racing Red', 
      hex: '#a51c30',
      image: '/images/models/b40-plus/BJ40-plus-红_20230519153442A082.png',
      description: 'Passionate and energetic, making a powerful statement'
    },
    { 
      id: 'blue', 
      name: 'Sea Blue', 
      hex: '#1a3a5f',
      image: '/images/models/b40-plus/111111111_20230519152945A075_20241216160314A660.png',
      description: 'Deep and refreshing, inspired by the ocean'
    },
    { 
      id: 'lapland', 
      name: 'Lapland', 
      hex: '#d4d4d8',
      image: '/images/models/b40-plus/111111111_20230519152945A075_20241216160314A660.png',
      description: 'Subtle and sophisticated, reminiscent of Nordic landscapes'
    },
    { 
      id: 'green', 
      name: 'Forest Green', 
      hex: '#2d5f5d',
      image: '/images/models/b40-plus/飞书20230519-104944_20230519142740A064.png',
      description: 'Rich and natural, perfect for adventure seekers'
    },
    { 
      id: 'orange', 
      name: 'Sunset Orange', 
      hex: '#d97706',
      image: '/images/models/b40-plus/飞书20230519-104951_20230519142747A065_20241216160328A662.png',
      description: 'Vibrant and eye-catching, for those who stand out'
    }
  ]
};

// Get colors for the active model
const colors = modelColors[activeModel];
  
  const [activeColor, setActiveColor] = useState(modelColors.x55[0]);
  const [animating, setAnimating] = useState(false);
  
  // Reset active color when model changes
  useEffect(() => {
    if (colors && colors.length > 0) {
      setActiveColor(colors[0]);
    }
  }, [activeModel]);
  
  const handleColorChange = (color) => {
    if (color.id !== activeColor.id && !animating) {
      setAnimating(true);
      setActiveColor(color);
      setTimeout(() => setAnimating(false), 500);
    }
  };
  
  const handleModelChange = (modelId) => {
    if (modelId !== activeModel && !animating) {
      setAnimating(true);
      setActiveModel(modelId);
      setTimeout(() => setAnimating(false), 500);
    }
  };
  
  // Get the current model name and color count
  const currentModel = modelOptions.find(model => model.id === activeModel);
  
  return (
    <SectionContainer>
      <BackgroundPattern />
      <BackgroundText>BAIC</BackgroundText>
      <ContentContainer>
        <SectionHeader>
          <SectionTitle>COLOR YOUR DRIVE</SectionTitle>
          <SectionSubtitle>
            Express your personality with our range of premium colors,
            each carefully crafted to enhance the vehicle's design.
          </SectionSubtitle>
        </SectionHeader>
        
        <ModelSelectionContainer>
          {modelOptions.map(model => (
            <ModelTab 
              key={model.id}
              $active={activeModel === model.id}
              onClick={() => handleModelChange(model.id)}
            >
              {model.name}
            </ModelTab>
          ))}
        </ModelSelectionContainer>
        
        <ModelTitle key={`title-${activeModel}`}>{currentModel.name}</ModelTitle>
        <ModelSubtitle key={`subtitle-${activeModel}`}>
          Available in {currentModel.colorCount} distinctive colors
        </ModelSubtitle>
        
        <ColorSelectionWrapper>
          <CarImageContainer>
          <CarImage 
            key={`car-image-${activeModel}-${activeColor.id}`}
            $color={activeColor.hex} 
            $image={activeColor.image}
          >
            <CarImageText 
              $isDark={isDarkColor(activeColor.hex)} 
              $hideText={activeColor.image ? true : false}
            >
              {currentModel.name}
            </CarImageText>
          </CarImage>
          </CarImageContainer>
          
          <ColorSelectionPanel>
            <ColorSelectionTitle>Select Your Color</ColorSelectionTitle>
            <ColorsContainer>
              {colors.map(color => {
                const dark = isDarkColor(color.hex);
                return (
                  <ColorOptionWrapper 
                    key={color.id}
                    $active={activeColor.id === color.id}
                    onClick={() => handleColorChange(color)}
                  >
                    <ColorOption 
                      $color={color.hex}
                      $active={activeColor.id === color.id}
                      $isDark={dark}
                    />
                    <ColorInfo>
                      <ColorName>{color.name}</ColorName>
                      <ColorDescription>{color.description}</ColorDescription>
                    </ColorInfo>
                  </ColorOptionWrapper>
                );
              })}
            </ColorsContainer>
          </ColorSelectionPanel>
        </ColorSelectionWrapper>
        
        <ColorSelectionFooter>
          <ColorSelectionNote>
            * Colors may vary slightly from those shown. Please consult your local dealer for actual color samples.
          </ColorSelectionNote>
        </ColorSelectionFooter>
      </ContentContainer>
    </SectionContainer>
  );
};

export default ColorSelectionSection;
