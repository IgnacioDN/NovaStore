// Utility functions for handling broken images from FakeStore API

/**
 * Fixes broken image URLs from FakeStore API
 * @param {string} imageUrl - Original image URL
 * @returns {string} - Fixed image URL
 */
export const fixImageUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return getPlaceholderImage();
  }

  try {
    // If it's already a working image, return as is
    if (imageUrl.includes('fakestoreapi.com/img/') && imageUrl.endsWith('.png')) {
      return imageUrl;
    }

    // Fix common issues with FakeStore API images
    let fixedUrl = imageUrl;

    // Replace .jpg with .png and add 't' suffix if missing
    if (fixedUrl.includes('fakestoreapi.com/img/')) {
      // Extract the base filename without extension
      const urlParts = fixedUrl.split('/');
      const filename = urlParts[urlParts.length - 1];
      const baseFilename = filename.replace(/\.(jpg|jpeg)$/i, '');
      
      // Add 't' suffix if missing and use .png extension
      if (!baseFilename.endsWith('t')) {
        const newFilename = baseFilename + 't.png';
        urlParts[urlParts.length - 1] = newFilename;
        fixedUrl = urlParts.join('/');
      } else {
        // Just change extension to .png
        fixedUrl = fixedUrl.replace(/\.(jpg|jpeg)$/i, '.png');
      }
    }

    return fixedUrl;
  } catch (error) {
    console.warn('Error fixing image URL:', error);
    return getPlaceholderImage();
  }
};

/**
 * Returns a placeholder image URL
 * @returns {string} - Placeholder image URL
 */
export const getPlaceholderImage = () => {
  return 'https://via.placeholder.com/300x300/e2e8f0/64748b?text=Product+Image';
};

/**
 * Handles image loading errors
 * @param {Event} event - Image error event
 */
export const handleImageError = (event) => {
  const img = event.target;
  const originalSrc = img.src;
  
  // Prevent infinite loop
  if (img.dataset.errorHandled === 'true') {
    return;
  }
  
  img.dataset.errorHandled = 'true';
  
  // Try to fix the URL first
  const fixedUrl = fixImageUrl(originalSrc);
  
  if (fixedUrl !== originalSrc) {
    img.src = fixedUrl;
    img.dataset.errorHandled = 'false'; // Allow one more attempt with fixed URL
  } else {
    // If fixing didn't work, use placeholder
    img.src = getPlaceholderImage();
    img.alt = 'Product image not available';
  }
};

/**
 * Preloads an image and returns a promise
 * @param {string} src - Image URL to preload
 * @returns {Promise} - Promise that resolves when image loads
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => {
      // Try to fix the URL and load again
      const fixedSrc = fixImageUrl(src);
      if (fixedSrc !== src) {
        const fixedImg = new Image();
        fixedImg.onload = () => resolve(fixedSrc);
        fixedImg.onerror = () => resolve(getPlaceholderImage());
        fixedImg.src = fixedSrc;
      } else {
        resolve(getPlaceholderImage());
      }
    };
    img.src = src;
  });
};

/**
 * Processes product data to fix image URLs
 * @param {Object|Array} products - Product object or array of products
 * @returns {Object|Array} - Products with fixed image URLs
 */
export const fixProductImages = (products) => {
  if (!products) return products;
  
  if (Array.isArray(products)) {
    return products.map(product => ({
      ...product,
      image: fixImageUrl(product.image)
    }));
  } else {
    return {
      ...products,
      image: fixImageUrl(products.image)
    };
  }
};
