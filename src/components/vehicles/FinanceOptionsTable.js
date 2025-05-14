import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for the finance options table
const TableContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  overflow-x: auto;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background-color: ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$active ? 'var(--primary-color-text)' : 'var(--text-color)'};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: ${props => props.$active ? '600' : '400'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-color-hover)' : 'var(--light-background-color)'};
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
  }
`;

const FilterControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const VariantSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const VariantButton = styled.button`
  padding: 0.8rem 1.2rem;
  background-color: ${props => props.$active ? '#333' : '#f5f5f5'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: ${props => props.$active ? '600' : '400'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? '#222' : '#e5e5e5'};
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 3rem;
`;

const TableHead = styled.thead`
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  
  th {
    position: sticky;
    top: 0;
    background-color: var(--primary-color);
    z-index: 10;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: white;
`;

const TableCell = styled.td`
  padding: 1rem;
  text-align: left;
  color: #333;
`;

const FinanceProviderTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: white;
  background-color: #000;
  padding: 1rem;
  text-align: center;
`;

// Main component
const FinanceOptionsTable = () => {
  // State for active tab, selected variants, and search query
  const [activeTab, setActiveTab] = useState('absa');
  const [selectedVariants, setSelectedVariants] = useState(['dynamic']);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Define the tabs and variants
  const tabs = [
    { id: 'absa', name: 'ABSA Finance' },
    { id: 'wesbank', name: 'Wesbank Finance' },
    { id: 'mfc', name: 'MFC Finance' }
  ];
  
  const variants = [
    { id: 'dynamic', name: 'X55 Plus Dynamic' },
    { id: 'elite', name: 'X55 Plus Elite' },
    { id: 'premium', name: 'X55 Plus Premium' },
    { id: 'premium-2t', name: 'X55 Plus Premium 2T' }
  ];
  
  // Function to toggle variant selection
  const toggleVariant = (variantId) => {
    if (selectedVariants.includes(variantId)) {
      // If already selected and not the last one, remove it
      if (selectedVariants.length > 1) {
        setSelectedVariants(selectedVariants.filter(id => id !== variantId));
      }
    } else {
      // Add to selection
      setSelectedVariants([...selectedVariants, variantId]);
    }
  };
  
  // ABSA Finance data
  const absaData = [
    {
      description: 'X55 Plus Dynamic',
      retailPrice: '429,900',
      deposit: '42,990',
      term: '72',
      extras: '-',
      balloonR: '171,960',
      balloonPercent: '40.00%',
      loanAmount: '388,118',
      monthlyRepayment: '4,499',
      interestRate: '5.65%',
      prime: '-5.35%',
      totalRepayment: '491,389'
    },
    {
      description: 'X55 Plus Dynamic',
      retailPrice: '429,900',
      deposit: '42,990',
      term: '72',
      extras: '-',
      balloonR: '171,960',
      balloonPercent: '40.00%',
      loanAmount: '388,118',
      monthlyRepayment: '5,199',
      interestRate: '8.25%',
      prime: '-2.75%',
      totalRepayment: '541,089'
    },
    {
      description: 'X55 Plus Dynamic',
      retailPrice: '429,900',
      deposit: '42,990',
      term: '72',
      extras: '-',
      balloonR: '171,960',
      balloonPercent: '40.00%',
      loanAmount: '388,118',
      monthlyRepayment: '5,599',
      interestRate: '9.70%',
      prime: '-1.30%',
      totalRepayment: '569,489'
    },
    {
      description: 'X55 Plus Dynamic',
      retailPrice: '429,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '171,960',
      balloonPercent: '40.00%',
      loanAmount: '431,108',
      monthlyRepayment: '5,799',
      interestRate: '7.50%',
      prime: '-3.50%',
      totalRepayment: '583,689'
    },
    {
      description: 'X55 Plus Dynamic',
      retailPrice: '429,900',
      deposit: '42,990',
      term: '72',
      extras: '-',
      balloonR: '171,960',
      balloonPercent: '40.00%',
      loanAmount: '388,118',
      monthlyRepayment: '5,899',
      interestRate: '11.05%',
      prime: '0.05%',
      totalRepayment: '590,789'
    },
    {
      description: 'X55 Plus Dynamic',
      retailPrice: '429,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '171,960',
      balloonPercent: '40.00%',
      loanAmount: '431,108',
      monthlyRepayment: '6,099',
      interestRate: '8.55%',
      prime: '-2.45%',
      totalRepayment: '604,989'
    },
    {
      description: 'X55 Plus Elite',
      retailPrice: '469,900',
      deposit: '46,990',
      term: '72',
      extras: '-',
      balloonR: '187,960',
      balloonPercent: '40.00%',
      loanAmount: '424,118',
      monthlyRepayment: '6,399',
      interestRate: '10.70%',
      prime: '-0.30%',
      totalRepayment: '642,289'
    },
    {
      description: 'X55 Plus Dynamic',
      retailPrice: '429,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '171,960',
      balloonPercent: '40.00%',
      loanAmount: '431,108',
      monthlyRepayment: '6,499',
      interestRate: '9.95%',
      prime: '-1.05%',
      totalRepayment: '633,389'
    },
    {
      description: 'X55 Plus Elite',
      retailPrice: '469,900',
      deposit: '46,990',
      term: '72',
      extras: '-',
      balloonR: '187,960',
      balloonPercent: '40.00%',
      loanAmount: '424,118',
      monthlyRepayment: '6,699',
      interestRate: '11.80%',
      prime: '0.80%',
      totalRepayment: '663,589'
    },
    {
      description: 'X55 Plus Premium',
      retailPrice: '509,900',
      deposit: '50,990',
      term: '72',
      extras: '-',
      balloonR: '203,960',
      balloonPercent: '40.00%',
      loanAmount: '460,118',
      monthlyRepayment: '6,899',
      interestRate: '10.70%',
      prime: '-0.30%',
      totalRepayment: '693,789'
    },
    {
      description: 'X55 Plus Dynamic',
      retailPrice: '429,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '171,960',
      balloonPercent: '40.00%',
      loanAmount: '431,108',
      monthlyRepayment: '6,899',
      interestRate: '11.35%',
      prime: '0.35%',
      totalRepayment: '661,789'
    },
    {
      description: 'X55 Plus Premium 2T',
      retailPrice: '514,900',
      deposit: '51,490',
      term: '72',
      extras: '-',
      balloonR: '205,960',
      balloonPercent: '40.00%',
      loanAmount: '464,618',
      monthlyRepayment: '6,999',
      interestRate: '10.70%',
      prime: '-0.30%',
      totalRepayment: '702,889'
    },
    {
      description: 'X55 Plus Elite',
      retailPrice: '469,900',
      deposit: '46,990',
      term: '72',
      extras: '-',
      balloonR: '187,960',
      balloonPercent: '40.00%',
      loanAmount: '424,118',
      monthlyRepayment: '7,099',
      interestRate: '13.30%',
      prime: '2.30%',
      totalRepayment: '691,989'
    },
    {
      description: 'X55 Plus Premium',
      retailPrice: '509,900',
      deposit: '50,990',
      term: '72',
      extras: '-',
      balloonR: '203,960',
      balloonPercent: '40.00%',
      loanAmount: '460,118',
      monthlyRepayment: '7,199',
      interestRate: '11.80%',
      prime: '0.80%',
      totalRepayment: '715,089'
    },
    {
      description: 'X55 Plus Elite',
      retailPrice: '469,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '187,960',
      balloonPercent: '40.00%',
      loanAmount: '471,108',
      monthlyRepayment: '7,299',
      interestRate: '10.70%',
      prime: '-0.30%',
      totalRepayment: '706,189'
    },
    {
      description: 'X55 Plus Premium 2T',
      retailPrice: '514,900',
      deposit: '51,490',
      term: '72',
      extras: '-',
      balloonR: '205,960',
      balloonPercent: '40.00%',
      loanAmount: '464,618',
      monthlyRepayment: '7,299',
      interestRate: '11.80%',
      prime: '0.80%',
      totalRepayment: '724,189'
    },
    {
      description: 'X55 Plus Elite',
      retailPrice: '469,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '187,960',
      balloonPercent: '40.00%',
      loanAmount: '471,108',
      monthlyRepayment: '7,599',
      interestRate: '11.80%',
      prime: '0.80%',
      totalRepayment: '727,489'
    },
    {
      description: 'X55 Plus Elite',
      retailPrice: '469,900',
      deposit: '46,990',
      term: '72',
      extras: '-',
      balloonR: '187,960',
      balloonPercent: '40.00%',
      loanAmount: '424,118',
      monthlyRepayment: '7,599',
      interestRate: '14.80%',
      prime: '3.80%',
      totalRepayment: '727,489'
    },
    {
      description: 'X55 Plus Premium',
      retailPrice: '509,900',
      deposit: '50,990',
      term: '72',
      extras: '-',
      balloonR: '203,960',
      balloonPercent: '40.00%',
      loanAmount: '460,118',
      monthlyRepayment: '7,699',
      interestRate: '13.30%',
      prime: '2.30%',
      totalRepayment: '750,589'
    },
    {
      description: 'X55 Plus Premium 2T',
      retailPrice: '514,900',
      deposit: '51,490',
      term: '72',
      extras: '-',
      balloonR: '205,960',
      balloonPercent: '40.00%',
      loanAmount: '464,618',
      monthlyRepayment: '7,799',
      interestRate: '13.30%',
      prime: '2.30%',
      totalRepayment: '759,689'
    },
    {
      description: 'X55 Plus Premium',
      retailPrice: '509,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '203,960',
      balloonPercent: '40.00%',
      loanAmount: '511,108',
      monthlyRepayment: '7,899',
      interestRate: '10.70%',
      prime: '-0.30%',
      totalRepayment: '764,789'
    },
    {
      description: 'X55 Plus Premium 2T',
      retailPrice: '514,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '205,960',
      balloonPercent: '40.00%',
      loanAmount: '516,108',
      monthlyRepayment: '7,999',
      interestRate: '10.70%',
      prime: '-0.30%',
      totalRepayment: '773,889'
    },
    {
      description: 'X55 Plus Elite',
      retailPrice: '469,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '187,960',
      balloonPercent: '40.00%',
      loanAmount: '471,108',
      monthlyRepayment: '8,099',
      interestRate: '13.35%',
      prime: '2.35%',
      totalRepayment: '762,989'
    },
    {
      description: 'X55 Plus Premium',
      retailPrice: '509,900',
      deposit: '50,990',
      term: '72',
      extras: '-',
      balloonR: '203,960',
      balloonPercent: '40.00%',
      loanAmount: '460,118',
      monthlyRepayment: '8,199',
      interestRate: '14.80%',
      prime: '3.80%',
      totalRepayment: '786,089'
    },
    {
      description: 'X55 Plus Premium',
      retailPrice: '509,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '203,960',
      balloonPercent: '40.00%',
      loanAmount: '511,108',
      monthlyRepayment: '8,299',
      interestRate: '11.80%',
      prime: '0.80%',
      totalRepayment: '793,189'
    },
    {
      description: 'X55 Plus Premium 2T',
      retailPrice: '514,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '205,960',
      balloonPercent: '40.00%',
      loanAmount: '516,108',
      monthlyRepayment: '8,299',
      interestRate: '11.80%',
      prime: '0.80%',
      totalRepayment: '795,189'
    },
    {
      description: 'X55 Plus Premium 2T',
      retailPrice: '514,900',
      deposit: '51,490',
      term: '72',
      extras: '-',
      balloonR: '205,960',
      balloonPercent: '40.00%',
      loanAmount: '464,618',
      monthlyRepayment: '8,299',
      interestRate: '14.80%',
      prime: '3.80%',
      totalRepayment: '795,189'
    },
    {
      description: 'X55 Plus Elite',
      retailPrice: '469,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '187,960',
      balloonPercent: '40.00%',
      loanAmount: '471,108',
      monthlyRepayment: '8,599',
      interestRate: '14.80%',
      prime: '3.80%',
      totalRepayment: '798,489'
    },
    {
      description: 'X55 Plus Premium',
      retailPrice: '509,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '203,960',
      balloonPercent: '40.00%',
      loanAmount: '511,108',
      monthlyRepayment: '8,799',
      interestRate: '13.35%',
      prime: '2.35%',
      totalRepayment: '828,689'
    },
    {
      description: 'X55 Plus Premium 2T',
      retailPrice: '514,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '205,960',
      balloonPercent: '40.00%',
      loanAmount: '516,108',
      monthlyRepayment: '8,899',
      interestRate: '13.35%',
      prime: '2.35%',
      totalRepayment: '837,789'
    },
    {
      description: 'X55 Plus Premium',
      retailPrice: '509,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '203,960',
      balloonPercent: '40.00%',
      loanAmount: '511,108',
      monthlyRepayment: '9,299',
      interestRate: '14.80%',
      prime: '3.80%',
      totalRepayment: '864,189'
    },
    {
      description: 'X55 Plus Premium 2T',
      retailPrice: '514,900',
      deposit: '-',
      term: '72',
      extras: '-',
      balloonR: '205,960',
      balloonPercent: '40.00%',
      loanAmount: '516,108',
      monthlyRepayment: '9,399',
      interestRate: '14.80%',
      prime: '3.80%',
      totalRepayment: '873,289'
    }
  ];
  
  // Wesbank Finance data
  const wesbankData = [
    {
      modelDetails: 'BAIC X55 Dynamic',
      interestRateType: 'Linked',
      months: '72',
      interestRate: '8.24%',
      ratePrime: '-3.01%',
      retailPrice: '429,900',
      depositPercent: '10.0%',
      deposit: '42,990',
      initiationFee: '1,208',
      principalDebt: '388,118',
      balloonPercent: '40%',
      balloonValue: '171,960',
      payment: '5,125',
      totalCost: '535,849'
    },
    {
      modelDetails: 'BAIC X55 Elite',
      interestRateType: 'Linked',
      months: '72',
      interestRate: '8.56%',
      ratePrime: '-2.69%',
      retailPrice: '464,900',
      depositPercent: '10.0%',
      deposit: '46,490',
      initiationFee: '1,208',
      principalDebt: '419,618',
      balloonPercent: '40%',
      balloonValue: '185,960',
      payment: '5,620',
      totalCost: '584,954'
    },
    {
      modelDetails: 'BAIC X55 Premium',
      interestRateType: 'Linked',
      months: '72',
      interestRate: '8.71%',
      ratePrime: '-2.54%',
      retailPrice: '499,900',
      depositPercent: '10.0%',
      deposit: '49,990',
      initiationFee: '1,208',
      principalDebt: '451,118',
      balloonPercent: '40%',
      balloonValue: '199,960',
      payment: '6,079',
      totalCost: '631,575'
    },
    {
      modelDetails: 'BAIC X55 Dynamic',
      interestRateType: 'Linked',
      months: '72',
      interestRate: '8.57%',
      ratePrime: '-2.68%',
      retailPrice: '429,900',
      depositPercent: '0.0%',
      deposit: '0',
      initiationFee: '1,208',
      principalDebt: '431,108',
      balloonPercent: '40%',
      balloonValue: '171,960',
      payment: '5,980',
      totalCost: '596,540'
    },
    {
      modelDetails: 'BAIC X55 Elite',
      interestRateType: 'Linked',
      months: '72',
      interestRate: '8.81%',
      ratePrime: '-2.44%',
      retailPrice: '464,900',
      depositPercent: '0.0%',
      deposit: '0',
      initiationFee: '1,208',
      principalDebt: '466,108',
      balloonPercent: '40%',
      balloonValue: '185,960',
      payment: '6,530',
      totalCost: '649,590'
    },
    {
      modelDetails: 'BAIC X55 Premium',
      interestRateType: 'Linked',
      months: '72',
      interestRate: '9.00%',
      ratePrime: '-2.25%',
      retailPrice: '499,900',
      depositPercent: '0.0%',
      deposit: '0',
      initiationFee: '1,208',
      principalDebt: '501,108',
      balloonPercent: '40%',
      balloonValue: '199,960',
      payment: '7,075',
      totalCost: '702,285'
    }
  ];
  
  // MFC Finance data
  const mfcData = [
    {
      scenario: '1',
      scheme: 'BAIC X55 Dynamic',
      cashPrice: 'R 429,900',
      extras: 'R 0',
      term: '72',
      depositPercent: '0%',
      depositRand: '0',
      balloonPercent: '40%',
      balloonRand: 'R 171,960',
      serviceFee: 'R 69.08',
      initiationFee: 'R 1,207.50',
      monthlyExcl: 'R 5,969.94',
      monthlyIncl: 'R 6,039.02',
      totalPaid: 'R 601,795.86',
      interestRate: '9.03%'
    },
    {
      scenario: '2',
      scheme: 'BAIC X55 Elite',
      cashPrice: 'R 464,900',
      extras: 'R 0',
      term: '72',
      depositPercent: '0%',
      depositRand: '0',
      balloonPercent: '40%',
      balloonRand: 'R 185,960',
      serviceFee: 'R 69.08',
      initiationFee: 'R 1,207.50',
      monthlyExcl: 'R 6,526.15',
      monthlyIncl: 'R 6,595.23',
      totalPaid: 'R 655,842.69',
      interestRate: '9.28%'
    },
    {
      scenario: '3',
      scheme: 'BAIC X55 Premium',
      cashPrice: 'R 499,900',
      extras: 'R 0',
      term: '72',
      depositPercent: '0%',
      depositRand: '0',
      balloonPercent: '40%',
      balloonRand: 'R 199,960',
      serviceFee: 'R 69.08',
      initiationFee: 'R 1,207.50',
      monthlyExcl: 'R 7,082.35',
      monthlyIncl: 'R 7,151.43',
      totalPaid: 'R 709,889.52',
      interestRate: '9.49%'
    },
    {
      scenario: '4',
      scheme: 'BAIC X55 Dynamic',
      cashPrice: 'R 429,900',
      extras: 'R 0',
      term: '72',
      depositPercent: '10%',
      depositRand: 'R 42,990',
      balloonPercent: '40%',
      balloonRand: 'R 171,960',
      serviceFee: 'R 69.08',
      initiationFee: 'R 1,207.50',
      monthlyExcl: 'R 5,123.88',
      monthlyIncl: 'R 5,192.96',
      totalPaid: 'R 626,859.38',
      interestRate: '8.75%'
    },
    {
      scenario: '5',
      scheme: 'BAIC X55 Elite',
      cashPrice: 'R 464,900',
      extras: 'R 0',
      term: '72',
      depositPercent: '10%',
      depositRand: 'R 46,490',
      balloonPercent: '40%',
      balloonRand: 'R 185,960',
      serviceFee: 'R 69.08',
      initiationFee: 'R 1,207.50',
      monthlyExcl: 'R 5,611.20',
      monthlyIncl: 'R 5,680.28',
      totalPaid: 'R 682,946.74',
      interestRate: '9.02%'
    },
    {
      scenario: '6',
      scheme: 'BAIC X55 Premium',
      cashPrice: 'R 499,900',
      extras: 'R 0',
      term: '72',
      depositPercent: '10%',
      depositRand: 'R 49,990',
      balloonPercent: '40%',
      balloonRand: 'R 199,960',
      serviceFee: 'R 69.08',
      initiationFee: 'R 1,207.50',
      monthlyExcl: 'R 6,098.53',
      monthlyIncl: 'R 6,167.61',
      totalPaid: 'R 739,034.10',
      interestRate: '9.25%'
    }
  ];
  
  // Filter data based on selected variants
  const filteredAbsaData = absaData.filter(item => {
    const modelName = item.description.toLowerCase();
    return selectedVariants.some(variant => {
      if (variant === 'dynamic' && modelName.includes('dynamic')) return true;
      if (variant === 'elite' && modelName.includes('elite')) return true;
      if (variant === 'premium-2t' && modelName.includes('premium 2t')) return true;
      if (variant === 'premium' && modelName.includes('premium') && !modelName.includes('2t')) return true;
      return false;
    });
  });
  
  const filteredWesbankData = wesbankData.filter(item => {
    const modelName = item.modelDetails.toLowerCase();
    return selectedVariants.some(variant => {
      if (variant === 'dynamic' && modelName.includes('dynamic')) return true;
      if (variant === 'elite' && modelName.includes('elite')) return true;
      if (variant === 'premium' && modelName.includes('premium')) return true;
      return false;
    });
  });
  
  const filteredMfcData = mfcData.filter(item => {
    const modelName = item.scheme.toLowerCase();
    return selectedVariants.some(variant => {
      if (variant === 'dynamic' && modelName.includes('dynamic')) return true;
      if (variant === 'elite' && modelName.includes('elite')) return true;
      if (variant === 'premium' && modelName.includes('premium')) return true;
      return false;
    });
  });
  
  // Filter data based on search query
  const searchFilteredAbsaData = searchQuery.trim() === '' 
    ? filteredAbsaData 
    : filteredAbsaData.filter(item => {
        const query = searchQuery.toLowerCase();
        return Object.values(item).some(value => 
          value.toString().toLowerCase().includes(query)
        );
      });
  
  const searchFilteredWesbankData = searchQuery.trim() === '' 
    ? filteredWesbankData 
    : filteredWesbankData.filter(item => {
        const query = searchQuery.toLowerCase();
        return Object.values(item).some(value => 
          value.toString().toLowerCase().includes(query)
        );
      });
  
  const searchFilteredMfcData = searchQuery.trim() === '' 
    ? filteredMfcData 
    : filteredMfcData.filter(item => {
        const query = searchQuery.toLowerCase();
        return Object.values(item).some(value => 
          value.toString().toLowerCase().includes(query)
        );
      });
  
  // Render ABSA Finance table
  const renderAbsaTable = () => (
    <>
      <FinanceProviderTitle>ABSA Finance</FinanceProviderTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Description</TableHeader>
            <TableHeader>Retail Price</TableHeader>
            <TableHeader>Deposit</TableHeader>
            <TableHeader>Term</TableHeader>
            <TableHeader>Balloon (R)</TableHeader>
            <TableHeader>Balloon (%)</TableHeader>
            <TableHeader>Loan Amount</TableHeader>
            <TableHeader>Monthly Repayment</TableHeader>
            <TableHeader>Interest Rate</TableHeader>
            <TableHeader>Prime + -</TableHeader>
            <TableHeader>Total Repayment</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchFilteredAbsaData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.description}</TableCell>
              <TableCell>R {item.retailPrice}</TableCell>
              <TableCell>{item.deposit === '-' ? '-' : `R ${item.deposit}`}</TableCell>
              <TableCell>{item.term} months</TableCell>
              <TableCell>R {item.balloonR}</TableCell>
              <TableCell>{item.balloonPercent}</TableCell>
              <TableCell>R {item.loanAmount}</TableCell>
              <TableCell>R {item.monthlyRepayment}</TableCell>
              <TableCell>{item.interestRate}</TableCell>
              <TableCell>{item.prime}</TableCell>
              <TableCell>R {item.totalRepayment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
  
  // Render Wesbank Finance table
  const renderWesbankTable = () => (
    <>
      <FinanceProviderTitle>Wesbank Finance</FinanceProviderTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Model Details</TableHeader>
            <TableHeader>Interest Rate Type</TableHeader>
            <TableHeader>Term</TableHeader>
            <TableHeader>Interest Rate</TableHeader>
            <TableHeader>Rate Prime + -</TableHeader>
            <TableHeader>Retail Price</TableHeader>
            <TableHeader>Deposit %</TableHeader>
            <TableHeader>Deposit</TableHeader>
            <TableHeader>Principal Debt</TableHeader>
            <TableHeader>Balloon %</TableHeader>
            <TableHeader>Balloon Value</TableHeader>
            <TableHeader>Payment</TableHeader>
            <TableHeader>Total Cost</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchFilteredWesbankData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.modelDetails}</TableCell>
              <TableCell>{item.interestRateType}</TableCell>
              <TableCell>{item.months} months</TableCell>
              <TableCell>{item.interestRate}</TableCell>
              <TableCell>{item.ratePrime}</TableCell>
              <TableCell>R {item.retailPrice}</TableCell>
              <TableCell>{item.depositPercent}</TableCell>
              <TableCell>R {item.deposit}</TableCell>
              <TableCell>R {item.principalDebt}</TableCell>
              <TableCell>{item.balloonPercent}</TableCell>
              <TableCell>R {item.balloonValue}</TableCell>
              <TableCell>R {item.payment}</TableCell>
              <TableCell>R {item.totalCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
  
  // Render MFC Finance table
  const renderMfcTable = () => (
    <>
      <FinanceProviderTitle>MFC Finance</FinanceProviderTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Scenario</TableHeader>
            <TableHeader>Model</TableHeader>
            <TableHeader>Cash Price</TableHeader>
            <TableHeader>Term</TableHeader>
            <TableHeader>Deposit %</TableHeader>
            <TableHeader>Deposit</TableHeader>
            <TableHeader>Balloon %</TableHeader>
            <TableHeader>Balloon</TableHeader>
            <TableHeader>Monthly Instalment</TableHeader>
            <TableHeader>Total Paid</TableHeader>
            <TableHeader>Interest Rate</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchFilteredMfcData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.scenario}</TableCell>
              <TableCell>{item.scheme}</TableCell>
              <TableCell>{item.cashPrice}</TableCell>
              <TableCell>{item.term} months</TableCell>
              <TableCell>{item.depositPercent}</TableCell>
              <TableCell>{item.depositRand}</TableCell>
              <TableCell>{item.balloonPercent}</TableCell>
              <TableCell>{item.balloonRand}</TableCell>
              <TableCell>{item.monthlyIncl}</TableCell>
              <TableCell>{item.totalPaid}</TableCell>
              <TableCell>{item.interestRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
  
  return (
    <TableContainer>
      <TabsContainer>
        {tabs.map(tab => (
          <Tab 
            key={tab.id} 
            $active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </Tab>
        ))}
      </TabsContainer>
      
      <FilterControls>
        <VariantSelector>
          {variants.map(variant => (
            <VariantButton 
              key={variant.id} 
              $active={selectedVariants.includes(variant.id)}
              onClick={() => toggleVariant(variant.id)}
            >
              {variant.name}
            </VariantButton>
          ))}
        </VariantSelector>
      </FilterControls>
      
      <SearchContainer>
        <SearchInput 
          type="text"
          placeholder="Search finance options..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      
      {activeTab === 'absa' && renderAbsaTable()}
      {activeTab === 'wesbank' && renderWesbankTable()}
      {activeTab === 'mfc' && renderMfcTable()}
    </TableContainer>
  );
};

export default FinanceOptionsTable;
