import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import './MegaMenu.css';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MegaMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: ${props => props.$isOpen ? 'block' : 'none'};
  animation: ${fadeIn} 0.3s ease forwards;
  z-index: 100;
  padding: 4rem 0;
  min-height: 400px;
`;

const MegaMenuContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  
  &.mega-menu-content {
    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }
`;

const MenuColumn = styled.div`
  flex: 1;
  padding: 0 1.5rem;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background-color: #eee;
  }
`;

const MenuTitle = styled.h3`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  color: #222;
  font-weight: 600;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: #e60012;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 0.8rem;
  
  &.menu-item {
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInUp 0.3s ease forwards;
  }
`;

const MenuLink = styled(Link)`
  color: #555;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
  
  &:hover {
    color: #e60012;
    transform: translateX(5px);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 50%;
    transform: translateY(-50%) scale(0);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #e60012;
    transition: transform 0.3s ease;
    opacity: 0;
  }
  
  &:hover::before {
    transform: translateY(-50%) scale(1);
    opacity: 1;
  }
`;

const FeaturedSection = styled.div`
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  &.featured-section {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
`;

const FeaturedTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

const FeaturedContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FeaturedImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const FeaturedInfo = styled.div`
  flex: 1;
`;

const FeaturedName = styled.h5`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 0.3rem;
  color: #222;
`;

const FeaturedDescription = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin: 0 0 0.5rem;
`;

const FeaturedLink = styled(Link)`
  font-size: 0.8rem;
  color: #e60012;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MegaMenu = ({ isOpen, activeMenu }) => {
  // Define menu content based on active menu
  const renderMenuContent = () => {
    switch (activeMenu) {
      case 'vehicles':
        return (
          <MegaMenuContent>
            <MenuColumn>
              <MenuTitle>SUV Models</MenuTitle>
              <MenuList>
                <MenuItem className="menu-item">
                  <MenuLink to="/vehicles/models/x55">X55</MenuLink>
                </MenuItem>
                <MenuItem className="menu-item">
                  <MenuLink to="/vehicles/models/x55-plus">X55 Plus</MenuLink>
                </MenuItem>
                <MenuItem className="menu-item">
                  <MenuLink to="/vehicles/models/x55-dynamic">X55 Dynamic</MenuLink>
                </MenuItem>
              </MenuList>
              
              <FeaturedSection className="featured-section">
                <FeaturedTitle>Featured Promotion</FeaturedTitle>
                <FeaturedContent>
                  <FeaturedImage src="/images/models/x55/14_20240708121758A006.png" alt="X55" />
                  <FeaturedInfo>
                    <FeaturedName>X55 Special Offer</FeaturedName>
                    <FeaturedDescription>
                      Experience urban elegance with our limited-time promotion.
                    </FeaturedDescription>
                    <FeaturedLink to="/vehicles/promotions/x55">View Offer</FeaturedLink>
                  </FeaturedInfo>
                </FeaturedContent>
              </FeaturedSection>
            </MenuColumn>
            
            <MenuColumn>
              <MenuTitle>Off-Road Models</MenuTitle>
              <MenuList>
                <MenuItem className="menu-item">
                  <MenuLink to="/vehicles/models/b40-plus">B40 Plus</MenuLink>
                </MenuItem>
              </MenuList>
              
              <FeaturedSection className="featured-section">
                <FeaturedTitle>Featured Promotion</FeaturedTitle>
                <FeaturedContent>
                  <FeaturedImage src="/images/models/b40-plus/BJ40 plus 黑_20221028105044A009.png" alt="B40 Plus" />
                  <FeaturedInfo>
                    <FeaturedName>B40 Plus Adventure Offer</FeaturedName>
                    <FeaturedDescription>
                      Conquer any terrain with our exclusive off-road champion.
                    </FeaturedDescription>
                    <FeaturedLink to="/vehicles/promotions/b40-plus">View Offer</FeaturedLink>
                  </FeaturedInfo>
                </FeaturedContent>
              </FeaturedSection>
            </MenuColumn>
            
            <MenuColumn>
              <MenuTitle>Shopping Tools</MenuTitle>
              <MenuList>
                <MenuItem className="menu-item">
                  <MenuLink to="/book-test-drive">Book a Test Drive</MenuLink>
                </MenuItem>
                <MenuItem className="menu-item">
                  <MenuLink to="/find-dealer">Find a Dealer</MenuLink>
                </MenuItem>
              </MenuList>
              
              <FeaturedSection className="featured-section">
                <FeaturedTitle>Company Overview</FeaturedTitle>
                <FeaturedContent>
                  <FeaturedImage src="/images/logos/download.png" alt="BAIC Logo" />
                  <FeaturedInfo>
                    <FeaturedName>About BAIC</FeaturedName>
                    <FeaturedDescription>
                      Learn about our company, history, and global presence.
                    </FeaturedDescription>
                    <FeaturedLink to="/about/company-overview">Learn More</FeaturedLink>
                  </FeaturedInfo>
                </FeaturedContent>
              </FeaturedSection>
            </MenuColumn>
          </MegaMenuContent>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <MegaMenuContainer $isOpen={isOpen}>
      {renderMenuContent()}
    </MegaMenuContainer>
  );
};

export default MegaMenu;
