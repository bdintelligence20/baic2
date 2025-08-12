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
const X55PlusSpecificationsTable = () => {
  // State for active tab, selected variants, search query, and toggle options
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVariants, setSelectedVariants] = useState(['premium']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  
  // Define the categories and variants
  const categories = [
    { id: 'all', name: 'All Specifications' },
    { id: 'engine', name: 'Engine & Drivetrain' },
    { id: 'drive', name: 'Drive Control' },
    { id: 'safety', name: 'Safety' },
    { id: 'external', name: 'External Configuration' },
    { id: 'internal', name: 'Internal Configuration' },
    { id: 'steering', name: 'Steering Wheel & Seat' },
    { id: 'intelligent', name: 'Intelligent Features' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'air', name: 'Air Conditioning' },
    { id: 'optional', name: 'Optional Features' }
  ];
  
  const variants = [
    { id: 'dynamic', name: 'Dynamic' },
    { id: 'elite', name: 'Elite' },
    { id: 'premium', name: 'Premium' },
    { id: 'premium-2t', name: 'Premium 2T' }
  ];
  
  // Specifications data extracted from the PDF
  const specificationsData = {
    engine: [
      {
        name: 'Price',
        dynamic: 'R429 900',
        elite: 'R464 900',
        premium: 'R509 900',
        'premium-2t': 'R514 900'
      },
      {
        name: '0-100 km/h',
        dynamic: '7.8s',
        elite: '7.8s',
        premium: '7.8s',
        'premium-2t': '7.8s'
      },
      {
        name: 'Drive',
        dynamic: 'Front wheel drive',
        elite: 'Front wheel drive',
        premium: 'Front wheel drive',
        'premium-2t': 'Front wheel drive'
      },
      {
        name: 'Engine',
        dynamic: '1.5T',
        elite: '1.5T',
        premium: '1.5T',
        'premium-2t': '1.5T'
      },
      {
        name: 'Transmission type',
        dynamic: '7DCT',
        elite: '7DCT',
        premium: '7DCT',
        'premium-2t': '7DCT'
      },
      {
        name: 'Max. power(kw)',
        dynamic: '138',
        elite: '138',
        premium: '138',
        'premium-2t': '138'
      },
      {
        name: 'Torque',
        dynamic: '305 Nm',
        elite: '305 Nm',
        premium: '305 Nm',
        'premium-2t': '305 Nm'
      },
      {
        name: 'Fuel consumption',
        dynamic: '7.7 L',
        elite: '7.7 L',
        premium: '7.7 L',
        'premium-2t': '7.7 L'
      },
      {
        name: 'Front suspension',
        dynamic: 'MacPherson independent suspension',
        elite: 'MacPherson independent suspension',
        premium: 'MacPherson independent suspension',
        'premium-2t': 'MacPherson independent suspension'
      },
      {
        name: 'Rear suspension',
        dynamic: 'Multi link independent suspension',
        elite: 'Multi link independent suspension',
        premium: 'Multi link independent suspension',
        'premium-2t': 'Multi link independent suspension'
      },
      {
        name: 'Front brake type',
        dynamic: 'Ventilation disc',
        elite: 'Ventilation disc',
        premium: 'Ventilation disc',
        'premium-2t': 'Ventilation disc'
      },
      {
        name: 'Rear brake type',
        dynamic: 'Solid disc type',
        elite: 'Solid disc type',
        premium: 'Solid disc type',
        'premium-2t': 'Solid disc type'
      },
      {
        name: 'Emission standard',
        dynamic: 'Euro VI',
        elite: 'Euro VI',
        premium: 'Euro VI',
        'premium-2t': 'Euro VI'
      },
      {
        name: 'Spare tire standard',
        dynamic: 'Space Saver Spare Wheel',
        elite: 'Space Saver Spare Wheel',
        premium: 'Space Saver Spare Wheel',
        'premium-2t': 'Space Saver Spare Wheel'
      },
      {
        name: 'Rear trailer hook interface',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      }
    ],
    drive: [
      {
        name: 'Electronic shifter',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'EPS (2 mode)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Manual mode shift prompt',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Gear display',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Drive modes (ECO/Sport/comfort/Smart)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'ABS + EBD',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Emergency Braking Assist (EBA)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Electronic Parking Brake (EPB)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Auto Hold',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Button start/stop',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Keyless entry',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Electronic Stability Program (ESP)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Hill-start Assist Control (HAC)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Hill Descent Control (HDC)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'BOS (brake override system)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Cruise control',
        dynamic: true,
        elite: true,
        premium: false,
        'premium-2t': false
      }
    ],
    safety: [
      {
        name: 'Driver airbag',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Passenger airbag',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Front side airbags',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Side curtain airbags',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Front three point type safety belt',
        dynamic: true,
        elite: false,
        premium: false,
        'premium-2t': false
      },
      {
        name: 'Front three point type Pretensioning safety belt',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Adjustable seat belt height',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Seat belt unfasten warning - Driver',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Seat belt unfasten warning - Passenger',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Three point type safety belt - Rear Seat Middle',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Three point type Pretensioning safety belt - Rear Seat left and right',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Warning of tired Driving (symbol + Sound)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'TPMS',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Rear radar (PDC)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Front radar (PDC)',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'ISOFIX*2 (available @ 2 seats)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Door open reminder',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Speed induction door lock',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Crash doors unlock automatically',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Automatic oil circuit cut-off system',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Theft-deterrent alarm system',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Engine immobilizer',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      }
    ],
    external: [
      {
        name: 'Door mirror with electric adjustment',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Door mirror with electric heater',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Door mirror with electric fold',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Door mirror auto fold when lock',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Defrosting the rear windshield',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Boneless rain wiper',
        dynamic: 'Bone Wiper',
        elite: 'Bone Wiper',
        premium: 'Bone Wiper',
        'premium-2t': 'Bone Wiper'
      },
      {
        name: 'Rear windshield wiper',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Panoramic sunroof',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Roof rack',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: '18-inch aluminium alloy wheels',
        dynamic: true,
        elite: false,
        premium: false,
        'premium-2t': false
      },
      {
        name: '19-inch aluminium alloy wheels',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Hidden door handle',
        dynamic: 'Mechanicle',
        elite: 'Automatic',
        premium: 'Automatic',
        'premium-2t': 'Automatic'
      },
      {
        name: 'Sharkfin antenna',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Engine trim cover',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Engine room half cover',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Rain sensor wiper',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Power tailgate with smart anti-pinch',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Push-push plastic filler cap',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Engine room underboard',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Dual Quad Exhaust',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      }
    ],
    internal: [
      {
        name: 'Soft instrument panel',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Speed sensing sound compensation system',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Bezel-less manual anti-glare inner mirror',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Driver seat visor with cosmetic mirror',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Passenger seat visor with cosmetic mirror',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: '12V charging port (centre console)',
        dynamic: '1',
        elite: '1',
        premium: '1',
        'premium-2t': '1'
      },
      {
        name: 'Trunk/boot 12V charging port',
        dynamic: '1',
        elite: '1',
        premium: '1',
        'premium-2t': '1'
      },
      {
        name: 'Front USB',
        dynamic: '1',
        elite: '1',
        premium: '1',
        'premium-2t': '1'
      },
      {
        name: 'Rear USB',
        dynamic: '1',
        elite: '1',
        premium: '1',
        'premium-2t': '1'
      },
      {
        name: 'Armrest box USB',
        dynamic: '1',
        elite: '1',
        premium: '1',
        'premium-2t': '1'
      },
      {
        name: 'Four-door electric window',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Four-door window one key lift with anti-pinch',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Green glass (4-door and corner window, front and rear windshield)',
        dynamic: 'White glass',
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Covering material curtain',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'TYPE-C Charging Port',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      }
    ],
    steering: [
      {
        name: 'Leather steering wheel',
        dynamic: 'Microfiber',
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Multi-function steering wheel',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Multi-function steering wheel with 4-way adjustment',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Seat material',
        dynamic: 'Leather',
        elite: 'Leather',
        premium: 'Premium leather',
        'premium-2t': 'Premium leather'
      },
      {
        name: 'Front center armrest',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Rear center armrest (with cup holder)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Driver seat 6-way manual adjustment',
        dynamic: true,
        elite: false,
        premium: false,
        'premium-2t': false
      },
      {
        name: 'Passenger seat 6-way manual adjustment',
        dynamic: true,
        elite: false,
        premium: false,
        'premium-2t': false
      },
      {
        name: 'Driver seat memory',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Driving seat 6-way electric adjustment',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Passenger seat 6-way electric adjustment',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Front seat heating',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Front seat ventilation',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Rear seat Angle adjustable',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Rear seat 60/40 fold/split',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Rear seat flat',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Back floor flat',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Rear headrests',
        dynamic: '3',
        elite: '3',
        premium: '3',
        'premium-2t': '3'
      }
    ],
    intelligent: [
      {
        name: 'Reversing image (with dynamic guide wire)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Back 360-degree panoramic image',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Lane Departure Warning',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Blind Spot Detection',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Adaptive Cruise Control',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Autonomous Emergency Braking',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Forward Collision Warning',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Central control screen',
        dynamic: '10.1 inch',
        elite: '10.1 inch',
        premium: '10.1 inch',
        'premium-2t': '10.1 inch'
      },
      {
        name: 'LCD instrument screen',
        dynamic: '10.25 inch',
        elite: '10.25 inch',
        premium: '10.25 inch',
        'premium-2t': '10.25 inch'
      },
      {
        name: 'Wireless phone connection',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'WIFI',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'DA host (radio, local music, Bluetooth phone, wireless phone connection)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Voice Control (English)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Wireless Charging',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      }
    ],
    entertainment: [
      {
        name: 'Radio',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Bluetooth',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Speaker',
        dynamic: '4',
        elite: '6',
        premium: '8',
        'premium-2t': '8'
      }
    ],
    lighting: [
      {
        name: 'LED headlights',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'LED daytime running light',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Delay off of headlights',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Automatic headlights',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Rear fog lamps',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'LED taillights',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'LED high mount stop lamp',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'ESS emergence Stop Signal',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'External rear view mirror with LED turn signal',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Ambient Lighting',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Front top reading light (white light, with delay off)',
        dynamic: 'Mechanical switch',
        elite: 'Mechanical switch',
        premium: 'Mechanical switch',
        'premium-2t': 'Mechanical switch'
      },
      {
        name: 'Rear top reading light (white light)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Driver cosmetic mirror light',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Passenger cosmetic mirror light',
        dynamic: false,
        elite: false,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Trunk/boot light',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      }
    ],
    air: [
      {
        name: 'Air conditioning',
        dynamic: true,
        elite: false,
        premium: false,
        'premium-2t': false
      },
      {
        name: 'Dual zone automatic air conditioning',
        dynamic: false,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Rear air outlet (blowing surface)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Pollen filter /PM2.5 air purification, CN95 filter element',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Refrigerator (central control armrest area)',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      }
    ],
    optional: [
      {
        name: 'Two Tone Body',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
      },
      {
        name: 'Black Seat',
        dynamic: true,
        elite: true,
        premium: true,
        'premium-2t': true
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

export default X55PlusSpecificationsTable;
