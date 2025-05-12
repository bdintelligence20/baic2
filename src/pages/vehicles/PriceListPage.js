import React from 'react';
import styled from 'styled-components';
import Placeholder from '../../components/common/Placeholder';

const PriceListContainer = styled.div`
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

const PriceListSection = styled.div`
  margin-bottom: 5rem;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FilterLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #333;
  background-color: #fff;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #e60012;
  }
`;

const DownloadButton = styled.button`
  background-color: #e60012;
  color: white;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #c5000f;
  }
`;

const PriceTable = styled.div`
  margin-top: 2rem;
`;

const DisclaimerSection = styled.div`
  margin-top: 3rem;
  padding: 1.5rem;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

const DisclaimerTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const DisclaimerText = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const PriceListPage = () => {
  return (
    <PriceListContainer>
      <PageHeader>
        <PageTitle>Price List</PageTitle>
        <PageDescription>
          Explore our current pricing for all BAIC models and trim levels. 
          Prices include standard features and specifications. Contact your local dealer for personalized offers.
        </PageDescription>
      </PageHeader>

      <PriceListSection>
        <FilterBar>
          <FilterGroup>
            <FilterLabel>Model:</FilterLabel>
            <FilterSelect>
              <option value="all">All Models</option>
              <option value="x55">X55 Series</option>
              <option value="b40">B40 Series</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Year:</FilterLabel>
            <FilterSelect>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Region:</FilterLabel>
            <FilterSelect>
              <option value="national">National</option>
              <option value="east">Eastern Region</option>
              <option value="west">Western Region</option>
              <option value="north">Northern Region</option>
              <option value="south">Southern Region</option>
            </FilterSelect>
          </FilterGroup>
          
          <DownloadButton>
            <i className="fas fa-download"></i>
            Download PDF
          </DownloadButton>
        </FilterBar>

        <PriceTable>
          <Placeholder height="600px" label="Price List Table" />
        </PriceTable>
        
        <DisclaimerSection>
          <DisclaimerTitle>Important Information</DisclaimerTitle>
          <DisclaimerText>
            All prices shown are Manufacturer's Suggested Retail Prices (MSRP) and exclude taxes, title, license, options and destination charges.
          </DisclaimerText>
          <DisclaimerText>
            Actual dealer price may vary. Contact your local BAIC dealer for actual prices, further details, or to request a quote.
          </DisclaimerText>
          <DisclaimerText>
            Prices and specifications are subject to change without notice. Please confirm details with your local BAIC dealer.
          </DisclaimerText>
        </DisclaimerSection>
      </PriceListSection>
    </PriceListContainer>
  );
};

export default PriceListPage;
