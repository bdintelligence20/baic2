import React from 'react';
import styled from 'styled-components';
import Placeholder from '../components/common/Placeholder';

const ContentContainer = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
`;

const ContentSection = styled.section`
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

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ImageColumn = styled.div`
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 992px) {
    order: ${props => props.$imageRight ? 0 : 1};
  }
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #e60012;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
`;

const CTASection = styled.div`
  background-color: #f8f8f8;
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 8px;
  margin-top: 3rem;
`;

const CTATitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const CTAButton = styled.button`
  background-color: #e60012;
  color: white;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #c5000f;
  }
`;

const ContentTemplate = ({ pageData }) => {
  // In a real implementation, pageData would be passed as props
  // For now, we'll use placeholder data
  const page = pageData || {
    title: 'Page Title',
    description: 'Page description goes here. This is a brief overview of what this page is about.',
    sections: [
      { title: 'Section 1', imageRight: false },
      { title: 'Section 2', imageRight: true },
      { title: 'Section 3', hasFeatures: true }
    ],
    features: [
      { title: 'Feature 1', icon: 'fa-star', description: 'Feature 1 description' },
      { title: 'Feature 2', icon: 'fa-bolt', description: 'Feature 2 description' },
      { title: 'Feature 3', icon: 'fa-shield-alt', description: 'Feature 3 description' }
    ],
    cta: {
      title: 'Ready to Get Started?',
      description: 'Join us on our journey towards a better future.',
      buttonText: 'Contact Us'
    }
  };

  return (
    <ContentContainer>
      <PageHeader>
        <PageTitle>{page.title}</PageTitle>
        <PageDescription>{page.description}</PageDescription>
      </PageHeader>

      {page.sections.map((section, index) => (
        <ContentSection key={index}>
          <SectionTitle>{section.title}</SectionTitle>
          
          {section.hasFeatures ? (
            <>
              <SectionText>
                <Placeholder height="100px" label="Section Text" />
              </SectionText>
              
              <FeatureGrid>
                {page.features.map((feature, featureIndex) => (
                  <FeatureCard key={featureIndex}>
                    <FeatureIcon>
                      <i className={`fas ${feature.icon}`}></i>
                    </FeatureIcon>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureCard>
                ))}
              </FeatureGrid>
            </>
          ) : (
            <TwoColumnLayout>
              {!section.imageRight && (
                <ImageColumn>
                  <Placeholder height="100%" label="Section Image" />
                </ImageColumn>
              )}
              
              <TextColumn>
                <SectionText>
                  <Placeholder height="300px" label="Section Text" />
                </SectionText>
              </TextColumn>
              
              {section.imageRight && (
                <ImageColumn $imageRight>
                  <Placeholder height="100%" label="Section Image" />
                </ImageColumn>
              )}
            </TwoColumnLayout>
          )}
        </ContentSection>
      ))}

      <CTASection>
        <CTATitle>{page.cta.title}</CTATitle>
        <CTADescription>{page.cta.description}</CTADescription>
        <CTAButton>{page.cta.buttonText}</CTAButton>
      </CTASection>
    </ContentContainer>
  );
};

export default ContentTemplate;
