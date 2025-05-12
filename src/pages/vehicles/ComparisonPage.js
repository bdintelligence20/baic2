import React from 'react';
import styled from 'styled-components';
import Placeholder from '../../components/common/Placeholder';

const ComparisonContainer = styled.div`
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

const ComparisonSection = styled.div`
  margin-bottom: 5rem;
`;

const ModelSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const ModelCard = styled.div`
  width: 220px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: ${props => props.$selected ? '2px solid #e60012' : '2px solid transparent'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ModelImage = styled.div`
  width: 100%;
  height: 150px;
`;

const ModelInfo = styled.div`
  padding: 1rem;
  text-align: center;
`;

const ModelName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ModelPrice = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const ComparisonTable = styled.div`
  margin-top: 3rem;
`;

const ComparisonToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CategorySelector = styled.div`
  display: flex;
  gap: 1rem;
`;

const CategoryButton = styled.button`
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

const ResetButton = styled.button`
  background-color: transparent;
  color: #666;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #e60012;
  }
`;

const ComparisonPage = () => {
  // In a real implementation, these would be state variables
  const selectedModels = ['X55', 'X55 Plus'];
  const activeCategory = 'Performance';
  
  const models = [
    { name: 'X55', price: 'Starting at $35,000' },
    { name: 'X55 Plus', price: 'Starting at $42,000' },
    { name: 'X55 Dynamic', price: 'Starting at $48,000' },
    { name: 'B40 PLUS', price: 'Starting at $38,000' }
  ];
  
  const categories = ['Performance', 'Features', 'Technology', 'Safety', 'Dimensions'];

  return (
    <ComparisonContainer>
      <PageHeader>
        <PageTitle>Vehicle Comparison</PageTitle>
        <PageDescription>
          Compare BAIC models side by side to find the perfect vehicle for your needs. 
          Select up to three models to see detailed specifications and features.
        </PageDescription>
      </PageHeader>

      <ComparisonSection>
        <ModelSelector>
          {models.map((model, index) => (
            <ModelCard 
              key={index} 
              $selected={selectedModels.includes(model.name)}
            >
              <ModelImage>
                <Placeholder height="100%" label={model.name} />
              </ModelImage>
              <ModelInfo>
                <ModelName>{model.name}</ModelName>
                <ModelPrice>{model.price}</ModelPrice>
              </ModelInfo>
            </ModelCard>
          ))}
        </ModelSelector>

        <ComparisonToolbar>
          <CategorySelector>
            {categories.map((category, index) => (
              <CategoryButton 
                key={index} 
                $active={category === activeCategory}
              >
                {category}
              </CategoryButton>
            ))}
          </CategorySelector>
          
          <ResetButton>
            <i className="fas fa-redo-alt"></i>
            Reset Comparison
          </ResetButton>
        </ComparisonToolbar>

        <ComparisonTable>
          <Placeholder height="600px" label="Comparison Table" />
        </ComparisonTable>
      </ComparisonSection>
    </ComparisonContainer>
  );
};

export default ComparisonPage;
