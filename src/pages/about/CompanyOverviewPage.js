import React, { useState, useRef, createRef, useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.div`
  position: relative;
  height: 80vh;
  min-height: 600px;
  background-color: #000;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 62px; /* Add margin to account for fixed header height */
  
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
  background-image: url('/images/hero/COMPANY OVERVIEW (1).jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 700;
`;

const PageSubtitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #e60012;
  font-weight: 600;
`;

const Section = styled.section`
  margin-bottom: 5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 2rem;
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

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 1.5rem;
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
  opacity: ${props => props.$active ? '1' : '0.6'};
  transform: ${props => props.$active ? 'scale(1)' : 'scale(0.98)'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    opacity: 1;
    transform: scale(1);
  }
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 80px;
  }
`;

const TimelineContent = styled.div`
  width: 45%;
  padding: 1.5rem;
  background-color: ${props => props.$active ? '#e60012' : '#f8f8f8'};
  color: ${props => props.$active ? '#fff' : '#333'};
  border-radius: 8px;
  box-shadow: ${props => props.$active ? '0 5px 20px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)'};
  position: relative;
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 20px;
    ${props => props.$position === 'left' ? 'right: -10px; transform: rotate(45deg);' : 'left: -10px; transform: rotate(-135deg);'}
    width: 20px;
    height: 20px;
    background-color: ${props => props.$active ? '#e60012' : '#f8f8f8'};
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
  background-color: ${props => props.$active ? '#e60012' : '#999'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  z-index: 10;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    left: 0;
  }
`;

const TimelineImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.$active ? '#fff' : '#333'};
`;

const TimelineText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.$active ? 'rgba(255, 255, 255, 0.9)' : '#666'};
  margin-bottom: 1rem;
`;

const TimelineNavigation = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TimelineNavButton = styled.button`
  background-color: ${props => props.$active ? '#e60012' : '#f8f8f8'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? '#c5000f' : '#eee'};
  }
