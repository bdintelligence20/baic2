import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SectionContainer = styled.section`
  padding: 6rem 0;
  background-color: #f8f8f8;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 3rem;
  color: #222;
  font-weight: 700;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--primary-color); /* Used CSS variable */
  }
`;

const PromoContainer = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  }
`;

const PromoImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  transition: opacity 0.3s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  margin-left: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
    margin-top: 1.5rem;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background-color: var(--primary-color-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(230, 0, 18, 0.4);
  }
  
  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background-color: transparent;
  color: var(--text-color);
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  border: 2px solid var(--text-color);
  
  &:hover {
    background-color: var(--text-color);
    color: var(--background-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

const PromotionsSection = () => {
  // Single landscape promotion data
  const promotion = {
    image: '/images/promotions/WEBSITE LANDSCAPE (2).jpg',
    title: 'X55 PLUS',
    subtitle: 'From R429 900',
    enquireLink: '/book-test-drive',
    financeLink: '/finance'
  };

  return (
    <SectionContainer>
      <ContentWrapper>
        <SectionTitle>Current Promotions</SectionTitle>
        
        <PromoContainer>
          <PromoImage 
            src={promotion.image} 
            alt={promotion.title}
            loading="lazy"
            decoding="async"
          />
        </PromoContainer>
        
        <ButtonContainer>
          <PrimaryButton to={promotion.enquireLink}>Enquire Now</PrimaryButton>
          <SecondaryButton to={promotion.financeLink}>Finance Options</SecondaryButton>
        </ButtonContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default PromotionsSection;
