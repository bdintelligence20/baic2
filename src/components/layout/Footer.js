import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #f0f0f0;
  color: #666;
  padding: 4rem 2rem 2rem;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    flex-wrap: wrap;
    gap: 2rem;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  
  @media (max-width: 992px) {
    flex: 0 0 30%;
  }
  
  @media (max-width: 768px) {
    flex: 0 0 45%;
  }
  
  @media (max-width: 576px) {
    flex: 0 0 100%;
  }
`;

const FooterTitle = styled.h4`
  color: #333;
  margin-bottom: 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FooterLink = styled(Link)`
  color: #999;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #e60012;
  }
`;

const ExternalLink = styled.a`
  color: #999;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #e60012;
  }
`;

const SocialIconsContainer = styled.div`
  margin-top: 1.5rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 0.5rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e60012;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 3rem 0 1.5rem;
`;

const BottomFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.div`
  font-size: 0.75rem;
  color: #555;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const LegalLink = styled.a`
  color: #555;
  font-size: 0.75rem;
  text-decoration: none;
  
  &:hover {
    color: #999;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>NAVIGATION</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about/company-overview">Company Overview</FooterLink>
          <FooterLink to="/find-dealer">Find a Dealer</FooterLink>
          <FooterLink to="/finance">Finance</FooterLink>
          <FooterLink to="/book-test-drive">Book a Test Drive</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>MODELS</FooterTitle>
          <span style={{ color: '#999', fontSize: '0.85rem' }}>B30 (Coming Soon)</span>
          <FooterLink to="/vehicles/models/x55-plus">X55 Plus</FooterLink>
          <FooterLink to="/vehicles/models/b40-honor-edition">B40 Honor Edition</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>CONNECT</FooterTitle>
          <SocialIconsContainer>
            <SocialIcons>
              <SocialIcon href="https://www.facebook.com/BAICSouthAfrica1" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </SocialIcon>
              <SocialIcon href="https://x.com/baic_sa" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <i className="fab fa-twitter"></i>
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/baic.southafrica/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/company/99310100/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </SocialIcon>
              <SocialIcon href="https://www.youtube.com/channel/UChPAuLblJuCt6k6rjua5lqg" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </SocialIcon>
              <SocialIcon href="https://www.tiktok.com/@baic_sa" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <i className="fab fa-tiktok"></i>
              </SocialIcon>
            </SocialIcons>
          </SocialIconsContainer>
        </FooterColumn>
      </FooterContent>
      
      <Divider />
      
      <BottomFooter>
        <Copyright>
          © {new Date().getFullYear()} BAIC. All Rights Reserved.
        </Copyright>
        <LegalLinks>
        <ExternalLink href="#">Privacy Policy</ExternalLink>
        <ExternalLink href="#">Terms of Use</ExternalLink>
        <ExternalLink href="#">Cookie Policy</ExternalLink>
        </LegalLinks>
      </BottomFooter>
    </FooterContainer>
  );
};

export default memo(Footer);
