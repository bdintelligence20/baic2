import React from 'react';
import ContentTemplate from '../../templates/ContentTemplate';

const CompanyOverviewPage = () => {
  const pageData = {
    title: 'Company Overview',
    description: 'Learn about BAIC, our mission, vision, and what drives us to create exceptional vehicles.',
    sections: [
      { 
        title: 'About BAIC', 
        imageRight: false 
      },
      { 
        title: 'Our Mission & Vision', 
        imageRight: true 
      },
      { 
        title: 'Global Presence', 
        imageRight: false 
      },
      { 
        title: 'Our Values', 
        hasFeatures: true 
      }
    ],
    features: [
      { 
        title: 'Innovation', 
        icon: 'fa-lightbulb', 
        description: 'We constantly push the boundaries of automotive technology to create vehicles that exceed expectations.' 
      },
      { 
        title: 'Quality', 
        icon: 'fa-award', 
        description: 'We are committed to delivering vehicles of the highest quality, built to last and perform.' 
      },
      { 
        title: 'Sustainability', 
        icon: 'fa-leaf', 
        description: 'We strive to minimize our environmental impact and create sustainable mobility solutions.' 
      },
      { 
        title: 'Customer Focus', 
        icon: 'fa-users', 
        description: 'We put our customers at the center of everything we do, listening to their needs and exceeding their expectations.' 
      }
    ],
    cta: {
      title: 'Join Our Journey',
      description: 'Discover career opportunities at BAIC and be part of our global team.',
      buttonText: 'Explore Careers'
    }
  };

  return <ContentTemplate pageData={pageData} />;
};

export default CompanyOverviewPage;
