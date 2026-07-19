import React, { useState } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'portrait' | 'project';
  fallbackText?: string;
}

export const Image = ({ 
  src, 
  alt, 
  className, 
  fallbackType = 'project', 
  fallbackText = 'DK', 
  ...props 
}: ImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    if (fallbackType === 'portrait') {
      return (
        <div 
          className={`flex items-center justify-center bg-brand-soft-peach border border-brand-border text-brand-text ${className}`}
          role="img"
          aria-label={alt || "Dinesh Kumar Initials Portrait"}
        >
          <div className="text-center p-4">
            <span className="font-heading font-extrabold text-6xl tracking-tight block mb-2 text-brand-peach">
              DK
            </span>
            <span className="text-sm text-brand-muted uppercase tracking-wider block font-medium">
              Dinesh Kumar
            </span>
            <span className="text-xs text-brand-muted/70 block mt-1">
              Tirupattur, TN, India
            </span>
          </div>
        </div>
      );
    }
    
    // Otherwise render project card fallback style
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-brand-secondary border border-brand-border text-brand-muted p-8 ${className}`}
        role="img"
        aria-label={alt || "Project Image Placeholder"}
      >
        <div className="text-center">
          <span className="font-heading font-bold text-xl text-brand-text block mb-2">
            {fallbackText}
          </span>
          <span className="text-xs uppercase tracking-widest text-brand-peach font-semibold block">
            Case Study Showcase
          </span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setHasError(true)} 
      loading="lazy"
      {...props} 
    />
  );
};
export default Image;
