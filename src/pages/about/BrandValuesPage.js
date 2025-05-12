import React from 'react';
import styled from 'styled-components';
import Placeholder from '../../components/common/Placeholder';

const BrandValuesContainer = styled.div`
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

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 3rem;
  margin: 4rem 0;
`;

const ValueCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ValueImage = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
`;

const ValueContent = styled.div`
  padding: 2rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  position: relative;
  padding-bottom: 0.8rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: #e60012;
  }
`;

const ValueDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.8;
`;

const MissionSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin: 5rem 0;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const MissionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MissionTitle = styled.h2`
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

const MissionText = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const MissionImage = styled.div`
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
`;

const QuoteSection = styled.div`
  background-color: #f8f8f8;
  padding: 4rem;
  border-radius: 8px;
  margin: 5rem 0;
  text-align: center;
`;

const Quote = styled.blockquote`
  font-size: 1.5rem;
  font-style: italic;
  color: #333;
  max-width: 800px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
`;

const QuoteAuthor = styled.cite`
  font-size: 1rem;
  color: #666;
  font-style: normal;
  display: block;
`;

const BrandValuesPage = () => {
  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push the boundaries of automotive technology, seeking new solutions that enhance the driving experience and address the challenges of modern mobility.'
    },
    {
      title: 'Quality',
      description: 'We are committed to excellence in every aspect of our vehicles, from design and engineering to manufacturing and customer service, ensuring reliability and durability.'
    },
    {
      title: 'Sustainability',
      description: 'We recognize our responsibility to the environment and future generations, driving the development of cleaner technologies and more sustainable manufacturing processes.'
    },
    {
      title: 'Integrity',
      description: 'We conduct our business with honesty, transparency, and ethical standards, building trust with our customers, partners, and communities.'
    },
    {
      title: 'Customer Focus',
      description: 'We put our customers at the center of everything we do, listening to their needs, exceeding their expectations, and creating vehicles that enhance their lives.'
    },
    {
      title: 'Global Perspective',
      description: 'We embrace diversity and inclusion, drawing strength from different cultures and perspectives as we expand our presence in markets around the world.'
    }
  ];

  return (
    <BrandValuesContainer>
      <PageHeader>
        <PageTitle>Brand Values</PageTitle>
        <PageDescription>
          Our core values guide everything we do at BAIC, from the vehicles we design to the way we interact with our customers, 
          partners, and communities. These principles define our culture and drive our commitment to excellence.
        </PageDescription>
      </PageHeader>

      <MissionSection>
        <MissionContent>
          <MissionTitle>Our Mission</MissionTitle>
          <MissionText>
            To create innovative, high-quality vehicles that enhance mobility, inspire drivers, and contribute to a more sustainable future.
          </MissionText>
          <MissionText>
            We strive to exceed customer expectations through continuous innovation, exceptional quality, and a deep understanding of evolving mobility needs around the world.
          </MissionText>
        </MissionContent>
        <MissionImage>
          <Placeholder height="100%" label="Mission Image" />
        </MissionImage>
      </MissionSection>

      <MissionSection>
        <MissionImage>
          <Placeholder height="100%" label="Vision Image" />
        </MissionImage>
        <MissionContent>
          <MissionTitle>Our Vision</MissionTitle>
          <MissionText>
            To be a global leader in automotive innovation, recognized for vehicles that combine cutting-edge technology, exceptional design, and environmental responsibility.
          </MissionText>
          <MissionText>
            We envision a future where BAIC vehicles are the preferred choice for drivers who value quality, innovation, and sustainability in markets around the world.
          </MissionText>
        </MissionContent>
      </MissionSection>

      <QuoteSection>
        <Quote>
          "At BAIC, our values aren't just words on a page—they're the principles that guide our decisions, shape our culture, and drive our commitment to creating exceptional vehicles for customers around the world."
        </Quote>
        <QuoteAuthor>Wei Zhang, CEO</QuoteAuthor>
      </QuoteSection>

      <ValuesGrid>
        {values.map((value, index) => (
          <ValueCard key={index}>
            <ValueImage>
              <Placeholder height="100%" label={value.title} />
            </ValueImage>
            <ValueContent>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueContent>
          </ValueCard>
        ))}
      </ValuesGrid>
    </BrandValuesContainer>
  );
};

export default BrandValuesPage;
