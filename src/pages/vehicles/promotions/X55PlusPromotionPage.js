import React from 'react';
import styled from 'styled-components';

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
    background-color: #e60012;
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
  color: #e60012;
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
      color: #e60012;
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
  background-color: ${props => props.$primary ? '#e60012' : 'transparent'};
  color: ${props => props.$primary ? 'white' : '#e60012'};
  border: 2px solid #e60012;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$primary ? '#c5000f' : 'rgba(230, 0, 18, 0.1)'};
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

const X55PlusPromotionPage = () => {
  return (
    <PromotionContainer>
      <PromotionHeader>
        <Title>X55 Plus Premium Offer</Title>
        <Subtitle>Elevate your driving experience with our exclusive X55 Plus promotion</Subtitle>
      </PromotionHeader>
      
      <PromotionContent>
        <PromotionImage>
          <img src="/images/models/x55-plus/14_20240708121758A006.png" alt="BAIC X55 Plus" />
        </PromotionImage>
        
        <PromotionDetails>
          <PromotionPrice>From R459,900</PromotionPrice>
          <PromotionDescription>
            Experience premium performance with the BAIC X55 Plus. For a limited time, enjoy exclusive financing options and premium add-ons with your purchase.
          </PromotionDescription>
          
          <PromotionFeatures>
            <li>0% Deposit</li>
            <li>5.5% Interest Rate</li>
            <li>Free 5-Year Service Plan</li>
            <li>5-Year/150,000 km Warranty</li>
            <li>Premium Accessory Package Included</li>
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

export default X55PlusPromotionPage;
