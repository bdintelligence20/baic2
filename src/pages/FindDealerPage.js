import React, { useState, useEffect } from 'react';
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

const DealerRegion = styled.span`
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

const DealerWebsite = styled.p`
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

const DealerActions = styled.div`
  margin-top: 1.5rem;
`;

const DealerButton = styled.a`
  display: inline-block;
  width: 100%;
  padding: 0.8rem 1rem;
  text-align: center;
  background-color: transparent;
  color: #e60012;
  border: 1px solid #e60012;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(230, 0, 18, 0.1);
    transform: translateY(-2px);
  }
`;

// Dealership data
const BAIC_DEALERSHIPS = [
  // Gauteng
  {
    region: "Gauteng",
    name: "BAIC Nigel",
    address: "64 Springs Road, Nigel, 1491, Nigel",
    phone: "011 100 5657",
    email: "workshop@baicnigel.co.za",
    website: "www.epsonmotors.co.za",
    map_link: "https://maps.google.com/?q=64+Springs+Road,+Nigel,+1491,+Nigel"
  },
  {
    region: "Gauteng",
    name: "BAIC Pretoria North",
    address: "466 Gerrit Maritz Road, Pretoria North, 0116, Pretoria North",
    phone: "073 786 5814",
    email: "md@squadcars.co.za; adnaan@squadcars.co.za",
    website: "www.scmg.co.za",
    map_link: "https://maps.google.com/?q=466+Gerrit+Maritz+Road,+Pretoria+North,+0116,+Pretoria+North"
  },
  // KZN
  {
    region: "KZN",
    name: "BAIC Ladysmith",
    address: "295 Murchison Street, Ladysmith, 3370, Ladysmith",
    phone: "036 637 7837",
    email: "dp@sntr.co.za",
    website: "www.sntr.co.za",
    map_link: "https://maps.google.com/?q=295+Murchison+Street,+Ladysmith,+3370,+Ladysmith"
  },
  // Western Cape
  {
    region: "Western Cape",
    name: "BAIC Malmesbury",
    address: "22 Bokomo Street, Malmesbury, 7299, Malmesbury",
    phone: "022 482 2981",
    email: "info@baicmalmesbury.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=22+Bokomo+Street,+Malmesbury,+7299,+Malmesbury"
  },
  // Free State
  {
    region: "Free State",
    name: "BAIC Bethlehem",
    address: "Corner of Muller and Commissioner Streets, Bethlehem, 9701, Bethlehem",
    phone: "058 303 3600",
    email: "trevor@scottgroup.co.za",
    website: "www.scottgroup.co.za",
    map_link: "https://maps.google.com/?q=Corner+of+Muller+and+Commissioner+Streets,+Bethlehem,+9701,+Bethlehem"
  },
  // Limpopo
  {
    region: "Limpopo",
    name: "BAIC Polokwane",
    address: "Cnr Landros Mare and Rissik Stree, Polokwane, Polokwane",
    phone: "015 297 4823",
    email: "service@bbmazdapol.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=Cnr+Landros+Mare+and+Rissik+Stree,+Polokwane,+Polokwane"
  },
  // Eastern Cape
  {
    region: "Eastern Cape",
    name: "BAIC Port Elizabeth",
    address: "81 Perkins Street, North End, Port Elizabeth, 6001, Port Elizabeth",
    phone: "041 395 8200",
    email: "vinesh.ba@tavcor.co.za",
    website: "https://www.tavcorautosales.co.za/baic/",
    map_link: "https://maps.google.com/?q=81+Perkins+Street,+North+End,+Port+Elizabeth,+6001,+Port+Elizabeth"
  },
  // Mpumalanga
  {
    region: "Mpumalanga",
    name: "BAIC Mbombela",
    address: "6 Naaldekoker Crescent, Riverside, Mbombela, Mbombela",
    phone: "013 756 4444",
    email: "dvstaden@alanhudson.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=6+Naaldekoker+Crescent,+Riverside,+Mbombela,+Mbombela"
  },
  // Northern Cape
  {
    region: "Northern Cape",
    name: "BAIC Kimberley",
    address: "59 Pniel Road, Kimberley, Kimberley",
    phone: "053 807 4300",
    email: "reenoc@groupmorgan.co.za",
    website: "",
    map_link: "https://maps.google.com/?q=59+Pniel+Road,+Kimberley,+Kimberley"
  },
  // North West
  {
    region: "North West",
    name: "BAIC Klerksdorp",
    address: "N12 Highway, Stilfontein, North West, Stilfontein",
    phone: "081 062 6741",
    email: "baickldsales@gmail.com",
    website: "www.mmu-motors.co.za",
    map_link: "https://maps.google.com/?q=N12+Highway,+Stilfontein,+North+West,+Stilfontein"
  },
  // Botswana
  {
    region: "Botswana",
    name: "BAIC Botswana Gaborone CML Motors",
    address: "Plot 5664 Kubu Road, Broadhurst Industrial, Gaborone, Gabrone",
    phone: "(+267) 395 2652 / 241 0977",
    email: "akhtar@commercialmotors.co.bw",
    website: "",
    map_link: "https://maps.google.com/?q=Plot+5664+Kubu+Road,+Broadhurst+Industrial,+Gaborone,+Gabrone"
  }
];

const FindDealerPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [filteredDealers, setFilteredDealers] = useState(BAIC_DEALERSHIPS);
  
  // Get unique regions for the dropdown
  const regions = [...new Set(BAIC_DEALERSHIPS.map(dealer => dealer.region))].sort();
  
  // Filter dealers when region changes
  useEffect(() => {
    if (selectedRegion) {
      setFilteredDealers(BAIC_DEALERSHIPS.filter(dealer => dealer.region === selectedRegion));
    } else {
      setFilteredDealers(BAIC_DEALERSHIPS);
    }
  }, [selectedRegion]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Filtering is already handled by the useEffect
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
            <Label htmlFor="region">Province</Label>
            <Select 
              id="region" 
              value={selectedRegion} 
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">All Provinces</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </Select>
          </FormGroup>
          
          <Button type="submit">Search</Button>
        </SearchForm>
      </SearchSection>
      
      <ResultsSection>
        <ResultsGrid>
          {filteredDealers.map((dealer, index) => (
            <DealerCard key={index}>
              <DealerHeader>
                <DealerName>{dealer.name}</DealerName>
                <DealerRegion>{dealer.region}</DealerRegion>
              </DealerHeader>
              
              <DealerBody>
                <DealerInfo>
                  <DealerAddress>{dealer.address}</DealerAddress>
                  <DealerContact>
                    Phone: <a href={`tel:${dealer.phone}`}>{dealer.phone}</a>
                  </DealerContact>
                  {dealer.email && (
                    <DealerContact>
                      Email: <a href={`mailto:${dealer.email}`}>{dealer.email}</a>
                    </DealerContact>
                  )}
                  {dealer.website && (
                    <DealerWebsite>
                      Website: <a href={`https://${dealer.website}`} target="_blank" rel="noopener noreferrer">{dealer.website}</a>
                    </DealerWebsite>
                  )}
                </DealerInfo>
                
                <DealerActions>
                  <DealerButton href={dealer.map_link} target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </DealerButton>
                </DealerActions>
              </DealerBody>
            </DealerCard>
          ))}
        </ResultsGrid>
      </ResultsSection>
    </PageContainer>
  );
};

export default FindDealerPage;
