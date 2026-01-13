// Image preloading utility
// Preloads images to prevent loading delays and cache issues

const IMAGE_VERSION = Date.now(); // Cache busting timestamp

/**
 * Preload a single image
 */
export const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        // Add cache busting to ensure fresh images
        img.src = `${src}?v=${IMAGE_VERSION}`;
    });
};

/**
 * Preload multiple images
 */
export const preloadImages = async (sources: string[]): Promise<void> => {
    try {
        await Promise.all(sources.map(src => preloadImage(src)));
        console.log('[Image Preload] Successfully preloaded', sources.length, 'images');
    } catch (error) {
        console.warn('[Image Preload] Some images failed to load:', error);
    }
};

/**
 * Get all quiz icon images that need to be preloaded
 */
export const getQuizIconImages = (): string[] => {
    return [
        // Age icons
        '/assets/3d-age-puppy.png',
        '/assets/3d-age-adult.png',
        '/assets/3d-age-senior.png',
        // Energy icons
        '/assets/3d-energy-tranquilo.png',
        '/assets/3d-energy-activo.png',
        '/assets/3d-energy-hiperactivo.png',
        // Reaction icons
        '/assets/3d-reaction-megaphone.png',
        '/assets/3d-reaction-cloud.png',
        '/assets/3d-reaction-question.png',
        // Behavior icons
        '/assets/3d-behavior-bite.png',
        '/assets/3d-behavior-pee.png',
        '/assets/3d-behavior-leash.png',
        '/assets/3d-behavior-bark.png',
        // Urgency icons
        '/assets/3d-urgency-siren.png',
        '/assets/3d-urgency-alert.png',
        '/assets/3d-urgency-clock.png',
        // Goal icons
        '/assets/3d-goal-heart.png',
        '/assets/3d-goal-speed.png',
        '/assets/3d-goal-bond.png',
        // Revelation
        '/assets/3d-revelation-gift.png',
        // Welcome screen
        '/assets/dog-hero-happy-golden-retriever.png',
        // Ebook mockup
        '/assets/3d-ebook-mockup.png',
    ];
};

/**
 * Add cache busting parameter to image URL
 */
export const addCacheBuster = (src: string): string => {
    return `${src}?v=${IMAGE_VERSION}`;
};
