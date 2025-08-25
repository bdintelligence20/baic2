import React, { useEffect, Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TypeformModal from './components/common/TypeformModal';
import { ModalProvider } from './context/ModalContext';
import { initializeUTMTracking, sendUTMToDataLayer } from './utils/utmTracking';

// Critical Pages (loaded immediately)
import HomePage from './pages/HomePage';

// Lazy-loaded Pages
const ContactUsPage = React.lazy(() => import('./pages/ContactUsPage'));
const FindDealerPage = React.lazy(() => import('./pages/FindDealerPage'));
const BookTestDrivePage = React.lazy(() => import('./pages/BookTestDrivePage'));
const FinancePage = React.lazy(() => import('./pages/FinancePage'));
const OwnersPage = React.lazy(() => import('./pages/OwnersPage'));
const ThankYouPage = React.lazy(() => import('./pages/ThankYouPage'));

// About Us Section Pages
const CompanyOverviewPage = React.lazy(() => import('./pages/about/CompanyOverviewPage'));

// Vehicles Section Pages
const X55Page = React.lazy(() => import('./pages/vehicles/models/X55Page'));
const X55PlusPage = React.lazy(() => import('./pages/vehicles/models/X55PlusPage'));
const X55DynamicPage = React.lazy(() => import('./pages/vehicles/models/X55DynamicPage'));
const B40PlusPage = React.lazy(() => import('./pages/vehicles/models/B40PlusPage'));
const B40HonorEditionPage = React.lazy(() => import('./pages/vehicles/models/B40HonorEditionPage'));

// Promotion Pages
const X55PromotionPage = React.lazy(() => import('./pages/vehicles/promotions/X55PromotionPage'));
const X55PlusPromotionPage = React.lazy(() => import('./pages/vehicles/promotions/X55PlusPromotionPage'));
const X55DynamicPromotionPage = React.lazy(() => import('./pages/vehicles/promotions/X55DynamicPromotionPage'));
const B40PlusPromotionPage = React.lazy(() => import('./pages/vehicles/promotions/B40PlusPromotionPage'));
const B40HonorEditionPromotionPage = React.lazy(() => import('./pages/vehicles/promotions/B40HonorEditionPromotionPage'));

// Load testing utilities in development
if (process.env.NODE_ENV === 'development') {
  import('./utils/utmTestingUtils');
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
    overflow-x: hidden;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  button {
    font-family: 'Roboto', sans-serif;
    border: none;
    outline: none;
    cursor: pointer;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  ul, ol {
    list-style: none;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }
  
  main {
    overflow: hidden;
  }
  
  /* Loading indicator styles */
  .page-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    color: #666;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #e60012;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Loading component for Suspense
const PageLoader = () => (
  <div className="page-loading">
    <div className="loading-spinner"></div>
  </div>
);

// UTM Tracking component that monitors route changes
function UTMTracker() {
  const location = useLocation();

  useEffect(() => {
    // Initialize UTM tracking on component mount and route changes
    initializeUTMTracking();
    
    // Send UTM data to dataLayer after tracking is initialized
    setTimeout(() => {
      sendUTMToDataLayer();
    }, 100);
    
    // Send page view event with UTM data to Google Analytics
    if (window.gtag) {
      window.gtag('config', 'AW-16850199888', {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          utm_source: 'source',
          utm_medium: 'medium', 
          utm_campaign: 'campaign',
          utm_content: 'content'
        }
      });
    }
  }, [location]);

  return null; // This component doesn't render anything
}

function App() {
  return (
    <Router>
      <ModalProvider>
        <GlobalStyle />
        <UTMTracker />
        <Header />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about/company-overview" element={<CompanyOverviewPage />} />
              <Route path="/vehicles/models/x55" element={<X55Page />} />
              <Route path="/vehicles/models/x55-plus" element={<X55PlusPage />} />
              <Route path="/vehicles/models/x55-dynamic" element={<X55DynamicPage />} />
              <Route path="/vehicles/models/b40-plus" element={<B40PlusPage />} />
              <Route path="/vehicles/models/b40-honor-edition" element={<B40HonorEditionPage />} />
              <Route path="/vehicles/promotions/x55" element={<X55PromotionPage />} />
              <Route path="/vehicles/promotions/x55-plus" element={<X55PlusPromotionPage />} />
              <Route path="/vehicles/promotions/x55-dynamic" element={<X55DynamicPromotionPage />} />
              <Route path="/vehicles/promotions/b40-plus" element={<B40PlusPromotionPage />} />
              <Route path="/vehicles/promotions/b40-honor-edition" element={<B40HonorEditionPromotionPage />} />
              <Route path="/find-dealer" element={<FindDealerPage />} />
              <Route path="/book-test-drive" element={<BookTestDrivePage />} />
              <Route path="/thank-you-test-drive" element={<ThankYouPage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/finance" element={<FinancePage />} />
              <Route path="/owners" element={<OwnersPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <TypeformModal />
      </ModalProvider>
    </Router>
  );
}

export default App;
