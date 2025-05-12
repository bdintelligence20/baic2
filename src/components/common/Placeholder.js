import React from 'react';
import styled from 'styled-components';

const PlaceholderContainer = styled.div`
  width: 100%;
  height: ${props => props.$height || '100%'};
  background-color: ${props => props.$bgColor || '#f5f5f5'};
  color: ${props => props.$textColor || '#333'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  border: 1px dashed #ccc;
`;

const PlaceholderTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const PlaceholderText = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Placeholder = ({ label, height, bgColor, textColor }) => {
  return (
    <PlaceholderContainer $height={height} $bgColor={bgColor} $textColor={textColor}>
      <PlaceholderTitle>{label || 'Placeholder Content'}</PlaceholderTitle>
      <PlaceholderText>This section will be implemented in the future</PlaceholderText>
    </PlaceholderContainer>
  );
};

export default Placeholder;
