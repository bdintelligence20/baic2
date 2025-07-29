import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TypeformModal from './components/common/TypeformModal';
import { ModalProvider } from './context/ModalContext';

// Pages
import HomePage from './pages/HomePage';
import ContactUsPage from './pages/ContactUsPage';
import FindDealerPage from './pages/FindDealerPage';
import BookTestDrivePage from './pages/BookTestDrivePage';
import FinancePage from './pages/FinancePage';
import OwnersPage from './pages/OwnersPage';

// About Us Section Pages
import CompanyOverviewPage from './pages/about/CompanyOverviewPage';

// Vehicles Section Pages
import X55Page from './pages/vehicles/models/X55Page';
import X55PlusPage from './pages/vehicles/models/X55PlusPage';
import X55DynamicPage from './pages/vehicles/models/X55DynamicPage';
import B40PlusPage from './pages/vehicles/models/B40PlusPage';
import B40HonorEditionPage from './pages/vehicles/models/B40HonorEditionPage';

// Promotion Pages
import X55PromotionPage from './pages/vehicles/promotions/X55PromotionPage';
import X55PlusPromotionPage from './pages/vehicles/promotions/X55PlusPromotionPage';
import X55DynamicPromotionPage from './pages/vehicles/promotions/X55DynamicPromotionPage';
import B40PlusPromotionPage from './pages/vehicles/promotions/B40PlusPromotionPage';
import B40HonorEditionPromotionPage from './pages/vehicles/promotions/B40HonorEditionPromotionPage';

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
`;

function App() {
  return (
    <Router>
      <ModalProvider>
        <GlobalStyle />
        <Header />
        <main>
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
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/owners" element={<OwnersPage />} />
          </Routes>
        </main>
        <Footer />
        <TypeformModal />
      </ModalProvider>
    </Router>
  );
}

export default App;
