import React from 'react';
import styled from 'styled-components';
import ResponsiveImage from '../../../components/common/ResponsiveImage';

const PromotionContainer = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PromotionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
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

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 1.5rem;
`;

const PromotionContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PromotionImage = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const PromotionDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PromotionPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const PromotionDescription = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const PromotionFeatures = styled.ul`
  margin-bottom: 2rem;
  
  li {
    margin-bottom: 0.8rem;
    position: relative;
    padding-left: 1.5rem;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--primary-color);
      font-weight: bold;
    }
  }
`;

const PromotionCTA = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: ${props => props.$primary ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$primary ? 'var(--primary-color-text)' : 'var(--primary-color-light-text)'};
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$primary ? 'var(--primary-color-hover)' : 'rgba(0, 0, 0, 0.05)'}; /* Adjusted non-primary hover */
    color: ${props => props.$primary ? 'var(--primary-color-text)' : 'var(--primary-color-hover)'};
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const PromotionTerms = styled.div`
  font-size: 0.9rem;
  color: #777;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const X55DynamicPromotionPage = () => {
  return (
    <PromotionContainer>
      <PromotionHeader>
        <Title>X55 Dynamic Sport Edition Offer</Title>
        <Subtitle>Unleash your driving passion with our exclusive X55 Dynamic promotion</Subtitle>
      </PromotionHeader>
      
      <PromotionContent>
        <PromotionImage>
          <ResponsiveImage 
            src="/images/models/x55-dynamic/14_20240708121758A006.png" 
            alt="BAIC X55 Dynamic" 
            lazy={true}
            objectFit="cover"
            sizes="50vw"
          />
        </PromotionImage>
        
        <PromotionDetails>
          <PromotionPrice>From R479,900</PromotionPrice>
          <PromotionDescription>
            Experience the thrill of the BAIC X55 Dynamic Sport Edition. For a limited time, enjoy special financing and exclusive sport packages with your purchase.
          </PromotionDescription>
          
          <PromotionFeatures>
            <li>0% Deposit</li>
            <li>5.5% Interest Rate</li>
            <li>Free 5-Year Service Plan</li>
            <li>5-Year/150,000 km Warranty</li>
            <li>Sport Accessory Package Included</li>
            <li>Free Performance Driving Course</li>
            <li>Free Roadside Assistance for 5 Years</li>
          </PromotionFeatures>
          
          <PromotionCTA>
            <Button href="/contact" $primary={true}>Book a Test Drive</Button>
            <Button href="/contact">Find a Dealer</Button>
          </PromotionCTA>
        </PromotionDetails>
      </PromotionContent>
      
      <PromotionTerms>
        <p>Terms and conditions apply. Offer valid until 30 June 2025. Interest rate subject to credit approval. Images shown may include optional features at additional cost. Please consult your local dealer for full details.</p>
      </PromotionTerms>
    </PromotionContainer>
  );
};

export default X55DynamicPromotionPage;
