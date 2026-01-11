import React from 'react';
import { motion } from 'framer-motion';
import './TheLab.css';

const TheLab = () => {
    const skills = [
        { name: 'TypeScript', status: 'Deep Dive', progress: '85%', icon: 'ri-command-fill' },
        { name: 'Micro-Interactions', status: 'Experimenting', progress: '60%', icon: 'ri-animation-line' },
        { name: 'Bun & Performance', status: 'Exploring', progress: '40%', icon: 'ri-flashlight-line' },
        { name: 'System Design', status: 'Learning', progress: '50%', icon: 'ri-layout-masonry-line' },
    ];

    return (
        <section className="lab section" id="lab">
            <div className="lab__container container">
                <h2 className="section__title">The Lab_</h2>
                <div className="lab__header">
                    <p className="lab__description">
                        I believe in the "Always Building" philosophy. When I'm not working on client projects,
                        I'm breaking things, learning new stacks, and experimenting with the future of the web.
                    </p>
                </div>

                <div className="lab__grid grid">
                    <div className="lab__stats">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="lab__card stat__card"
                        >
                            <span className="stat__number">10+</span>
                            <span className="stat__text">Experiments Shipped</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="lab__card stat__card"
                        >
                            <span className="stat__number">∞</span>
                            <span className="stat__text">Coffee Consumed</span>
                        </motion.div>
                    </div>

                    <div className="lab__learning">
                        <h3 className="lab__subtitle">Current Curriculum</h3>
                        <div className="learning__list">
                            {skills.map((skill, index) => (
                                <div className="learning__item" key={index}>
                                    <div className="learning__header">
                                        <div className="learning__info">
                                            <i className={`${skill.icon} learning__icon`}></i>
                                            <div>
                                                <h4 className="learning__name">{skill.name}</h4>
                                                <span className="learning__status">{skill.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="lab__featured"
                >
                    <div className="featured__tag">Latest Prototype</div>
                    <h3 className="featured__title">Neo-minimalist Component Library</h3>
                    <p className="featured__desc">
                        Exploring 3D transforms and glassmorphism at scale.
                        A side-project focused on ultra-low latency rendering.
                    </p>
                    <div className="building__status">
                        <span className="pulsing__dot"></span>
                        Currently Building
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TheLab;
