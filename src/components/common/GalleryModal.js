import React, { useState } from 'react';
import styled from 'styled-components';

// Gallery Modal Components
const GalleryModalContainer = styled.div`
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
    color: #e60012;
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
    color: #e60012;
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
    color: #e60012;
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

const GalleryModal = ({ isOpen, onClose, images, title }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // When the modal opens, prevent body scrolling
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <>
      <GalleryModalContainer $isOpen={isOpen}>
        <GalleryCloseButton onClick={onClose}>×</GalleryCloseButton>
        <GalleryGrid>
          {images.map((image, index) => (
            <GalleryItem key={index} onClick={() => openLightbox(index)}>
              <img src={image} alt={`${title} Gallery ${index + 1}`} />
            </GalleryItem>
          ))}
        </GalleryGrid>
      </GalleryModalContainer>
      
      {/* Lightbox for full-size image viewing */}
      <LightboxContainer $isOpen={isLightboxOpen}>
        <LightboxContent>
          <LightboxCloseButton onClick={closeLightbox}>×</LightboxCloseButton>
          <LightboxNavButton $direction="prev" onClick={goToPrevImage}>‹</LightboxNavButton>
          <LightboxImage 
            src={images[currentImageIndex]} 
            alt={`${title} Gallery ${currentImageIndex + 1}`} 
          />
          <LightboxNavButton $direction="next" onClick={goToNextImage}>›</LightboxNavButton>
          <ImageCounter>{currentImageIndex + 1} / {images.length}</ImageCounter>
        </LightboxContent>
      </LightboxContainer>
    </>
  );
};

export default GalleryModal;
