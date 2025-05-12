import React from 'react';
import styled from 'styled-components';
import Placeholder from '../../components/common/Placeholder';

const PressReleasesContainer = styled.div`
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

const YearFilter = styled.div`
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

const SearchBar = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #e60012;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const PressReleasesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
`;

const PressReleaseItem = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PressReleaseImage = styled.div`
  width: 300px;
  height: 100%;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const PressReleaseContent = styled.div`
  padding: 2rem;
  flex-grow: 1;
`;

const PressReleaseDate = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const PressReleaseTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  line-height: 1.4;
`;

const PressReleaseExcerpt = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const PressReleaseActions = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const PressReleaseLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
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

const PressReleasesPage = () => {
  const years = ['All Years', '2025', '2024', '2023', '2022', '2021'];
  
  const pressReleases = [
    {
      date: 'April 5, 2025',
      title: 'BAIC Announces Strategic Partnership with Global Tech Leader',
      excerpt: 'BAIC Group and TechInnovate have signed a landmark agreement to co-develop next-generation connected vehicle technologies, artificial intelligence systems, and autonomous driving capabilities. This partnership represents a significant step forward in BAIC\'s commitment to technological innovation and will accelerate the integration of cutting-edge digital solutions across our vehicle lineup.',
      image: 'partnership-announcement.jpg',
      pdfLink: '#',
      readMoreLink: '#'
    },
    {
      date: 'March 15, 2025',
      title: 'BAIC BJ60 Receives Prestigious "SUV of the Year" Award',
      excerpt: 'The BAIC BJ60 has been named "SUV of the Year" by the Global Automotive Excellence Awards, recognizing its exceptional design, performance, and value. The award highlights the BJ60\'s innovative features, superior craftsmanship, and outstanding driving dynamics that have set a new standard in the competitive SUV segment.',
      image: 'award-ceremony.jpg',
      pdfLink: '#',
      readMoreLink: '#'
    },
    {
      date: 'February 28, 2025',
      title: 'BAIC Expands Global Manufacturing Footprint with New South American Facility',
      excerpt: 'BAIC Group has officially inaugurated its state-of-the-art manufacturing facility in São Paulo, Brazil. The new plant represents an investment of $500 million and will create over 2,000 jobs in the region. This strategic expansion strengthens BAIC\'s presence in the growing South American automotive market and demonstrates our commitment to global growth.',
      image: 'factory-opening.jpg',
      pdfLink: '#',
      readMoreLink: '#'
    },
    {
      date: 'January 10, 2025',
      title: 'BAIC Unveils Revolutionary Electric Vehicle Concept at International Auto Show',
      excerpt: 'BAIC has revealed its groundbreaking electric vehicle concept, the E-Vision, at the International Auto Show. The E-Vision showcases BAIC\'s vision for the future of sustainable mobility, featuring a 500-mile range, rapid charging capabilities, and innovative interior design. The concept vehicle demonstrates BAIC\'s commitment to leading the transition to electric mobility.',
      image: 'ev-concept.jpg',
      pdfLink: '#',
      readMoreLink: '#'
    }
  ];

  return (
    <PressReleasesContainer>
      <PageHeader>
        <PageTitle>Press Releases</PageTitle>
        <PageDescription>
          Access official BAIC press releases, announcements, and statements. 
          Find the latest information about our company, products, and initiatives.
        </PageDescription>
      </PageHeader>

      <FilterBar>
        <YearFilter>
          <FilterLabel>Year:</FilterLabel>
          <FilterSelect>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </FilterSelect>
        </YearFilter>
        
        <SearchBar>
          <SearchIcon>
            <i className="fas fa-search"></i>
          </SearchIcon>
          <SearchInput placeholder="Search press releases..." />
        </SearchBar>
      </FilterBar>

      <PressReleasesList>
        {pressReleases.map((item, index) => (
          <PressReleaseItem key={index}>
            <PressReleaseImage>
              <Placeholder height="100%" label={item.title} />
            </PressReleaseImage>
            <PressReleaseContent>
              <PressReleaseDate>{item.date}</PressReleaseDate>
              <PressReleaseTitle>{item.title}</PressReleaseTitle>
              <PressReleaseExcerpt>{item.excerpt}</PressReleaseExcerpt>
              <PressReleaseActions>
                <PressReleaseLink href={item.pdfLink}>
                  <i className="fas fa-file-pdf"></i>
                  Download PDF
                </PressReleaseLink>
                <PressReleaseLink href={item.readMoreLink}>
                  Read Full Release
                </PressReleaseLink>
              </PressReleaseActions>
            </PressReleaseContent>
          </PressReleaseItem>
        ))}
      </PressReleasesList>

      <LoadMoreButton>Load More</LoadMoreButton>
    </PressReleasesContainer>
  );
};

export default PressReleasesPage;
