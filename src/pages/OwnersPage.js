import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  min-height: 600px;
  background-color: #000;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 62px;
  
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
  background-image: url('/images/owners/WEBSITE LANDSCAPE11.jpg');
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
  left: 4rem;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  max-width: 600px;
  
  @media (max-width: 1200px) {
    left: 3rem;
    max-width: 500px;
  }
  
  @media (max-width: 992px) {
    left: 2rem;
    max-width: 450px;
  }
  
  @media (max-width: 768px) {
    left: 2rem;
    right: 2rem;
    max-width: none;
    width: calc(100% - 4rem);
  }
  
  @media (max-width: 480px) {
    left: 1.5rem;
    right: 1.5rem;
    width: calc(100% - 3rem);
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 1200px) {
    font-size: 3rem;
  }
  
  @media (max-width: 992px) {
    font-size: 2.5rem;
    letter-spacing: 1px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 2rem;
  font-weight: 400;
  margin: 0 0 3rem 0;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 1200px) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 992px) {
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color-light-text);
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const IntroSection = styled.section`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #333;
  margin: 0;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const WarrantySection = styled.section`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--primary-color-light-text);
  margin-bottom: 1.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  text-align: center;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const WarrantyTable = styled.div`
  overflow-x: auto;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background: var(--primary-color);
`;

const TableHeaderCell = styled.th`
  padding: 1.2rem;
  text-align: left;
  font-weight: 600;
  color: white;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const TableCell = styled.td`
  padding: 1.2rem;
  font-size: 1rem;
  color: #333;
  border-bottom: 1px solid #e9ecef;
  
  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.9rem;
  }
`;

const TableNote = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 1rem;
  font-style: italic;
`;

const ContactSection = styled.section`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ContactCard = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ContactTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--primary-color-light-text);
  margin-bottom: 1rem;
`;

const ContactInfo = styled.div`
  line-height: 1.6;
  color: #333;
  
  p {
    margin: 0.5rem 0;
  }
  
  strong {
    color: var(--primary-color-light-text);
  }
`;

const ContactLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const OwnersPage = () => {
  return (
    <PageContainer>
      <HeroSection>
        <HeroBackground />
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>BAIC OWNERS</HeroTitle>
          <HeroSubtitle>
            SUPPORT BEYOND THE SALE
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>
      
      <ContentContainer>
        <IntroSection>
          <IntroText>
            At BAIC, our commitment to you extends far beyond the moment you drive off the lot. We're 
            dedicated to ensuring your Brave New Roads are always supported, assured and hassle-free. 
            This Owners section is your central hub for essential information and support, designed to keep 
            you on the road with peace of mind.
          </IntroText>
        </IntroSection>
        
        <WarrantySection>
          <SectionTitle>Your Peace of Mind, Our Priority.</SectionTitle>
          <SectionText>
            Every BAIC vehicle is built with quality and reliability in mind. To ensure your continued 
            confidence, each model comes with comprehensive warranty and service plan options tailored 
            to your needs.
          </SectionText>
          
          <WarrantyTable>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Model</TableHeaderCell>
                  <TableHeaderCell>Warranty</TableHeaderCell>
                  <TableHeaderCell>Service Plan</TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                <TableRow>
                  <TableCell><strong>X55</strong></TableCell>
                  <TableCell>5 Yrs / 150 000 km</TableCell>
                  <TableCell>5 Yrs / 60 000 km</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>X55 PLUS</strong></TableCell>
                  <TableCell>5 Yrs / 150 000 km</TableCell>
                  <TableCell>5 Yrs / 60 000 km</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>B40 HONOR EDITION</strong></TableCell>
                  <TableCell>5 Yrs / 120 000 km</TableCell>
                  <TableCell>4 Yrs / 60 000 km</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </WarrantyTable>
        </WarrantySection>
        
        <ContactSection>
          <SectionTitle>We're here to help</SectionTitle>
          <SectionText>
            Have a question, need assistance, or just want to connect? Our team is ready to support you.
          </SectionText>
          
          <ContactGrid>
            <ContactCard>
              <ContactTitle>Head Office</ContactTitle>
              <ContactInfo>
                <p>1st Floor Tuscany Office Park</p>
                <p>6 Coombe Place</p>
                <p>Rivonia</p>
                <p>Sandton</p>
                <p><strong>2065</strong></p>
              </ContactInfo>
            </ContactCard>
            
            <ContactCard>
              <ContactTitle>Call Us</ContactTitle>
              <ContactInfo>
                <p><strong>Monday - Friday</strong></p>
                <p>From 08:00 to 16:30 (CAT)</p>
                <p><ContactLink href="tel:+27100208888">(010) 020 8888</ContactLink></p>
              </ContactInfo>
            </ContactCard>
            
            <ContactCard>
              <ContactTitle>Mail Us</ContactTitle>
              <ContactInfo>
                <p>Mail us directly on our email:</p>
                <p><strong>Queries and Collabs:</strong></p>
                <p><ContactLink href="mailto:marketing@baicsa.co.za">marketing@baicsa.co.za</ContactLink></p>
              </ContactInfo>
            </ContactCard>
          </ContactGrid>
        </ContactSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default OwnersPage;
