import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SectionContainer = styled.section`
  padding: 6rem 0;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
    linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
    linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  opacity: 0.3;
  z-index: 1;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeIn} 0.8s ease forwards;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  color: #222;
  font-weight: 700;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #e60012;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 700px;
  margin: 1.5rem auto 0;
  line-height: 1.6;
`;

const NewsFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
`;

const FilterButton = styled.button`
  background-color: ${props => props.$active ? '#e60012' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: 2px solid ${props => props.$active ? '#e60012' : '#ddd'};
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 30px;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.$active ? '#e60012' : '#f0f0f0'};
    border-color: ${props => props.$active ? '#e60012' : '#ccc'};
  }
`;

// News grid layout
const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: auto;
  gap: 2rem;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
  
  @media (max-width: 992px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const NewsCard = styled.div`
  background-color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.4s ease;
  height: 100%;
  border-radius: 12px;
  grid-column: span ${props => props.$size === 'large' ? 8 : props.$size === 'medium' ? 6 : 4};
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    
    .news-image {
      transform: scale(1.05);
    }
    
    .news-category {
      background-color: #e60012;
      color: white;
    }
  }
  
  @media (max-width: 1200px) {
    grid-column: span ${props => props.$size === 'large' ? 6 : props.$size === 'medium' ? 6 : 6};
  }
  
  @media (max-width: 992px) {
    grid-column: span 6;
  }
  
  @media (max-width: 768px) {
    grid-column: span 12;
  }
`;

const NewsImageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const NewsImage = styled.div`
  height: ${props => props.$size === 'large' ? '350px' : props.$size === 'medium' ? '250px' : '200px'};
  background-color: ${props => props.$color};
  transition: transform 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    height: ${props => props.$size === 'large' ? '300px' : '220px'};
  }
`;

const NewsCategory = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: white;
  color: #333;
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NewsContent = styled.div`
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const NewsMetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const NewsDate = styled.div`
  font-size: 0.85rem;
  color: #888;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: #e60012;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
`;

const NewsReadTime = styled.div`
  font-size: 0.85rem;
  color: #888;
`;

const NewsTitle = styled.h3`
  font-size: ${props => props.$size === 'large' ? '1.8rem' : props.$size === 'medium' ? '1.5rem' : '1.3rem'};
  margin: 0 0 1rem 0;
  line-height: 1.4;
  font-weight: 700;
  color: #222;
  transition: color 0.3s ease;
  
  &:hover {
    color: #e60012;
  }
  
  @media (max-width: 768px) {
    font-size: ${props => props.$size === 'large' ? '1.6rem' : '1.3rem'};
  }
`;

const NewsExcerpt = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const NewsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ReadMoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #e60012;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
  
  &::after {
    content: '→';
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: translateX(3px);
  }
`;

const ShareButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  
  &:hover {
    color: #333;
  }
  
  i {
    margin-right: 0.5rem;
  }
`;

const ViewAllContainer = styled.div`
  text-align: center;
  margin-top: 4rem;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.6s;
  opacity: 0;
`;

const ViewAllButton = styled(Link)`
  background-color: transparent;
  color: #222;
  border: 2px solid #222;
  padding: 1rem 3rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  font-weight: 600;
  
  &:hover {
    background-color: #222;
    color: white;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const NewsletterContainer = styled.div`
  margin-top: 6rem;
  background-color: #222;
  padding: 3rem;
  border-radius: 12px;
  color: white;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.8s;
  opacity: 0;
`;

const NewsletterTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const NewsletterDescription = styled.p`
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const NewsletterForm = styled.form`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  
  @media (max-width: 576px) {
    border-radius: 4px;
  }
`;

const NewsletterButton = styled.button`
  background-color: #e60012;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  border-radius: 0 4px 4px 0;
  
  &:hover {
    background-color: #c5000f;
  }
  
  @media (max-width: 576px) {
    border-radius: 4px;
  }
`;

