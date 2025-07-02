import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

const FinanceSection = styled.section`
  padding: 6rem 0;
  background-color: #f8f9fa;
  color: #333;
`;

const FinanceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FinanceTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  color: #333;
`;

const FinanceSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FinanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FinanceCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid #e9ecef;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const CardImage = styled.div`
  height: 255px;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const ModelName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
  text-align: center;
`;

const MonthlyPayment = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const PaymentLabel = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

const PaymentAmount = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
`;

const FinanceDetails = styled.div`
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f3f4;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const DetailValue = styled.span`
  color: #333;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const EnquireButton = styled.button`
  display: block;
  width: 100%;
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
  text-align: center;
  border: none;
  
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

const ApplyButton = styled(Link)`
  display: block;
  width: 100%;
  background-color: transparent;
  color: var(--primary-color);
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  text-align: center;
  border: 2px solid var(--primary-color);
  
  &:hover {
    background-color: rgba(230, 0, 18, 0.1);
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

const Disclaimer = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const DisclaimerText = styled.p`
  font-size: 0.85rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

const X55PlusFinanceSection = () => {
  const { openTypeformModal } = useModal();
  const financeOptions = [
    {
      model: 'X55 PLUS DYNAMIC',
      monthlyPayment: 'R4,499',
      retailPrice: 'R429,900',
      deposit: '10%',
      interestRate: '5.65%',
      balloon: '40%',
      terms: '72 months',
      image: '/images/financeoptions/X55%20PLUS%20DYNAMIC.png'
    },
    {
      model: 'X55 PLUS ELITE',
      monthlyPayment: 'R5,620',
      retailPrice: 'R464,900',
      deposit: '10%',
      interestRate: '8.56%',
      balloon: '40%',
      terms: '72 months',
      image: '/images/financeoptions/X55%20PLUS%20ELITE.png'
    },
    {
      model: 'X55 PLUS PRIME',
      monthlyPayment: 'R6,079',
      retailPrice: 'R499,900',
      deposit: '10%',
      interestRate: '8.71%',
      balloon: '40%',
      terms: '72 months',
      image: '/images/financeoptions/X55%20PLUS%20PREMUM.png'
    },
    {
      model: 'X55 PLUS PRIME 2T',
      monthlyPayment: 'R6,999',
      retailPrice: 'R514,900',
      deposit: '10%',
      interestRate: '10.70%',
      balloon: '40%',
      terms: '72 months',
      image: '/images/financeoptions/X55%20PLUS%20PREMUM%202T%20%281%29.png'
    }
  ];

  return (
    <FinanceSection id="finance-options">
      <FinanceContainer>
        <FinanceTitle>Finance Options</FinanceTitle>
        <FinanceSubtitle>
          Explore our flexible financing solutions designed to make your X55 Plus more accessible
        </FinanceSubtitle>
        
        <FinanceGrid>
          {financeOptions.map((option, index) => (
            <FinanceCard key={index}>
              <CardImage $imageUrl={option.image} />
              <CardContent>
                <ModelName>{option.model}</ModelName>
                
                <MonthlyPayment>
                  <PaymentLabel>From only</PaymentLabel>
                  <PaymentAmount>{option.monthlyPayment} PM*</PaymentAmount>
                </MonthlyPayment>
                
                <FinanceDetails>
                  <DetailItem>
                    <DetailLabel>Retail Price:</DetailLabel>
                    <DetailValue>{option.retailPrice}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Deposit:</DetailLabel>
                    <DetailValue>{option.deposit}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Interest Rate:</DetailLabel>
                    <DetailValue>{option.interestRate}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Balloon:</DetailLabel>
                    <DetailValue>{option.balloon}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Terms:</DetailLabel>
                    <DetailValue>{option.terms}</DetailValue>
                  </DetailItem>
                </FinanceDetails>
                
                <ButtonContainer>
                  <EnquireButton onClick={openTypeformModal}>
                    Enquire Today
                  </EnquireButton>
                  <ApplyButton as="a" href="https://efinancinguat.co.za/vehiclefin/applyonline/getting-started?origin=baic" target="_blank" rel="noopener noreferrer">
                    Apply Now
                  </ApplyButton>
                </ButtonContainer>
              </CardContent>
            </FinanceCard>
          ))}
        </FinanceGrid>
        
        <Disclaimer>
          <DisclaimerText>
            *Monthly payments are estimates based on the specified terms and conditions. 
            Final pricing and terms are subject to credit approval and may vary based on individual circumstances. 
            Please contact your nearest BAIC dealer for accurate pricing and financing options. 
            Terms and conditions apply.
          </DisclaimerText>
        </Disclaimer>
      </FinanceContainer>
    </FinanceSection>
  );
};

export default X55PlusFinanceSection;
