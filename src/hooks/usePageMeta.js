import { useEffect } from 'react';

/**
 * Helper to update or create a <meta> tag in the document head
 */
export function updateMetaTag(attrName, attrVal, content) {
  if (typeof document === 'undefined' || content === undefined || content === null) return;
  
  let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Apply full meta data to document (title, description, og, twitter)
 */
export function applyPageMeta({ title, description, keywords, ogType = 'website', ogImage } = {}) {
  if (typeof document === 'undefined') return;

  if (title) {
    document.title = title;
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('name', 'twitter:title', title);
  }

  if (description) {
    updateMetaTag('name', 'description', description);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('name', 'twitter:description', description);
  }

  if (keywords) {
    updateMetaTag('name', 'keywords', keywords);
  }

  if (ogType) {
    updateMetaTag('property', 'og:type', ogType);
  }

  if (ogImage) {
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('name', 'twitter:image', ogImage);
  }
}

/**
 * Hook to set page metadata dynamically within any component
 */
export function usePageMeta({ title, description, keywords, ogType, ogImage } = {}) {
  useEffect(() => {
    applyPageMeta({ title, description, keywords, ogType, ogImage });
  }, [title, description, keywords, ogType, ogImage]);
}

export default usePageMeta;
