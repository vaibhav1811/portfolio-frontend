import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const servicesData = [
    { title: "Web Design", desc: "Expert web design with modern aesthetics.", icon: "ri-macbook-line" },
    { title: "Web Development", desc: "Building robust and scalable web applications.", icon: "ri-code-s-slash-line" },
    { title: "Creative Design", desc: "Unique and creative visual solutions.", icon: "ri-brush-line" },
    { title: "Responsive Design", desc: "Websites that look great on all devices.", icon: "ri-smartphone-line" },
    { title: "Branding", desc: "Building strong brand identities.", icon: "ri-medal-fill" },
    { title: "24/7 Support", desc: "Reliable support for your projects.", icon: "ri-customer-service-2-line" },
];

const Services = () => {
    return (
        <section className="services section" id="services">
            <div className="services__container container grid">
                <h2 className="section__title">Services_</h2>
                <div className="services__grid grid">
                    {servicesData.map((service, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="services__item"
                            key={index}
                        >
                            <div className="icon__box">
                                <i className={`${service.icon} services__icon`}></i>
                            </div>
                            <h3 className="services__title">{service.title}</h3>
                            <p className="services__description">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
