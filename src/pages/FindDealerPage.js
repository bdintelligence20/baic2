import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #e60012;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 1.5rem;
`;

const SearchSection = styled.div`
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #e60012;
    box-shadow: 0 0 0 2px rgba(230, 0, 18, 0.1);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  
  &:focus {
    outline: none;
    border-color: #e60012;
    box-shadow: 0 0 0 2px rgba(230, 0, 18, 0.1);
  }
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  background-color: #e60012;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
  
  &:hover {
    background-color: #c5000f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ResultsSection = styled.div`
  margin-top: 3rem;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DealerCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const DealerHeader = styled.div`
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const DealerName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const DealerType = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background-color: #e60012;
  color: white;
  font-size: 0.8rem;
  border-radius: 20px;
  font-weight: 500;
`;

const DealerBody = styled.div`
  padding: 1.5rem;
`;

const DealerInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const DealerAddress = styled.p`
  color: #555;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

const DealerContact = styled.p`
  color: #555;
  margin-bottom: 0.5rem;
  
  a {
    color: #e60012;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DealerHours = styled.div`
  margin-top: 1rem;
  
  h4 {
    font-size: 1rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #555;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const DealerActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const DealerButton = styled.a`
  flex: 1;
  display: inline-block;
  padding: 0.8rem 1rem;
  text-align: center;
  background-color: ${props => props.$primary ? '#e60012' : 'transparent'};
  color: ${props => props.$primary ? 'white' : '#e60012'};
  border: 1px solid #e60012;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$primary ? '#c5000f' : 'rgba(230, 0, 18, 0.1)'};
    transform: translateY(-2px);
  }
`;

const MapSection = styled.div`
  margin-top: 4rem;
`;

const MapContainer = styled.div`
  height: 500px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

// Mock dealer data
const mockDealers = [
  {
    id: 1,
    name: 'BAIC Johannesburg',
    type: 'Flagship Dealer',
    address: '123 Main Road, Sandton, Johannesburg, 2196',
    phone: '+27 11 123 4567',
    email: 'johannesburg@baic.co.za',
    hours: {
      weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
      saturday: 'Saturday: 9:00 AM - 3:00 PM',
      sunday: 'Sunday: Closed'
    },
    location: {
      lat: -26.107567,
      lng: 28.056702
    }
  },
  {
    id: 2,
    name: 'BAIC Cape Town',
    type: 'Authorized Dealer',
    address: '456 Beach Road, Sea Point, Cape Town, 8001',
    phone: '+27 21 987 6543',
    email: 'capetown@baic.co.za',
    hours: {
      weekdays: 'Monday - Friday: 8:00 AM - 5:30 PM',
      saturday: 'Saturday: 9:00 AM - 2:00 PM',
      sunday: 'Sunday: Closed'
    },
    location: {
      lat: -33.908747,
      lng: 18.413977
    }
  },
  {
    id: 3,
    name: 'BAIC Durban',
    type: 'Authorized Dealer',
    address: '789 Umhlanga Rocks Drive, Umhlanga, Durban, 4320',
    phone: '+27 31 765 4321',
    email: 'durban@baic.co.za',
    hours: {
      weekdays: 'Monday - Friday: 8:30 AM - 5:30 PM',
      saturday: 'Saturday: 9:00 AM - 1:00 PM',
      sunday: 'Sunday: Closed'
    },
    location: {
      lat: -29.726230,
      lng: 31.066010
    }
  },
  {
    id: 4,
    name: 'BAIC Pretoria',
    type: 'Authorized Dealer',
    address: '321 Pretorius Street, Hatfield, Pretoria, 0083',
    phone: '+27 12 345 6789',
    email: 'pretoria@baic.co.za',
    hours: {
      weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
      saturday: 'Saturday: 9:00 AM - 3:00 PM',
      sunday: 'Sunday: Closed'
    },
    location: {
      lat: -25.748884,
      lng: 28.230480
    }
  }
];

const FindDealerPage = () => {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [dealers, setDealers] = useState(mockDealers);
  
  const handleSearch = (e) => {
    e.preventDefault();
    // In a real application, this would filter dealers based on province and city
    // For this demo, we'll just use the mock data
    console.log('Searching for dealers in', province, city);
    setDealers(mockDealers);
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <Title>Find a Dealer</Title>
        <Subtitle>Locate your nearest BAIC dealership to explore our range of vehicles or schedule a service</Subtitle>
      </PageHeader>
      
      <SearchSection>
        <SearchForm onSubmit={handleSearch}>
          <FormGroup>
            <Label htmlFor="province">Province</Label>
            <Select 
              id="province" 
              value={province} 
              onChange={(e) => setProvince(e.target.value)}
            >
              <option value="">Select Province</option>
              <option value="gauteng">Gauteng</option>
              <option value="western-cape">Western Cape</option>
              <option value="kwazulu-natal">KwaZulu-Natal</option>
              <option value="eastern-cape">Eastern Cape</option>
              <option value="free-state">Free State</option>
              <option value="mpumalanga">Mpumalanga</option>
              <option value="limpopo">Limpopo</option>
              <option value="north-west">North West</option>
              <option value="northern-cape">Northern Cape</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="city">City</Label>
            <Input 
              type="text" 
              id="city" 
              placeholder="Enter city name" 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
            />
          </FormGroup>
          
          <Button type="submit">Search</Button>
        </SearchForm>
      </SearchSection>
      
      <ResultsSection>
        <ResultsGrid>
          {dealers.map(dealer => (
            <DealerCard key={dealer.id}>
              <DealerHeader>
                <DealerName>{dealer.name}</DealerName>
                <DealerType>{dealer.type}</DealerType>
              </DealerHeader>
              
              <DealerBody>
                <DealerInfo>
                  <DealerAddress>{dealer.address}</DealerAddress>
                  <DealerContact>
                    Phone: <a href={`tel:${dealer.phone}`}>{dealer.phone}</a>
                  </DealerContact>
                  <DealerContact>
                    Email: <a href={`mailto:${dealer.email}`}>{dealer.email}</a>
                  </DealerContact>
                  
                  <DealerHours>
                    <h4>Business Hours</h4>
                    <p>{dealer.hours.weekdays}</p>
                    <p>{dealer.hours.saturday}</p>
                    <p>{dealer.hours.sunday}</p>
                  </DealerHours>
                </DealerInfo>
                
                <DealerActions>
                  <DealerButton href={`https://www.google.com/maps/search/?api=1&query=${dealer.location.lat},${dealer.location.lng}`} target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </DealerButton>
                  <DealerButton href="/contact" $primary={true}>
                    Book a Test Drive
                  </DealerButton>
                </DealerActions>
              </DealerBody>
            </DealerCard>
          ))}
        </ResultsGrid>
      </ResultsSection>
      
      <MapSection>
        <MapContainer>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.1776517860574!2d18.4117892!3d-33.9087474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc67a6aff8c4a7%3A0x1d1c7a47a8e8c0eb!2sSea%20Point%2C%20Cape%20Town%2C%208001!5e0!3m2!1sen!2sza!4v1620144000000!5m2!1sen!2sza" 
            allowFullScreen="" 
            loading="lazy"
            title="Dealer Locations"
          ></iframe>
        </MapContainer>
      </MapSection>
    </PageContainer>
  );
};

export default FindDealerPage;
