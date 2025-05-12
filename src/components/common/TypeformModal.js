import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useModal } from '../../context/ModalContext';

// Global styles to ensure Typeform takes up full height
const TypeformStyles = createGlobalStyle`
  .tf-v1-popup, 
  .tf-v1-popup-wrapper, 
  .tf-v1-iframe-wrapper, 
  .tf-v1-iframe {
    height: 100vh !important;
    width: 100vw !important;
    max-height: none !important;
    max-width: none !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: #e60012;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  font-size: 18px;
  font-weight: bold;
  
  &:hover {
    background-color: #c5000f;
  }
`;

const TypeformContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const TypeformModal = () => {
  const { isTypeformModalOpen: isOpen, closeTypeformModal: onClose } = useModal();
  useEffect(() => {
    if (isOpen) {
      // Create and append the Typeform script when modal is opened
      const script = document.createElement('script');
      script.src = 'https://embed.typeform.com/next/embed.js';
      script.async = true;
      document.body.appendChild(script);
      
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      // Add additional styling to ensure Typeform takes up full height
      const style = document.createElement('style');
      style.textContent = `
        html, body {
          height: 100% !important;
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `;
      document.head.appendChild(style);
      
      // Clean up function
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
        // Restore body scrolling when modal is closed
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <>
      <TypeformStyles />
      <ModalOverlay>
        <ModalContent>
          <CloseButton onClick={onClose}>×</CloseButton>
          <TypeformContainer>
            <div 
              data-tf-live="01JPEYYA5810GD51WEN8QMQAEJ"
              data-tf-width="100%"
              data-tf-height="100%"
              data-tf-opacity="100"
              data-tf-iframe-props="title=BAIC Test Drive Form"
              data-tf-auto-focus
              data-tf-medium="embed-fullpage"
              data-tf-full-screen
            ></div>
          </TypeformContainer>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default TypeformModal;