`;

const CompanyOverviewPage = () => {
  const [activeEvent, setActiveEvent] = useState(0);
  const timelineItemRefs = useRef([]);
  const timelineContainerRef = useRef(null);
  
  // Create refs for each timeline item
  const timelineEvents = [
    {
      year: '2016',
      date: 'April 24, 2016',
      title: 'BAIC Group and IDC Joint Development Agreement',
      text: 'On April 24, 2016, BAIC Group signed a joint development agreement with IDC.',
      image: '/images/History/april-24-2016.jpg',
      position: 'left'
    },
    {
      year: '2016',
      date: 'August 30, 2016',
      title: 'Foundation Ceremony',
      text: 'On August 30, 2016, BAIC SA officially laid the foundation.',
      image: '/images/History/AUG-30-2016.jpg',
      position: 'right'
    },
    {
      year: '2017',
      date: 'July 1, 2017',
      title: 'First Steel Column',
      text: 'On July 1, 2017, the first steel column of SA factory was successfully fitted.',
      image: '/images/History/july-1-2017.jpg',
      position: 'left'
    },
    {
      year: '2018',
      date: 'July 24, 2018',
      title: 'First Car Launch',
      text: 'On July 24, 2018, the first car launch ceremony of BAIC SA.',
      image: '/images/History/july-24-2018.jpg',
      position: 'right'
    },
    {
      year: '2019',
      date: 'June 21, 2019',
      title: 'Deepening Cooperation',
      text: 'On June 21, 2019, BAIC Group and IDC signed the Deepening Cooperation Agreement.',
      image: '/images/History/june-21-2019.jpg',
      position: 'left'
    },
    {
      year: '2019',
      date: 'July 25, 2019',
      title: 'Minister Visit',
      text: 'On July 25, 2019, Dr Lin Jiangguo, the then Chinese Minister of Trade and Industry visited BAIC SA.',
      image: '/images/History/july-25-2019.jpg',
      position: 'right'
    },
    {
      year: '2021',
      date: 'October 23, 2021',
      title: 'Johannesburg Listing',
      text: 'On October 23, 2021, BAIC SA BJD was listed in Johannesburg.',
      image: '/images/History/ocotber-23-2021.jpg',
      position: 'left'
    },
    {
      year: '2022',
      date: 'October 25, 2022',
      title: 'Paint Shop Installation',
      text: 'On October 25, 2022, paint shop equipment installation of the BAIC SA officially began.',
      image: '/images/History/october-25-2022.jpg',
      position: 'right'
    },
    {
      year: '2022',
      date: 'November 15, 2022',
      title: 'X55 Launch',
      text: 'On November 15, 2022, BAIC SA X55 was successfully launched in South Africa market.',
      image: '/images/History/novemberl-15-2022.jpg',
      position: 'left'
    },
    {
      year: '2022',
      date: 'November 21, 2022',
      title: '8 Year Anniversary',
      text: 'On November 21, 2022, all employees celebrated the 6 year anniversary of BAIC SA.',
      image: '/images/History/november-21-2022.jpg',
      position: 'right'
    },
    {
      year: '2022',
      date: 'December 7, 2022',
      title: 'IDC Executive Visit',
      text: 'On December 7, 2022, IDC executive Ms Lucretia Jooste visited the BAIC SA factory.',
      image: '/images/History/december-7-2022.jpg',
      position: 'left'
    },
    {
      year: '2023',
      date: 'February 8, 2023',
      title: 'X55 Trial Assembly',
      text: 'On February 8, 2023, BAIC SA X55 trial assembly vehicle off production line completed & product off line.',
      image: '/images/History/feb-8-2023.jpg',
      position: 'right'
    },
    {
      year: '2023',
      date: 'June 1, 2023',
      title: 'E-coat Commissioning',
      text: 'On June 1, 2023, E-coat first fit & equipment commissioning launched.',
      image: '/images/History/june-1-2023.jpg',
      position: 'left'
    },
    {
      year: '2023',
      date: 'June 23, 2023',
      title: 'Factory Construction Completed',
      text: 'On June 23, 2023, BAIC SA factory construction fully completed & product off line.',
      image: '/images/History/june-23-2023.jpg',
      position: 'right'
    },
    {
      year: '2024',
      date: 'August 30, 2024',
      title: 'X55 PLUS Launch',
      text: 'On August 30, 2024, BAIC SA officially launched the BEIJING X55 PLUS in South Africa, showcasing its advanced technology, modern design and strengthening our presence in the South African market.',
      image: '/images/History/August-30-2024-820.jpg',
      position: 'left'
    },
    {
      year: '2024',
      date: 'November 16, 2024',
      title: '8th Anniversary',
      text: 'On November 16, 2024, BAIC SA celebrated its 8th anniversary with nearly a decade of presence & innovation at the BAIC SA factory, highlighting nearly a decade of commitment, growth and contribution to the South African market.',
      image: '/images/History/November-16-2024-820.jpg',
      position: 'right'
    }
  ];

  // Initialize refs when component mounts
  useEffect(() => {
    timelineItemRefs.current = timelineEvents.map((_, i) => timelineItemRefs.current[i] || createRef());
  }, [timelineEvents]);

  const handleEventClick = (index) => {
    setActiveEvent(index);
    
    // Scroll to the selected timeline item
    if (timelineItemRefs.current[index] && timelineItemRefs.current[index].current) {
      const element = timelineItemRefs.current[index].current;
      const container = timelineContainerRef.current;
      
      if (element && container) {
        // Calculate position to scroll to (centered in the container)
        const elementRect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const scrollTop = element.offsetTop - (containerRect.height / 2) + (elementRect.height / 2);
        
        // Smooth scroll to the element
        container.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <PageContainer>
      <HeroSection>
        <HeroBackground />
      </HeroSection>
      
      <ContentContainer>
        <Section>
          <SectionTitle>DRIVEN BY BRAVERY, BUILT FOR SA</SectionTitle>
        <Paragraph>
          BAIC has a rich heritage of automotive innovation, dating back to 1958. From our beginnings in Beijing, China, we've grown into a global Fortune 500 company, driven by a commitment to pushing boundaries and collaborating with industry leaders.
        </Paragraph>
        
        <Paragraph>
          Our pioneering spirit led us to establish the first Sino-foreign joint venture in China's automotive industry, partnering with giants like GM and Daimler. This boldness is at the heart of our approach to vehicle development and our desire to empower drivers.
        </Paragraph>
        
        <Paragraph>
          BAIC's presence in South Africa is a testament to our belief in the country's potential. We've invested in a local manufacturing and assembly plant in Gqeberha, creating jobs and contributing to the local economy. We're committed to providing South African drivers with reliable, capable vehicles for their Brave New Roads.
        </Paragraph>
        </Section>
        
        <Section>
        <SectionTitle>A LEGACY OF BRAVE FIRSTS</SectionTitle>
        <Paragraph>
          BAIC's story is one of continuous progress, driven by a spirit of bravery that began in 1958 and continues to shape our path today. 'History is still being written...' but here are some of the key chapters:
        </Paragraph>
        
        <TimelineNavigation>
          {timelineEvents.map((event, index) => (
            <TimelineNavButton 
              key={index} 
              $active={activeEvent === index}
              onClick={() => handleEventClick(index)}
            >
              {event.year}
            </TimelineNavButton>
          ))}
        </TimelineNavigation>

        <TimelineContainer ref={timelineContainerRef}>
          {timelineEvents.map((event, index) => (
            <TimelineItem 
              key={index} 
              ref={timelineItemRefs.current[index]}
              $position={event.position} 
              $active={activeEvent === index}
              onClick={() => handleEventClick(index)}
            >
              <TimelineYear $position={event.position} $active={activeEvent === index}>
                {event.year}
              </TimelineYear>
              <TimelineContent $position={event.position} $active={activeEvent === index}>
                <TimelineImage src={event.image} alt={event.title} />
                <TimelineTitle $active={activeEvent === index}>{event.title}</TimelineTitle>
                <TimelineText $active={activeEvent === index}>{event.text}</TimelineText>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
        </Section>
      </ContentContainer>
    </PageContainer>
  );
};

export default CompanyOverviewPage;
