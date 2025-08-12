import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 120px 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
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

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 1.5rem;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 700px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  
  @media (max-width: 768px) {
    height: 600px;
  }
  
  @media (max-width: 480px) {
    height: 500px;
    border-radius: 8px;
  }
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const FindDealerPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <Title>Find a Dealer</Title>
        <Subtitle>
          Locate your nearest BAIC dealership to explore our range of vehicles, 
          book a test drive, or get expert assistance from our dedicated team.
        </Subtitle>
      </PageHeader>
      
      <MapContainer>
        <MapIframe
          src="https://locatestore.com/7yTR_8"
          title="BAIC Dealer Locator"
          loading="lazy"
        />
      </MapContainer>
    </PageContainer>
  );
};

export default FindDealerPage;
