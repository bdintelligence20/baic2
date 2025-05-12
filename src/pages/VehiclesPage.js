import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Placeholder from '../components/common/Placeholder';

const VehiclesContainer = styled.div`
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

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  margin: 3rem 0 1.5rem;
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

const VehicleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const VehicleCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const VehicleImage = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
`;

const VehicleInfo = styled.div`
  padding: 1.5rem;
`;

const VehicleName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const VehicleDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const VehicleLink = styled(Link)`
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

const SectionContainer = styled.div`
  margin: 5rem 0;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SectionImage = styled.div`
  height: 250px;
`;

const SectionContent = styled.div`
  padding: 2rem;
  background-color: #fff;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
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

const SectionDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const VehiclesPage = () => {
  const vehicles = [
    {
      name: 'X55',
      description: 'The X55 combines bold design with exceptional performance, offering a perfect balance of style, comfort, and driving dynamics.',
      link: '/vehicles/models/x55'
    },
    {
      name: 'X55 Plus',
      description: 'The X55 Plus elevates the driving experience with enhanced luxury features and upgraded performance capabilities.',
      link: '/vehicles/models/x55-plus'
    },
    {
      name: 'X55 Dynamic',
      description: 'The X55 Dynamic delivers exhilarating performance with sport-tuned suspension, enhanced power, and distinctive styling elements.',
      link: '/vehicles/models/x55-dynamic'
    },
    {
      name: 'B40 PLUS',
      description: 'The B40 PLUS combines rugged capability with refined comfort, ready to tackle any terrain while providing a premium driving experience.',
      link: '/vehicles/models/b40-plus'
    }
  ];

  const sections = [
    {
      title: 'Vehicle Comparison',
      description: 'Compare BAIC models side by side to find the perfect vehicle for your needs. Select up to three models to see detailed specifications and features.',
      link: '/vehicles/comparison',
      linkText: 'Compare Vehicles'
    },
    {
      title: 'Price List',
      description: 'Explore our current pricing for all BAIC models and trim levels. Prices include standard features and specifications.',
      link: '/vehicles/price-list',
      linkText: 'View Price List'
    }
  ];

  return (
    <VehiclesContainer>
      <PageHeader>
        <PageTitle>Vehicles</PageTitle>
        <PageDescription>
          Discover BAIC's lineup of innovative, high-quality vehicles designed to exceed expectations. 
          From versatile SUVs to powerful performance models, find the perfect vehicle for your lifestyle.
        </PageDescription>
      </PageHeader>
      
      <CategoryTitle>SUVs</CategoryTitle>
      <VehicleGrid>
        {vehicles.map((vehicle, index) => (
          <VehicleCard key={index}>
            <VehicleImage>
              <Placeholder height="100%" label={vehicle.name} />
            </VehicleImage>
            <VehicleInfo>
              <VehicleName>{vehicle.name}</VehicleName>
              <VehicleDescription>{vehicle.description}</VehicleDescription>
              <VehicleLink to={vehicle.link}>Explore {vehicle.name}</VehicleLink>
            </VehicleInfo>
          </VehicleCard>
        ))}
      </VehicleGrid>
      
      {sections.map((section, index) => (
        <SectionContainer key={index}>
          <SectionImage>
            <Placeholder height="100%" label={section.title} />
          </SectionImage>
          <SectionContent>
            <SectionTitle>{section.title}</SectionTitle>
            <SectionDescription>{section.description}</SectionDescription>
            <VehicleLink to={section.link}>{section.linkText}</VehicleLink>
          </SectionContent>
        </SectionContainer>
      ))}
    </VehiclesContainer>
  );
};

export default VehiclesPage;
