import React from 'react';
import styled from 'styled-components';
import Placeholder from '../../components/common/Placeholder';

const LeadershipContainer = styled.div`
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

const LeadershipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
`;

const ExecutiveGrid = styled(LeadershipGrid)`
  margin-bottom: 5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2.5rem;
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

const LeaderCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const LeaderImage = styled.div`
  width: 100%;
  height: 320px;
  position: relative;
  overflow: hidden;
`;

const LeaderInfo = styled.div`
  padding: 1.5rem;
`;

const LeaderName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
  color: #333;
`;

const LeaderTitle = styled.p`
  font-size: 0.9rem;
  color: #e60012;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const LeaderBio = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f5f5f5;
  color: #333;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e60012;
    color: white;
  }
`;

const LeadershipTeamPage = () => {
  const executives = [
    {
      name: 'Wei Zhang',
      title: 'Chief Executive Officer',
      bio: 'With over 25 years of experience in the automotive industry, Wei has led BAIC through a period of unprecedented global growth and innovation.',
      social: {
        linkedin: 'https://www.linkedin.com/company/99310100/',
        twitter: 'https://x.com/baic_sa'
      }
    },
    {
      name: 'Li Chen',
      title: 'Chief Financial Officer',
      bio: 'Li brings extensive financial expertise from both the automotive and technology sectors, driving BAIC\'s financial strategy and sustainable growth.',
      social: {
        linkedin: 'https://www.linkedin.com/company/99310100/'
      }
    },
    {
      name: 'Sarah Johnson',
      title: 'Chief Technology Officer',
      bio: 'A pioneer in automotive technology, Sarah leads BAIC\'s research and development efforts, focusing on electric vehicles and autonomous driving.',
      social: {
        linkedin: 'https://www.linkedin.com/company/99310100/',
        twitter: 'https://x.com/baic_sa'
      }
    }
  ];

  const directors = [
    {
      name: 'Michael Wang',
      title: 'Director of Global Operations',
      bio: 'Michael oversees BAIC\'s manufacturing and supply chain operations across our global network of facilities.',
      social: {
        linkedin: 'https://www.linkedin.com/company/99310100/'
      }
    },
    {
      name: 'Sophia Liu',
      title: 'Director of Marketing',
      bio: 'Sophia leads BAIC\'s global marketing strategy, brand development, and customer engagement initiatives.',
      social: {
        linkedin: 'https://www.linkedin.com/company/99310100/',
        twitter: 'https://x.com/baic_sa'
      }
    },
    {
      name: 'David Kim',
      title: 'Director of Design',
      bio: 'An award-winning automotive designer, David leads the team responsible for BAIC\'s distinctive and innovative vehicle designs.',
      social: {
        linkedin: 'https://www.linkedin.com/company/99310100/'
      }
    },
    {
      name: 'Elena Rodriguez',
      title: 'Director of Sustainability',
      bio: 'Elena drives BAIC\'s environmental initiatives and sustainable manufacturing practices across our global operations.',
      social: {
        linkedin: 'https://www.linkedin.com/company/99310100/',
        twitter: 'https://x.com/baic_sa'
      }
    }
  ];

  return (
    <LeadershipContainer>
      <PageHeader>
        <PageTitle>Leadership Team</PageTitle>
        <PageDescription>
          Meet the visionary leaders who drive BAIC's innovation, growth, and commitment to excellence. 
          Our executive team brings together decades of experience in the automotive industry and beyond.
        </PageDescription>
      </PageHeader>

      <SectionTitle>Executive Leadership</SectionTitle>
      <ExecutiveGrid>
        {executives.map((executive, index) => (
          <LeaderCard key={index}>
            <LeaderImage>
              <Placeholder height="100%" label={executive.name} />
            </LeaderImage>
            <LeaderInfo>
              <LeaderName>{executive.name}</LeaderName>
              <LeaderTitle>{executive.title}</LeaderTitle>
              <LeaderBio>{executive.bio}</LeaderBio>
              <SocialLinks>
                {executive.social.linkedin && (
                  <SocialLink href={executive.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </SocialLink>
                )}
                {executive.social.twitter && (
                  <SocialLink href={executive.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </SocialLink>
                )}
              </SocialLinks>
            </LeaderInfo>
          </LeaderCard>
        ))}
      </ExecutiveGrid>

      <SectionTitle>Directors</SectionTitle>
      <LeadershipGrid>
        {directors.map((director, index) => (
          <LeaderCard key={index}>
            <LeaderImage>
              <Placeholder height="100%" label={director.name} />
            </LeaderImage>
            <LeaderInfo>
              <LeaderName>{director.name}</LeaderName>
              <LeaderTitle>{director.title}</LeaderTitle>
              <LeaderBio>{director.bio}</LeaderBio>
              <SocialLinks>
                {director.social.linkedin && (
                  <SocialLink href={director.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </SocialLink>
                )}
                {director.social.twitter && (
                  <SocialLink href={director.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </SocialLink>
                )}
              </SocialLinks>
            </LeaderInfo>
          </LeaderCard>
        ))}
      </LeadershipGrid>
    </LeadershipContainer>
  );
};

export default LeadershipTeamPage;
