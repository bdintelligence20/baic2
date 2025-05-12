import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Placeholder from '../components/common/Placeholder';

const MediaContainer = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled(Link)`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.$active ? '#e60012' : '#666'};
  position: relative;
  cursor: pointer;
  text-decoration: none;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${props => props.$active ? '#e60012' : 'transparent'};
  }
  
  &:hover {
    color: #e60012;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 4rem;
`;

const MediaPage = () => {
  // In a real implementation, this would be state
  const activeTab = 'news';
  
  return (
    <MediaContainer>
      <PageTitle>Media</PageTitle>
      
      <TabsContainer>
        <Tab to="/media/news" $active={activeTab === 'news'}>News</Tab>
        <Tab to="/media/press-releases" $active={activeTab === 'press'}>Press Releases</Tab>
        <Tab to="/media/gallery" $active={activeTab === 'gallery'}>Image Gallery</Tab>
        <Tab to="/media/events" $active={activeTab === 'events'}>Events</Tab>
      </TabsContainer>
      
      <ContentSection>
        <Placeholder height="600px" label="Media Content" />
      </ContentSection>
    </MediaContainer>
  );
};

export default MediaPage;
