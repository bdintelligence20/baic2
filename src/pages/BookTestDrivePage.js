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

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
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

const Select = styled.select`
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

const Textarea = styled.textarea`
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #e60012;
    box-shadow: 0 0 0 2px rgba(230, 0, 18, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #e60012;
`;

const CheckboxLabel = styled.label`
  color: #555;
  font-size: 0.9rem;
  
  a {
    color: #e60012;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #e60012;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background-color: #c5000f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const VehiclePreview = styled.div`
  display: flex;
  flex-direction: column;
`;

const VehicleImage = styled.div`
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const VehicleInfo = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const VehicleName = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const VehiclePrice = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #e60012;
  margin-bottom: 1rem;
`;

const VehicleDescription = styled.p`
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const VehicleFeatures = styled.ul`
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    color: #555;
  }
`;

const SuccessMessage = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
  text-align: center;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`;

// Mock vehicle data
const vehicles = [
  { id: 'x55', name: 'X55', price: 'From R399,900', image: '/images/models/x55/14_20240708121758A006.png' },
  { id: 'x55-plus', name: 'X55 Plus', price: 'From R459,900', image: '/images/models/x55-plus/14_20240708121758A006.png' },
  { id: 'x55-dynamic', name: 'X55 Dynamic', price: 'From R479,900', image: '/images/models/x55-dynamic/14_20240708121758A006.png' },
  { id: 'b40-plus', name: 'B40 Plus', price: 'From R574,500', image: '/images/models/b40-plus/BJ40 plus 黑_20221028105044A009.png' }
];

const BookTestDrivePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    vehicleModel: '',
    dealership: '',
    message: '',
    consent: false
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (name === 'vehicleModel') {
      setSelectedVehicle(vehicles.find(v => v.id === value) || null);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real application, this would send the data to a server
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <PageContainer>
        <PageHeader>
          <Title>Book a Test Drive</Title>
        </PageHeader>
        
        <SuccessMessage>
          <h3>Thank You for Your Request!</h3>
          <p>Your test drive request has been successfully submitted. A representative from your selected dealership will contact you shortly to confirm your appointment.</p>
          <Button as="a" href="/">Return to Homepage</Button>
        </SuccessMessage>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <PageHeader>
        <Title>Book a Test Drive</Title>
        <Subtitle>Experience the thrill of driving a BAIC vehicle by scheduling a test drive at your nearest dealership</Subtitle>
      </PageHeader>
      
      <FormContainer>
        <FormSection>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="firstName">First Name*</Label>
              <Input 
                type="text" 
                id="firstName" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="lastName">Last Name*</Label>
              <Input 
                type="text" 
                id="lastName" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email Address*</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="phone">Phone Number*</Label>
              <Input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="vehicleModel">Vehicle Model*</Label>
              <Select 
                id="vehicleModel" 
                name="vehicleModel" 
                value={formData.vehicleModel} 
                onChange={handleChange} 
                required
              >
                <option value="">Select a Model</option>
                <option value="x55">X55</option>
                <option value="x55-plus">X55 Plus</option>
                <option value="x55-dynamic">X55 Dynamic</option>
                <option value="b40-plus">B40 Plus</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="dealership">Preferred Dealership*</Label>
              <Select 
                id="dealership" 
                name="dealership" 
                value={formData.dealership} 
                onChange={handleChange} 
                required
              >
                <option value="">Select a Dealership</option>
                <option value="johannesburg">BAIC Johannesburg</option>
                <option value="cape-town">BAIC Cape Town</option>
                <option value="durban">BAIC Durban</option>
                <option value="pretoria">BAIC Pretoria</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="preferredDate">Preferred Date*</Label>
              <Input 
                type="date" 
                id="preferredDate" 
                name="preferredDate" 
                value={formData.preferredDate} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="preferredTime">Preferred Time*</Label>
              <Select 
                id="preferredTime" 
                name="preferredTime" 
                value={formData.preferredTime} 
                onChange={handleChange} 
                required
              >
                <option value="">Select a Time</option>
                <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                <option value="afternoon">Afternoon (12:00 PM - 3:00 PM)</option>
                <option value="evening">Evening (3:00 PM - 6:00 PM)</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Additional Information</Label>
              <Textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Any specific questions or requirements for your test drive?"
              />
            </FormGroup>
            
            <CheckboxGroup>
              <Checkbox 
                type="checkbox" 
                id="consent" 
                name="consent" 
                checked={formData.consent} 
                onChange={handleChange} 
                required 
              />
              <CheckboxLabel htmlFor="consent">
                I agree to the <a href="/privacy-policy">Privacy Policy</a> and consent to BAIC contacting me regarding my test drive request and other marketing communications.
              </CheckboxLabel>
            </CheckboxGroup>
            
            <Button type="submit" disabled={!formData.consent}>
              Submit Request
            </Button>
          </Form>
        </FormSection>
        
        <VehiclePreview>
          {selectedVehicle ? (
            <>
              <VehicleImage>
                <img src={selectedVehicle.image} alt={selectedVehicle.name} />
              </VehicleImage>
              
              <VehicleInfo>
                <VehicleName>BAIC {selectedVehicle.name}</VehicleName>
                <VehiclePrice>{selectedVehicle.price}</VehiclePrice>
                
                {selectedVehicle.id === 'x55' && (
                  <>
                    <VehicleDescription>
                      The BAIC X55 combines urban elegance with cutting-edge technology and comfort. Perfect for city driving with a touch of sophistication.
                    </VehicleDescription>
                    <VehicleFeatures>
                      <li>1.5T Turbocharged Engine</li>
                      <li>7-Speed Dual-Clutch Transmission</li>
                      <li>10.25" Touchscreen Infotainment System</li>
                      <li>360° Panoramic Camera</li>
                      <li>Leather Interior</li>
                      <li>5-Year/120,000 km Warranty</li>
                    </VehicleFeatures>
                  </>
                )}
                
                {selectedVehicle.id === 'x55-plus' && (
                  <>
                    <VehicleDescription>
                      The BAIC X55 Plus offers premium performance with enhanced features and luxury touches for a superior driving experience.
                    </VehicleDescription>
                    <VehicleFeatures>
                      <li>1.5T Turbocharged Engine</li>
                      <li>7-Speed Dual-Clutch Transmission</li>
                      <li>12.3" Digital Instrument Cluster</li>
                      <li>Premium Sound System</li>
                      <li>Panoramic Sunroof</li>
                      <li>Advanced Driver Assistance Systems</li>
                      <li>5-Year/150,000 km Warranty</li>
                    </VehicleFeatures>
                  </>
                )}
                
                {selectedVehicle.id === 'x55-dynamic' && (
                  <>
                    <VehicleDescription>
                      The BAIC X55 Dynamic Sport Edition delivers thrilling performance with sporty styling and enhanced driving dynamics.
                    </VehicleDescription>
                    <VehicleFeatures>
                      <li>1.5T High-Output Turbocharged Engine</li>
                      <li>Sport-Tuned Suspension</li>
                      <li>Paddle Shifters</li>
                      <li>Sport Seats with Red Stitching</li>
                      <li>19" Sport Alloy Wheels</li>
                      <li>Sport Body Kit</li>
                      <li>5-Year/150,000 km Warranty</li>
                    </VehicleFeatures>
                  </>
                )}
                
                {selectedVehicle.id === 'b40-plus' && (
                  <>
                    <VehicleDescription>
                      The BAIC B40 Plus is a rugged off-road champion that combines capability with modern comfort for all your adventures.
                    </VehicleDescription>
                    <VehicleFeatures>
                      <li>2.0T Turbocharged Engine</li>
                      <li>6-Speed Automatic Transmission</li>
                      <li>4WD with Low-Range Transfer Case</li>
                      <li>Electronic Locking Differential</li>
                      <li>220mm Ground Clearance</li>
                      <li>800mm Wading Depth</li>
                      <li>5-Year/120,000 km Warranty</li>
                    </VehicleFeatures>
                  </>
                )}
                
                <Button as="a" href={`/vehicles/models/${selectedVehicle.id}`}>
                  View Full Details
                </Button>
              </VehicleInfo>
            </>
          ) : (
            <VehicleInfo>
              <VehicleName>Select a Vehicle</VehicleName>
              <VehicleDescription>
                Please select a vehicle model from the form to see details and specifications.
              </VehicleDescription>
            </VehicleInfo>
          )}
        </VehiclePreview>
      </FormContainer>
    </PageContainer>
  );
};

export default BookTestDrivePage;
