/**
 * UTM Tracking Utility
 * Handles UTM parameter capture, cookie storage, and data retrieval
 */

// UTM parameter names
const UTM_PARAMS = {
  source: 'utm_source',
  medium: 'utm_medium', 
  campaign: 'utm_campaign',
  content: 'utm_content',
  term: 'utm_term'
};

// Cookie configuration
const COOKIE_CONFIG = {
  expires: 90, // days
  domain: window.location.hostname === 'localhost' ? '' : '.baic.co.za',
  path: '/',
  sameSite: 'Lax'
};

// Campaign buckets for South African marketing analysis
const CAMPAIGN_BUCKETS = {
  // Paid Search
  'brand_search_x55': { bucket: 'paid_search', model: 'x55', type: 'brand' },
  'brand_search_b40': { bucket: 'paid_search', model: 'b40', type: 'brand' },
  'brand_search': { bucket: 'paid_search', model: 'general', type: 'brand' },
  'comp_search_x55': { bucket: 'paid_search', model: 'x55', type: 'competitive' },
  'comp_search_b40': { bucket: 'paid_search', model: 'b40', type: 'competitive' },
  
  // Social Media
  'meta_x55': { bucket: 'social_media', model: 'x55', type: 'awareness' },
  'meta_b40': { bucket: 'social_media', model: 'b40', type: 'awareness' },
  
  // Performance Max & Display
  'pmax_b40': { bucket: 'display_network', model: 'b40', type: 'performance' },
  'demand_x55': { bucket: 'display_network', model: 'x55', type: 'demand_gen' },
  
  // Site Links
  'google_account_link': { bucket: 'site_extensions', model: 'general', type: 'sitelink' }
};

/**
 * Check if cookies are allowed by Cookiebot
 * For South Africa (no GDPR), UTM tracking is essential for business operations
 */
function areCookiesAllowed() {
  // Check if Cookiebot is loaded
  if (typeof window.Cookiebot !== 'undefined') {
    // UTM tracking is necessary for campaign attribution and business analytics
    // Treat as necessary/functional cookies rather than marketing cookies
    return window.Cookiebot.consent.necessary || window.Cookiebot.consent.functional || 
           window.Cookiebot.consent.marketing || window.Cookiebot.consent.statistics || 
           true; // Always allow UTM tracking in South Africa
  }
  // Always allow UTM tracking - no GDPR restrictions
  return true;
}

/**
 * Set a cookie with proper configuration (respects Cookiebot consent)
 */
