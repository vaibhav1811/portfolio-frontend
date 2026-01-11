import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

import project1 from '../assets/img/project-1.webp';
import project2 from '../assets/img/project-2.webp';
import project3 from '../assets/img/project-3.webp';

const projectData = [
    {
        id: 1,
        category: 'web',
        title: 'Image AI',
        img: project1,
        desc: 'An AI-powered application that generates stunning images from text descriptions.'
    },
    {
        id: 2,
        category: 'web',
        title: 'Vibora',
        img: project2,
        desc: 'A comprehensive party planning platform for organizing seamless events.'
    },
    {
        id: 3,
        category: 'web',
        title: 'Crato',
        img: project3,
        desc: 'A real-time cryptocurrency tracker providing live pricing and market analysis.'
    },
];

const Projects = ({ data }) => {
    const [filter, setFilter] = useState('all');
    const [activeBtn, setActiveBtn] = useState('all');

    // Use dynamic data if available
    const displayProjects = (data && data.length > 0) ? data : [
        {
            id: 1,
            category: 'web',
            title: 'Image AI',
            img: project1,
            desc: 'An AI-powered application that generates stunning images from text descriptions.'
        },
        {
            id: 2,
            category: 'web',
            title: 'Vibora',
            img: project2,
            desc: 'A comprehensive party planning platform for organizing seamless events.'
        },
        {
            id: 3,
            category: 'web',
            title: 'Crato',
            img: project3,
            desc: 'A real-time cryptocurrency tracker providing live pricing and market analysis.'
        },
    ];

    const handleFilter = (category) => {
        setFilter(category);
        setActiveBtn(category);
    };

    const filteredProjects = filter === 'all'
        ? displayProjects
        : displayProjects.filter(project => project.category === filter);

    return (
        <section className="work section" id="portfolio">
            <div className="container">
                <h2 className="section__title">Work_</h2>

                <div className="project__filters">
                    {['all', 'web', 'app', 'landing'].map((cat) => (
                        <button
                            key={cat}
                            className={`project__item-filter ${activeBtn === cat ? 'active-work' : ''}`}
                            onClick={() => handleFilter(cat)}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>

                <motion.div layout className="projects__grid grid">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                                className="project__card"
                                key={project.id}
                            >
                                <img src={project.img} alt={project.title} className="project__img" />
                                <div className="project__data">
                                    <h3 className="project__title">{project.title}</h3>
                                    <p className="project__description">{project.desc}</p>
                                    <a href="#" className="project__button">
                                        Demo <i className="ri-arrow-right-line"></i>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
