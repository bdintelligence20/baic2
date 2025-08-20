/**
 * UTM Tracking Testing and Validation Utilities
 * Provides tools to test and validate UTM tracking functionality
 */

import { 
  initializeUTMTracking, 
  getUTMData, 
  getStoredUTMParams, 
  getUTMQueryString, 
  clearUTMCookies,
  sendUTMToDataLayer,
  UTM_PARAMS 
} from './utmTracking';

// Test UTM configurations from your campaign structure
const TEST_CAMPAIGNS = {
  google_brand_x55: {
    utm_source: 'google',
    utm_medium: 'cpc', 
    utm_campaign: 'brand_search_x55',
    utm_content: 'baic'
  },
  google_brand_b40: {
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'brand_search_b40', 
    utm_content: 'baic'
  },
  meta_x55: {
    utm_source: 'meta',
    utm_medium: 'cpc',
    utm_campaign: 'meta_x55',
    utm_content: 'banner_q3'
  },
  meta_b40: {
    utm_source: 'meta',
    utm_medium: 'cpc',
    utm_campaign: 'meta_b40',
    utm_content: 'baic_q3'
  },
  google_pmax_b40: {
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'pmax_b40',
    utm_content: 'baic'
  },
  google_sitelinks_finance: {
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'google_account_link',
    utm_content: 'finance'
  }
};

/**
 * Simulate visiting a page with UTM parameters
 */
function simulateUTMVisit(campaignKey) {
  const campaign = TEST_CAMPAIGNS[campaignKey];
  if (!campaign) {
    console.error(`UTM Test: Campaign '${campaignKey}' not found. Available campaigns:`, Object.keys(TEST_CAMPAIGNS));
    return false;
  }

  // Build test URL with UTM parameters
  const baseUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams(campaign);
  const testUrl = `${baseUrl}?${params.toString()}`;
  
  console.log(`UTM Test: Simulating visit from ${campaignKey}`);
  console.log(`UTM Test: Test URL: ${testUrl}`);
  console.log(`UTM Test: Campaign data:`, campaign);
  
  // Update browser history to include UTM parameters
  window.history.replaceState({}, '', testUrl);
  
  // Initialize tracking with new URL
  initializeUTMTracking();
  
  return true;
}

/**
 * Test UTM cookie storage and retrieval
 */
function testUTMCookieFlow() {
  console.log('\n=== UTM Cookie Flow Test ===');
  
  // Clear existing cookies
  clearUTMCookies();
  console.log('1. Cleared existing UTM cookies');
  
  // Test with Google Brand X55 campaign
  const testCampaign = TEST_CAMPAIGNS.google_brand_x55;
  const baseUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams(testCampaign);
  const testUrl = `${baseUrl}?${params.toString()}`;
  
  window.history.replaceState({}, '', testUrl);
  console.log('2. Set test URL with UTM parameters:', testUrl);
  
  // Initialize tracking
  initializeUTMTracking();
  console.log('3. Initialized UTM tracking');
  
  // Verify storage
  const storedUtms = getStoredUTMParams();
  console.log('4. Retrieved stored UTMs:', storedUtms);
  
  const utmData = getUTMData();
  console.log('5. Full UTM data:', utmData);
  
  // Test query string generation
  const queryString = getUTMQueryString();
  console.log('6. Generated query string:', queryString);
  
  // Test second visit (should preserve first-touch)
  console.log('\n--- Testing First-Touch Attribution ---');
  const secondCampaign = TEST_CAMPAIGNS.meta_x55;
  const secondParams = new URLSearchParams(secondCampaign);
  const secondUrl = `${baseUrl}?${secondParams.toString()}`;
  
  window.history.replaceState({}, '', secondUrl);
  console.log('7. Second visit URL:', secondUrl);
  
  initializeUTMTracking();
  const finalUtms = getStoredUTMParams();
  console.log('8. UTMs after second visit (should be unchanged):', finalUtms);
  
  return {
    firstVisit: storedUtms,
    secondVisit: finalUtms,
    preserved: JSON.stringify(storedUtms) === JSON.stringify(finalUtms)
  };
}

/**
 * Test all campaign configurations
 */
function testAllCampaigns() {
  console.log('\n=== Testing All Campaign Configurations ===');
  
  Object.keys(TEST_CAMPAIGNS).forEach((campaignKey, index) => {
    console.log(`\n${index + 1}. Testing ${campaignKey}:`);
    
    // Clear cookies for each test
    clearUTMCookies();
    
    // Simulate visit
    simulateUTMVisit(campaignKey);
    
    // Verify data
    const utmData = getUTMData();
    const expected = TEST_CAMPAIGNS[campaignKey];
    
    let isValid = true;
    Object.entries(expected).forEach(([key, value]) => {
      if (utmData[key] !== value) {
        console.error(`   ❌ ${key}: expected '${value}', got '${utmData[key]}'`);
        isValid = false;
      } else {
        console.log(`   ✅ ${key}: ${value}`);
      }
    });
    
    console.log(`   Result: ${isValid ? '✅ PASS' : '❌ FAIL'}`);
  });
}

/**
 * Test Typeform integration
 */
