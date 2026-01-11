import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Timeline = () => {
    const history = [
        {
            year: "2024 - Present",
            role: "Full Stack Developer",
            company: "Freelance",
            desc: "Building high-performance web applications using MERN stack and Next.js. Deploying scalable architectures."
        },
        {
            year: "2023",
            role: "Frontend Specialist",
            company: "Tech Corp (Hypothetical)",
            desc: "Optimized React performance by 40%. Implemented complex animations and responsive design systems."
        },
        {
            year: "2022",
            role: "Web Development Intern",
            company: "Startup Inc",
            desc: "Assisted in backend API development with Node.js and improved frontend accessibility."
        },
        {
            year: "2020 - 2024",
            role: "Computer Science Degree",
            company: "University",
            desc: "Specialized in Algorithms, Data Structures, and Web Technologies."
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
                Timeline_Log <span className="cursor">_</span>
            </motion.h2>

            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                {/* Vertical Line */}
                <div style={{
                    position: 'absolute',
                    left: '20px',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: 'var(--border-color)',
                    zIndex: 0
                }} className="timeline-line"></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative', zIndex: 1 }}>
                    {history.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                paddingLeft: '3rem',
                                position: 'relative'
                            }}
                        >
                            {/* Node Point */}
                            <div style={{
                                position: 'absolute',
                                left: '11px',
                                top: '5px',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: 'var(--bg-color)',
                                border: '2px solid var(--primary-color)',
                                boxShadow: '0 0 10px var(--primary-color)',
                                zIndex: 2
                            }}></div>

                            <div style={{
                                background: 'var(--container-color)', // Updated to variable
                                border: '1px solid var(--border-color)',
                                padding: '1.5rem',
                                borderRadius: '1rem',
                                borderLeft: '4px solid var(--primary-color-alt)',
                                boxShadow: 'var(--shadow-small)'
                            }}>
                                <span style={{
                                    fontFamily: 'monospace',
                                    color: 'var(--primary-color)',
                                    fontSize: 'var(--fs-sm)',
                                    display: 'block',
                                    marginBottom: '0.5rem'
                                }}>{item.year}</span>

                                <h3 style={{ fontSize: 'var(--fs-lg)', marginBottom: '0.2rem' }}>{item.role}</h3>
                                <h4 style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-color-alt)', marginBottom: '1rem' }}>@ {item.company}</h4>

                                <p style={{ fontSize: 'var(--fs-sm)', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
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

export default Timeline;
