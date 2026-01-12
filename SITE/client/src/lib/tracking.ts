// Meta Pixel Tracking Utility
// This file provides helper functions to track events with Meta Pixel (Facebook Pixel)

// TypeScript declaration for fbq
declare global {
    interface Window {
        fbq: (action: string, event: string, params?: Record<string, any>) => void;
    }
}

/**
 * Track a standard Facebook event
 * @param event - Standard event name (e.g., 'PageView', 'Lead', 'InitiateCheckout')
 * @param params - Additional parameters to send with the event
 */
export const trackEvent = (event: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', event, params);
        console.log(`[Meta Pixel] Event tracked: ${event}`, params);
    } else {
        console.warn('[Meta Pixel] fbq not found - event not tracked:', event);
    }
};

/**
 * Track a custom Facebook event
 * @param event - Custom event name
 * @param params - Additional parameters to send with the event
 */
export const trackCustomEvent = (event: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', event, params);
        console.log(`[Meta Pixel] Custom event tracked: ${event}`, params);
    } else {
        console.warn('[Meta Pixel] fbq not found - custom event not tracked:', event);
    }
};

/**
 * Track quiz step progression
 * @param stepIndex - Current step index (0-based)
 * @param stepId - Step identifier (e.g., 'name', 'age', 'energy')
 * @param stepType - Type of step (e.g., 'text', 'single', 'multiple')
 */
export const trackQuizStep = (stepIndex: number, stepId: string, stepType: string) => {
    trackCustomEvent('QuizStep', {
        step_index: stepIndex,
        step_id: stepId,
        step_type: stepType,
        progress_percentage: Math.round((stepIndex / 8) * 100), // 8 total steps before revelation
    });
};

/**
 * Track revelation screen (when user sees their result)
 * @param dogName - Name of the dog
 * @param compatibilityScore - Compatibility score (e.g., 88)
 */
export const trackRevelation = (dogName: string, compatibilityScore: number = 88) => {
    // Track as Lead event (standard event)
    trackEvent('Lead', {
        content_name: 'Quiz Result Revealed',
        dog_name: dogName,
        compatibility_score: compatibilityScore,
    });

    // Also track custom event for more detailed analytics
    trackCustomEvent('RevelationViewed', {
        dog_name: dogName,
        compatibility_score: compatibilityScore,
    });
};

/**
 * Track when user lands on sales page
 * @param dogName - Name of the dog
 */
export const trackSalesPageView = (dogName: string) => {
    trackEvent('InitiateCheckout', {
        content_name: 'Sales Page View',
        dog_name: dogName,
        currency: 'MXN',
        value: 149,
    });
};

/**
 * Track CTA button clicks
 * @param buttonLocation - Where the button was clicked (e.g., 'hero', 'pricing', 'sticky')
 * @param dogName - Name of the dog
 */
export const trackCTAClick = (buttonLocation: string, dogName: string) => {
    trackEvent('AddToCart', {
        content_name: 'CTA Button Click',
        button_location: buttonLocation,
        dog_name: dogName,
        currency: 'MXN',
        value: 149,
    });
};

/**
 * Track welcome screen view
 */
export const trackWelcomeView = () => {
    trackEvent('ViewContent', {
        content_name: 'Welcome Screen',
        content_type: 'quiz_start',
    });
};
