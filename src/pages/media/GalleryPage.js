import React from 'react';
import styled from 'styled-components';
import Placeholder from '../../components/common/Placeholder';

const GalleryContainer = styled.div`
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
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
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

const LightboxCaption = styled.div`
  color: white;
  text-align: center;
  padding: 1rem 0;
  font-size: 1.2rem;
`;

const GalleryPage = () => {
  // In a real implementation, these would be state variables
  const activeCategory = 'All';
  const lightboxOpen = false;
  const currentLightboxIndex = 0;
  
  const categories = ['All', 'Vehicles', 'Events', 'Corporate', 'Behind the Scenes'];
  
  const galleryItems = [
    { 
      type: 'image', 
      category: 'Vehicles', 
      title: 'X55 Front View',
      description: 'The sleek front design of the BAIC X55 showcases its bold character and attention to detail.'
    },
    { 
      type: 'image', 
      category: 'Vehicles', 
      title: 'X55 Plus Interior',
      description: 'The premium interior of the X55 Plus combines luxury materials with advanced technology.'
    },
    { 
      type: 'image', 
      category: 'Events', 
      title: 'Auto Show 2025',
      description: 'BAIC\'s impressive booth at the International Auto Show 2025.'
    },
    { 
      type: 'image', 
      category: 'Corporate', 
      title: 'Global Headquarters',
      description: 'BAIC\'s modern global headquarters building, designed with sustainability in mind.'
    },
    { 
      type: 'image', 
      category: 'Behind the Scenes', 
      title: 'Design Studio',
      description: 'A glimpse into BAIC\'s design studio where our vehicles take shape.'
    },
    { 
      type: 'image', 
      category: 'Vehicles', 
      title: 'B40 PLUS Off-Road',
      description: 'The BAIC B40 PLUS demonstrating its exceptional off-road capabilities.'
    },
    { 
      type: 'image', 
      category: 'Events', 
      title: 'Product Launch',
      description: 'The exciting reveal of the new BAIC X55 Dynamic at our product launch event.'
    },
    { 
      type: 'image', 
      category: 'Corporate', 
      title: 'Manufacturing Facility',
      description: 'Inside BAIC\'s state-of-the-art manufacturing facility.'
    },
    { 
      type: 'image', 
      category: 'Behind the Scenes', 
      title: 'Quality Testing',
      description: 'Rigorous quality testing ensures every BAIC vehicle meets our high standards.'
    },
    { 
      type: 'image', 
      category: 'Vehicles', 
      title: 'X55 Dynamic Side Profile',
      description: 'The dynamic side profile of the X55 Dynamic highlights its sporty character.'
    },
    { 
      type: 'image', 
      category: 'Events', 
      title: 'Sustainability Summit',
      description: 'BAIC presenting at the Global Automotive Sustainability Summit.'
    },
    { 
      type: 'image', 
      category: 'Behind the Scenes', 
      title: 'Engineering Team',
      description: 'BAIC\'s dedicated engineering team working on next-generation vehicle technologies.'
    }
  ];

  // Filter items based on active category
  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <GalleryContainer>
      <PageHeader>
        <PageTitle>Image Gallery</PageTitle>
        <PageDescription>
          Explore our collection of high-quality images showcasing BAIC vehicles, events, and corporate activities. 
          Browse through our gallery to see our latest models, behind-the-scenes moments, and more.
        </PageDescription>
      </PageHeader>

      <FilterBar>
        {categories.map((category, index) => (
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
                <i className="fas fa-image"></i>
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
            <LightboxCaption>
              {filteredItems[currentLightboxIndex].description}
            </LightboxCaption>
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

export default GalleryPage;
