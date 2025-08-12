import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SpecificationsSection from '../../../components/vehicles/SpecificationsSection';
import HeritageSection from '../../../components/sections/HeritageSection';

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
  background-image: url('/images/vehicles/b40-plus-honor-edition/hero/hero.jpg');
  background-size: cover;
  background-position: center;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.05) 100%);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: absolute;
  z-index: 2;
  left: 8%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  
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

const CTAContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    gap: 1.2rem;
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

const CTAButton = styled(Link)`
  background-color: ${props => props.$primary ? 'rgba(230, 0, 18, 0.9)' : 'rgba(255, 255, 255, 0.15)'};
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: ${props => props.$primary ? '2px solid rgba(230, 0, 18, 0.9)' : '2px solid rgba(255, 255, 255, 0.3)'};
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: ${props => props.$primary ? 'rgba(230, 0, 18, 1)' : 'rgba(255, 255, 255, 0.25)'};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    border-color: ${props => props.$primary ? 'rgba(230, 0, 18, 1)' : 'rgba(255, 255, 255, 0.5)'};
  }
  
  @media (max-width: 992px) {
    padding: 0.9rem 1.8rem;
    font-size: 0.85rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
    padding: 1rem;
    font-size: 0.85rem;
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
  min-height: 500px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    min-height: auto;
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
  
  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
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
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.6;
  }
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
    margin: 0;
    padding: 0;
  }
  
  @media (max-width: 1024px) {
    height: 400px;
    margin: 0;
    padding: 0;
  }
  
  @media (max-width: 768px) {
    height: 300px;
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
  background-color: #fff;
  color: #333;
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

const OffRoadSection = styled.section`
  padding: 8rem 0;
  background-color: #f8f8f8;
`;

const OffRoadContainer = styled.div`
  max-width: 1200px;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
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
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const OffRoadSpecTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
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
  
  &:hover {
    color: var(--primary-color-light-text);
  }
