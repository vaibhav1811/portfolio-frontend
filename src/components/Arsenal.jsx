import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Arsenal = () => {
    const categories = [
        {
            title: "Core_Tech",
            skills: [
                { name: "React / Vite", level: 90 },
                { name: "JavaScript (ES6+)", level: 85 },
                { name: "TypeScript", level: 80 },
                { name: "HTML5 / CSS3", level: 95 }
            ]
        },
        {
            title: "Backend_Ops",
            skills: [
                { name: "Node.js", level: 75 },
                { name: "MongoDB", level: 70 },
                { name: "FastAPI", level: 60 },
                { name: "REST APIs", level: 80 }
            ]
        },
        {
            title: "Tools_&_FX",
            skills: [
                { name: "Framer Motion", level: 85 },
                { name: "Git / GitHub", level: 80 },
                { name: "Figma", level: 70 },
                { name: "Tailwind", level: 75 }
            ]
        }
    ];

    return (
        <section className="section container" style={{ paddingTop: '8rem' }}>
            <Link to="/" className="back-link">
                <i className="ri-arrow-left-line"></i> Return_to_Base
            </Link>

            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="section__title"
            >
                The_Arsenal <span className="cursor">_</span>
            </motion.h2>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {categories.map((cat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="cyber-card"
                        style={{
                            background: 'rgba(18, 18, 20, 0.6)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--border-color)',
                            padding: '2rem',
                            borderRadius: '1rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Scanline effect */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 243, 255, 0.02) 50%)',
                            backgroundSize: '100% 4px', pointerEvents: 'none'
                        }} />

                        <h3 style={{
                            color: 'var(--primary-color)',
                            fontFamily: 'monospace',
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase',
                            borderBottom: '1px solid var(--border-color)',
                            paddingBottom: '0.5rem'
                        }}>
                            {cat.title}
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {cat.skills.map((skill, j) => (
                                <div key={j}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: 'var(--fs-xs)' }}>
                                        <span style={{ color: 'var(--title-color)' }}>{skill.name}</span>
                                        <span style={{ color: 'var(--primary-color-alt)', fontFamily: 'monospace' }}>{skill.level}%</span>
                                    </div>
                                    <div style={{
                                        height: '6px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '3px',
                                        overflow: 'hidden'
                                    }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: 0.2 + (j * 0.1) }}
                                            style={{
                                                height: '100%',
                                                background: 'var(--primary-color)',
                                                boxShadow: '0 0 10px var(--primary-color)'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <style>{`
                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-color);
                    margin-bottom: 2rem;
                    font-family: monospace;
                    transition: 0.3s;
                }
                .back-link:hover {
                    color: var(--primary-color);
                    transform: translateX(-5px);
                }
            `}</style>
        </section>
    );
};

export default Arsenal;
