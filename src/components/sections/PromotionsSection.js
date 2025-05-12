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
    background-color: #e60012;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: #222;
`;

const CardSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  background-color: #e60012;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    background-color: #ff1a2d;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(230, 0, 18, 0.3);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background-color: transparent;
  color: #222;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid #222;
  text-align: center;
  
  &:hover {
    background-color: #222;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const PromotionsSection = () => {
  // Sample promotion data - in a real app, this would come from an API or props
  const promotions = [
    {
      id: 1,
      image: '/images/promotions/x55promo.jpg',
      title: 'BEIJING X55 PLUS',
      subtitle: 'From R429 900',
      enquireLink: '/book-test-drive',
      financeLink: '/finance-options',
      showFinanceOptions: true
    },
    {
      id: 2,
      image: '/images/promotions/x55pluspromo.jpg',
      title: 'X55 PLUS',
      subtitle: 'at PRIME MINUS 5.35%',
      enquireLink: '/book-test-drive',
      financeLink: '/vehicles/models/x55-plus#finance-options',
      showFinanceOptions: true
    },
    {
      id: 3,
      image: '/images/promotions/b40pluspromo.jpg',
      title: 'B40 PLUS',
      subtitle: 'From R574 500',
      enquireLink: '/book-test-drive',
      showFinanceOptions: false
    }
  ];

  return (
    <SectionContainer>
      <ContentWrapper>
        <SectionTitle>Current Promotions</SectionTitle>
        
        <CardsContainer>
          {promotions.map(promo => (
            <Card key={promo.id}>
              <CardImage $image={promo.image} />
              <CardContent>
                <CardTitle>{promo.title}</CardTitle>
                <CardSubtitle>{promo.subtitle}</CardSubtitle>
                <ButtonContainer>
                  <PrimaryButton to={promo.enquireLink}>Enquire Now</PrimaryButton>
                  {promo.showFinanceOptions && (
                    <SecondaryButton to={promo.financeLink}>Finance Options</SecondaryButton>
                  )}
                </ButtonContainer>
              </CardContent>
            </Card>
          ))}
        </CardsContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default PromotionsSection;
