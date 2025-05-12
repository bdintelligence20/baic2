import React from 'react';
import styled from 'styled-components';
import Placeholder from '../../components/common/Placeholder';

const AwardsContainer = styled.div`
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

const YearSection = styled.div`
  margin-bottom: 5rem;
`;

const YearTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #e60012;
  }
`;

const AwardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const AwardCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const AwardImage = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
`;

const AwardContent = styled.div`
  padding: 1.5rem;
`;

const AwardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const AwardOrganization = styled.p`
  font-size: 0.9rem;
  color: #e60012;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const AwardDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
`;

const FeaturedAward = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin: 4rem 0;
  background-color: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedImage = styled.div`
  height: 100%;
  min-height: 400px;
  
  @media (max-width: 992px) {
    min-height: 300px;
  }
`;

const FeaturedContent = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FeaturedTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
`;

const FeaturedOrganization = styled.p`
  font-size: 1rem;
  color: #e60012;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const FeaturedDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const FeaturedQuote = styled.blockquote`
  font-style: italic;
  color: #333;
  border-left: 3px solid #e60012;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
`;

const AwardsPage = () => {
  const featuredAward = {
    title: "Car of the Year 2025",
    organization: "Global Automotive Excellence Awards",
    description: "The BAIC X55 was recognized as the Car of the Year 2025, praised for its innovative design, exceptional performance, and advanced technology features.",
    quote: "The BAIC X55 represents the perfect balance of cutting-edge technology, driving performance, and environmental responsibility. It sets a new standard for the automotive industry."
  };

  const awardsByYear = [
    {
      year: "2025",
      awards: [
        {
          title: "Best Electric SUV",
          organization: "EV Innovation Awards",
          description: "The BAIC EV3 was named Best Electric SUV for its exceptional range, performance, and value."
        },
        {
          title: "Safety Excellence Award",
          organization: "Global NCAP",
          description: "BAIC received the Safety Excellence Award for outstanding crash test performance across its vehicle lineup."
        },
        {
          title: "Most Innovative Infotainment System",
          organization: "Tech in Motion Awards",
          description: "BAIC's next-generation infotainment system was recognized for its intuitive interface and advanced features."
        }
      ]
    },
    {
      year: "2024",
      awards: [
        {
          title: "Design of the Year",
          organization: "Automotive Design Association",
          description: "The BAIC X55 Dynamic received the Design of the Year award for its striking exterior and premium interior."
        },
        {
          title: "Best Value Luxury SUV",
          organization: "Consumer Choice Awards",
          description: "The BAIC B40 PLUS was recognized as the Best Value Luxury SUV in its class."
        },
        {
          title: "Sustainability Leadership Award",
          organization: "Green Mobility Initiative",
          description: "BAIC was honored for its commitment to sustainable manufacturing practices and eco-friendly vehicle development."
        },
        {
          title: "Best In-Class Performance",
          organization: "Performance Drive Magazine",
          description: "The BAIC X55 Plus received top marks for its exceptional handling, acceleration, and overall driving dynamics."
        }
      ]
    },
    {
      year: "2023",
      awards: [
        {
          title: "Innovation in Manufacturing",
          organization: "Industry 4.0 Awards",
          description: "BAIC's smart factory implementation was recognized for its cutting-edge automation and efficiency."
        },
        {
          title: "Best New Entrant",
          organization: "European Automotive Council",
          description: "BAIC was named Best New Entrant in the European market, recognizing its successful expansion strategy."
        },
        {
          title: "Customer Satisfaction Excellence",
          organization: "Global Customer Experience Index",
          description: "BAIC ranked #1 in customer satisfaction among emerging automotive brands."
        }
      ]
    }
  ];

  return (
    <AwardsContainer>
      <PageHeader>
        <PageTitle>Awards & Recognition</PageTitle>
        <PageDescription>
          BAIC's commitment to excellence has been recognized by industry experts, consumers, and organizations around the world. 
          Explore our recent awards and accolades that highlight our dedication to innovation, quality, and customer satisfaction.
        </PageDescription>
      </PageHeader>

      <FeaturedAward>
        <FeaturedImage>
          <Placeholder height="100%" label="Car of the Year 2025" />
        </FeaturedImage>
        <FeaturedContent>
          <FeaturedTitle>{featuredAward.title}</FeaturedTitle>
          <FeaturedOrganization>{featuredAward.organization}</FeaturedOrganization>
          <FeaturedDescription>{featuredAward.description}</FeaturedDescription>
          <FeaturedQuote>{featuredAward.quote}</FeaturedQuote>
        </FeaturedContent>
      </FeaturedAward>

      {awardsByYear.map((yearData, yearIndex) => (
        <YearSection key={yearIndex}>
          <YearTitle>{yearData.year}</YearTitle>
          <AwardsGrid>
            {yearData.awards.map((award, awardIndex) => (
              <AwardCard key={awardIndex}>
                <AwardImage>
                  <Placeholder height="100%" label={award.title} />
                </AwardImage>
                <AwardContent>
                  <AwardTitle>{award.title}</AwardTitle>
                  <AwardOrganization>{award.organization}</AwardOrganization>
                  <AwardDescription>{award.description}</AwardDescription>
                </AwardContent>
              </AwardCard>
            ))}
          </AwardsGrid>
        </YearSection>
      ))}
    </AwardsContainer>
  );
};

export default AwardsPage;
