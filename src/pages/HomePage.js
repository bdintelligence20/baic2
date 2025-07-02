import React from 'react';
import styled from 'styled-components';
import HeroSection from '../components/sections/HeroSection';
import ExploreModelsSection from '../components/sections/ExploreModelsSection';
import HeritageSection from '../components/sections/HeritageSection';
import PromotionsSection from '../components/sections/PromotionsSection';
import VideoSection from '../components/sections/VideoSection';
import X55PlusFinanceSection from '../components/vehicles/X55PlusFinanceSection';

const HomeContainer = styled.div`
  width: 100%;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <HeroSection />
      <PromotionsSection />
      <ExploreModelsSection />
      <X55PlusFinanceSection />
      <VideoSection />
      <HeritageSection />
    </HomeContainer>
  );
};

export default HomePage;
