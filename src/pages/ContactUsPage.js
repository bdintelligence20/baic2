import React from 'react';
import styled from 'styled-components';
import Placeholder from '../components/common/Placeholder';

const ContactUsContainer = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.div`
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 8px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #e60012;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const InfoText = styled.p`
  color: #666;
  line-height: 1.6;
`;

const SectionContainer = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #e60012;
  }
`;

const ContactUsPage = () => {
  return (
    <ContactUsContainer>
      <PageTitle>Contact Us</PageTitle>
      
      <ContactGrid>
        <ContactForm>
          <Placeholder height="450px" label="Contact Form" />
        </ContactForm>
        
        <ContactInfo>
          <InfoItem>
            <InfoIcon>
              <i className="fas fa-map-marker-alt"></i>
            </InfoIcon>
            <InfoContent>
              <InfoTitle>Headquarters</InfoTitle>
              <InfoText>
                BAIC Global Headquarters<br />
                123 Automotive Avenue<br />
                Beijing, China 100000
              </InfoText>
            </InfoContent>
          </InfoItem>
          
          <InfoItem>
            <InfoIcon>
              <i className="fas fa-phone-alt"></i>
            </InfoIcon>
            <InfoContent>
              <InfoTitle>Phone</InfoTitle>
              <InfoText>
                Customer Service: +86 10 1234 5678<br />
                Sales Inquiries: +86 10 8765 4321
              </InfoText>
            </InfoContent>
          </InfoItem>
          
          <InfoItem>
            <InfoIcon>
              <i className="fas fa-envelope"></i>
            </InfoIcon>
            <InfoContent>
              <InfoTitle>Email</InfoTitle>
              <InfoText>
                Customer Support: support@baic-global.com<br />
                Media Inquiries: media@baic-global.com<br />
                Careers: careers@baic-global.com
              </InfoText>
            </InfoContent>
          </InfoItem>
          
          <InfoItem>
            <InfoIcon>
              <i className="far fa-clock"></i>
            </InfoIcon>
            <InfoContent>
              <InfoTitle>Business Hours</InfoTitle>
              <InfoText>
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </InfoText>
            </InfoContent>
          </InfoItem>
        </ContactInfo>
      </ContactGrid>
      
      <SectionContainer>
        <SectionTitle>Dealer Locator</SectionTitle>
        <Placeholder height="400px" label="Dealer Locator Map" />
      </SectionContainer>
      
      <SectionContainer>
        <SectionTitle>Global Locations</SectionTitle>
        <Placeholder height="350px" label="Global Locations Content" />
      </SectionContainer>
      
      <SectionContainer>
        <SectionTitle>Regional Contacts</SectionTitle>
        <Placeholder height="300px" label="Regional Contacts Content" />
      </SectionContainer>
    </ContactUsContainer>
  );
};

export default ContactUsPage;
