import React from 'react';
import styled from 'styled-components';
import Placeholder from '../../components/common/Placeholder';

const HistoryContainer = styled.div`
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

const TimelineContainer = styled.div`
  position: relative;
  margin: 4rem 0;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 4px;
    background-color: #e60012;
    transform: translateX(-50%);
  }
  
  @media (max-width: 768px) {
    &:before {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: ${props => props.$position === 'left' ? 'flex-start' : 'flex-end'};
  padding-bottom: 4rem;
  width: 100%;
  position: relative;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 80px;
  }
`;

const TimelineContent = styled.div`
  width: 45%;
  padding: 1.5rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 20px;
    ${props => props.$position === 'left' ? 'right: -10px; transform: rotate(45deg);' : 'left: -10px; transform: rotate(-135deg);'}
    width: 20px;
    height: 20px;
    background-color: #f8f8f8;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    
    &:before {
      left: -10px;
      transform: rotate(-135deg);
    }
  }
`;

const TimelineYear = styled.div`
  position: absolute;
  top: 20px;
  ${props => props.$position === 'left' ? 'right: -70px;' : 'left: -70px;'}
  width: 60px;
  height: 60px;
  background-color: #e60012;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  z-index: 10;
  
  @media (max-width: 768px) {
    left: 0;
  }
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const TimelineText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1rem;
`;

const TimelineImage = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1rem;
`;

const HistoryPage = () => {
  const timelineEvents = [
    {
      year: '1958',
      title: 'Foundation',
      text: 'BAIC was established as a state-owned enterprise in Beijing, China.',
      position: 'right'
    },
    {
      year: '1984',
      title: 'First Vehicle',
      text: 'Production of the first BAIC vehicle model began, marking our entry into the automotive market.',
      position: 'left'
    },
    {
      year: '2002',
      title: 'International Expansion',
      text: 'BAIC began expanding into international markets, establishing our first overseas manufacturing facility.',
      position: 'right'
    },
    {
      year: '2009',
      title: 'Strategic Partnerships',
      text: 'Formed strategic partnerships with global automotive leaders to enhance technology and innovation.',
      position: 'left'
    },
    {
      year: '2015',
      title: 'Electric Revolution',
      text: 'Launched our first fully electric vehicle, demonstrating our commitment to sustainable mobility.',
      position: 'right'
    },
    {
      year: '2020',
      title: 'Global Recognition',
      text: 'BAIC vehicles received international awards for design, safety, and innovation.',
      position: 'left'
    },
    {
      year: '2025',
      title: 'Present Day',
      text: 'Today, BAIC is a global automotive leader with a presence in over 50 countries and a commitment to shaping the future of mobility.',
      position: 'right'
    }
  ];

  return (
    <HistoryContainer>
      <PageHeader>
        <PageTitle>Our History</PageTitle>
        <PageDescription>
          Since our founding in 1958, BAIC has grown from a small local manufacturer to a global automotive leader. 
          Explore our journey through the decades and discover the milestones that have shaped our company.
        </PageDescription>
      </PageHeader>

      <TimelineContainer>
        {timelineEvents.map((event, index) => (
          <TimelineItem key={index} $position={event.position}>
            <TimelineYear $position={event.position}>{event.year}</TimelineYear>
            <TimelineContent $position={event.position}>
              <TimelineTitle>{event.title}</TimelineTitle>
              <TimelineText>{event.text}</TimelineText>
              <TimelineImage>
                <Placeholder height="100%" label={`${event.year} - ${event.title}`} />
              </TimelineImage>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </HistoryContainer>
  );
};

export default HistoryPage;
