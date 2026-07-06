import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
   title: 'Resume | Najrul Sumon',
   description: 'View or download Najrul Sumon’s resume',
};

// Dedicated resume viewer page, opened in a new tab from the homepage CTA.
// The PDF renders inline via <object>; browsers that can't embed PDFs
// (most mobile ones) get the fallback card with a download button instead.
const ResumePage = () => {
   return (
      <main className="resume_page">
         <header className="resume_toolbar">
            <Link href="/" className="resume_back">
               &larr; Back to portfolio
            </Link>
            <h1 className="resume_title">Resume &middot; Najrul Sumon</h1>
            <a href="/Resume.pdf" download="Najrul-Sumon-Resume.pdf" className="btn btn-primary resume_download">
               Download PDF
            </a>
         </header>

         <object data="/Resume.pdf" type="application/pdf" className="resume_viewer">
            <div className="resume_fallback">
               <p>Your browser can&apos;t display the PDF here.</p>
               <a href="/Resume.pdf" download="Najrul-Sumon-Resume.pdf" className="btn btn-primary">
                  Download the resume
               </a>
            </div>
         </object>
      </main>
   );
};

export default ResumePage;
