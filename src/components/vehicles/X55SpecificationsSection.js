import React from 'react';
import styled from 'styled-components';
import X55SpecificationsTable from './X55SpecificationsTable';

const SectionContainer = styled.section`
  padding: 8rem 0;
  background-color: #fff;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  color: #333;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: #e60012;
    margin: 1rem auto 0;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
  color: #666;
`;

const X55SpecificationsSection = () => {
  return (
    <SectionContainer>
      <SectionTitle>Technical Specifications</SectionTitle>
      <SectionDescription>
        Compare specifications across different X55 variants to find the perfect match for your needs.
        Use the filters below to customize your view.
      </SectionDescription>
      <X55SpecificationsTable />
    </SectionContainer>
  );
};

export default X55SpecificationsSection;