const NewsFeedSection = () => {
  const categories = ['All', 'Company News', 'Product Updates', 'Events', 'Awards'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  const newsItems = [
    {
      id: 'news1',
      title: 'BAIC BJ60 Wins "SUV of the Year" Award at International Auto Show',
      date: 'March 15, 2025',
      readTime: '3 min read',
      excerpt: "The all-new BAIC BJ60 has been recognized for its exceptional design, performance, and value, taking home the prestigious 'SUV of the Year' award at this year's International Auto Show.",
      category: 'Awards',
      color: '#c53030',
      size: 'large'
    },
    {
      id: 'news2',
      title: 'New Manufacturing Facility Opens in South America',
      date: 'February 28, 2025',
      readTime: '4 min read',
      excerpt: 'BAIC expands its global footprint with a state-of-the-art manufacturing facility in Brazil, creating over 2,000 jobs and strengthening our presence in the South American market.',
      category: 'Company News',
      color: '#2b6cb0',
      size: 'medium'
    },
    {
      id: 'news3',
      title: 'BAIC Unveils New Electric Vehicle Concept at Tech Summit',
      date: 'January 10, 2025',
      readTime: '5 min read',
      excerpt: "The future of mobility is here with BAIC's revolutionary electric vehicle concept, featuring cutting-edge technology and a range of over 700 kilometers on a single charge.",
      category: 'Product Updates',
      color: '#4c51bf',
      size: 'medium'
    },
    {
      id: 'news4',
      title: 'BAIC Partners with Tech Giant for Smart Car Solutions',
      date: 'December 5, 2024',
      readTime: '2 min read',
      excerpt: 'Strategic partnership aims to develop next-generation connected car technologies, bringing advanced AI and IoT capabilities to future BAIC vehicles.',
      category: 'Company News',
      color: '#6b46c1',
      size: 'small'
    },
    {
      id: 'news5',
      title: 'BAIC Celebrates 10 Years of Global Expansion',
      date: 'November 20, 2024',
      readTime: '4 min read',
      excerpt: "A decade of growth, innovation, and success in the international automotive market. Join us as we look back at our journey and ahead to the future.",
      category: 'Events',
      color: '#805ad5',
      size: 'small'
    },
    {
      id: 'news6',
      title: 'New B40 Plus Receives 5-Star Safety Rating',
      date: 'October 8, 2024',
      readTime: '3 min read',
      excerpt: "BAIC's commitment to safety recognized with top ratings in all crash test categories, making the B40 Plus one of the safest vehicles in its class.",
      category: 'Product Updates',
      color: '#4a5568',
      size: 'small'
    }
  ];
  
  const filteredNews = activeCategory === 'All' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);
  
  return (
    <SectionContainer>
      <BackgroundPattern />
      <ContentContainer>
        <SectionHeader>
          <SectionTitle>LATEST NEWS</SectionTitle>
          <SectionSubtitle>
            Stay up to date with the latest developments, product launches, 
            and corporate announcements from BAIC.
          </SectionSubtitle>
        </SectionHeader>
        
        <NewsFilterContainer>
          {categories.map(category => (
            <FilterButton 
              key={category}
              $active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </NewsFilterContainer>
        
        <NewsGrid>
          {filteredNews.map(news => (
            <NewsCard key={news.id} $size={news.size}>
              <NewsImageContainer>
                <NewsImage className="news-image" $size={news.size} $color={news.color}>
                  {news.title.split(' ').slice(0, 2).join(' ')}
                </NewsImage>
                <NewsCategory className="news-category">{news.category}</NewsCategory>
              </NewsImageContainer>
              
              <NewsContent>
                <NewsMetaContainer>
                  <NewsDate>{news.date}</NewsDate>
                  <NewsReadTime>{news.readTime}</NewsReadTime>
                </NewsMetaContainer>
                
                <NewsTitle $size={news.size}>{news.title}</NewsTitle>
                <NewsExcerpt>{news.excerpt}</NewsExcerpt>
                
                <NewsFooter>
                  <ReadMoreButton to={`/media/news/${news.id}`}>
                    Read Full Story
                  </ReadMoreButton>
                  <ShareButton>
                    <i className="fas fa-share-alt"></i> Share
                  </ShareButton>
                </NewsFooter>
              </NewsContent>
            </NewsCard>
          ))}
        </NewsGrid>
        
        <ViewAllContainer>
          <ViewAllButton to="/media/news">
            VIEW ALL NEWS
          </ViewAllButton>
        </ViewAllContainer>
        
        <NewsletterContainer>
          <NewsletterTitle>Stay Informed</NewsletterTitle>
          <NewsletterDescription>
            Subscribe to our newsletter to receive the latest news, product updates, 
            and exclusive offers directly to your inbox.
          </NewsletterDescription>
          <NewsletterForm>
            <NewsletterInput 
              type="email" 
              placeholder="Enter your email address" 
              required
            />
            <NewsletterButton type="submit">
              Subscribe
            </NewsletterButton>
          </NewsletterForm>
        </NewsletterContainer>
      </ContentContainer>
    </SectionContainer>
  );
};

export default NewsFeedSection;
