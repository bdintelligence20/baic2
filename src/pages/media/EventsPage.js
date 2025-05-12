import React from 'react';
import styled from 'styled-components';
import Placeholder from '../../components/common/Placeholder';

const EventsContainer = styled.div`
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

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.$active ? '#e60012' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: 1px solid ${props => props.$active ? '#e60012' : '#ddd'};
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? '#c5000f' : '#f5f5f5'};
  }
`;

const RegionFilter = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FilterLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #333;
  background-color: #fff;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #e60012;
  }
`;

const FeaturedEvent = styled.div`
  margin-bottom: 4rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 1fr 1fr;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedEventImage = styled.div`
  height: 100%;
  min-height: 400px;
  
  @media (max-width: 992px) {
    min-height: 300px;
  }
`;

const FeaturedEventContent = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EventBadge = styled.span`
  display: inline-block;
  background-color: ${props => props.$upcoming ? '#e60012' : '#666'};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FeaturedEventTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const EventDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const EventLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const FeaturedEventDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const EventButton = styled.button`
  background-color: #e60012;
  color: white;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    background-color: #c5000f;
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const EventCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const EventImage = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
`;

const EventContent = styled.div`
  padding: 1.5rem;
`;

const EventTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
  line-height: 1.4;
`;

const EventDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const EventLink = styled.a`
  display: inline-block;
  color: #e60012;
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
    background-color: #e60012;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover:after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const LoadMoreButton = styled.button`
  background-color: transparent;
  color: #333;
  border: 2px solid #e60012;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
  
  &:hover {
    background-color: #e60012;
    color: white;
  }
`;

const EventsPage = () => {
  // In a real implementation, these would be state variables
  const activeCategory = 'All';
  
  const categories = ['All', 'Auto Shows', 'Product Launches', 'Exhibitions', 'Conferences', 'Motorsport'];
  const regions = ['All Regions', 'North America', 'Europe', 'Asia', 'Africa', 'South America', 'Australia'];
  
  const featuredEvent = {
    title: 'BAIC International Auto Show 2025',
    date: 'May 15-20, 2025',
    location: 'Shanghai Exhibition Center, China',
    description: 'Join us at the International Auto Show 2025 where BAIC will unveil exciting new models and showcase our latest innovations. Experience our vehicles firsthand, meet our team, and discover the future of mobility.',
    upcoming: true
  };
  
  const events = [
    {
      title: 'BAIC X55 Dynamic Launch Event',
      date: 'April 25, 2025',
      location: 'Los Angeles, USA',
      description: 'Be among the first to experience the all-new BAIC X55 Dynamic at our exclusive launch event.',
      category: 'Product Launches',
      upcoming: true
    },
    {
      title: 'European Mobility Expo',
      date: 'June 10-15, 2025',
      location: 'Berlin, Germany',
      description: 'BAIC will showcase our full vehicle lineup and sustainable mobility solutions at Europe\'s premier automotive exhibition.',
      category: 'Exhibitions',
      upcoming: true
    },
    {
      title: 'BAIC Off-Road Experience Day',
      date: 'July 8, 2025',
      location: 'Moab, Utah, USA',
      description: 'Test the capabilities of the BAIC B40 PLUS in challenging off-road conditions at this hands-on event.',
      category: 'Motorsport',
      upcoming: true
    },
    {
      title: 'Global Automotive Sustainability Summit',
      date: 'March 5, 2025',
      location: 'Stockholm, Sweden',
      description: 'BAIC presented our environmental initiatives and sustainable manufacturing practices at this important industry conference.',
      category: 'Conferences',
      upcoming: false
    },
    {
      title: 'BAIC X55 Plus Regional Launch',
      date: 'February 12, 2025',
      location: 'Johannesburg, South Africa',
      description: 'The successful launch of the BAIC X55 Plus in the African market, featuring test drives and product demonstrations.',
      category: 'Product Launches',
      upcoming: false
    },
    {
      title: 'Paris Auto Show',
      date: 'January 20-25, 2025',
      location: 'Paris, France',
      description: 'BAIC\'s impressive booth at the Paris Auto Show attracted thousands of visitors and industry professionals.',
      category: 'Auto Shows',
      upcoming: false
    }
  ];

  // Filter events based on active category
  const filteredEvents = activeCategory === 'All' 
    ? events 
    : events.filter(event => event.category === activeCategory);

  return (
    <EventsContainer>
      <PageHeader>
        <PageTitle>Events</PageTitle>
        <PageDescription>
          Discover upcoming BAIC events around the world. From auto shows to product launches, 
          find opportunities to experience our vehicles and connect with our team.
        </PageDescription>
      </PageHeader>

      <FilterBar>
        <CategoryFilter>
          {categories.map((category, index) => (
            <FilterButton 
              key={index} 
              $active={category === activeCategory}
            >
              {category}
            </FilterButton>
          ))}
        </CategoryFilter>
        
        <RegionFilter>
          <FilterLabel>Region:</FilterLabel>
          <FilterSelect>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </FilterSelect>
        </RegionFilter>
      </FilterBar>

      <FeaturedEvent>
        <FeaturedEventImage>
          <Placeholder height="100%" label="Featured Event" />
        </FeaturedEventImage>
        <FeaturedEventContent>
          <EventBadge $upcoming={featuredEvent.upcoming}>
            {featuredEvent.upcoming ? 'Upcoming Event' : 'Past Event'}
          </EventBadge>
          <FeaturedEventTitle>{featuredEvent.title}</FeaturedEventTitle>
          <EventDate>
            <i className="far fa-calendar"></i>
            <span>{featuredEvent.date}</span>
          </EventDate>
          <EventLocation>
            <i className="fas fa-map-marker-alt"></i>
            <span>{featuredEvent.location}</span>
          </EventLocation>
          <FeaturedEventDescription>{featuredEvent.description}</FeaturedEventDescription>
          {featuredEvent.upcoming && <EventButton>Register Now</EventButton>}
        </FeaturedEventContent>
      </FeaturedEvent>

      <EventsGrid>
        {filteredEvents.map((event, index) => (
          <EventCard key={index}>
            <EventImage>
              <Placeholder height="100%" label={event.title} />
              <EventBadge $upcoming={event.upcoming} style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                {event.upcoming ? 'Upcoming' : 'Past Event'}
              </EventBadge>
            </EventImage>
            <EventContent>
              <EventTitle>{event.title}</EventTitle>
              <EventDate>
                <i className="far fa-calendar"></i>
                <span>{event.date}</span>
              </EventDate>
              <EventLocation>
                <i className="fas fa-map-marker-alt"></i>
                <span>{event.location}</span>
              </EventLocation>
              <EventDescription>{event.description}</EventDescription>
              <EventLink href="#">
                {event.upcoming ? 'Learn More & Register' : 'View Event Highlights'}
              </EventLink>
            </EventContent>
          </EventCard>
        ))}
      </EventsGrid>

      <LoadMoreButton>Load More</LoadMoreButton>
    </EventsContainer>
  );
};

export default EventsPage;