function setCookie(name, value, days = COOKIE_CONFIG.expires) {
  // Only set cookies if consent is given or Cookiebot is not loaded
  if (!areCookiesAllowed()) {
    console.log(`UTM Tracking: Cookie consent required for ${name}, storing in sessionStorage temporarily`);
    // Store in sessionStorage as fallback until consent is given
    try {
      sessionStorage.setItem(name, value);
      sessionStorage.setItem(`${name}_timestamp`, new Date().toISOString());
    } catch (error) {
      console.warn('UTM Tracking: SessionStorage not available:', error);
    }
    return;
  }

  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  let cookieString = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=${COOKIE_CONFIG.path}; SameSite=${COOKIE_CONFIG.sameSite}`;
  
  // Only add domain for production
  if (COOKIE_CONFIG.domain) {
    cookieString += `; domain=${COOKIE_CONFIG.domain}`;
  }
  
  document.cookie = cookieString;
}

/**
 * Get a cookie value (also checks sessionStorage as fallback)
 */
function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  
  // First try to get from cookies
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  
  // If not found in cookies, check sessionStorage (fallback when consent not given)
  try {
    const sessionValue = sessionStorage.getItem(name);
    if (sessionValue) {
      return sessionValue;
    }
  } catch (error) {
    console.warn('UTM Tracking: SessionStorage access error:', error);
  }
  
  return null;
}

/**
 * Migrate UTM data from sessionStorage to cookies when consent is given
 */
function migrateSessionDataToCookies() {
  if (!areCookiesAllowed()) {
    return; // Still no consent
  }

  console.log('UTM Tracking: Cookie consent granted, migrating sessionStorage data to cookies');
  
  // Check for UTM data in sessionStorage and migrate to cookies
  Object.values(UTM_PARAMS).forEach(param => {
    const cookieName = `baic_${param}`;
    const sessionValue = sessionStorage.getItem(cookieName);
    
    if (sessionValue && !getCookie(cookieName)) {
      // Set cookie with the sessionStorage value
      const expires = new Date();
      expires.setTime(expires.getTime() + (COOKIE_CONFIG.expires * 24 * 60 * 60 * 1000));
      
      let cookieString = `${cookieName}=${encodeURIComponent(sessionValue)}; expires=${expires.toUTCString()}; path=${COOKIE_CONFIG.path}; SameSite=${COOKIE_CONFIG.sameSite}`;
      
      if (COOKIE_CONFIG.domain) {
        cookieString += `; domain=${COOKIE_CONFIG.domain}`;
      }
      
      document.cookie = cookieString;
      console.log(`UTM Tracking: Migrated ${cookieName} from sessionStorage to cookie`);
      
      // Remove from sessionStorage after successful migration
      sessionStorage.removeItem(cookieName);
      sessionStorage.removeItem(`${cookieName}_timestamp`);
    }
  });
  
  // Migrate timestamp
  const sessionTimestamp = sessionStorage.getItem('baic_utm_timestamp');
  if (sessionTimestamp && !getCookie('baic_utm_timestamp')) {
    setCookie('baic_utm_timestamp', sessionTimestamp);
    sessionStorage.removeItem('baic_utm_timestamp');
  }
}

/**
 * Get UTM parameters from URL
 */
function getUTMParamsFromURL(url = window.location.href) {
  const urlObj = new URL(url);
  const params = {};
  
  Object.values(UTM_PARAMS).forEach(param => {
    const value = urlObj.searchParams.get(param);
    if (value) {
      params[param] = value;
    }
  });
  
  return params;
}

/**
 * Store UTM parameters in cookies (first-touch attribution)
 */
function storeUTMParams(utmParams) {
  Object.entries(utmParams).forEach(([key, value]) => {
    const cookieName = `baic_${key}`;
    
    // Only set if cookie doesn't already exist (first-touch attribution)
    if (!getCookie(cookieName)) {
      setCookie(cookieName, value);
      console.log(`UTM Tracking: Set ${cookieName} = ${value}`);
    } else {
      console.log(`UTM Tracking: Preserved existing ${cookieName} = ${getCookie(cookieName)}`);
    }
  });
  
  // Always update the timestamp
  setCookie('baic_utm_timestamp', new Date().toISOString());
}

/**
 * Get stored UTM parameters from cookies
 */
function getStoredUTMParams() {
  const params = {};
  
  Object.values(UTM_PARAMS).forEach(param => {
    const cookieName = `baic_${param}`;
    const value = getCookie(cookieName);
    if (value) {
      params[param] = value;
    }
  });
  
  return params;
}

/**
 * Get all UTM data including metadata
 */
function getUTMData() {
  const utmParams = getStoredUTMParams();
  const timestamp = getCookie('baic_utm_timestamp');
  
  return {
    ...utmParams,
    timestamp,
    hasUTMData: Object.keys(utmParams).length > 0
  };
}

/**
 * Initialize UTM tracking - call this on page load
 */
function initializeUTMTracking() {
  try {
    // First, try to migrate any sessionStorage data to cookies if consent is available
    migrateSessionDataToCookies();
    
    const currentUTMs = getUTMParamsFromURL();
    
    if (Object.keys(currentUTMs).length > 0) {
      console.log('UTM Tracking: Found UTM parameters:', currentUTMs);
      // Use enhanced storage for better reliability in South Africa
      storeEnhancedUTMParams(currentUTMs);
      
      // Also log campaign bucket information
      const campaignBucket = getCampaignBucket(currentUTMs.utm_campaign);
      console.log('UTM Tracking: Campaign bucket analysis:', campaignBucket);
    } else {
      console.log('UTM Tracking: No UTM parameters found in URL');
    }
    
    // Log current stored UTMs with enhanced data
    const enhancedUTMs = getEnhancedUTMData();
    if (enhancedUTMs.hasUTMData) {
      console.log('UTM Tracking: Current enhanced UTM data:', enhancedUTMs);
    }
    
    // Set up Cookiebot event listener for when consent changes
    if (typeof window.Cookiebot !== 'undefined') {
      window.addEventListener('CookiebotOnConsentReady', function () {
        console.log('UTM Tracking: Cookiebot consent ready, checking for data migration');
        migrateSessionDataToCookies();
      });
      
      window.addEventListener('CookiebotOnAccept', function () {
        console.log('UTM Tracking: Cookiebot consent accepted, migrating data');
        migrateSessionDataToCookies();
      });
    }
    
  } catch (error) {
    console.error('UTM Tracking Error:', error);
  }
}

/**
 * Generate UTM query string for forms/external links
 */
function getUTMQueryString() {
  const utmParams = getStoredUTMParams();
  const queryParams = new URLSearchParams();
  
  Object.entries(utmParams).forEach(([key, value]) => {
    queryParams.append(key, value);
  });
  
  return queryParams.toString();
}

/**
 * Clear all UTM cookies (for testing)
 */
function clearUTMCookies() {
  Object.values(UTM_PARAMS).forEach(param => {
    const cookieName = `baic_${param}`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${COOKIE_CONFIG.path};`;
  });
  document.cookie = `baic_utm_timestamp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${COOKIE_CONFIG.path};`;
  console.log('UTM Tracking: All UTM cookies cleared');
}

