import React from 'react';
import styled from 'styled-components';
import FinanceOptionsTable from './FinanceOptionsTable';

const SectionContainer = styled.section`
  padding: 8rem 0;
  background-color: #f8f8f8;
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
    background-color: var(--primary-color);
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

const FinanceOptionsSection = () => {
  return (
    <SectionContainer>
      <SectionTitle>Finance Options</SectionTitle>
      <SectionDescription>
        Explore various finance options from our trusted partners. 
        Compare monthly payments, interest rates, and terms to find the best financing solution for your new BAIC vehicle.
        Use the filters below to customize your view.
      </SectionDescription>
      <FinanceOptionsTable />
    </SectionContainer>
  );
};

export default FinanceOptionsSection;
