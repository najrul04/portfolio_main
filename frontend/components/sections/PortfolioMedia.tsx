'use client';

import { useState } from 'react';

interface PortfolioMediaProps {
   src: string;
   title: string;
   // How many screenshots the project has — >1 shows a "+N" badge so
   // visitors know there's more to see inside the detail modal.
   imageCount?: number;
   // Company the project was built at — small logo badge pinned top-left.
   companyName?: string;
   companyLogo?: string;
}

// Card cover image with per-item loading/error states.
// WHY per-item state: the legacy version tracked ONE shared "loading" flag and
// only cleared it after ALL previews had loaded, so spinners lingered on top
// of slides that finished long ago — and a failure left a blank card.
const PortfolioMedia = ({ src, title, imageCount = 1, companyName, companyLogo }: PortfolioMediaProps) => {
   const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

   const stateClasses = [
      status === 'loaded' ? 'is-loaded' : '',
      status === 'error' ? 'is-error' : '',
   ].join(' ');

   return (
      <div className={`portfolio_media ${stateClasses}`}>
         {status === 'loading' && (
            <span className="portfolio_media_spinner" aria-label="Loading preview" />
         )}
         {status === 'error' && (
            <div className="portfolio_media_error">Preview unavailable.</div>
         )}
         <img
            src={src}
            alt={`${title} preview`}
            loading="lazy"
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
         />
         {status === 'loaded' && imageCount > 1 && (
            <span className="portfolio_media_count">+{imageCount - 1} more</span>
         )}
         {status === 'loaded' && companyLogo && (
            <span className="portfolio_media_company" title={companyName ? `Built at ${companyName}` : undefined}>
               <img src={companyLogo} alt={companyName ? `${companyName} logo` : 'Company logo'} />
               {companyName && <span className="portfolio_media_company_name">{companyName}</span>}
            </span>
         )}
      </div>
   );
};

export default PortfolioMedia;
