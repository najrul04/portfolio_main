'use client';

import { useEffect, useState } from 'react';

// The home page is statically prerendered, so a plain new Date() in the footer
// would freeze at the build year. This renders the build year first (no
// hydration mismatch), then swaps in the visitor's year after mount, so the
// copyright rolls over on New Year without a redeploy.
const CurrentYear = () => {
   const [year, setYear] = useState(() => new Date().getFullYear());

   useEffect(() => {
      setYear(new Date().getFullYear());
   }, []);

   return <>{year}</>;
};

export default CurrentYear;
