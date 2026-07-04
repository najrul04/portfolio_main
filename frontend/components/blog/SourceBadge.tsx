'use client';

import type { IconType } from 'react-icons';
import {
   AiFillLinkedin,
   AiFillFacebook,
   AiFillInstagram,
   AiFillYoutube,
   AiOutlineTwitter,
   AiOutlineLink,
} from 'react-icons/ai';

interface SourceBadgeProps {
   url: string;
   className?: string;
}

// Platform is derived from the URL's hostname — no stored "platform" field to
// drift out of sync when the URL is edited. Unknown hosts get a generic link
// icon, so the badge never breaks on a new platform.
const PLATFORMS: { pattern: RegExp; label: string; Icon: IconType }[] = [
   { pattern: /(^|\.)linkedin\.com$/, label: 'LinkedIn', Icon: AiFillLinkedin },
   { pattern: /(^|\.)(facebook|fb)\.com$/, label: 'Facebook', Icon: AiFillFacebook },
   { pattern: /(^|\.)instagram\.com$/, label: 'Instagram', Icon: AiFillInstagram },
   { pattern: /(^|\.)(youtube\.com|youtu\.be)$/, label: 'YouTube', Icon: AiFillYoutube },
   { pattern: /(^|\.)(twitter|x)\.com$/, label: 'X (Twitter)', Icon: AiOutlineTwitter },
];

const detectPlatform = (url: string): { label: string; Icon: IconType } => {
   try {
      const host = new URL(url).hostname.toLowerCase();
      const match = PLATFORMS.find((p) => p.pattern.test(host));
      if (match) return match;
   } catch {
      /* not a parseable URL — fall through to the generic icon */
   }
   return { label: 'original post', Icon: AiOutlineLink };
};

// Small round icon that links to the original social post. Rendered as its
// own <a> OUTSIDE the card's <Link> — anchors must never nest.
const SourceBadge = ({ url, className = '' }: SourceBadgeProps) => {
   const { label, Icon } = detectPlatform(url);
   return (
      <a
         className={`blog_source_link ${className}`}
         href={url}
         target="_blank"
         rel="noopener noreferrer"
         title={`View on ${label}`}
         aria-label={`View the original post on ${label}`}
         onClick={(e) => e.stopPropagation()}
      >
         <Icon />
      </a>
   );
};

export default SourceBadge;
