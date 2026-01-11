import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/blogs`)
            .then(res => res.json())
            .then(data => {
                setBlogs(data || []);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

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
                Signal_Log <span className="cursor">_</span>
            </motion.h2>

            <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-color-alt)' }}>
                // Incoming transmissions from the developer's neural link.
            </p>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--primary-color)' }}>
                    Decryption in progress...
                </div>
            ) : (
                <div className="blog__grid">
                    {blogs.length === 0 ? (
                        <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '2rem', border: '1px dashed var(--border-color)', borderRadius: '1rem' }}>
                            No signals detected.
                        </div>
                    ) : (
                        blogs.map((blog, i) => (
                            <motion.article
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="blog-card"
                            >
                                {blog.img && (
                                    <div className="blog__img-box">
                                        <img src={blog.img} alt={blog.title} className="blog__img" />
                                        <div className="blog__overlay"></div>
                                    </div>
                                )}
                                <div className="blog__content">
                                    <div className="blog__meta">
                                        <span className="blog__date">
                                            <i className="ri-calendar-line"></i> {new Date(blog.date).toLocaleDateString()}
                                        </span>
                                        {blog.tags && blog.tags.length > 0 && (
                                            <div className="blog__tags">
                                                {blog.tags.map((tag, idx) => (
                                                    <span key={idx} className="blog__tag">#{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="blog__title">{blog.title}</h3>
                                    <p className="blog__excerpt">{blog.content.substring(0, 100)}...</p>

                                    <button className="button button--small button--ghost">
                                        Read_Signal <i className="ri-arrow-right-line"></i>
                                    </button>
                                </div>
                            </motion.article>
                        ))
                    )}
                </div>
            )}

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

                .blog__grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .blog-card {
                    background: rgba(18, 18, 20, 0.6);
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--border-color);
                    border-radius: 1rem;
                    overflow: hidden;
                    transition: 0.3s;
                    display: flex;
                    flex-direction: column;
                }

                .blog-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0, 243, 255, 0.15);
                    border-color: var(--primary-color);
                }

                .blog__img-box {
                    height: 200px;
                    overflow: hidden;
                    position: relative;
                }

                .blog__img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: 0.5s;
                }

                .blog-card:hover .blog__img {
                    transform: scale(1.1);
                }

                .blog__overlay {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(to top, rgba(5,5,5,0.8), transparent);
                }

                .blog__content {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }

                .blog__meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: var(--fs-xs);
                    color: var(--text-color-alt);
                    margin-bottom: 1rem;
                }

                .blog__tags {
                    display: flex;
                    gap: 0.5rem;
                }

                .blog__tag {
                    color: var(--primary-color);
                }

                .blog__title {
                    font-size: 1.25rem;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(to right, #fff, #aaa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .blog__excerpt {
                    font-size: var(--fs-sm);
                    color: var(--text-color);
                    margin-bottom: 1.5rem;
                    flex: 1;
                    line-height: 1.6;
                }

                .button--ghost {
                    background: transparent;
                    border: 1px solid var(--primary-color-alt);
                    color: var(--primary-color-alt);
                    align-self: flex-start;
                }
                
                .button--ghost:hover {
                    background: var(--primary-color-alt);
                    color: #fff;
                }
            `}</style>
        </section>
    );
};

export default Blog;
