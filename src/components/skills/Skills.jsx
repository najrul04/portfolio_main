import React, { useEffect } from "react";
import { skills } from "../../constants";
import AOS from "aos";
import "aos/dist/aos.css"; 
import "./Skills.css"; // Import the CSS file

const Skills = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  return (
    <section
      id="skills0"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="1500"
    >
      <div className="wrapper">
        <h5 style={{ color: "rgba(255, 255, 255, 0.6)" }}>What are my</h5>
        <h2 style={{ color: "#b86df5" }}>Skills</h2>

        <div className="skills-container">
          {skills.map((skill) => (
            <div className="skill" key={skill.id}>
              <h2 className="skill-title">{skill.title}</h2>
              <div className="skill-list">
                {skill.skills.map((item) => (
                  <div className="skill-item" key={item.id}>
                    <img className="skill-image" src={item.image} alt={item.name}/>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
