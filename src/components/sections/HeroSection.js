import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import GalleryModal from '../common/GalleryModal';
// Import the CSS files in the index.js file instead to avoid issues
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// Carousel container that will size to the banner images
const CarouselContainer = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #000;
  margin-top: 62px; /* Add margin to account for fixed header height */
  height: 80vh;
  min-height: 600px;
  
  @media (max-width: 768px) {
    height: 70vh;
    min-height: 500px;
  }
  
  @media (max-width: 480px) {
    height: 60vh;
    min-height: 400px;
  }
`;

// Custom styling for the Slick slider
const StyledSlider = styled.div`
  height: 100%;
  
  .slick-slider, .slick-list, .slick-track {
    height: 100%;
  }
  
  .slick-slide > div {
    height: 100%;
  }
  
  .slick-dots {
    bottom: 20px;
    z-index: 10;
    
    li button:before {
      color: white;
      opacity: 0.7;
      font-size: 12px;
    }
    
    li.slick-active button:before {
      color: var(--primary-color);
      opacity: 1;
    }
  }
  
  .slick-prev, .slick-next {
    width: 50px;
    height: 50px;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    
    &:before {
      font-size: 24px;
    }
  }
  
  .slick-prev {
    left: 20px;
  }
  
  .slick-next {
    right: 20px;
  }
`;

// Carousel slide container
const CarouselSlide = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

// Banner image that will maintain its aspect ratio
const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.7;
`;

const SlideContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: left;
  color: white;
  padding: 0 2rem;
  max-width: 600px;
  margin-left: 6rem;
  align-self: center;
  
  @media (max-width: 1200px) {
    margin-left: 4rem;
  }
  
  @media (max-width: 992px) {
    margin-left: 2rem;
    padding: 0 1.5rem;
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 0 2rem;
    max-width: 100%;
    width: 100%;
    text-align: center;
  }
`;

const SlideTagline = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 992px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    letter-spacing: 1px;
  }
`;

const SlideTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
`;

const CTAButton = styled(Link)`
  padding: 1rem 2rem;
  background-color: ${props => props.$primary ? 'var(--primary-color)' : 'transparent'};
  color: var(--primary-color-text);
  border: 2px solid ${props => props.$primary ? 'var(--primary-color)' : 'white'};
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$primary ? 'var(--primary-color-hover)' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${props => props.$primary ? 'var(--primary-color-hover)' : 'white'};
    transform: translateY(-3px);
  }
  
  @media (max-width: 992px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.2rem;
    font-size: 0.8rem;
    width: 100%;
    text-align: center;
  }
`;

// Scroll indicator at the bottom
const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  
  @media (max-width: 768px) {
    bottom: 50px;
  }
  
  @media (max-width: 480px) {
    bottom: 40px;
    display: none; /* Hide on very small screens to avoid overlap with dots */
  }
`;