`;

const GalleryItem = styled.div`
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  height: 200px;
  transition: transform 0.3s ease;
  
  &:hover {
    color: var(--primary-color-light-text);
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

const IntroSection = styled.section`
  padding: 8rem 0;
  background-color: #fff;
  color: #333;
`;

const IntroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto 3rem;
  text-align: center;
`;

const B40HonorEditionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Gallery images
  const galleryImages = [
    '/images/vehicles/b40-plus-honor-edition/gallery/77543829 ext np.jpg',
    '/images/vehicles/b40-plus-honor-edition/gallery/77543817 ext.jpg',
    '/images/vehicles/b40-plus-honor-edition/gallery/77543836 np.jpg',
    '/images/vehicles/b40-plus-honor-edition/gallery/77543845 ext np 2.jpg',
    '/images/vehicles/b40-plus-honor-edition/gallery/78317802 ext np.jpg',
    '/images/vehicles/b40-plus-honor-edition/gallery/78317829 ext np.jpg',
    '/images/vehicles/b40-plus-honor-edition/gallery/front side ext np.jpg',
    '/images/vehicles/b40-plus-honor-edition/gallery/SUN_0515 np 2.jpg',
    '/images/vehicles/b40-plus-honor-edition/gallery/WDH_8246 edit np ext.jpg',
    '/images/vehicles/b40-plus-honor-edition/gallery/4.2.jpg',
    '/images/vehicles/b40-plus-honor-edition/gallery/20220709_QHD_BJ400043 ext np edit.jpg'
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
  
  const safetyFeatures = [
    {
      title: 'Active and Passive Safety',
      description: 'Drive with confidence, knowing the B40 HONOR EDITION is equipped with ESP and 8 major safety features for both off-road and urban adventures.'
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
    { title: 'Roadblock-Crossing Height', value: '350mm' },
    { title: 'Ground Clearance', value: '210mm' },
    { title: 'Climbing Ability', value: '60%' },
    { title: 'Lateral Stability', value: '35°' }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <HeroBackground />
        <HeroOverlay />
        <HeroContent>
          <LogoImage src="/images/homehero/WEBSITE LANDSCAPE B40 LOGO (1).png" alt="B40 Honor Edition Logo" />
          
          <CTAContainer>
            <CTAButton as="a" href="/documents/brochures/B40-HONOR-EDITION-Brochure.pdf" target="_blank" rel="noopener noreferrer">Download Brochure</CTAButton>
            <CTAButton to="/book-test-drive" $primary>Test Drive</CTAButton>
          </CTAContainer>
        </HeroContent>
      </HeroSection>
      
      <IntroSection>
        <IntroContainer>
          <IntroText>
            Bravery starts where the road ends. The new BAIC B40 HONOR EDITION is built for drivers who refuse to follow. It's designed for those who challenge boundaries, conquer terrain, and define their own journeys. Whether you're navigating the city skyline or forging trails into the wild, the B40 HONOR EDITION delivers the power, design, and technology to fuel your boldest adventures. The greatest journeys begin with courage. This is where yours starts.
          </IntroText>
          <FeatureCTAButton to="/contact">Enquire Today</FeatureCTAButton>
        </IntroContainer>
      </IntroSection>
      
      <FeatureSection $dark={true}>
        <FeatureContainer>
          <FeatureContent>
            <FeatureTitle>Choose Your Path</FeatureTitle>
            <FeatureDescription>
              Your vehicle should be as fearless as you are. The B40 HONOR EDITION features a powerful 2.0L Petrol Turbo engine producing 165 kW and 380 Nm of torque, paired with an 8-speed automatic transmission.
              <br /><br />
              Enjoy the confidence of full 4WD with an advanced electronic rear differential. With 265/65 R17 all-terrain tires, a removable roof, and 6-way electric adjustment for both front seats, every detail is built to take you further. EasyConnect infotainment and a front row power socket keep you connected and in control wherever your path leads.
            </FeatureDescription>
            <FeatureCTAButton to="/find-dealer">Find a Dealer</FeatureCTAButton>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/vehicles/b40-plus-honor-edition/features/77543817 ext.jpg" alt="Choose Your Path" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection>
        <FeatureContainer $reverse>
          <FeatureContent>
            <FeatureTitle>Design That Demands Respect</FeatureTitle>
            <FeatureDescription>
              The B40 HONOR EDITION makes an impression before it even moves. Bold lines and an aggressive stance are framed by the unmistakable 5-slot grille. Striking LED headlamps illuminate the road ahead, while robust 17" alloy wheels wrapped in all-terrain tires stand ready for any challenge. The optional factory-fitted side-step plate adds convenience and rugged appeal.
            </FeatureDescription>
            <FeatureCTAButton to="/book-test-drive">Book a Test Drive</FeatureCTAButton>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/vehicles/b40-plus-honor-edition/features/78317802 ext np.jpg" alt="Design That Demands Respect" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection $dark={true}>
        <FeatureContainer>
          <FeatureContent>
            <FeatureTitle>Performance Without Limits</FeatureTitle>
            <FeatureDescription>
              Under the bonnet, the B40 HONOR EDITION's 2.0L Petrol Turbo delivers serious power and flexibility. The 8-speed automatic gearbox ensures smooth and responsive performance both on and off the road. Electronic rear differentials provide maximum traction across tough terrain. Braking and control systems include ABS, EBD, EPB, ESP, EBA, TCS, HAC, HDC and RMI (please see specifications grid for full detail). You'll enjoy a generous 210 mm ground clearance, with a 37° approach angle and a 31° departure angle — because bravery should never be limited by the road.
            </FeatureDescription>
            <FeatureCTAButton to="/about/company-overview">About BAIC</FeatureCTAButton>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/vehicles/b40-plus-honor-edition/features/77543845 ext np 2.jpg" alt="Performance Without Limits" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <FeatureSection>
        <FeatureContainer $reverse>
          <FeatureContent>
            <FeatureTitle>Confidence Inside and Out</FeatureTitle>
            <FeatureDescription>
              The B40 HONOR EDITION's interior combines robust design with modern comfort. Dual-zone automatic climate control keeps the cabin comfortable no matter where you roam. Your B40 Honor Edition comes standard with EasyConnection - a connectivity solution between the B40's infotainment system and your smartphone. EasyConnection can project your phone screen to the B40's infotainment screen - meaning you can cast whatever and wherever you want whilst having full control on the move.
              <br /><br />
              Luxurious leather seats are electrically adjustable in the front and paired with a multifunction leather steering wheel. Rear passengers enjoy a 60:40 split seat configuration with recline function.
            </FeatureDescription>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/vehicles/b40-plus-honor-edition/features/4.2.jpg" alt="Confidence Inside and Out" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      <SafetySection>
        <SafetyContainer>
          <SafetyTitle>Advanced Safety Features</SafetyTitle>
          <SafetySubtitle>
            The B40 HONOR EDITION is equipped with cutting-edge safety technologies to protect you and your passengers
          </SafetySubtitle>
          
          <SafetyGrid>
            {safetyFeatures.map((feature, index) => (
              <SafetyCard key={index}>
                <SafetyIcon>
                  <i className={`fas fa-${
                    index === 0 ? 'shield-alt' : 
                    index === 1 ? 'car-crash' : 
                    index === 2 ? 'compress-arrows-alt' : 
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
            <a href="/documents/brochures/B40-HONOR-EDITION-Brochure.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>
              Download Brochure
            </a>
          </TechSpecsDescription>
          <SpecsButton onClick={openModal}>View Specifications</SpecsButton>
        </TechSpecsContainer>
      </TechSpecsSection>
      
      <Modal $isOpen={isModalOpen}>
        <ModalContent>
          <CloseButton onClick={closeModal}>×</CloseButton>
          <SpecificationsSection />
        </ModalContent>
      </Modal>
      
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
      
      <HeritageSection />
      
      {/* Gallery Modal */}
      <GalleryModal $isOpen={isGalleryOpen}>
        <GalleryCloseButton onClick={closeGallery}>×</GalleryCloseButton>
        <GalleryGrid>
          {galleryImages.map((image, index) => (
            <GalleryItem key={index} onClick={() => openLightbox(index)}>
              <img src={image} alt={`B40 Honor Edition Gallery ${index + 1}`} />
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
            alt={`B40 Honor Edition Gallery ${currentImageIndex + 1}`} 
          />
          <LightboxNavButton $direction="next" onClick={goToNextImage}>›</LightboxNavButton>
          <ImageCounter>{currentImageIndex + 1} / {galleryImages.length}</ImageCounter>
        </LightboxContent>
      </LightboxContainer>
    </PageContainer>
  );
};

export default B40HonorEditionPage;
