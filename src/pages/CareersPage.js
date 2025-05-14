import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Placeholder from '../components/common/Placeholder';

const CareersContainer = styled.div`
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

const IntroSection = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
`;

const SectionContainer = styled.div`
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
    background-color: var(--primary-color);
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
  text-decoration: none;
  
  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

const CareersPage = () => {
  return (
    <CareersContainer>
      <PageTitle>Careers</PageTitle>
      
      <IntroSection>
        <IntroText>
          Join our team at BAIC and be part of a global automotive leader. We offer exciting career 
          opportunities across various fields and locations. Discover how you can grow with us and 
          contribute to shaping the future of mobility.
        </IntroText>
        <CTAButton to="/careers/job-opportunities">View Open Positions</CTAButton>
      </IntroSection>
      
      <SectionContainer>
        <SectionTitle>Job Opportunities</SectionTitle>
        <Link to="/careers/job-opportunities" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Placeholder height="400px" label="Job Listings" />
        </Link>
      </SectionContainer>
      
      <SectionContainer>
        <SectionTitle>Working at BAIC</SectionTitle>
        <Placeholder height="350px" label="Working at BAIC Content" />
      </SectionContainer>
      
      <SectionContainer>
        <SectionTitle>Development Programs</SectionTitle>
        <Placeholder height="300px" label="Development Programs Content" />
      </SectionContainer>
      
      <SectionContainer>
        <SectionTitle>Internships</SectionTitle>
        <Placeholder height="300px" label="Internships Content" />
      </SectionContainer>
      
      <SectionContainer>
        <SectionTitle>Culture & Values</SectionTitle>
        <Placeholder height="350px" label="Culture & Values Content" />
      </SectionContainer>
    </CareersContainer>
  );
};

export default CareersPage;
