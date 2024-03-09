import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experiences } from "../../constants";
import { SectionWrapper } from "../../hoc";
// import { styles } from "../../styles.js";
import { textVariant } from "../../utils/motion";
import './Experience.css'


const ExperienceCard = ({ experience }) => {

  return (
    <VerticalTimelineElement
    className='verticalTimeline'
      style={{overflowX : "hidden"}}
      contentStyle={{
        background: "#030618",
        color: "#f0f0f0"
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg, marginTop: "5px" }}
      icon={
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}>
          <img
            src={experience.icon}
            alt={experience.company_name}
            style={{ width: '80%', height: '80%', objectFit: 'contain' }}
          />
        </div>
      }
    >
      <div>
        <h3 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 'bold' }}>{experience.title}</h3>
        <p
          style={{ fontSize: '16px', fontWeight: '600', margin: 0  }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul style={{ marginTop: '1.25rem',  marginLeft: '1.25rem'}}>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            style={{ color: '#fff', fontSize: '14px', listStyleType: 'disc', paddingLeft: '0.25rem', marginBottom: '0.50rem' }}
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
    
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, [])
  return (
    < >
      <div data-aos="fade-up" variants={textVariant()}
      id='experience'
      >
        
        <p style={{textAlign: "center"}}>
          What I have done so far
        </p>
        <h2 style={{textAlign: "center", color: "#b86df5"}}>
          Work Experience
        </h2>
      </div>

      <div style={{marginTop: "5rem", display: 'flex', flexDirection:'column'}} >
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");