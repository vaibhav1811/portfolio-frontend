import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import profileImg from '../assets/img/profile.webp';
import './Home.css';

const Home = ({ data }) => {
    const personalInfo = [
        { label: 'TIMELINE', value: 'View_Log', icon: 'ri-time-line', link: '/timeline', isRoute: true },
        { label: 'ARSENAL', value: 'Tech_Stack', icon: 'ri-code-s-slash-line', link: '/arsenal', isRoute: true },
        { label: 'CONTACT', value: 'Send_Signal', icon: 'ri-mail-send-line', link: '#contact', isRoute: false },
        { label: 'ARCADE', value: 'Start_Game', icon: 'ri-gamepad-line', link: '/arcade', isRoute: true },
    ];

    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const [displayName, setDisplayName] = React.useState(data?.name || 'Vaibhav Kumar');

    // Cyber Scramble Effect
    React.useEffect(() => {
        const targetText = data?.name || 'Vaibhav Kumar';
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        let iterations = 0;

        const interval = setInterval(() => {
            setDisplayName(targetText
                .split('')
                .map((letter, index) => {
                    if (index < iterations) return targetText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('')
            );

            if (iterations >= targetText.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [data?.name]);

    const yProfile = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityProfile = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section className="home section" id="home" ref={ref}>
            <div className="home__container container">
                <motion.div
                    style={{ y: yProfile, opacity: opacityProfile }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="home__profile-header"
                >
                    <div className="home__img-box">
                        <img src={profileImg} alt="Vaibhav" className="home__img"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150' }} />
                    </div>
                </motion.div>

                <motion.div
                    style={{ y: yContent }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="home__content"
                >
                    <div className="home__greeting">System.Init(User);</div>
                    <h1 className="home__name">
                        {displayName}
                        <span className="cursor">_</span>
                    </h1>
                    <p className="home__description">
                        {data?.bio || 'Frontend Developer crafting high-performance, visually stunning web experiences.'}
                    </p>

                    <div className="home__info-grid">
                        {personalInfo.map((info, index) => {
                            const Content = () => (
                                <div className="home__info-item">
                                    <i className={`${info.icon} home__info-icon`}></i>
                                    <div className="home__info-content">
                                        <span className="home__info-label">{info.label}</span>
                                        <span className="home__info-value">{info.value}</span>
                                    </div>
                                </div>
                            );

                            return info.isRoute ? (
                                <Link to={info.link} key={index} style={{ textDecoration: 'none' }}>
                                    <Content />
                                </Link>
                            ) : (
                                <a href={info.link} key={index} style={{ textDecoration: 'none' }}>
                                    <Content />
                                </a>
                            );
                        })}
                    </div>

                    <div className="home__actions">
                        <a href="#contact" className="button">
                            Contact Me
                        </a>
                        <div className="home__socials">
                            <a href="https://github.com" className="home__social-link"><i className="ri-github-fill"></i></a>
                            <a href="https://linkedin.com" className="home__social-link"><i className="ri-linkedin-fill"></i></a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
