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
  background-image: url('/images/vehicles/b40-plus/hero/WEBSITE_1920X1080PX_HOMEPAGE5 (3).jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
`;

const HeroContent = styled.div`
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

const TaglineSmall = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  
  @media (max-width: 992px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ModelName = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
  
  @media (max-width: 992px) {
    font-size: 4rem;
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
    letter-spacing: 1px;
  }
`;

const TaglineLarge = styled.p`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 3rem;
  letter-spacing: 1px;
  
  @media (max-width: 992px) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
`;


const CTAContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CTAButton = styled(Link)`
  background-color: ${props => props.$primary ? 'var(--primary-color)' : 'transparent'};
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
  border: ${props => props.$primary ? 'none' : '2px solid white'};
  
  &:hover {
    background-color: ${props => props.$primary ? 'var(--primary-color-hover)' : 'rgba(255, 255, 255, 0.1)'};
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
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
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

const B40PlusPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Gallery images
  const galleryImages = [
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
    { title: 'Roadblock-Crossing Height', value: '350mm' },
    { title: 'Ground Clearance', value: '210mm' },
    { title: 'Climbing Ability', value: '60%' },
    { title: 'Lateral Stability', value: '35°' }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <TaglineSmall>BAIC B40 PLUS</TaglineSmall>
          <ModelName>BRAVE ANY TERRAIN</ModelName>
          <TaglineLarge>OWN EVERY ROAD</TaglineLarge>
          
          <CTAContainer>
            <CTAButton to="/book-test-drive" $primary>Test Drive</CTAButton>
            <CTAButton as="button" onClick={openGallery}>View Gallery</CTAButton>
            <CTAButton as="a" href="/documents/brochures/B40-PLUS-Brochure.pdf" target="_blank" rel="noopener noreferrer">Download Brochure</CTAButton>
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
            <FeatureCTAButton to="/book-test-drive">Enquire Today</FeatureCTAButton>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/vehicles/b40-plus/features/WEBSITE_1920X1080PX_HOMEPAGE6.jpg" alt="Rugged Appearance" />
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
            <FeatureCTAButton to="/find-dealer">Find a dealer</FeatureCTAButton>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/vehicles/b40-plus/features/B40-exterior-gallery-1.jpg" alt="Mechanical Aesthetics" />
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
            <FeatureCTAButton to="/book-test-drive">Book a test drive</FeatureCTAButton>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/vehicles/b40-plus/features/B40-interior-gallery-2.jpg" alt="Interior Tech" />
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
            <FeatureCTAButton to="/about/company-overview">About BAIC</FeatureCTAButton>
          </FeatureContent>
          <FeatureImage>
            <img src="/images/vehicles/b40-plus/features/B40-interior-gallery-3.jpg" alt="Stylish Gear Lever" />
          </FeatureImage>
        </FeatureContainer>
      </FeatureSection>
      
      
      <SafetySection>
        <SafetyContainer>
          <SafetyTitle>Advanced Safety Features</SafetyTitle>
          <SafetySubtitle>
            The B40 Plus is equipped with cutting-edge safety technologies to protect you and your passengers
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
            Compare specifications across different B40 Plus variants to find the perfect match for your needs.
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
              <img src={image} alt={`B40 Plus Gallery ${index + 1}`} />
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
            alt={`B40 Plus Gallery ${currentImageIndex + 1}`} 
          />
          <LightboxNavButton $direction="next" onClick={goToNextImage}>›</LightboxNavButton>
          <ImageCounter>{currentImageIndex + 1} / {galleryImages.length}</ImageCounter>
        </LightboxContent>
      </LightboxContainer>
    </PageContainer>
  );
};

export default B40PlusPage;
