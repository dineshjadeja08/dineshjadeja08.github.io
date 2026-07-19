import { useEffect } from 'react';
import { siteConfig } from '../../config/site';

interface SEOProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  ogImage?: string;
  schema?: Record<string, any>[];
}

export const SEO = ({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  ogImage,
  schema
}: SEOProps) => {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const metaDescription = description || siteConfig.description;
  const canonicalUrl = `${siteConfig.url}${canonicalPath}`;
  const ogImgUrl = ogImage || `${siteConfig.url}/favicon.svg`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to find or create a meta tag
    const updateMeta = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update basic SEO metas
    updateMeta('name', 'description', metaDescription);
    updateMeta('property', 'og:title', fullTitle);
    updateMeta('property', 'og:description', metaDescription);
    updateMeta('property', 'og:type', type);
    updateMeta('property', 'og:url', canonicalUrl);
    updateMeta('property', 'og:image', ogImgUrl);
    
    // Update Twitter Cards
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', fullTitle);
    updateMeta('name', 'twitter:description', metaDescription);
    updateMeta('name', 'twitter:image', ogImgUrl);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Dynamic JSON-LD Schema markup injection
    const scriptId = 'jsonld-schema-data';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    if (scriptElement) {
      scriptElement.remove();
    }

    if (schema && schema.length > 0) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      scriptElement.text = JSON.stringify(schema);
      document.head.appendChild(scriptElement);
    }

    return () => {
      const elToRemove = document.getElementById(scriptId);
      if (elToRemove) {
        elToRemove.remove();
      }
    };
  }, [fullTitle, metaDescription, canonicalUrl, ogImgUrl, type, schema]);

  return null;
};

export default SEO;