function testTypeformIntegration() {
  console.log('\n=== Testing Typeform Integration ===');
  
  // Set up test campaign
  clearUTMCookies();
  simulateUTMVisit('google_brand_x55');
  
  const utmData = getUTMData();
  console.log('Current UTM data:', utmData);
  
  // Simulate what TypeformModal would do
  const hiddenFields = [];
  if (utmData.utm_source) hiddenFields.push(`utm_source=${encodeURIComponent(utmData.utm_source)}`);
  if (utmData.utm_medium) hiddenFields.push(`utm_medium=${encodeURIComponent(utmData.utm_medium)}`);
  if (utmData.utm_campaign) hiddenFields.push(`utm_campaign=${encodeURIComponent(utmData.utm_campaign)}`);
  if (utmData.utm_content) hiddenFields.push(`utm_content=${encodeURIComponent(utmData.utm_content)}`);
  if (utmData.utm_term) hiddenFields.push(`utm_term=${encodeURIComponent(utmData.utm_term)}`);
  
  const hiddenFieldString = hiddenFields.length > 0 ? `#${hiddenFields.join('&')}` : '';
  
  console.log('Hidden fields for Typeform:', hiddenFieldString);
  console.log('Full Typeform URL would be:');
  console.log(`https://form.typeform.com/to/01JPEYYA5810GD51WEN8QMQAEJ${hiddenFieldString}`);
  
  return hiddenFieldString;
}

/**
 * Test dataLayer integration
 */
function testDataLayerIntegration() {
  console.log('\n=== Testing DataLayer Integration ===');
  
  // Set up test campaign
  clearUTMCookies();
  simulateUTMVisit('meta_x55');
  
  // Mock dataLayer if it doesn't exist
  if (!window.dataLayer) {
    window.dataLayer = [];
    console.log('Created mock dataLayer');
  }
  
  const initialLength = window.dataLayer.length;
  console.log(`DataLayer initial length: ${initialLength}`);
  
  // Send UTM data to dataLayer
  sendUTMToDataLayer();
  
  const finalLength = window.dataLayer.length;
  console.log(`DataLayer final length: ${finalLength}`);
  
  if (finalLength > initialLength) {
    const lastEvent = window.dataLayer[window.dataLayer.length - 1];
    console.log('Last dataLayer event:', lastEvent);
    return true;
  } else {
    console.error('No new events added to dataLayer');
    return false;
  }
}

/**
 * Run comprehensive UTM tracking test suite
 */
function runFullTestSuite() {
  console.log('🚀 Starting BAIC UTM Tracking Test Suite');
  console.log('==========================================\n');
  
  const results = {
    cookieFlow: null,
    campaigns: null,
    typeform: null,
    dataLayer: null
  };
  
  try {
    // Test cookie flow
    results.cookieFlow = testUTMCookieFlow();
    
    // Test all campaigns
    testAllCampaigns();
    results.campaigns = true;
    
    // Test Typeform integration
    results.typeform = testTypeformIntegration();
    
    // Test dataLayer integration
    results.dataLayer = testDataLayerIntegration();
    
    console.log('\n🎉 Test Suite Complete!');
    console.log('========================');
    console.log('Results summary:');
    console.log(`Cookie Flow: ${results.cookieFlow.preserved ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Campaigns: ${results.campaigns ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Typeform: ${results.typeform ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`DataLayer: ${results.dataLayer ? '✅ PASS' : '❌ FAIL'}`);
    
  } catch (error) {
    console.error('Test suite error:', error);
  }
  
  return results;
}

/**
 * Quick test - simulate a user journey
 */
function simulateUserJourney() {
  console.log('\n🎭 Simulating User Journey');
  console.log('==========================');
  
  // Clear state
  clearUTMCookies();
  
  // Step 1: User clicks Google ad for X55 Plus
  console.log('1. User clicks Google ad for X55 Plus...');
  simulateUTMVisit('google_brand_x55');
  
  // Step 2: User browses to different pages (UTMs should persist)
  console.log('2. User navigates to finance page (no UTMs in URL)...');
  window.history.replaceState({}, '', '/finance');
  initializeUTMTracking();
  
  let currentUtms = getUTMData();
  console.log('   UTMs after navigation:', currentUtms);
  
  // Step 3: User opens test drive form
  console.log('3. User opens test drive form...');
  const hiddenFields = testTypeformIntegration();
  
  console.log('\n✨ Journey Complete!');
  console.log(`UTMs preserved throughout: ${currentUtms.hasUTMData ? '✅ YES' : '❌ NO'}`);
  console.log(`Form will receive UTMs: ${hiddenFields ? '✅ YES' : '❌ NO'}`);
}

// Expose testing functions to window for console access
if (typeof window !== 'undefined') {
  window.utmTest = {
    simulateVisit: simulateUTMVisit,
    testCookieFlow: testUTMCookieFlow,
    testAllCampaigns: testAllCampaigns,
    testTypeform: testTypeformIntegration,
    testDataLayer: testDataLayerIntegration,
    runFullSuite: runFullTestSuite,
    simulateJourney: simulateUserJourney,
    clearCookies: clearUTMCookies,
    getCurrentData: getUTMData,
    campaigns: TEST_CAMPAIGNS
  };
  
  console.log('🔧 UTM Testing utilities loaded!');
  console.log('Available functions:');
  console.log('- utmTest.runFullSuite() - Run complete test suite');
  console.log('- utmTest.simulateJourney() - Simulate user journey');
  console.log('- utmTest.simulateVisit("campaignKey") - Test specific campaign');
  console.log('- utmTest.getCurrentData() - Show current UTM data');
  console.log('- utmTest.clearCookies() - Clear all UTM cookies');
  console.log('Available campaigns:', Object.keys(TEST_CAMPAIGNS));
}

export {
  simulateUTMVisit,
  testUTMCookieFlow,
  testAllCampaigns,
  testTypeformIntegration,
  testDataLayerIntegration,
  runFullTestSuite,
  simulateUserJourney,
  TEST_CAMPAIGNS
};
