# BAIC UTM Tracking System - Setup Complete

## ✅ Implementation Summary

The complete UTM tracking system has been successfully implemented for your BAIC website with the following components:

### 🚀 Core Features Implemented

1. **UTM Parameter Capture & Storage**
   - Automatically captures UTM parameters from URL on page load
   - Stores them in persistent cookies with 90-day expiration
   - First-touch attribution (preserves original campaign data)
   - Works across all pages and SPA navigation

2. **Google Conversion Tracking**
   - Google Ads conversion tag (AW-16850199888) implemented
   - Integrated with existing Google Tag Manager (GTM-PQLSHBTB)
   - Sends UTM data to Google Analytics dataLayer
   - Tracks lead form openings and conversions

3. **Typeform Lead Form Integration**
   - UTM parameters automatically passed to Typeform via hidden fields
   - Preserves campaign attribution through form submission
   - Triggers conversion events when form is opened

4. **React Router Integration**
   - UTM tracking works seamlessly with React SPA navigation
   - Maintains UTM data across route changes
   - Initializes on every page load and route change

### 📁 Files Created/Modified

**New Files:**
- `src/utils/utmTracking.js` - Core UTM tracking utility
- `src/utils/utmTestingUtils.js` - Testing and validation tools
- `UTM_TRACKING_SETUP.md` - This documentation

**Modified Files:**
- `public/index.html` - Added Google conversion tracking
- `src/App.js` - Added UTM tracking integration
- `src/components/common/TypeformModal.js` - Added UTM preservation

## 🧪 Testing Your UTM Tracking

### Browser Console Testing

Open your browser's developer console and use these commands:

```javascript
// Run complete test suite
utmTest.runFullSuite()

// Simulate user journey from ad click to form submission
utmTest.simulateJourney()

// Test specific campaigns from your structure
utmTest.simulateVisit('google_brand_x55')
utmTest.simulateVisit('meta_x55')
utmTest.simulateVisit('google_sitelinks_finance')

// Check current UTM data
utmTest.getCurrentData()

// Clear UTM cookies for testing
utmTest.clearCookies()
```

### Manual Testing Steps

1. **Test Campaign URL Landing:**
   ```
   https://yourdomain.com/vehicles/models/x55-plus?utm_source=google&utm_medium=cpc&utm_campaign=brand_search_x55&utm_content=baic
   ```

2. **Navigate to Other Pages:**
   - Visit different pages on your site
   - UTMs should persist (check console logs)

3. **Open Test Drive Form:**
   - Click any "Book Test Drive" button
   - Check browser network tab to see UTM data passed to Typeform

4. **Verify in Analytics:**
   - Check Google Analytics for UTM data in dataLayer
   - Look for conversion events in Google Ads

## 🎯 Your Campaign Structure Support

The system supports all your campaigns from the Excel file:

### X55 Model Campaigns
- ✅ Google Branded: `brand_search_x55`
- ✅ Google Demand Gen: `demand_x55`
- ✅ Meta: `meta_x55`
- ✅ Google Comp Search: `comp_search_x55`

### B40 Model Campaigns
- ✅ Google Branded: `brand_search_b40`
- ✅ Google PMax: `pmax_b40`
- ✅ Meta: `meta_b40`
- ✅ Google Comp Search: `comp_search_b40`

### Site Link Campaigns
- ✅ About Us: `google_account_link` (content: about)
- ✅ Find a Dealer: `google_account_link` (content: find_dealer)
- ✅ Finance: `google_account_link` (content: finance)
- ✅ Owners: `google_account_link` (content: owners)

### Brand Campaign
- ✅ Google Branded: `brand_search`

## 🔍 How It Works

### User Journey Flow
1. **User Clicks Ad** → UTM parameters captured from URL
2. **Parameters Stored** → Saved in cookies with 90-day expiration
3. **User Browses Site** → UTMs persist across all pages
4. **User Opens Form** → UTMs passed as hidden fields to Typeform
5. **Form Submitted** → Campaign attribution preserved in lead data

### Cookie Structure
- `baic_utm_source` - Campaign source (google, meta)
- `baic_utm_medium` - Campaign medium (cpc, organic)
- `baic_utm_campaign` - Campaign name (brand_search_x55)
- `baic_utm_content` - Campaign content (baic, banner_q3)
- `baic_utm_term` - Campaign term (optional)
- `baic_utm_timestamp` - First-touch timestamp

### Analytics Integration
- **Google Tag Manager:** UTM data sent to dataLayer
- **Google Analytics:** Custom events with UTM parameters
- **Google Ads:** Conversion tracking with campaign attribution

## 🚨 Important Notes

### First-Touch Attribution
- System preserves **first campaign** that brought the user
- Subsequent visits with different UTMs won't override original attribution
- This ensures accurate campaign ROI measurement

### Cookie Configuration & GDPR Compliance
- **Cookiebot Integration:** Full GDPR compliance with consent management
- **Cookiebot ID:** `887403b9-b471-4475-9806-9a9406e35b2f`
- **Domain:** `.baic.co.za` (works across all subdomains)
- **Expiration:** 90 days
- **SameSite:** Lax (GDPR compliant)
- **Development:** Works on localhost without domain
- **Consent Fallback:** Uses sessionStorage when cookie consent not granted
- **Auto-Migration:** Moves data from sessionStorage to cookies when consent is given

### Typeform Integration
- UTM data passed via `data-tf-hidden` attribute
- Parameters appear as hidden fields in Typeform
- You'll need to add corresponding fields in your Typeform to capture the data

## 🛠 Maintenance & Monitoring

### Regular Checks
1. **Monthly:** Run `utmTest.runFullSuite()` to verify functionality
2. **Campaign Launch:** Test new campaign UTM structures
3. **Analytics Review:** Check UTM data quality in Google Analytics

### Troubleshooting
- **No UTMs Captured:** Check browser console for error messages
- **Form Not Receiving UTMs:** Verify Typeform has corresponding hidden fields
- **Analytics Missing Data:** Check dataLayer events in browser console

## 📊 Expected Analytics Events

### Google Analytics/GTM Events
- `utm_data_available` - When UTM data is captured
- `lead_form_opened` - When test drive form is opened
- Page views with UTM parameters attached

### Google Ads Conversions
- Form openings tracked as conversion events
- UTM data attached for campaign attribution
- Conversion values can be configured in Google Ads

## 🎉 System Benefits

✅ **Complete Attribution:** Track users from ad click to lead submission  
✅ **Campaign Performance:** Accurate ROI measurement for all campaigns  
✅ **Data Preservation:** UTMs survive page navigation and return visits  
✅ **Analytics Integration:** Seamless data flow to Google Analytics/Ads  
✅ **Testing Tools:** Built-in utilities for validation and troubleshooting  
✅ **GDPR Compliant:** Proper cookie configuration and consent handling  

Your UTM tracking system is now fully operational and ready to capture comprehensive campaign attribution data!
