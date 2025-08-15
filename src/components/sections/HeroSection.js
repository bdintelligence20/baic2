import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Carousel container that will size to fit the images
const CarouselContainer = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #000;
  margin-top: 62px; /* Add margin to account for fixed header height */
  height: auto; /* Let height be determined by image aspect ratio */
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Carousel slide container
const CarouselSlide = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Banner image that will maintain its aspect ratio with contain
const BannerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  max-width: 100%;
`;

// Navigation arrows
const PrevArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
    left: 10px;
  }
  
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 16px;
    left: 5px;
  }
`;

const NextArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
    right: 10px;
  }
  
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 16px;
    right: 5px;
  }
`;

// Carousel dots
const CarouselDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
  
  @media (max-width: 480px) {
    bottom: 10px;
    gap: 8px;
  }
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => (props.$active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.7)')};
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => (props.$active ? 'var(--primary-color-hover)' : '#ffffff')};
  }
  
  @media (max-width: 480px) {
    width: 10px;
    height: 10px;
  }
`;

// Content Group Container (Logo + Button)
const ContentGroup = styled.div`
  position: absolute;
  left: 8%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 15;
  
  @media (max-width: 1200px) {
    left: 7%;
    gap: 18px;
  }
  
  @media (max-width: 768px) {
    left: 6%;
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    left: 5%;
    gap: 12px;
  }
`;

// Logo Image
const LogoImage = styled.img`
  max-width: 450px;
  height: auto;
  
  @media (max-width: 1200px) {
    max-width: 375px;
  }
  
  @media (max-width: 768px) {
    max-width: 300px;
  }
  
  @media (max-width: 480px) {
    max-width: 225px;
  }
`;

// Explore Now Button
const ExploreButton = styled(Link)`
  padding: 12px 24px;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 4px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background-color: var(--primary-color-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(230, 0, 18, 0.4);
  }
  
  @media (max-width: 1200px) {
    padding: 10px 20px;
    font-size: 13px;
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 11px;
    letter-spacing: 0.5px;
  }
`;

const HeroSection = () => {
  // Simple two-slide carousel data using homehero images
  const slides = [
    {
      image: '/images/hero/web banners/WEBSITE LANDSCAPE88.jpg',
      logo: '/images/homehero/WEBSITE LANDSCAPE3 (1) (1).png',
      alt: 'X55 Plus Landscape',
      logoAlt: 'X55 Plus Logo',
      link: '/vehicles/models/x55-plus'
    },
    {
      image: '/images/hero/web banners/WEBSITE LANDSCAPE82.jpg',
      logo: '/images/homehero/WEBSITE LANDSCAPE B40 LOGO (1).png',
      alt: 'B40 Landscape',
      logoAlt: 'B40 Logo',
      link: '/vehicles/models/b40-honor-edition'
    }
  ];
  
  // State for current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);
  
  // Function to go to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);
  
  // Function to go to a specific slide
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);
  
  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  return (
    <CarouselContainer>
      {slides.map((slide, index) => (
        <CarouselSlide 
          key={index} 
          style={{ 
            display: index === currentSlide ? 'flex' : 'none',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.7, 0, 0.3, 1)'
          }}
        >
          <BannerImage src={slide.image} alt={slide.alt} />
          {index === currentSlide && (
            <ContentGroup>
              <LogoImage src={slide.logo} alt={slide.logoAlt} />
              <ExploreButton to={slide.link}>
                Explore Now
              </ExploreButton>
            </ContentGroup>
          )}
        </CarouselSlide>
      ))}
      
      <PrevArrow onClick={prevSlide}>&#10094;</PrevArrow>
      <NextArrow onClick={nextSlide}>&#10095;</NextArrow>
      
      <CarouselDots>
        {slides.map((_, index) => (
          <Dot 
            key={index} 
            $active={index === currentSlide} 
            onClick={() => goToSlide(index)} 
          />
        ))}
      </CarouselDots>
    </CarouselContainer>
  );
};

export default HeroSection;