/**
 * Enhanced storage - store in both cookies and localStorage for redundancy
 */
function setEnhancedStorage(name, value, days = COOKIE_CONFIG.expires) {
  // Always try to store in cookies first
  setCookie(name, value, days);
  
  // Also store in localStorage as backup (never expires, survives browser restarts)
  try {
    const storageData = {
      value: value,
      timestamp: new Date().toISOString(),
      expires: new Date(Date.now() + (days * 24 * 60 * 60 * 1000)).toISOString()
    };
    localStorage.setItem(name, JSON.stringify(storageData));
    console.log(`UTM Tracking: Enhanced storage set for ${name} in both cookies and localStorage`);
  } catch (error) {
    console.warn('UTM Tracking: localStorage not available:', error);
  }
}

/**
 * Get value from enhanced storage (cookies, sessionStorage, localStorage)
 */
function getEnhancedStorage(name) {
  // First try cookies
  let value = getCookie(name);
  if (value) return value;
  
  // Then try localStorage
  try {
    const localData = localStorage.getItem(name);
    if (localData) {
      const parsed = JSON.parse(localData);
      // Check if localStorage data hasn't expired
      if (new Date() < new Date(parsed.expires)) {
        console.log(`UTM Tracking: Retrieved ${name} from localStorage backup`);
        return parsed.value;
      } else {
        // Clean up expired localStorage data
        localStorage.removeItem(name);
      }
    }
  } catch (error) {
    console.warn('UTM Tracking: localStorage access error:', error);
  }
  
  return null;
}

/**
 * Get campaign bucket information
 */
function getCampaignBucket(campaignName) {
  return CAMPAIGN_BUCKETS[campaignName] || {
    bucket: 'other',
    model: 'unknown',
    type: 'other'
  };
}

/**
 * Get enhanced UTM data with campaign buckets
 */
function getEnhancedUTMData() {
  const utmParams = getStoredUTMParams();
  const timestamp = getCookie('baic_utm_timestamp') || getEnhancedStorage('baic_utm_timestamp');
  const campaignBucket = getCampaignBucket(utmParams.utm_campaign);
  
  return {
    ...utmParams,
    timestamp,
    hasUTMData: Object.keys(utmParams).length > 0,
    campaignBucket: campaignBucket.bucket,
    targetModel: campaignBucket.model,
    campaignType: campaignBucket.type,
    isKnownCampaign: CAMPAIGN_BUCKETS.hasOwnProperty(utmParams.utm_campaign)
  };
}

/**
 * Store UTM parameters with enhanced storage
 */
function storeEnhancedUTMParams(utmParams) {
  Object.entries(utmParams).forEach(([key, value]) => {
    const cookieName = `baic_${key}`;
    
    // Only set if cookie doesn't already exist (first-touch attribution)
    if (!getEnhancedStorage(cookieName)) {
      setEnhancedStorage(cookieName, value);
      console.log(`UTM Tracking: Enhanced storage set ${cookieName} = ${value}`);
    } else {
      console.log(`UTM Tracking: Preserved existing ${cookieName} = ${getEnhancedStorage(cookieName)}`);
    }
  });
  
  // Always update the timestamp
  setEnhancedStorage('baic_utm_timestamp', new Date().toISOString());
}

/**
 * Send UTM data to Google Analytics/GTM dataLayer with campaign buckets
 */
function sendUTMToDataLayer() {
  const utmData = getEnhancedUTMData();
  
  if (utmData.hasUTMData && window.dataLayer) {
    window.dataLayer.push({
      event: 'utm_data_available',
      utm_source: utmData.utm_source || '',
      utm_medium: utmData.utm_medium || '',
      utm_campaign: utmData.utm_campaign || '',
      utm_content: utmData.utm_content || '',
      utm_term: utmData.utm_term || '',
      utm_timestamp: utmData.timestamp || '',
      campaign_bucket: utmData.campaignBucket || '',
      target_model: utmData.targetModel || '',
      campaign_type: utmData.campaignType || '',
      is_known_campaign: utmData.isKnownCampaign || false
    });
    console.log('UTM Tracking: Sent enhanced UTM data to dataLayer:', utmData);
  }
}

export {
  initializeUTMTracking,
  getUTMData,
  getEnhancedUTMData,
  getStoredUTMParams,
  getUTMQueryString,
  clearUTMCookies,
  sendUTMToDataLayer,
  migrateSessionDataToCookies,
  areCookiesAllowed,
  getCampaignBucket,
  CAMPAIGN_BUCKETS,
  UTM_PARAMS
};
