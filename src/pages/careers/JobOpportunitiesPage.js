import React from 'react';
import styled from 'styled-components';
import Placeholder from '../../components/common/Placeholder';

const JobsContainer = styled.div`
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

const FiltersSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

const FilterLabel = styled.span`
  font-weight: 600;
  color: #333;
  margin-right: 0.5rem;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 0.9rem;
  color: #333;
  min-width: 180px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  flex-grow: 1;
  min-width: 250px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const JobsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const JobCard = styled.div`
  background-color: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const JobTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const JobLocation = styled.div`
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const JobType = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background-color: ${props => props.$color || '#e6f7ed'};
  color: ${props => props.$textColor || '#00a651'};
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 30px;
  white-space: nowrap;
`;

const JobDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const JobDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const JobDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const JobFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const JobDate = styled.span`
  font-size: 0.85rem;
  color: #999;
`;

const ApplyButton = styled.button`
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.$active ? 'var(--primary-color)' : 'var(--border-color)'};
  background-color: ${props => props.$active ? 'var(--primary-color)' : 'var(--background-color)'};
  color: ${props => props.$active ? 'var(--primary-color-text)' : 'var(--text-color)'};
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-color-hover)' : 'var(--light-background-color)'};
  }
`;

const JobOpportunitiesPage = () => {
  const jobListings = [
    {
      id: 1,
      title: "Senior Software Engineer - Infotainment Systems",
      location: "Shanghai, China",
      type: "Full-time",
      typeColor: "#e6f7ed",
      typeTextColor: "#00a651",
      department: "Research & Development",
      experience: "5+ years",
      salary: "$80,000 - $120,000",
      description: "We are seeking an experienced Software Engineer to join our Infotainment Systems team. In this role, you will design, develop, and maintain software for our next-generation vehicle infotainment systems, focusing on user experience, performance, and reliability.",
      postedDate: "April 2, 2025"
    },
    {
      id: 2,
      title: "Automotive Design Engineer",
      location: "Beijing, China",
      type: "Full-time",
      typeColor: "#e6f7ed",
      typeTextColor: "#00a651",
      department: "Design",
      experience: "3+ years",
      salary: "$70,000 - $95,000",
      description: "Join our design team to create innovative and aesthetically pleasing vehicle designs. You will collaborate with cross-functional teams to develop exterior and interior design concepts that align with BAIC's brand identity while meeting functional requirements and manufacturing constraints.",
      postedDate: "April 1, 2025"
    },
    {
      id: 3,
      title: "Marketing Specialist - Digital Campaigns",
      location: "Johannesburg, South Africa",
      type: "Full-time",
      typeColor: "#e6f7ed",
      typeTextColor: "#00a651",
      department: "Marketing",
      experience: "2+ years",
      salary: "$50,000 - $65,000",
      description: "We're looking for a creative and data-driven Marketing Specialist to develop and execute digital marketing campaigns for our African market. You will be responsible for creating engaging content, managing social media platforms, and analyzing campaign performance to drive brand awareness and customer engagement.",
      postedDate: "March 28, 2025"
    },
    {
      id: 4,
      title: "Supply Chain Analyst",
      location: "Remote",
      type: "Contract",
      typeColor: "#f0e6ff",
      typeTextColor: "#7b5dfa",
      department: "Operations",
      experience: "2+ years",
      salary: "$60,000 - $75,000",
      description: "As a Supply Chain Analyst, you will analyze supply chain data, identify optimization opportunities, and develop strategies to improve efficiency and reduce costs. This role requires strong analytical skills and experience with supply chain management systems.",
      postedDate: "March 25, 2025"
    },
    {
      id: 5,
      title: "Electric Vehicle Battery Engineer",
      location: "Munich, Germany",
      type: "Full-time",
      typeColor: "#e6f7ed",
      typeTextColor: "#00a651",
      department: "Engineering",
      experience: "4+ years",
      salary: "€65,000 - €85,000",
      description: "Join our EV Battery Engineering team to design, develop, and test battery systems for our electric vehicle lineup. You will work on improving battery performance, safety, and longevity while collaborating with cross-functional teams to integrate battery systems into vehicle designs.",
      postedDate: "March 22, 2025"
    },
    {
      id: 6,
      title: "Manufacturing Engineering Intern",
      location: "Detroit, USA",
      type: "Internship",
      typeColor: "#fff2e6",
      typeTextColor: "#ff8c00",
      department: "Manufacturing",
      experience: "Student",
      salary: "$25/hour",
      description: "This internship provides hands-on experience in automotive manufacturing engineering. You will assist in process improvement projects, quality control initiatives, and production line optimization. Ideal for engineering students interested in automotive manufacturing.",
      postedDate: "March 20, 2025"
    }
  ];

  return (
    <JobsContainer>
      <PageHeader>
        <PageTitle>Job Opportunities</PageTitle>
        <PageDescription>
          Discover exciting career opportunities at BAIC. We offer positions across various departments 
          and locations, providing competitive compensation and benefits along with opportunities for 
          professional growth and development.
        </PageDescription>
      </PageHeader>

      <FiltersSection>
        <FilterGroup>
          <FilterLabel>Department:</FilterLabel>
          <FilterSelect>
            <option value="">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="operations">Operations</option>
            <option value="rd">Research & Development</option>
            <option value="manufacturing">Manufacturing</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Location:</FilterLabel>
          <FilterSelect>
            <option value="">All Locations</option>
            <option value="china">China</option>
            <option value="usa">USA</option>
            <option value="germany">Germany</option>
            <option value="south-africa">South Africa</option>
            <option value="remote">Remote</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Job Type:</FilterLabel>
          <FilterSelect>
            <option value="">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </FilterSelect>
        </FilterGroup>
        
        <SearchInput placeholder="Search job titles, skills, or keywords..." />
      </FiltersSection>

      <JobsList>
        {jobListings.map(job => (
          <JobCard key={job.id}>
            <JobHeader>
              <div>
                <JobTitle>{job.title}</JobTitle>
                <JobLocation>
                  <i className="fas fa-map-marker-alt"></i>
                  {job.location}
                </JobLocation>
              </div>
              <JobType $color={job.typeColor} $textColor={job.typeTextColor}>
                {job.type}
              </JobType>
            </JobHeader>
            
            <JobDetails>
              <JobDetail>
                <i className="fas fa-briefcase"></i>
                {job.department}
              </JobDetail>
              <JobDetail>
                <i className="fas fa-user-graduate"></i>
                {job.experience}
              </JobDetail>
              <JobDetail>
                <i className="fas fa-money-bill-wave"></i>
                {job.salary}
              </JobDetail>
            </JobDetails>
            
            <JobDescription>{job.description}</JobDescription>
            
            <JobFooter>
              <JobDate>Posted: {job.postedDate}</JobDate>
              <ApplyButton>Apply Now</ApplyButton>
            </JobFooter>
          </JobCard>
        ))}
      </JobsList>

      <Pagination>
        <PageButton $active={true}>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton>
          <i className="fas fa-chevron-right"></i>
        </PageButton>
      </Pagination>
    </JobsContainer>
  );
};

export default JobOpportunitiesPage;
