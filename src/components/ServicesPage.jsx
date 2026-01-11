import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ServicesPage.css';

const ServicesPage = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const serviceDetails = [
        {
            title: "Frontend Enhancement",
            icon: "ri-window-line",
            desc: "Transforming standard interfaces into high-performance, accessible, and visually stunning web applications using React, Next.js, and modern CSS frameworks.",
            tags: ["React", "UI/UX Optimization", "Core Web Vitals", "Framer Motion"]
        },
        {
            title: "Backend Infrastructure",
            icon: "ri-database-2-line",
            desc: "Designing robust server-side logic and database schemas that ensure your application is fast, secure, and capable of handling complex business logic.",
            tags: ["Node.js", "Express", "PostgreSQL/MongoDB", "REST & GraphQL"]
        },
        {
            title: "DevOps & Deployment",
            icon: "ri-rocket-2-line",
            desc: "Automating workflows with CI/CD pipelines and deploying to scalable cloud environments like AWS, Vercel, or Dockerized environments.",
            tags: ["Docker", "AWS", "CI/CD", "Cloudflare"]
        },
        {
            title: "Full Stack Solutions",
            icon: "ri-stack-line",
            desc: "Delivering end-to-end products from initial concept to final deployment. Seamlessly integrating frontend and backend for a unified user experience.",
            tags: ["MERN/PERN Stack", "API Integration", "Auth Systems", "Real-time Apps"]
        },
        {
            title: "Scalable Architecture",
            icon: "ri-node-tree",
            desc: "Architecting systems that grow with your business. Implementing modular, testable, and maintainable codebases using Microservices or Clean Architecture.",
            tags: ["Microservices", "System Design", "Scalability", "Clean Code"]
        }
    ];

    return (
        <div className="services-page section">
            <div className="container">
                <Link to="/" className="back-link">
                    <i className="ri-arrow-left-line"></i> Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="services-page__header"
                >
                    <h1 className="section__title">Expertise_</h1>
                    <p className="services-page__subtitle">
                        I provide comprehensive engineering solutions to transform your ideas into
                        scalable, high-performance digital realities.
                    </p>
                </motion.div>

                <div className="services-page__grid">
                    {serviceDetails.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="detailed-service__card"
                        >
                            <div className="detailed-service__icon-box">
                                <i className={service.icon}></i>
                            </div>
                            <div className="detailed-service__content">
                                <h3 className="detailed-service__title">{service.title}</h3>
                                <p className="detailed-service__desc">{service.desc}</p>
                                <div className="detailed-service__tags">
                                    {service.tags.map((tag, tIndex) => (
                                        <span key={tIndex} className="service-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="services-page__cta"
                >
                    <h3>Have a project in mind?</h3>
                    <p>Let's architect something amazing together.</p>
                    <Link to="/#contact" className="button">
                        Get in Touch <i className="ri-send-plane-fill"></i>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default ServicesPage;
