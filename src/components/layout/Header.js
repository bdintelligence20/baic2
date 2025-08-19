import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import { useModal } from '../../context/ModalContext';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  color: #333;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  @media (max-width: 992px) {
    padding: 0.8rem 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 30px;
  width: auto;
  
  @media (max-width: 768px) {
    height: 25px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  position: relative;
  justify-content: center;
  flex: 1;
  
  @media (max-width: 992px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile */
  }
`;

const NavItem = styled.div`
  position: relative;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 0.5rem 0;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &.has-dropdown {
    padding-right: 1.2rem;
    
    &::before {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid var(--text-color); /* Use text-color */
      transition: transform 0.3s ease;
    }
    
    &:hover::before, &.active::before {
      border-top-color: var(--primary-color-light-text); /* Use light text for active/hover */
      transform: translateY(-50%) rotate(180deg);
    }
  }
  
  &:hover, &.active {
    color: var(--primary-color-light-text); /* Use light text for active/hover */
    
    &:after {
      width: 100%;
    }
  }
  
  @media (max-width: 992px) {
    font-size: 0.9rem;
  }
`;

const TestDriveButton = styled.button`
  background-color: transparent;
  color: var(--primary-color-light-text);
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: 2px solid var(--primary-color-light-text);
  
  &:hover {
    background-color: var(--primary-color);
    color: var(--primary-color-text);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 992px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.8rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.75rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  
  @media (max-width: 992px) {
    right: 1rem;
    gap: 1rem;
  }
`;

const SocialIcon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(100, 100, 100, 0.8);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 992px) {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
`;

// Mobile menu components
const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 101;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const HamburgerIcon = styled.div`
  width: 24px;
  height: 20px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  
  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: #333;
    border-radius: 3px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    
    &:nth-child(1) {
      top: 0px;
      transform-origin: left center;
    }
    
    &:nth-child(2) {
      top: 8px;
      transform-origin: left center;
    }
    
    &:nth-child(3) {
      top: 16px;
      transform-origin: left center;
    }
  }
  
  &.open {
    span:nth-child(1) {
      transform: rotate(45deg);
      top: -3px;
      left: 4px;
    }
    
    span:nth-child(2) {
      width: 0%;
      opacity: 0;
    }
    
    span:nth-child(3) {
      transform: rotate(-45deg);
      top: 19px;
      left: 4px;
    }
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.$isOpen ? '0' : '-300px'};
  width: 280px;
  height: 100vh;
  background-color: white;
  z-index: 100;
  padding: 5rem 2rem 2rem;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  overflow-y: auto;
`;

const MobileNavItem = styled.div`
  margin-bottom: 1.5rem;
`;

const MobileNavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  display: block;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  
  &:hover, &.active {
    color: var(--primary-color-light-text);
  }
`;

const MobileNavButton = styled.button`
  color: #333;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  background: none;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  text-align: left;
  
  &:hover, &.active {
    color: var(--primary-color-light-text);
  }
  
  span.arrow {
    transition: transform 0.3s ease;
    font-size: 1rem;
    
    &.open {
      transform: rotate(180deg);
    }
  }
`;

const MobileSubMenu = styled.div`
  padding-left: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;

const MobileSubNavItem = styled.div`
  margin-bottom: 0.8rem;
`;

const MobileSubNavLink = styled(Link)`
  color: #555;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 400;
  display: block;
  padding: 0.3rem 0;
  
  &:hover {
    color: var(--primary-color-light-text);
  }
`;

const MobileSubNavExternalLink = styled.a`
  color: #555;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 400;
  display: block;
  padding: 0.3rem 0;
  
  &:hover {
    color: var(--primary-color-light-text);
  }
`;

const MobileSocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const MobileSocialIcon = styled(SocialIcon)`
  width: 35px;
  height: 35px;
`;

const MobileTestDriveButton = styled(TestDriveButton)`
  display: block;
  text-align: center;
  margin-top: 2rem;
  width: 100%;
`;

// Simple dropdown component for Company Overview
const SimpleDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-width: 180px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: 100;
  padding: 0.5rem 0;
`;

const SimpleDropdownLink = styled.a`
  display: block;
  padding: 0.7rem 1.5rem;
  color: #555;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f8f8f8;
    color: var(--primary-color-light-text);
  }
`;

const Header = () => {
  const { openTypeformModal } = useModal();
  const [activeMenu, setActiveMenu] = useState(null);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState({
    company: false,
    vehicles: false
  });
  
  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleMouseEnter = (menu) => {
    setActiveMenu(menu);
    setMegaMenuOpen(true);
  };
  
  const handleMouseLeave = () => {
    // Add a small delay before closing the menu to prevent accidental closures
    setTimeout(() => {
      setMegaMenuOpen(false);
    }, 300);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent body scrolling when mobile menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };
  
  const toggleMobileSubMenu = (menu) => {
    setExpandedMobileMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  return (
    <HeaderContainer onMouseLeave={handleMouseLeave} style={{ 
      backgroundColor: '#ffffff',
      boxShadow: scrolled ? '0 2px 15px rgba(0, 0, 0, 0.15)' : '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <LogoContainer>
        <Link to="/">
          <LogoImage src="/images/logos/download.png" alt="BAIC Logo" />
        </Link>
      </LogoContainer>
      
      <Nav>
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem>
        
        <NavItem 
          onMouseEnter={() => setCompanyDropdownOpen(true)}
          onMouseLeave={() => setCompanyDropdownOpen(false)}
        >
          <NavLink 
            to="/about/company-overview" 
            className={`has-dropdown ${companyDropdownOpen ? 'active' : ''}`}
          >
            Company Overview
          </NavLink>
          <SimpleDropdown $isOpen={companyDropdownOpen}>
            <SimpleDropdownLink 
              href="https://www.baicglobal.com/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              BAIC Global
            </SimpleDropdownLink>
          </SimpleDropdown>
        </NavItem>
        
        <NavItem onMouseEnter={() => handleMouseEnter('vehicles')}>
          <NavLink 
            to="/vehicles" 
            className={`has-dropdown ${activeMenu === 'vehicles' && megaMenuOpen ? 'active' : ''}`}
          >
            Vehicles
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/find-dealer">Find a Dealer</NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/finance">Finance</NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/owners">Owners</NavLink>
        </NavItem>
        
        <MegaMenu isOpen={megaMenuOpen} activeMenu={activeMenu} />
      </Nav>
      
      <TestDriveButton onClick={openTypeformModal}>BOOK A TEST DRIVE</TestDriveButton>
      
      <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
        <HamburgerIcon className={mobileMenuOpen ? 'open' : ''}>
          <span></span>
          <span></span>
          <span></span>
        </HamburgerIcon>
      </MobileMenuButton>
      
      <MobileMenuOverlay $isOpen={mobileMenuOpen} onClick={closeMobileMenu} />
      
      <MobileMenu $isOpen={mobileMenuOpen}>
        <MobileNavItem>
          <MobileNavLink to="/" onClick={closeMobileMenu}>Home</MobileNavLink>
        </MobileNavItem>
        
        <MobileNavItem>
          <MobileNavButton 
            onClick={() => toggleMobileSubMenu('company')}
            className={expandedMobileMenus.company ? 'active' : ''}
          >
            Company Overview
            <span className={`arrow ${expandedMobileMenus.company ? 'open' : ''}`}>▼</span>
          </MobileNavButton>
          
          <MobileSubMenu $isOpen={expandedMobileMenus.company}>
            <MobileSubNavItem>
              <MobileSubNavLink to="/about/company-overview" onClick={closeMobileMenu}>Company Overview</MobileSubNavLink>
            </MobileSubNavItem>
            <MobileSubNavItem>
              <MobileSubNavExternalLink 
                href="https://www.baicglobal.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                BAIC Global
              </MobileSubNavExternalLink>
            </MobileSubNavItem>
          </MobileSubMenu>
        </MobileNavItem>
        
        <MobileNavItem>
          <MobileNavButton 
            onClick={() => toggleMobileSubMenu('vehicles')}
            className={expandedMobileMenus.vehicles ? 'active' : ''}
          >
            Vehicles
            <span className={`arrow ${expandedMobileMenus.vehicles ? 'open' : ''}`}>▼</span>
          </MobileNavButton>
          
          <MobileSubMenu $isOpen={expandedMobileMenus.vehicles}>
            <MobileSubNavItem>
              <span style={{ color: '#555', fontSize: '1.1rem', padding: '0.3rem 0', display: 'block' }}>B30 (Coming Soon)</span>
            </MobileSubNavItem>
            <MobileSubNavItem>
              <MobileSubNavLink to="/vehicles/models/x55-plus" onClick={closeMobileMenu}>X55 PLUS</MobileSubNavLink>
            </MobileSubNavItem>
            <MobileSubNavItem>
              <MobileSubNavLink to="/vehicles/models/b40-honor-edition" onClick={closeMobileMenu}>B40 HONOR EDITION</MobileSubNavLink>
            </MobileSubNavItem>
          </MobileSubMenu>
        </MobileNavItem>
        
        <MobileNavItem>
          <MobileNavLink to="/find-dealer" onClick={closeMobileMenu}>Find a Dealer</MobileNavLink>
        </MobileNavItem>
        
        <MobileNavItem>
          <MobileNavLink to="/finance" onClick={closeMobileMenu}>Finance</MobileNavLink>
        </MobileNavItem>
        
        <MobileNavItem>
          <MobileNavLink to="/owners" onClick={closeMobileMenu}>Owners</MobileNavLink>
        </MobileNavItem>
        
        <MobileTestDriveButton onClick={() => { closeMobileMenu(); openTypeformModal(); }}>BOOK A TEST DRIVE</MobileTestDriveButton>
        
        <MobileSocialIcons>
          <MobileSocialIcon href="https://www.instagram.com/baic.southafrica/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </MobileSocialIcon>
          <MobileSocialIcon href="https://www.youtube.com/channel/UChPAuLblJuCt6k6rjua5lqg" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </MobileSocialIcon>
          <MobileSocialIcon href="https://x.com/baic_sa" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <i className="fab fa-twitter"></i>
          </MobileSocialIcon>
          <MobileSocialIcon href="https://www.facebook.com/BAICSouthAfrica1" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </MobileSocialIcon>
          <MobileSocialIcon href="https://www.linkedin.com/company/99310100/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </MobileSocialIcon>
          <MobileSocialIcon href="https://www.tiktok.com/@baic_sa" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <i className="fab fa-tiktok"></i>
          </MobileSocialIcon>
        </MobileSocialIcons>
      </MobileMenu>
      
      <SocialIcons>
        <SocialIcon href="https://www.instagram.com/baic.southafrica/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </SocialIcon>
        <SocialIcon href="https://www.youtube.com/channel/UChPAuLblJuCt6k6rjua5lqg" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <i className="fab fa-youtube"></i>
        </SocialIcon>
        <SocialIcon href="https://x.com/baic_sa" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
          <i className="fab fa-twitter"></i>
        </SocialIcon>
        <SocialIcon href="https://www.facebook.com/BAICSouthAfrica1" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </SocialIcon>
        <SocialIcon href="https://www.linkedin.com/company/99310100/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in"></i>
        </SocialIcon>
        <SocialIcon href="https://www.tiktok.com/@baic_sa" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <i className="fab fa-tiktok"></i>
        </SocialIcon>
      </SocialIcons>
    </HeaderContainer>
  );
};

export default Header;
