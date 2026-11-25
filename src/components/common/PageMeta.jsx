import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';

/**
 * Declarative component to apply page title and meta tags.
 * Example: <PageMeta title="My Page | Samba Soccer Schools" description="..." />
 */
export function PageMeta({ title, description, keywords, ogType, ogImage }) {
  usePageMeta({ title, description, keywords, ogType, ogImage });
  return null;
}

export default PageMeta;
