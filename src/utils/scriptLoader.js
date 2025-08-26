// Script loading utility for performance optimization
// Intelligently loads third-party scripts only when needed

class ScriptLoader {
  constructor() {
    this.loadedScripts = new Set();
    this.loadingPromises = new Map();
  }

  /**
   * Load a script dynamically with caching and error handling
   * @param {string} src - Script URL
   * @param {Object} options - Loading options
   * @returns {Promise} - Promise that resolves when script loads
   */
  async loadScript(src, options = {}) {
    const {
      id = null,
      defer = true,
      async = true,
      attributes = {},
      timeout = 10000
    } = options;

    // Return cached promise if already loading
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src);
    }

    // Return resolved promise if already loaded
    if (this.loadedScripts.has(src)) {
      return Promise.resolve();
    }

    // Check if script already exists in DOM
    if (id && document.getElementById(id)) {
      this.loadedScripts.add(src);
      return Promise.resolve();
    }

    const loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.defer = defer;
      script.async = async;

      if (id) script.id = id;

      // Add custom attributes
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });

      // Timeout handling
      const timeoutId = setTimeout(() => {
        script.remove();
        this.loadingPromises.delete(src);
        reject(new Error(`Script loading timeout: ${src}`));
      }, timeout);

      script.onload = () => {
        clearTimeout(timeoutId);
        this.loadedScripts.add(src);
        this.loadingPromises.delete(src);
        console.log(`✅ Script loaded: ${src}`);
        resolve();
      };

      script.onerror = () => {
        clearTimeout(timeoutId);
        script.remove();
        this.loadingPromises.delete(src);
        console.error(`❌ Script failed to load: ${src}`);
        reject(new Error(`Failed to load script: ${src}`));
      };

      document.head.appendChild(script);
    });

    this.loadingPromises.set(src, loadPromise);
    return loadPromise;
  }

  /**
   * Load multiple scripts in parallel
   * @param {Array} scripts - Array of script configs
   * @returns {Promise} - Promise that resolves when all scripts load
   */
  async loadScripts(scripts) {
    const loadPromises = scripts.map(script => {
      if (typeof script === 'string') {
        return this.loadScript(script);
      }
      return this.loadScript(script.src, script.options || {});
    });

    try {
      await Promise.all(loadPromises);
      console.log('✅ All scripts loaded successfully');
    } catch (error) {
      console.error('❌ Some scripts failed to load:', error);
      throw error;
    }
  }

  /**
   * Load scripts sequentially (one after another)
   * @param {Array} scripts - Array of script configs
   * @returns {Promise} - Promise that resolves when all scripts load
   */
  async loadScriptsSequentially(scripts) {
    for (const script of scripts) {
      try {
        if (typeof script === 'string') {
          await this.loadScript(script);
        } else {
          await this.loadScript(script.src, script.options || {});
        }
      } catch (error) {
        console.error('❌ Script failed in sequence:', error);
        throw error;
      }
    }
    console.log('✅ All scripts loaded sequentially');
  }

  /**
   * Check if a script is loaded
   * @param {string} src - Script URL
   * @returns {boolean} - Whether script is loaded
   */
  isLoaded(src) {
    return this.loadedScripts.has(src);
  }

  /**
   * Load Typeform embed script
   * @returns {Promise} - Promise that resolves when Typeform is ready
   */
  async loadTypeform() {
    await this.loadScript('https://embed.typeform.com/next/embed.js', {
      id: 'typeform-embed',
      async: true
    });
    
    // Wait for Typeform to be available - NO AUTO-INITIALIZATION
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 100; // 10 seconds max wait
      
      const checkTypeform = () => {
        attempts++;
        
        // Just check if API is available, don't initialize anything
        if (window.tf && window.tf.live) {
          console.log('✅ Typeform API is ready - no auto-initialization');
          resolve();
        } else if (attempts >= maxAttempts) {
          console.error('❌ Typeform API failed to load after 10 seconds');
          reject(new Error('Typeform API timeout'));
        } else {
          setTimeout(checkTypeform, 100);
        }
      };
      
      checkTypeform();
    });
  }

  /**
   * Load reCAPTCHA script
   * @returns {Promise} - Promise that resolves when reCAPTCHA is ready
   */
  async loadRecaptcha() {
    await this.loadScript('https://www.google.com/recaptcha/api.js', {
      id: 'recaptcha-script',
      async: true,
      defer: true
    });
  }

  /**
   * Load Stripe script
   * @returns {Promise} - Promise that resolves when Stripe is ready
   */
  async loadStripe() {
    await this.loadScript('https://js.stripe.com/v3/', {
      id: 'stripe-script',
      async: true
    });
    
    // Wait for Stripe to be available
    return new Promise((resolve) => {
      const checkStripe = () => {
        if (window.Stripe) {
          resolve();
        } else {
          setTimeout(checkStripe, 100);
        }
      };
      checkStripe();
    });
  }

  /**
   * Defer Google Analytics until user interaction
   */
  loadAnalyticsOnInteraction() {
    let loaded = false;
    
    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;

      // Load GTM
      if (!this.isLoaded('gtm')) {
        const script = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PQLSHBTB');`;
        
        const scriptElement = document.createElement('script');
        scriptElement.innerHTML = script;
        document.head.appendChild(scriptElement);
        this.loadedScripts.add('gtm');
      }

      // Load Google Analytics
      this.loadScripts([
        'https://www.googletagmanager.com/gtag/js?id=AW-16850199888'
      ]).then(() => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'AW-16850199888');
        console.log('✅ Analytics loaded on interaction');
      });

      // Remove event listeners after loading
      document.removeEventListener('click', loadAnalytics);
      document.removeEventListener('scroll', loadAnalytics);
      document.removeEventListener('keydown', loadAnalytics);
      document.removeEventListener('mousemove', loadAnalytics);
    };

    // Load analytics on first user interaction
    document.addEventListener('click', loadAnalytics, { once: true, passive: true });
    document.addEventListener('scroll', loadAnalytics, { once: true, passive: true });
    document.addEventListener('keydown', loadAnalytics, { once: true, passive: true });
    document.addEventListener('mousemove', loadAnalytics, { once: true, passive: true });

    // Fallback: load after 5 seconds if no interaction
    setTimeout(loadAnalytics, 5000);
  }
}

// Create global instance
const scriptLoader = new ScriptLoader();

// Utility functions for common use cases
export const loadTypeform = () => scriptLoader.loadTypeform();
export const loadRecaptcha = () => scriptLoader.loadRecaptcha();
export const loadStripe = () => scriptLoader.loadStripe();
export const loadAnalyticsOnInteraction = () => scriptLoader.loadAnalyticsOnInteraction();

export default scriptLoader;
