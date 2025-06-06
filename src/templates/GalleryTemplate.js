import React from 'react';
import styled from 'styled-components';
import Placeholder from '../components/common/Placeholder';

const GalleryContainer = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterButton = styled.button`
  background: ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: 1px solid ${props => props.$active ? 'var(--primary-color)' : '#ddd'};
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-color-hover)' : 'rgba(230, 0, 18, 0.05)'};
    transform: ${props => props.$active ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.$active ? 'none' : '0 4px 8px rgba(0, 0, 0, 0.05)'};
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  
  &:hover .overlay {
    opacity: 1;
  }
`;

const ItemOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  padding: 1rem;
  text-align: center;
  z-index: 2;
`;

const ItemTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ItemCategory = styled.div`
  font-size: 0.9rem;
  color: #ccc;
`;

const ItemIcon = styled.div`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const LoadMoreButton = styled.button`
  background-color: transparent;
  color: #333;
  border: 2px solid var(--primary-color);
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
  
  &:hover {
    background-color: rgba(230, 0, 18, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LightboxContent = styled.div`
  position: relative;
  width: 80%;
  max-width: 1000px;
`;

const LightboxImage = styled.div`
  width: 100%;
  height: 70vh;
  border-radius: 8px;
  overflow: hidden;
`;

const LightboxClose = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const LightboxNav = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$direction === 'prev' ? 'left: -60px;' : 'right: -60px;'}
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const GalleryTemplate = ({ galleryData }) => {
  // In a real implementation, galleryData would be passed as props
  // For now, we'll use placeholder data
  const gallery = galleryData || {
    title: 'Media Gallery',
    description: 'Explore our collection of images and videos showcasing our vehicles, events, and more.',
    categories: ['All', 'Vehicles', 'Events', 'Corporate', 'Behind the Scenes'],
    items: [
      { type: 'image', category: 'Vehicles', title: 'X55 Front View' },
      { type: 'image', category: 'Vehicles', title: 'X55 Plus Interior' },
      { type: 'image', category: 'Events', title: 'Auto Show 2025' },
      { type: 'video', category: 'Corporate', title: 'Company Overview' },
      { type: 'image', category: 'Behind the Scenes', title: 'Design Studio' },
      { type: 'video', category: 'Vehicles', title: 'X55 Dynamic Test Drive' },
      { type: 'image', category: 'Events', title: 'Product Launch' },
      { type: 'image', category: 'Corporate', title: 'Headquarters' },
      { type: 'video', category: 'Behind the Scenes', title: 'Making of X55' }
    ]
  };

  // In a real implementation, these would be state variables
  const activeCategory = 'All';
  const lightboxOpen = false;
  const currentLightboxIndex = 0;

  // Filter items based on active category
  const filteredItems = activeCategory === 'All' 
    ? gallery.items 
    : gallery.items.filter(item => item.category === activeCategory);

  return (
    <GalleryContainer>
      <PageHeader>
        <PageTitle>{gallery.title}</PageTitle>
        <PageDescription>{gallery.description}</PageDescription>
      </PageHeader>

      <FilterBar>
        {gallery.categories.map((category, index) => (
          <FilterButton 
            key={index} 
            $active={category === activeCategory}
          >
            {category}
          </FilterButton>
        ))}
      </FilterBar>

      <GalleryGrid>
        {filteredItems.map((item, index) => (
          <GalleryItem key={index}>
            <Placeholder height="100%" label={item.title} />
            <ItemOverlay className="overlay">
              <ItemIcon>
                <i className={`fas ${item.type === 'video' ? 'fa-play-circle' : 'fa-image'}`}></i>
              </ItemIcon>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemCategory>{item.category}</ItemCategory>
            </ItemOverlay>
          </GalleryItem>
        ))}
      </GalleryGrid>

      <LoadMoreButton>Load More</LoadMoreButton>

      {lightboxOpen && (
        <LightboxOverlay>
          <LightboxContent>
            <LightboxClose>
              <i className="fas fa-times"></i>
            </LightboxClose>
            <LightboxImage>
              <Placeholder 
                height="100%" 
                label={filteredItems[currentLightboxIndex].title} 
              />
            </LightboxImage>
            <LightboxNav $direction="prev">
              <i className="fas fa-chevron-left"></i>
            </LightboxNav>
            <LightboxNav $direction="next">
              <i className="fas fa-chevron-right"></i>
            </LightboxNav>
          </LightboxContent>
        </LightboxOverlay>
      )}
    </GalleryContainer>
  );
};

export default GalleryTemplate;
