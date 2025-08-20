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

/**
 * Check if cookies are allowed by Cookiebot
 */
function areCookiesAllowed() {
  // Check if Cookiebot is loaded
  if (typeof window.Cookiebot !== 'undefined') {
    // Check if marketing/statistics cookies are allowed (UTM tracking falls under marketing)
    return window.Cookiebot.consent.marketing || window.Cookiebot.consent.statistics;
  }
  // If Cookiebot is not loaded, assume cookies are allowed (fallback)
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
      storeUTMParams(currentUTMs);
    } else {
      console.log('UTM Tracking: No UTM parameters found in URL');
    }
    
    // Log current stored UTMs
    const storedUTMs = getStoredUTMParams();
    if (Object.keys(storedUTMs).length > 0) {
      console.log('UTM Tracking: Current stored UTMs:', storedUTMs);
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
 * Send UTM data to Google Analytics/GTM dataLayer
 */
function sendUTMToDataLayer() {
  const utmData = getUTMData();
  
  if (utmData.hasUTMData && window.dataLayer) {
    window.dataLayer.push({
      event: 'utm_data_available',
      utm_source: utmData.utm_source || '',
      utm_medium: utmData.utm_medium || '',
      utm_campaign: utmData.utm_campaign || '',
      utm_content: utmData.utm_content || '',
      utm_term: utmData.utm_term || '',
      utm_timestamp: utmData.timestamp || ''
    });
    console.log('UTM Tracking: Sent UTM data to dataLayer:', utmData);
  }
}

export {
  initializeUTMTracking,
  getUTMData,
  getStoredUTMParams,
  getUTMQueryString,
  clearUTMCookies,
  sendUTMToDataLayer,
  migrateSessionDataToCookies,
  areCookiesAllowed,
  UTM_PARAMS
};
