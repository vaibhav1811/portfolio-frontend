import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
import './Contact.css';

const Contact = ({ data }) => {
    const form = useRef();
    const [loading, setLoading] = useState(false);

    const sendEmail = async (e) => {
        e.preventDefault();

        // 1. Send to MongoDB (Backend)
        const formData = new FormData(form.current);
        const data = {
            name: formData.get('user_name'),
            email: formData.get('user_email'),
            message: formData.get('message')
        };

        setLoading(true);
        const toastId = toast.loading('Sending your message...');

        try {
            // Save to DB
            await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            // 2. Send Email via EmailJS (Optional: Fail silently if not configured)
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            if (serviceId && !serviceId.includes('YOUR_')) {
                await emailjs.sendForm(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                    form.current,
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                );
            }

            toast.success('Message sent & saved! 📨', { id: toastId });
            form.current.reset();
        } catch (error) {
            console.error('Submission Error:', error);
            // Even if EmailJS fails, if DB save worked, we consider it a partial success or just show generic error
            toast.error('Could not send message. Try WhatsApp!', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact section" id="contact">
            <div className="container">
                <div className="contact__header">
                    <h2 className="section__title">Get in Touch_</h2>
                    <p className="contact__subtitle">
                        Deep dive into my work or just say hello. I'm always open to discussing new projects,
                        creative ideas or opportunities to be part of your visions.
                    </p>
                </div>

                <div className="contact__container grid">
                    <div className="contact__info">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="contact__info-card"
                        >
                            <div className="contact__icon">
                                <i className="ri-mail-send-line"></i>
                            </div>
                            <div>
                                <h3 className="contact__info-title">Email Me</h3>
                                <p className="contact__info-desc">{data?.email || 'vaibhavsharma993@gmail.com'}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="contact__info-card"
                        >
                            <div className="contact__icon">
                                <i className="ri-whatsapp-line"></i>
                            </div>
                            <div>
                                <h3 className="contact__info-title">WhatsApp</h3>
                                <p className="contact__info-desc">+{data?.phone || '91 9549441931'}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="contact__info-card"
                        >
                            <div className="contact__icon">
                                <i className="ri-map-pin-line"></i>
                            </div>
                            <div>
                                <h3 className="contact__info-title">Location</h3>
                                <p className="contact__info-desc">{data?.address || 'Ghaziabad, India'}</p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="contact__form-container"
                    >
                        <form ref={form} onSubmit={sendEmail} className="contact__form">
                            <div className="form__group">
                                <input type="text" name="user_name" className="form__input" placeholder=" " required />
                                <label className="form__label">Full Name</label>
                            </div>

                            <div className="form__group">
                                <input type="email" name="user_email" className="form__input" placeholder=" " required />
                                <label className="form__label">Email Address</label>
                            </div>

                            <div className="form__group form__area">
                                <textarea name="message" className="form__input" placeholder=" " required></textarea>
                                <label className="form__label">Your Message</label>
                            </div>

                            <button className="button contact__submit" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                                <i className="ri-send-plane-fill"></i>
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
