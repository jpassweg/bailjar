import React, { useState } from "react";
import './Containers.css'
import { motion, AnimatePresence } from 'framer-motion';

// Sample data
const projects = [
  {
    id: 1,
    name: 'Wheather or Not',
    description: <p><a href="https://www.wheatherornot.co/" target="_blank" rel="noreferrer">Wheather or Not</a> simplifies 
    your life by eliminating the need for complex weather apps. 
    Whether you're a child eager to fly a kite or a farmer planning to sow crops, 
    WeatherOrNot seamlessly integrates various weather APIs and advanced language models to comprehend your activities. 
    It provides personalized, optimal timing suggestions, ensuring you always have the perfect weather conditions for your plans.
    Made at <a href="https://hackkosice.com/2024/" target="_blank" rel="noreferrer">Hack Kosice 2024</a>.</p>
  },
  {
    id: 2,
    name: '...',
    description: <p>More projects to come.</p>,
  },
];

export const ProjectList2 = () => {
  const [activeProjects, setActiveProjects] = useState([]);

  const toggleProject = (id) => {
    if (activeProjects.includes(id)) {
      setActiveProjects(activeProjects.filter(projectId => projectId !== id));
    } else {
      setActiveProjects([...activeProjects, id]);
    }
  };

  return (
    <div className="container-large">
      <div className="text-container"><h2>Projects</h2></div>
      <div className="projectList">
        {projects.map((project) => (
          <div key={project.id} className="projectItem">
            <div
              onClick={() => toggleProject(project.id)}
              className="projectTitle"
            >
              <h3>{project.name}</h3>
            </div>
            <AnimatePresence initial={false}>
              {activeProjects.includes(project.id) && (
                <motion.div
                  className="projectDescription"
                  initial={{ height: 10, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "tween" }}
                > {project.description}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};