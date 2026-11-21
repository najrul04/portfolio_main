import type { Metadata } from "next";
import Link from "next/link";
import { resume } from "@/lib/resume";

export const metadata: Metadata = {
   title: "Resume | MD Najrul Islam Sumon",
   description: "View or download MD Najrul Islam Sumon’s resume",
};

// Renders **marked** phrases from lib/resume.ts as accent highlights.
const highlight = (text: string) =>
   text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
         <mark key={i} className="resume_hl">
            {part.slice(2, -2)}
         </mark>
      ) : (
         part
      ),
   );

// Native, styled resume (mirrors public/MD-Najrul-Islam-Sumon-Resume.pdf — content in lib/resume.ts).
// WHY native HTML instead of the old <object> PDF embed: it matches the site's
// design, highlights the key metrics, and works on phones where PDF embeds
// don't. The toolbar's Download button still serves the real PDF.
const ResumePage = () => {
   return (
      <main className="resume_page">
         <header className="resume_toolbar">
            <Link href="/" className="resume_back">
               &larr; Back to portfolio
            </Link>
            <h1 className="resume_title">Resume &middot; MD Najrul Islam Sumon</h1>
            <a
               href="/MD-Najrul-Islam-Sumon-Resume.pdf"
               download="MD-Najrul-Islam-Sumon-Resume.pdf"
               className="btn btn-primary resume_download"
            >
               Download PDF
            </a>
         </header>

         <article className="resume_sheet">
            <section className="resume_head">
               <span className="resume_avatar">
                  <img src={resume.photo} alt={resume.name} />
               </span>
               <h2 className="resume_name">{resume.name}</h2>
               <p className="resume_role">{resume.role}</p>
               <ul className="resume_contacts">
                  <li>{resume.location}</li>
                  <li>
                     <a
                        href={`tel:${resume.contacts.phone.replace(/\s/g, "")}`}
                     >
                        {resume.contacts.phone}
                     </a>
                  </li>
                  <li>
                     <a href={`mailto:${resume.contacts.email}`}>
                        {resume.contacts.email}
                     </a>
                  </li>
                  <li>
                     <a
                        href={resume.contacts.linkedin}
                        target="_blank"
                        rel="noreferrer"
                     >
                        LinkedIn
                     </a>
                  </li>
                  <li>
                     <a
                        href={resume.contacts.github}
                        target="_blank"
                        rel="noreferrer"
                     >
                        GitHub
                     </a>
                  </li>
               </ul>
            </section>

            <section className="resume_section">
               <h3 className="resume_heading">Summary</h3>
               <p className="resume_summary">{highlight(resume.summary)}</p>
            </section>

            <section className="resume_section">
               <h3 className="resume_heading">Technical Skills</h3>
               <dl className="resume_skills">
                  {resume.skills.map((row) => (
                     <div key={row.group} className="resume_skills_row">
                        <dt>{row.group}</dt>
                        <dd>
                           {row.items.map((item) => {
                              const core =
                                 item.startsWith("**") && item.endsWith("**");
                              const label = core ? item.slice(2, -2) : item;
                              return (
                                 <span
                                    key={label}
                                    className={`resume_chip ${core ? "resume_chip_hl" : ""}`}
                                 >
                                    {label}
                                 </span>
                              );
                           })}
                        </dd>
                     </div>
                  ))}
               </dl>
            </section>

            <section className="resume_section">
               <h3 className="resume_heading">Experience</h3>
               {resume.experience.map((job) => (
                  <div
                     key={`${job.company}-${job.dates}`}
                     className="resume_job"
                  >
                     <div className="resume_job_head">
                        <div className="resume_job_id">
                           {job.logo && (
                              <span className="resume_job_logo">
                                 <img
                                    src={job.logo}
                                    alt={`${job.company} logo`}
                                 />
                              </span>
                           )}
                           <div>
                              <h4 className="resume_job_title">{job.title}</h4>
                              <p className="resume_job_company">
                                 {job.company} &middot; {job.location}
                              </p>
                           </div>
                        </div>
                        <span className="resume_job_dates">{job.dates}</span>
                     </div>
                     <p className="resume_job_stack">
                        {job.stack.map((tech) => (
                           <span
                              key={tech}
                              className="resume_chip resume_chip_dim"
                           >
                              {tech}
                           </span>
                        ))}
                     </p>
                     <ul className="resume_bullets">
                        {job.bullets.map((bullet, i) => (
                           <li key={i}>{highlight(bullet)}</li>
                        ))}
                     </ul>
                  </div>
               ))}
            </section>

            <section className="resume_section">
               <h3 className="resume_heading">Education</h3>
               {resume.education.map((entry) => (
                  <div key={entry.school} className="resume_edu">
                     <div>
                        <h4 className="resume_edu_school">{entry.school}</h4>
                        <p className="resume_edu_detail">{entry.detail}</p>
                     </div>
                     {entry.dates && (
                        <span className="resume_job_dates">{entry.dates}</span>
                     )}
                  </div>
               ))}
            </section>

            <section className="resume_section">
               <h3 className="resume_heading">Languages</h3>
               <p>
                  {resume.languages.map((lang) => (
                     <span key={lang} className="resume_chip">
                        {lang}
                     </span>
                  ))}
               </p>
            </section>
         </article>
      </main>
   );
};

export default ResumePage;
