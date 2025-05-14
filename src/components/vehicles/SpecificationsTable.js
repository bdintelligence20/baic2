import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components for the specifications table
const TableContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
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
  background-color: #f5f5f5;
  
  th {
    position: sticky;
    top: 0;
    background-color: #f5f5f5;
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
  color: #333;
`;

const TableCell = styled.td`
  padding: 1rem;
  text-align: left;
  color: #333;
  
  &.feature-present {
    color: #28a745;
    font-weight: 600;
  }
  
  &.feature-absent {
    color: #dc3545;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: #333;
`;

const CheckIcon = styled.span`
  color: #28a745;
  font-size: 1.2rem;
`;

const NoIcon = styled.span`
  color: #dc3545;
  font-size: 1.2rem;
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

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;
`;

const ToggleInput = styled.input`
  cursor: pointer;
`;

// Main component
const SpecificationsTable = () => {
  // State for active tab, selected variants, search query, and toggle options
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVariants, setSelectedVariants] = useState(['city-hunter-petrol-8at']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  
  // Define the categories and variants
  const categories = [
    { id: 'all', name: 'All Specifications' },
    { id: 'engine', name: 'Engine & Drivetrain' },
    { id: 'wheels', name: 'Wheels & Tyres' },
    { id: 'body', name: 'Body & Styling' },
    { id: 'interior', name: 'Interior & Comfort' },
    { id: 'safety', name: 'Safety & Security' },
    { id: 'dimensions', name: 'Dimensions & Capacities' },
    { id: 'service', name: 'Service & Warranty' }
  ];
  
  const variants = [
    { id: 'diesel', name: 'Diesel' },
    { id: 'petrol', name: 'Petrol' },
    { id: 'city-hunter-diesel', name: 'City Hunter Diesel' },
    { id: 'city-hunter-petrol', name: 'City Hunter Petrol' },
    { id: 'city-hunter-petrol-8at', name: 'City Hunter Petrol 8AT' },
    { id: 'champion-petrol', name: 'Champion Petrol' },
    { id: 'champion-petrol-8at', name: 'Champion Petrol 8AT' }
  ];
  
  // Specifications data extracted from the PDF
  const specificationsData = {
    engine: [
      {
        name: 'Maximum power',
        diesel: '110 kW @ 4000 r/min',
        petrol: '160 kW @ 5500 r/min',
        'city-hunter-diesel': '110 kW @ 4000 r/min',
        'city-hunter-petrol': '160 kW @ 5500 r/min',
        'city-hunter-petrol-8at': '165 kW @ 5500 r/min',
        'champion-petrol': '160 kW @ 5500 r/min',
        'champion-petrol-8at': '165 kW @ 5500 r/min'
      },
      {
        name: 'Maximum torque',
        diesel: '350 Nm @ 1800-2800 r/min',
        petrol: '320 Nm @ 1750-4500 r/min',
        'city-hunter-diesel': '350 Nm @ 1800-2800 r/min',
        'city-hunter-petrol': '320 Nm @ 1750-4500 r/min',
        'city-hunter-petrol-8at': '380 Nm @ 1750-4500 r/min',
        'champion-petrol': '320 Nm @ 1750-4500 r/min',
        'champion-petrol-8at': '380 Nm @ 1750-4500 r/min'
      },
      {
        name: 'Emission controls',
        diesel: 'Euro IV',
        petrol: 'Euro IV',
        'city-hunter-diesel': 'Euro IV',
        'city-hunter-petrol': 'Euro IV',
        'city-hunter-petrol-8at': 'Euro IV',
        'champion-petrol': 'Euro IV',
        'champion-petrol-8at': 'Euro IV'
      },
      {
        name: 'Transmission',
        diesel: '6MT',
        petrol: '6AT',
        'city-hunter-diesel': '6MT',
        'city-hunter-petrol': '6AT',
        'city-hunter-petrol-8at': '8AT',
        'champion-petrol': '6AT',
        'champion-petrol-8at': '8AT'
      },
      {
        name: 'Powertrain management system',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Rear differential lock',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Front suspension',
        diesel: 'Double wishbone/coil spring front independent suspension',
        petrol: 'Double wishbone/coil spring front independent suspension',
        'city-hunter-diesel': 'Double wishbone/coil spring front independent suspension',
        'city-hunter-petrol': 'Double wishbone/coil spring front independent suspension',
        'city-hunter-petrol-8at': 'Double wishbone/helical spring front independent suspension',
        'champion-petrol': 'Double wishbone/coil spring front independent suspension',
        'champion-petrol-8at': 'Double wishbone/helical spring front independent suspension'
      },
      {
        name: 'Rear suspension',
        diesel: 'Five-link/coil spring non-independent suspension',
        petrol: 'Five-link/coil spring non-independent suspension',
        'city-hunter-diesel': 'Five-link/coil spring non-independent suspension',
        'city-hunter-petrol': 'Five-link/coil spring non-independent suspension',
        'city-hunter-petrol-8at': 'Five-link/helical spring non-independent suspension',
        'champion-petrol': 'Five-link/coil spring non-independent suspension',
        'champion-petrol-8at': 'Five-link/helical spring non-independent suspension'
      },
      {
        name: 'Drivetrain',
        diesel: '4WD',
        petrol: '4WD',
        'city-hunter-diesel': '4WD',
        'city-hunter-petrol': '4WD',
        'city-hunter-petrol-8at': '4WD',
        'champion-petrol': '4WD',
        'champion-petrol-8at': '4WD'
      }
    ],
    wheels: [
      {
        name: 'Wheel',
        diesel: '265/65 R17',
        petrol: '265/65 R17',
        'city-hunter-diesel': '265/65 R17',
        'city-hunter-petrol': '265/65 R17',
        'city-hunter-petrol-8at': '245/70 R17',
        'champion-petrol': '265/65 R17',
        'champion-petrol-8at': '245/70 R17'
      },
      {
        name: '17" alloy wheels',
        diesel: 'Single Colour',
        petrol: 'Single Colour',
        'city-hunter-diesel': 'Dual tone',
        'city-hunter-petrol': 'Dual tone',
        'city-hunter-petrol-8at': 'Dual tone',
        'champion-petrol': 'Dual tone',
        'champion-petrol-8at': 'Dual tone'
      },
      {
        name: 'Spare tyre',
        diesel: 'Full size',
        petrol: 'Full size',
        'city-hunter-diesel': 'Full size',
        'city-hunter-petrol': 'Full size',
        'city-hunter-petrol-8at': 'Full size',
        'champion-petrol': 'Full size',
        'champion-petrol-8at': 'Full size'
      }
    ],
    body: [
      {
        name: 'Front grille',
        diesel: 'Silver',
        petrol: 'Silver',
        'city-hunter-diesel': 'Silver',
        'city-hunter-petrol': 'Silver',
        'city-hunter-petrol-8at': 'Silver',
        'champion-petrol': 'Silver',
        'champion-petrol-8at': 'Silver'
      },
      {
        name: 'Side step',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Removable hard top',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Red tow hooks - front and back',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Door outside handle',
        diesel: 'Black',
        petrol: 'Black',
        'city-hunter-diesel': 'Black',
        'city-hunter-petrol': 'Black',
        'city-hunter-petrol-8at': 'Black',
        'champion-petrol': 'Black',
        'champion-petrol-8at': 'Black'
      },
      {
        name: 'Rear door outside handle',
        diesel: 'Black',
        petrol: 'Black',
        'city-hunter-diesel': 'Black',
        'city-hunter-petrol': 'Black',
        'city-hunter-petrol-8at': 'Black',
        'champion-petrol': 'Black',
        'champion-petrol-8at': 'Black'
      },
      {
        name: 'Halogen headlights',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Height adjustable headlights - electric',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Front & rear fog lights',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'LED Daytime running lights',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Follow me home lights',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'LED high mount brake light',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Outside rear view mirror - electric heated',
        diesel: 'Chrome',
        petrol: 'Chrome',
        'city-hunter-diesel': 'Chrome',
        'city-hunter-petrol': 'Chrome',
        'city-hunter-petrol-8at': 'Chrome',
        'champion-petrol': 'Chrome',
        'champion-petrol-8at': 'Chrome'
      }
    ],
    interior: [
      {
        name: 'Cruise control',
        diesel: false,
        petrol: true,
        'city-hunter-diesel': false,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Dual zone auto air conditioner',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Power steering',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Multi-function steering wheel',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': 'Leather',
        'champion-petrol-8at': 'Leather'
      },
      {
        name: 'Electric windows, front and rear',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Anti-glare inside rear view mirror',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: "Driver's seat - 4 way adjustable",
        diesel: 'Manual',
        petrol: 'Manual',
        'city-hunter-diesel': 'Manual',
        'city-hunter-petrol': 'Manual',
        'city-hunter-petrol-8at': 'Manual',
        'champion-petrol': 'Electric',
        'champion-petrol-8at': 'Electric'
      },
      {
        name: 'Front passenger seat - 6 way adjustable',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Rear seat configuration',
        diesel: '60:40 fold, flip',
        petrol: '60:40 fold, flip',
        'city-hunter-diesel': '60:40 fold, flip',
        'city-hunter-petrol': '60:40 fold, flip',
        'city-hunter-petrol-8at': '60:40 fold, flip',
        'champion-petrol': '60:40 fold, flip',
        'champion-petrol-8at': '60:40 fold, flip'
      },
      {
        name: 'Rear seat recline function',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Rear center armrest & cupholder',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'AM/FM radio / MP5',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: '6 speakers',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Bluetooth',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Auxiliary & USB functionality',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      }
    ],
    safety: [
      {
        name: 'Anti-lock Braking System (ABS)',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Electronic Brake force distribution (EBD)',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Electronic Stability Programme (ESP)',
        diesel: false,
        petrol: false,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Emergency Brake Assist (EBA)',
        diesel: false,
        petrol: false,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Traction Control System (TCS)',
        diesel: false,
        petrol: false,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Hill Ascent Control (HAC)',
        diesel: false,
        petrol: false,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Hill Descent Control (HDC)',
        diesel: false,
        petrol: false,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Electronic Parking Brake (EPB)',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'ISO-FIX child seat restraint system',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Child safety lock',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Front 3-point safety belts with pre-tensioners',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Driver airbag',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Front passenger airbag',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Tyre Pressure Monitor System (TPMS)',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Parking sensors rear',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Reverse camera system',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Alarm',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Immobiliser',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: 'Central locking',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      }
    ],
    dimensions: [
      {
        name: 'Length (mm)',
        diesel: '4645',
        petrol: '4645',
        'city-hunter-diesel': '4645',
        'city-hunter-petrol': '4645',
        'city-hunter-petrol-8at': '4645',
        'champion-petrol': '4645',
        'champion-petrol-8at': '4645'
      },
      {
        name: 'Width (mm)',
        diesel: '1925',
        petrol: '1925',
        'city-hunter-diesel': '1925',
        'city-hunter-petrol': '1925',
        'city-hunter-petrol-8at': '1925',
        'champion-petrol': '1925',
        'champion-petrol-8at': '1925'
      },
      {
        name: 'Height (mm)',
        diesel: '1871',
        petrol: '1871',
        'city-hunter-diesel': '1871',
        'city-hunter-petrol': '1871',
        'city-hunter-petrol-8at': '1871',
        'champion-petrol': '1871',
        'champion-petrol-8at': '1871'
      },
      {
        name: 'Wheelbase (mm)',
        diesel: '2745',
        petrol: '2745',
        'city-hunter-diesel': '2745',
        'city-hunter-petrol': '2745',
        'city-hunter-petrol-8at': '2745',
        'champion-petrol': '2745',
        'champion-petrol-8at': '2745'
      },
      {
        name: 'Fuel tank capacity (L)',
        diesel: '75',
        petrol: '75',
        'city-hunter-diesel': '75',
        'city-hunter-petrol': '75',
        'city-hunter-petrol-8at': '75',
        'champion-petrol': '75',
        'champion-petrol-8at': '75'
      },
      {
        name: 'Curb weight (kg)',
        diesel: '2140',
        petrol: '2110',
        'city-hunter-diesel': '2140',
        'city-hunter-petrol': '2110',
        'city-hunter-petrol-8at': '2110',
        'champion-petrol': '2110',
        'champion-petrol-8at': '2110'
      },
      {
        name: 'Gross Vehicle Mass/GVM (kg)',
        diesel: '2565',
        petrol: '2535',
        'city-hunter-diesel': '2565',
        'city-hunter-petrol': '2535',
        'city-hunter-petrol-8at': '2535',
        'champion-petrol': '2535',
        'champion-petrol-8at': '2535'
      },
      {
        name: 'Approach angle (degrees)',
        diesel: '37',
        petrol: '37',
        'city-hunter-diesel': '37',
        'city-hunter-petrol': '37',
        'city-hunter-petrol-8at': '37',
        'champion-petrol': '37',
        'champion-petrol-8at': '37'
      },
      {
        name: 'Departure angle (degrees)',
        diesel: '31',
        petrol: '31',
        'city-hunter-diesel': '31',
        'city-hunter-petrol': '31',
        'city-hunter-petrol-8at': '31',
        'champion-petrol': '31',
        'champion-petrol-8at': '31'
      },
      {
        name: 'Rampover angle (degrees)',
        diesel: '23',
        petrol: '23',
        'city-hunter-diesel': '23',
        'city-hunter-petrol': '23',
        'city-hunter-petrol-8at': '23',
        'champion-petrol': '23',
        'champion-petrol-8at': '23'
      },
      {
        name: 'Ground clearance (mm)',
        diesel: '210',
        petrol: '210',
        'city-hunter-diesel': '210',
        'city-hunter-petrol': '210',
        'city-hunter-petrol-8at': '210',
        'champion-petrol': '210',
        'champion-petrol-8at': '210'
      },
      {
        name: 'Luggage capacity (litres)',
        diesel: '532/965*',
        petrol: '532/965*',
        'city-hunter-diesel': '532/965*',
        'city-hunter-petrol': '532/965*',
        'city-hunter-petrol-8at': '532/965*',
        'champion-petrol': '532/965*',
        'champion-petrol-8at': '532/965*'
      }
    ],
    service: [
      {
        name: '5-year/120 000 km Warranty',
        diesel: true,
        petrol: true,
        'city-hunter-diesel': true,
        'city-hunter-petrol': true,
        'city-hunter-petrol-8at': true,
        'champion-petrol': true,
        'champion-petrol-8at': true
      },
      {
        name: '4-year/60 000km Service plan',
        diesel: 'Optional',
        petrol: 'Optional',
        'city-hunter-diesel': 'Optional',
        'city-hunter-petrol': 'Optional',
        'city-hunter-petrol-8at': 'Optional',
        'champion-petrol': 'Optional',
        'champion-petrol-8at': 'Optional'
      },
      {
        name: 'Service intervals',
        diesel: '15 000 km / 12 months',
        petrol: '15 000 km / 12 months',
        'city-hunter-diesel': '15 000 km / 12 months',
        'city-hunter-petrol': '15 000 km / 12 months',
        'city-hunter-petrol-8at': '15 000 km / 12 months',
        'champion-petrol': '15 000 km / 12 months',
        'champion-petrol-8at': '15 000 km / 12 months'
      }
    ]
  };
  
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
  
  // Function to check if a specification has differences among selected variants
  const hasDifferences = (spec) => {
    if (selectedVariants.length <= 1) return true;
    
    const values = selectedVariants.map(variant => spec[variant]);
    return !values.every(v => v === values[0]);
  };
  
  // Filter specifications based on search query and active tab
  const getFilteredSpecs = () => {
    let filteredSpecs = {};
    
    // Filter by category
    if (activeTab === 'all') {
      filteredSpecs = { ...specificationsData };
    } else {
      filteredSpecs = { [activeTab]: specificationsData[activeTab] };
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      
      Object.keys(filteredSpecs).forEach(category => {
        filteredSpecs[category] = filteredSpecs[category].filter(spec => 
          spec.name.toLowerCase().includes(query)
        );
      });
    }
    
    // Filter to show only differences if option is selected
    if (showOnlyDifferences) {
      Object.keys(filteredSpecs).forEach(category => {
        filteredSpecs[category] = filteredSpecs[category].filter(spec => hasDifferences(spec));
      });
    }
    
    return filteredSpecs;
  };
  
  // Render cell content based on value type
  const renderCellContent = (value) => {
    if (typeof value === 'boolean') {
      return value ? <CheckIcon>✓</CheckIcon> : <NoIcon>✗</NoIcon>;
    }
    return value;
  };
  
  const filteredSpecs = getFilteredSpecs();
  
  return (
    <TableContainer>
      <TabsContainer>
        {categories.map(category => (
          <Tab 
            key={category.id} 
            $active={activeTab === category.id}
            onClick={() => setActiveTab(category.id)}
          >
            {category.name}
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
        
        <ToggleContainer>
          <ToggleLabel>
            <ToggleInput 
              type="checkbox" 
              checked={showOnlyDifferences}
              onChange={() => setShowOnlyDifferences(!showOnlyDifferences)}
            />
            Show only differences
          </ToggleLabel>
        </ToggleContainer>
      </FilterControls>
      
      <SearchContainer>
        <SearchInput 
          type="text"
          placeholder="Search specifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      
      {Object.keys(filteredSpecs).map(category => (
        <div key={category}>
          <CategoryTitle>
            {categories.find(cat => cat.id === category)?.name || category}
          </CategoryTitle>
          
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Specification</TableHeader>
                {selectedVariants.map(variantId => (
                  <TableHeader key={variantId}>
                    {variants.find(v => v.id === variantId)?.name}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSpecs[category].map((spec, index) => (
                <TableRow key={index}>
                  <TableCell>{spec.name}</TableCell>
                  {selectedVariants.map(variantId => (
                    <TableCell 
                      key={variantId}
                      className={
                        typeof spec[variantId] === 'boolean' 
                          ? spec[variantId] ? 'feature-present' : 'feature-absent'
                          : ''
                      }
                    >
                      {renderCellContent(spec[variantId])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </TableContainer>
  );
};

export default SpecificationsTable;
