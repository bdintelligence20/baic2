import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Placeholder from '../components/common/Placeholder';

const AboutUsContainer = styled.div`
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

const PageDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 4rem;
  text-align: center;
  line-height: 1.8;
`;

const SectionContainer = styled.div`
  margin-bottom: 4rem;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SectionContent = styled.div`
  padding: 2rem;
  background-color: #fff;
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

const SectionDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SectionLink = styled(Link)`
  display: inline-block;
  color: var(--primary-color-light-text);
  font-weight: 600;
  text-decoration: none;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--primary-color);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover:after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const SectionImage = styled.div`
  height: 250px;
`;

const AboutUsPage = () => {
  const sections = [
    {
      title: "Company Overview",
      description: "Learn about BAIC, our mission, vision, and what drives us to create exceptional vehicles.",
      link: "/about/company-overview",
      linkText: "Discover Our Company"
    },
    {
      title: "History",
      description: "Explore our journey from our founding to becoming a global automotive leader.",
      link: "/about/history",
      linkText: "Explore Our History"
    },
    {
      title: "Leadership Team",
      description: "Meet the visionary leaders who drive BAIC's innovation, growth, and commitment to excellence.",
      link: "/about/leadership",
      linkText: "Meet Our Leaders"
    },
    {
      title: "Brand Values",
      description: "Our core values guide everything we do at BAIC, from the vehicles we design to the way we interact with our customers.",
      link: "/about/brand-values",
      linkText: "Explore Our Values"
    },
    {
      title: "Awards & Recognition",
      description: "BAIC's commitment to excellence has been recognized by industry experts, consumers, and organizations around the world.",
      link: "/about/awards",
      linkText: "View Our Achievements"
    }
  ];

  return (
    <AboutUsContainer>
      <PageTitle>About Us</PageTitle>
      <PageDescription>
        BAIC is a global automotive leader committed to innovation, quality, and sustainability. 
        Discover our story, our people, and the values that drive us forward.
      </PageDescription>
      
      {sections.map((section, index) => (
        <SectionContainer key={index}>
          <SectionImage>
            <Placeholder height="100%" label={section.title} />
          </SectionImage>
          <SectionContent>
            <SectionTitle>{section.title}</SectionTitle>
            <SectionDescription>{section.description}</SectionDescription>
            <SectionLink to={section.link}>{section.linkText}</SectionLink>
          </SectionContent>
        </SectionContainer>
      ))}
    </AboutUsContainer>
  );
};

export default AboutUsPage;
