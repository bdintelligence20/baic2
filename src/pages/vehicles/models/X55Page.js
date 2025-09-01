import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import X55SpecificationsSection from '../../../components/vehicles/X55SpecificationsSection';
import FinanceOptionsSection from '../../../components/vehicles/FinanceOptionsSection';
import HeritageSection from '../../../components/sections/HeritageSection';
import ResponsiveImage from '../../../components/common/ResponsiveImage';

const PageContainer = styled.div`
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  position: relative;
  height: 80vh;
  min-height: 600px;
  background-color: #000;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 62px; /* Add margin to account for fixed header height */
  
  @media (max-width: 768px) {
    height: 70vh;
    min-height: 500px;
  }
  
  @media (max-width: 480px) {
    height: 60vh;
    min-height: 400px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/hero/web banners/WEBSITE_1920X1080PX_HOMEPAGE - x552 (1).jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
`;

const HeroContent = styled.div`
  position: absolute;
  z-index: 2;
  text-align: left;
  color: #333;
  padding: 1.5rem 2rem;
  bottom: 3rem;
  left: 3rem;
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
  @media (max-width: 1200px) {
    left: 2rem;
    bottom: 2.5rem;
  }
  
  @media (max-width: 992px) {
    left: 1.5rem;
    bottom: 2rem;
    padding: 1.2rem 1.8rem;
  }
  
  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 1.5rem;
    flex-direction: column;
    text-align: center;
    width: 90%;
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.2rem;
    bottom: 1.5rem;
  }
`;

const TaglineSmall = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0;
  letter-spacing: 1px;
  margin-right: 1.5rem;
  
  @media (max-width: 1200px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 992px) {
    font-size: 1.2rem;
    margin-right: 1.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ModelName = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 1px;
  margin-right: 1.5rem;
  
  @media (max-width: 1200px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 992px) {
    font-size: 1.4rem;
    margin-right: 1.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }
`;

const TaglineLarge = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  margin: 0;
  letter-spacing: 1px;
  margin-right: 1.5rem;
  
  @media (max-width: 1200px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 992px) {
    font-size: 1.2rem;
    margin-right: 1.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    gap: 0.8rem;
  }
  
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.6rem;
    align-items: center;
  }
`;

const CTAButton = styled(Link)`
  background-color: ${props => props.$primary ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$primary ? 'var(--primary-color-text)' : '#333'};
  text-decoration: none;
  padding: 0.7rem 1.2rem;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: ${props => props.$primary ? 'none' : '2px solid var(--primary-color)'};
  
  &:hover {
    background-color: ${props => props.$primary ? 'var(--primary-color-hover)' : 'rgba(230, 0, 18, 0.1)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 992px) {
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.75rem;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 0.6rem 1rem;
    font-size: 0.7rem;
  }
`;

const FeatureSection = styled.section`
  padding: 0;
  margin: 0;
  background-color: ${props => props.$dark ? '#d6dfe8' : '#fff'};
  color: ${props => props.$dark ? '#333' : '#000'};
  position: relative;
  overflow: hidden;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const FeatureContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: ${props => props.$reverse ? 'row-reverse' : 'row'};
  align-items: stretch;
  height: 500px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`;

const FeatureContent = styled.div`
  flex: 1;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  
  @media (max-width: 992px) {
    padding: 3rem 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 3rem 2rem;
    max-width: 100%;
    width: 100%;
  }
`;

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FeatureSubtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: center;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  text-align: center;
`;

const FeatureCTAButton = styled(Link)`
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: none;
  display: inline-block;
  width: fit-content;
  max-width: 200px;
  text-align: center;
  margin: 0 auto;
  align-self: center;
  
  &:hover {
    background-color: var(--primary-color-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 992px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.8rem;
    width: fit-content;
    max-width: 180px;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
    width: fit-content;
    max-width: 160px;
    display: block;
  }
  
  @media (max-width: 480px) {
    width: fit-content;
    max-width: 150px;
  }
`;

const FeatureImage = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    object-position: center;
    margin: 0;
    padding: 0;
  }
  
  @media (max-width: 1024px) {
    height: 300px;
    min-height: 300px;
    margin: 0;
    padding: 0;
    
    img {
      position: relative;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  }
`;

const SpecsSection = styled.section`
  padding: 8rem 0;
  background-color: #f8f8f8;
`;

const SpecsContainer = styled.div`
  max-width: 1200px;
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
  color: var(--primary-color);
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
  color: var(--primary-color);
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
  max-width: 1200px;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SafetyCard = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SafetyIcon = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SafetyCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const SafetyCardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.8;
`;

const TechSpecsSection = styled.section`
  padding: 8rem 0;
  background-color: #fff;
`;

const TechSpecsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const TechSpecsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: var(--primary-color);
    margin: 1rem auto 0;
  }
`;

const TechSpecsDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
  color: #666;
`;

// Modal components
// Modal components for specifications
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem 0;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    width: 95%;
    max-height: 85vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  z-index: 10;
  
  &:hover {
    color: var(--primary-color-light-text);
  }
`;

// Gallery Modal Components
const GalleryModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

const GalleryCloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background-color: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: white;
  z-index: 1010;
  
  &:hover {
    color: var(--primary-color-light-text);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 2rem;
  width: 90%;
  max-width: 1200px;
  max-height: 80vh;
  overflow-y: auto;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled.div`
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  height: 200px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.03);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LightboxContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1100;
`;

const LightboxContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 1000px;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const LightboxCloseButton = styled.button`
  position: absolute;
  top: -2rem;
  right: 0;
  background-color: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: white;
  
  &:hover {
    color: var(--primary-color-light-text);
  }
