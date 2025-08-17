import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for the specifications table
const TableContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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

const CategorySection = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  text-align: left;
  
  &:first-child {
    font-weight: 500;
    color: #333;
    width: 60%;
  }
  
  &:last-child {
    color: #666;
    width: 40%;
  }
`;

const FeatureIcon = styled.span`
  color: #28a745;
  font-size: 1.2rem;
  font-weight: bold;
`;

const OptionalIcon = styled.span`
  color: #ffc107;
  font-size: 1rem;
  font-weight: bold;
`;

// Main component
const B40HonorEditionSpecificationsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Specifications data from Excel file (B40 honor edition sheet)
  const specificationsData = {
    'Basic Parameters': [
      { name: 'Length × Width × Height (mm)', value: '4630 × 1925 × 1871' },
      { name: 'Wheelbase (mm)', value: '2745' },
      { name: 'Max. gradeability (%)', value: '60' },
      { name: 'Approach angle (°)', value: '37' },
      { name: 'Departure angle (°)', value: '31' },
      { name: 'Ramp angle (°)', value: '23' },
      { name: 'Min. ground clearance (mm)', value: '210' },
      { name: 'Fuel tank capacity (L)', value: '75' },
      { name: 'Trunk capacity (L)', value: '532/965 (seat lay down)' },
      { name: 'Max. power/Net Power (kW)', value: '165/160' },
      { name: 'Max. torque (N·m)', value: '380' },
      { name: 'Fuel', value: '92# gasoline' },
      { name: 'Emission', value: 'Euro IV' },
      { name: 'Curb weight (kg)', value: '2080' },
      { name: 'GVW (kg)', value: '2505' },
      { name: 'Body type', value: 'Separate frame construction' },
      { name: 'Drive mode', value: 'Electronic time-sharing 4WD' },
      { name: 'Power steering', value: 'Rack and pinion system' },
      { name: 'Front suspension', value: 'Double boom/helical spring front independent suspension' },
      { name: 'Rear suspension', value: 'Five-bar/helical spring non-independent suspension' },
      { name: 'Front brake', value: 'Ventilated disc' },
      { name: 'Rear brake', value: 'Disc' },
      { name: '17 inch aluminum alloy rim', value: 'Double color' },
      { name: '265/65 R17 AT Tyre', value: '●' },
      { name: 'Full-size spare Tyre', value: '●' },
      { name: 'Urban-level exclusive suspension system', value: '●' }
    ],
    'Control & Safety': [
      { name: 'ABS+EBD', value: '●' },
      { name: 'ESC', value: '●' },
      { name: 'EBA', value: '●' },
      { name: 'TCA', value: '●' },
      { name: 'HAC', value: '●' },
      { name: 'HDC', value: '●' },
      { name: 'RMI', value: '●' },
      { name: 'EPB', value: '●' },
      { name: 'Auto-hold', value: '●' },
      { name: 'Snow/Sport mode', value: '●' },
      { name: 'Comfort/Economy Mode', value: '●' },
      { name: 'One button start system', value: '●' },
      { name: 'Tyre pressure monitoring system (display)', value: '●' },
      { name: 'Driver & passenger airbags', value: '●' },
      { name: 'Driver/passenger seat belt warning', value: '●' },
      { name: 'Front three-point seat belt with pretensioner', value: '●' },
      { name: 'Theft-deterrent system', value: '●' },
      { name: 'Engine immobilizer', value: '●' },
      { name: 'Automatic driving lock/P unlock', value: '●' },
      { name: 'Parking sensor', value: '●' },
      { name: 'Reversing video system', value: '●' },
      { name: 'Cruise control', value: '●' },
      { name: 'Front axle electronically controlled differential lock', value: 'O1' },
      { name: 'Rear axle electronically controlled differential lock', value: '●' },
      { name: 'Lightweight front axle', value: 'O1' }
    ],
    'Exterior': [
      { name: 'Black removable hard ceiling', value: '●' },
      { name: 'Side pedal', value: 'O1' },
      { name: 'Front / rear red tow hook', value: '●' },
      { name: 'Electrically adjustable door mirrors', value: '●' },
      { name: 'Heated door mirrors', value: '●' },
      { name: 'Remote key × 2', value: '●' },
      { name: '4 Door power windows', value: '●' },
      { name: 'Window glass', value: 'Green glass' }
    ],
    'Interior': [
      { name: 'Multi-function leather steering', value: '●' },
      { name: 'Sunvisor with mirror', value: '●' },
      { name: 'Manual anti-glare internal rearview mirror', value: '●' },
      { name: 'Front power outlet (cigarette lighter/12V)', value: '●' },
      { name: 'AUX+2 USB (USB in the central armrest box)', value: '●' },
      { name: '220V power in trunk', value: 'O1 - Second row 220V power' },
      { name: 'Front handlebars', value: '●' },
      { name: 'Rear B pillar handlebars (left and right)', value: '●' },
      { name: 'E-call', value: '○' },
      { name: 'Anti-roll cage', value: '●' }
    ],
    'Seats': [
      { name: 'Leather seats', value: '●' },
      { name: '6-way auto adjust for driver seat', value: '●' },
      { name: '6-way auto adjust for passenger seat', value: '●' },
      { name: '2-way headrest adjust for driver seat', value: '●' },
      { name: '2-way headrest adjust for passenger seat', value: '●' },
      { name: 'Auto lumbar adjust for driver seat', value: 'Driver & Passenger' },
      { name: 'Front leather armrest', value: 'Double door' },
      { name: 'Rear center cup holder', value: '●' },
      { name: 'Rear seat angle adjust', value: '●' },
      { name: 'Rear 4/6 seat foldable', value: '●' }
    ],
    'Entertainment': [
      { name: '12.3-inch LCD instrument cluster', value: '●' },
      { name: '10-inch infotainment display', value: '●' },
      { name: 'AM/FM', value: '●' },
      { name: 'Mobile connect', value: 'Easyconnection' },
      { name: 'Bluetooth telephone & music', value: '●' },
      { name: 'External video play', value: '●' },
      { name: 'Speaker', value: '6' }
    ],
    'Lights': [
      { name: 'LED front combination headlights', value: '●' },
      { name: 'LED daylight running lights', value: '●' },
      { name: 'LED rear taillight', value: '●' },
      { name: 'Headlight time-delay switch off', value: '●' },
      { name: 'Front fog lamps (with cornering function)', value: '●' },
      { name: 'Rear fog lamps', value: '●' },
      { name: 'Reading light', value: '●' },
      { name: 'Double cup holder ribbon atmosphere lamp ring (monochrome)', value: '●' },
      { name: 'Interior point atmosphere lamp (monochrome)', value: '●' },
      { name: 'Foot space light', value: '●' },
      { name: 'Store lamp', value: '●' },
      { name: 'Glove compartment light', value: '●' },
      { name: 'Luggage light', value: '●' }
    ],
    'Air Conditioning': [
      { name: 'Double-zone auto air conditioning', value: '●' },
      { name: 'Rear exhaust vent', value: '●' }
    ]
  };
  
  // Function to render cell content based on value
  const renderValue = (value) => {
    if (value === '●') {
      return <FeatureIcon>✓</FeatureIcon>;
    } else if (value === '○' || value.startsWith('O1')) {
      return <OptionalIcon>○</OptionalIcon>;
    }
    return value;
  };
  
  // Filter specifications based on search query
  const getFilteredSpecs = () => {
    if (searchQuery.trim() === '') {
      return specificationsData;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = {};
    
    Object.keys(specificationsData).forEach(category => {
      const filteredItems = specificationsData[category].filter(spec => 
        spec.name.toLowerCase().includes(query) ||
        spec.value.toString().toLowerCase().includes(query)
      );
      
      if (filteredItems.length > 0) {
        filtered[category] = filteredItems;
      }
    });
    
    return filtered;
  };
  
  const filteredSpecs = getFilteredSpecs();
  
  return (
    <TableContainer>
      <SearchContainer>
        <SearchInput 
          type="text"
          placeholder="Search specifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      
      {Object.keys(filteredSpecs).map(category => (
        <CategorySection key={category}>
          <CategoryTitle>{category}</CategoryTitle>
          <Table>
            <tbody>
              {filteredSpecs[category].map((spec, index) => (
                <TableRow key={index}>
                  <TableCell>{spec.name}</TableCell>
                  <TableCell>{renderValue(spec.value)}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </CategorySection>
      ))}
      
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px', 
        marginTop: '2rem',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        <strong>Legend:</strong> ✓ standard configuration, ○ optional configuration, O1 optional configuration with specific details
      </div>
    </TableContainer>
  );
};

export default B40HonorEditionSpecificationsTable;
