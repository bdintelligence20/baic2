import React from 'react';
import styled from 'styled-components';
import HeroSection from '../components/sections/HeroSection';
import ExploreModelsSection from '../components/sections/ExploreModelsSection';
import HeritageSection from '../components/sections/HeritageSection';
import PromotionsSection from '../components/sections/PromotionsSection';
import VideoSection from '../components/sections/VideoSection';
import X55PlusFinanceSection from '../components/vehicles/X55PlusFinanceSection';
import TypeformEmbed from '../components/common/TypeformEmbed';

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
      <TypeformEmbed 
        title="Ready to Experience BAIC?"
        subtitle="Book your test drive today and discover why BAIC vehicles are the perfect choice for your journey."
      />
    </HomeContainer>
  );
};

export default HomePage;