const ScrollIcon = styled.div`
  width: 30px;
  height: 50px;
  border: 2px solid white;
  border-radius: 15px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    width: 6px;
    height: 6px;
    background-color: white;
    border-radius: 50%;
    transform: translateX(-50%);
    animation: scrollDown 2s infinite;
  }
  
  @keyframes scrollDown {
    0% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
  }
  
  @media (max-width: 768px) {
    width: 25px;
    height: 40px;
    
    &::before {
      width: 5px;
      height: 5px;
    }
  }
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

const HeroSection = () => {
  // Carousel slides data
  const slides = [
    {
      tagline: "Brave the City",
      title: "The X55",
      image: '/images/hero/web banners/WEBSITE_1920X1080PX_HOMEPAGE - x552 (1).jpg',
      link: '/vehicles/models/x55',
      model: 'x55'
    },
    {
      tagline: "Intelligently Brave",
      title: "The X55 Plus",
      image: '/images/hero/web banners/WEBSITE_1920X1080PX_HOMEPAGE3 (2)x55plus.jpg',
      link: '/vehicles/models/x55-plus',
      model: 'x55-plus'
    },
    {
      tagline: "Bravely Intrepid",
      title: "The B40 Plus",
      image: '/images/hero/web banners/WEBSITE_1920X1080PX_HOMEPAGE4 b40(2).jpg',
      link: '/vehicles/models/b40-plus',
      model: 'b40-plus'
    }
  ];
  
  // Gallery images for each model
  const galleryImages = {
    'x55': [
      '/images/vehicles/x55/gallery/63f3351fb366b767f7580bbd_X55-exterior-gallery-1.jpg',
      '/images/vehicles/x55/gallery/63f3351fb366b752b0580bc2_X55-exterior-gallery-2.jpg',
      '/images/vehicles/x55/gallery/63f3351fb366b73c98580bc8_X55-exterior-gallery-3.jpg',
      '/images/vehicles/x55/gallery/63f3351fb366b784fd580bd9_X55-exterior-gallery-5.jpg',
      '/images/vehicles/x55/gallery/63f3351fb366b73c98580bc8_X55-exterior-gallery-6.jpg',
      '/images/vehicles/x55/gallery/63f3351fb366b749a1580be3_X55-exterior-gallery-7.jpg',
      '/images/vehicles/x55/gallery/63f3351fb366b7a7d2580bde_X55-exterior-gallery-8.jpg',
      '/images/vehicles/x55/gallery/63f3351fb366b7a88d580be9_X55-exterior-gallery-9.jpg',
      '/images/vehicles/x55/gallery/63f3351fb366b7ef3e580bee_X55-exterior-gallery-10.jpg',
      '/images/vehicles/x55/gallery/X55-interior-gallery-1.jpg',
      '/images/vehicles/x55/gallery/X55-interior-gallery-2.jpg',
      '/images/vehicles/x55/gallery/X55-interior-gallery-3.jpg',
      '/images/vehicles/x55/gallery/X55-interior-gallery-5.jpg',
      '/images/vehicles/x55/gallery/X55-interior-gallery-6.jpg',
      '/images/vehicles/x55/gallery/X55-interior-gallery-7.jpg',
      '/images/vehicles/x55/gallery/X55-interior-gallery-8.jpg',
      '/images/vehicles/x55/gallery/X55-interior-gallery-10.jpg'
    ],
    'x55-plus': [
      '/images/vehicles/x55-plus/gallery/baic_exterior_x55_plus_1.jpg',
      '/images/vehicles/x55-plus/gallery/baic_exterior_x55_plus_2.jpg',
      '/images/vehicles/x55-plus/gallery/baic_exterior_x55_plus_3.jpg',
      '/images/vehicles/x55-plus/gallery/baic_exterior_x55_plus_4.jpg',
      '/images/vehicles/x55-plus/gallery/baic_exterior_x55_plus_5.jpg',
      '/images/vehicles/x55-plus/gallery/baic_exterior_x55_plus_6.jpg',
      '/images/vehicles/x55-plus/gallery/baic_exterior_x55_plus_7.jpg',
      '/images/vehicles/x55-plus/gallery/baic_exterior_x55_plus_8.jpg',
      '/images/vehicles/x55-plus/gallery/baic_interior_x55_plus_1.jpg',
      '/images/vehicles/x55-plus/gallery/baic_interior_x55_plus_2.jpg',
      '/images/vehicles/x55-plus/gallery/baic_interior_x55_plus_3.jpg',
      '/images/vehicles/x55-plus/gallery/baic_interior_x55_plus_4.jpg',
      '/images/vehicles/x55-plus/gallery/baic_interior_x55_plus_5.jpg',
      '/images/vehicles/x55-plus/gallery/baic_interior_x55_plus_6.jpg',
      '/images/vehicles/x55-plus/gallery/baic_interior_x55_plus_7.jpg',
      '/images/vehicles/x55-plus/gallery/baic_interior_x55_plus_8.jpg',
      '/images/vehicles/x55-plus/gallery/baic_x55_plus_ex_new1.jpg',
      '/images/vehicles/x55-plus/gallery/baic_x55_plus_ex_new2.jpg',
      '/images/vehicles/x55-plus/gallery/baic_x55_plus_ex_new3.jpg',
      '/images/vehicles/x55-plus/gallery/baic_x55_plus_ex_new4.jpg',
      '/images/vehicles/x55-plus/gallery/baic_x55_plus_ex_new5.jpg',
      '/images/vehicles/x55-plus/gallery/baic_x55_plus_ex_new6.jpg',
      '/images/vehicles/x55-plus/gallery/baic_x55_plus_ex_new7.jpg',
      '/images/vehicles/x55-plus/gallery/baic_x55_plus_ex_new8.jpg',
      '/images/vehicles/x55-plus/gallery/baic-x55-plus-b-image.jpg',
      '/images/vehicles/x55-plus/gallery/baic-x55-plus-overview1.jpg',
      '/images/vehicles/x55-plus/gallery/baic-x55-plus-overview2.jpg',
      '/images/vehicles/x55-plus/gallery/baic-x55-plus-overview3.jpg',
      '/images/vehicles/x55-plus/gallery/baic-x55-plus-overview4.jpg',
      '/images/vehicles/x55-plus/gallery/baic-x55-plus-overview5.jpg',
      '/images/vehicles/x55-plus/gallery/baic-x55-plus-overview6.jpg',
      '/images/vehicles/x55-plus/gallery/baic-x55-plus-overview7.jpg',
      '/images/vehicles/x55-plus/gallery/baic-x55-plus-overview8.jpg',
      '/images/vehicles/x55-plus/gallery/baic-x55-plus-overview9.jpg',
      '/images/vehicles/x55-plus/gallery/baic-x55-plus-overview10.jpg'
    ],
    'b40-plus': [
      '/images/vehicles/b40-plus/gallery/B40-exterior-gallery-1.jpg',
      '/images/vehicles/b40-plus/gallery/B40-exterior-gallery-2.jpg',
      '/images/vehicles/b40-plus/gallery/B40-exterior-gallery-3.jpg',
      '/images/vehicles/b40-plus/gallery/B40-exterior-gallery-4.jpg',
      '/images/vehicles/b40-plus/gallery/B40-exterior-gallery-6.jpg',
      '/images/vehicles/b40-plus/gallery/B40-exterior-gallery-7.jpg',
      '/images/vehicles/b40-plus/gallery/B40-exterior-gallery-8.jpg',
      '/images/vehicles/b40-plus/gallery/B40-exterior-gallery-9.jpg',
      '/images/vehicles/b40-plus/gallery/B40-exterior-gallery-10.jpg',
      '/images/vehicles/b40-plus/gallery/B40-exterior-gallery-11.jpg',
      '/images/vehicles/b40-plus/gallery/B40-exterior-gallery-13.jpg',
      '/images/vehicles/b40-plus/gallery/B40-exterior-gallery-14.jpg',
      '/images/vehicles/b40-plus/gallery/B40-interior-gallery-1.jpg',
      '/images/vehicles/b40-plus/gallery/B40-interior-gallery-2.jpg',
      '/images/vehicles/b40-plus/gallery/B40-interior-gallery-3.jpg',
      '/images/vehicles/b40-plus/gallery/B40-interior-gallery-4.jpg'
    ]
  };
  
  // State for current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // State for gallery modal
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryModel, setCurrentGalleryModel] = useState('x55');
  
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
  
  // Function to scroll to content below the hero section
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
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
          <BannerImage src={slide.image} alt={`BAIC - ${slide.tagline}`} />
          <SlideContent>
            <SlideTagline>{slide.tagline}</SlideTagline>
            <SlideTitle>{slide.title}</SlideTitle>
            <CTAContainer>
              <CTAButton to="/book-test-drive" $primary>Test Drive</CTAButton>
              <CTAButton as="button" onClick={() => {
                setCurrentGalleryModel(slide.model);
                setIsGalleryOpen(true);
              }}>View Gallery</CTAButton>
            </CTAContainer>
          </SlideContent>
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
      
      <ScrollIndicator onClick={scrollToContent}>
        <ScrollIcon />
      </ScrollIndicator>
      
      {/* Gallery Modal */}
      <GalleryModal 
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={galleryImages[currentGalleryModel] || []}
        title={slides.find(slide => slide.model === currentGalleryModel)?.title || 'Gallery'}
      />
    </CarouselContainer>
  );
};

export default HeroSection;