`;

const LightboxNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$direction === 'prev' ? 'left: -2rem;' : 'right: -2rem;'}
  background-color: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: white;
  z-index: 1110;
  
  &:hover {
    color: var(--primary-color-light-text);
  }
  
  @media (max-width: 768px) {
    ${props => props.$direction === 'prev' ? 'left: 1rem;' : 'right: 1rem;'}
    font-size: 1.5rem;
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1rem;
`;

const SpecsButton = styled.button`
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: none;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  
  &:hover {
    background-color: var(--primary-color-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 992px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.8rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
  }
`;

const X55Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Gallery images
  const galleryImages = [
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
  ];
  
  // Specifications modal handlers
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  };
  
  // Gallery modal handlers
  const openGallery = () => {
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = '';
  };
  
  // Lightbox handlers
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };
  
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };
  
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const engineSpecs = [
    { title: 'Engine Type', value: '1.5T', unit: 'Magic Core', description: 'Co-developed by BAIC and Germany Meta, award-winning engine' },
    { title: 'Maximum Power', value: '138', unit: 'kW', description: 'Impressive power output for exhilarating acceleration' },
    { title: 'Maximum Torque', value: '305', unit: 'N·m', description: 'Strong torque for responsive driving in all conditions' },
    { title: 'Acceleration', value: '7.84', unit: 's (0-100 km/h)', description: 'Quick acceleration for a sporty driving experience' }
  ];
  
  const safetyFeatures = [
    {
      title: 'Space Fortress Body Design',
      description: 'The X55 II\'s robust body design achieves a vehicle body rigidity of 21872N·m/deg, providing enhanced safety through crash reduction and deformation capabilities.'
    },
    {
      title: 'Multiple Sensors and Assist Driving',
      description: 'Navigate with confidence thanks to a suite of advanced driver-assistance systems, including a brand-new parking domain controller, Bosch 5th generation millimeter wave radar, and 12 ultrasonic radars.'
    },
    {
      title: '360° Follow-up 3D Panoramic Image',
      description: 'Maneuver with ease using the 360° Follow-up 3D Panoramic Image system, which utilises 4-megapixel HD cameras for comprehensive visibility around the vehicle.'
    },
    {
      title: 'Intelligent Adaptive Cruise Control',
      description: 'Enjoy relaxed long-distance driving with Intelligent Adaptive Cruise Control, featuring comforting low-speed traffic jam assistance for a stress-free driving experience.'
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <TaglineSmall>BAIC X55</TaglineSmall>
          <ModelName>BRAVE THE CITY</ModelName>
          <TaglineLarge>BRAVE IT INTELLIGENTLY</TaglineLarge>
          
          <CTAContainer>
            <CTAButton to="/book-a-test-drive-today" $primary>Test Drive</CTAButton>
            <CTAButton as="button" onClick={openGallery}>View Gallery</CTAButton>
          </CTAContainer>
        </HeroContent>
      </HeroSection>
      
      <FeatureSection $dark={true}>
        <FeatureContainer>
          <FeatureContent>
            <FeatureTitle>Vogue Beast Arrival</FeatureTitle>
            <FeatureSubtitle>Crystal Star Design</FeatureSubtitle>
            <FeatureDescription>
              The X55 makes a striking entrance with its 'Crystal Star Design,' featuring a captivating 
              'Crystal Diamond Interstellar Grille.' The bold and distinctive design commands attention 
              on the road, making a statement wherever it goes.
            </FeatureDescription>
            <FeatureCTAButton to="/book-a-test-drive-today">Enquire Today</FeatureCTAButton>
          </FeatureContent>
          <FeatureImage>
            <ResponsiveImage 
              src="/images/vehicles/x55/features/63f3351fb366b767f7580bbd_X55-exterior-gallery-1.jpg" 
              alt="Crystal Star Design" 
              lazy={true}
              objectFit="cover"
              sizes="50vw"
            />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection>
        <FeatureContainer $reverse>
          <FeatureContent>
            <FeatureTitle>Star Trails Ambient Light</FeatureTitle>
            <FeatureSubtitle>Immersive interior atmosphere</FeatureSubtitle>
            <FeatureDescription>
              Inside, immerse yourself in a vibrant atmosphere with the 'Star Trails Ambient Light,' 
              featuring colorful light strips and sculpted door sheets that create a diamond-feel ambiance. 
              The premium interior combines comfort with sophisticated design elements for an enjoyable journey.
            </FeatureDescription>
            <FeatureCTAButton to="/find-dealer">Find a dealer</FeatureCTAButton>
          </FeatureContent>
          <FeatureImage>
            <ResponsiveImage 
              src="/images/vehicles/x55/features/X55-interior-gallery-3.jpg" 
              alt="Star Trails Ambient Light" 
              lazy={true}
              objectFit="cover"
              sizes="50vw"
            />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection $dark={true}>
        <FeatureContainer>
          <FeatureContent>
            <FeatureTitle>Inductive Hidden Door Handles</FeatureTitle>
            <FeatureSubtitle>Elegant functionality</FeatureSubtitle>
            <FeatureDescription>
              Experience a touch of elegance with the 'Inductive Hidden Door Handles' that automatically 
              pop out, adding to the X55's sleek profile and offering an 'ice-break mode' feature. This 
              sophisticated detail enhances both the vehicle's aesthetics and functionality.
            </FeatureDescription>
            <FeatureCTAButton to="/book-a-test-drive-today">Book a test drive</FeatureCTAButton>
          </FeatureContent>
          <FeatureImage>
            <ResponsiveImage 
              src="/images/vehicles/x55/features/63f3351fb366b73c98580bc8_X55-exterior-gallery-3.jpg" 
              alt="Inductive Hidden Door Handles" 
              lazy={true}
              objectFit="cover"
              sizes="50vw"
            />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection>
        <FeatureContainer $reverse>
          <FeatureContent>
            <FeatureTitle>Super Low Cd Design</FeatureTitle>
            <FeatureSubtitle>New Limit of SUV Aerodynamics</FeatureSubtitle>
            <FeatureDescription>
              The X55 achieves a super-low drag coefficient of 0.32 Cd, showcasing its aerodynamic efficiency 
              and setting a new standard in its class. This exceptional aerodynamic performance contributes to 
              improved fuel efficiency, reduced wind noise, and enhanced stability at higher speeds.
            </FeatureDescription>
            <FeatureCTAButton to="/about/company-overview">About BAIC</FeatureCTAButton>
          </FeatureContent>
          <FeatureImage>
            <ResponsiveImage 
              src="/images/vehicles/x55/features/63f3351fb366b7a88d580be9_X55-exterior-gallery-9.jpg" 
              alt="Super Low Cd Design" 
              lazy={true}
              objectFit="cover"
              sizes="50vw"
            />
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
            The X55 is designed with your safety as a top priority, featuring advanced systems to protect you and your passengers
          </SafetySubtitle>
          
          <SafetyGrid>
            {safetyFeatures.map((feature, index) => (
              <SafetyCard key={index}>
                <SafetyIcon>
                  <i className={`fas fa-${
                    index === 0 ? 'shield-alt' : 
                    index === 1 ? 'car' : 
                    index === 2 ? 'camera' : 
                    'tachometer-alt'
                  }`}></i>
                </SafetyIcon>
                <SafetyCardTitle>{feature.title}</SafetyCardTitle>
                <SafetyCardDescription>{feature.description}</SafetyCardDescription>
              </SafetyCard>
            ))}
          </SafetyGrid>
        </SafetyContainer>
      </SafetySection>
      
      <TechSpecsSection>
        <TechSpecsContainer>
          <TechSpecsTitle>Technical Specifications</TechSpecsTitle>
          <TechSpecsDescription>
            Compare specifications across different X55 variants to find the perfect match for your needs.
          </TechSpecsDescription>
          <SpecsButton onClick={openModal}>View Specifications</SpecsButton>
        </TechSpecsContainer>
      </TechSpecsSection>
      
      <Modal $isOpen={isModalOpen}>
        <ModalContent>
          <CloseButton onClick={closeModal}>×</CloseButton>
          <X55SpecificationsSection />
        </ModalContent>
      </Modal>
      
      <FinanceOptionsSection />
      
      <HeritageSection />
      
      {/* Gallery Modal */}
      <GalleryModal $isOpen={isGalleryOpen}>
        <GalleryCloseButton onClick={closeGallery}>×</GalleryCloseButton>
        <GalleryGrid>
          {galleryImages.map((image, index) => (
            <GalleryItem key={index} onClick={() => openLightbox(index)}>
              <ResponsiveImage 
                src={image} 
                alt={`X55 Gallery ${index + 1}`} 
                lazy={true}
                objectFit="cover"
                sizes="200px"
              />
            </GalleryItem>
          ))}
        </GalleryGrid>
      </GalleryModal>
      
      {/* Lightbox for full-size image viewing */}
      <LightboxContainer $isOpen={isLightboxOpen}>
        <LightboxContent>
          <LightboxCloseButton onClick={closeLightbox}>×</LightboxCloseButton>
          <LightboxNavButton $direction="prev" onClick={goToPrevImage}>‹</LightboxNavButton>
          <LightboxImage 
            src={galleryImages[currentImageIndex]} 
            alt={`X55 Gallery ${currentImageIndex + 1}`} 
          />
          <LightboxNavButton $direction="next" onClick={goToNextImage}>›</LightboxNavButton>
          <ImageCounter>{currentImageIndex + 1} / {galleryImages.length}</ImageCounter>
        </LightboxContent>
      </LightboxContainer>
    </PageContainer>
  );
};

export default X55Page;
