import React from 'react';
import styled from 'styled-components';
import Placeholder from '../../components/common/Placeholder';

const NewsContainer = styled.div`
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

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
`;

const NewsCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const NewsImage = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
  overflow: hidden;
`;

const NewsCategory = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: #e60012;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const NewsContent = styled.div`
  padding: 1.5rem;
`;

const NewsDate = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const NewsTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
  line-height: 1.4;
`;

const NewsExcerpt = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const NewsLink = styled.a`
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

const NewsPage = () => {
  // In a real implementation, these would be state variables
  const activeCategory = 'All';
  
  const categories = ['All', 'Company News', 'Product Updates', 'Events', 'Awards'];
  
  const newsItems = [
    {
      category: 'Company News',
      date: 'April 5, 2025',
      title: 'BAIC Partners with Tech Giant for Smart Car Solutions',
      excerpt: 'Strategic partnership aims to develop next-generation connected car technologies.',
      link: '#'
    },
    {
      category: 'Product Updates',
      date: 'March 15, 2025',
      title: 'BAIC BJ60 Wins "SUV of the Year" Award',
      excerpt: 'The all-new BAIC BJ60 has been recognized for its exceptional design, performance, and value.',
      link: '#'
    },
    {
      category: 'Events',
      date: 'February 28, 2025',
      title: 'New Manufacturing Facility Opens in South America',
      excerpt: 'BAIC expands its global footprint with a state-of-the-art manufacturing facility in Brazil.',
      link: '#'
    },
    {
      category: 'Product Updates',
      date: 'January 10, 2025',
      title: 'BAIC Unveils New Electric Vehicle Concept',
      excerpt: 'The future of mobility is here with BAIC\'s revolutionary electric vehicle concept.',
      link: '#'
    },
    {
      category: 'Company News',
      date: 'December 5, 2024',
      title: 'BAIC Celebrates 10 Years of Global Expansion',
      excerpt: 'A decade of growth, innovation, and success in the international automotive market.',
      link: '#'
    },
    {
      category: 'Awards',
      date: 'November 20, 2024',
      title: 'BAIC Receives Sustainability Leadership Award',
      excerpt: 'Recognition for our commitment to environmental responsibility and sustainable manufacturing practices.',
      link: '#'
    }
  ];

  return (
    <NewsContainer>
      <PageHeader>
        <PageTitle>News</PageTitle>
        <PageDescription>
          Stay up to date with the latest news, announcements, and updates from BAIC. 
          Discover our newest vehicles, corporate initiatives, and industry achievements.
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
        
        <SearchBar>
          <SearchIcon>
            <i className="fas fa-search"></i>
          </SearchIcon>
          <SearchInput placeholder="Search news..." />
        </SearchBar>
      </FilterBar>

      <NewsGrid>
        {newsItems.map((item, index) => (
          <NewsCard key={index}>
            <NewsImage>
              <Placeholder height="100%" label={item.title} />
              <NewsCategory>{item.category}</NewsCategory>
            </NewsImage>
            <NewsContent>
              <NewsDate>{item.date}</NewsDate>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsExcerpt>{item.excerpt}</NewsExcerpt>
              <NewsLink href={item.link}>Read More</NewsLink>
            </NewsContent>
          </NewsCard>
        ))}
      </NewsGrid>

      <LoadMoreButton>Load More</LoadMoreButton>
    </NewsContainer>
  );
};

export default NewsPage;
