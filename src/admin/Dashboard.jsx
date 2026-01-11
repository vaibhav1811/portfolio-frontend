import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Admin.css';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newProject, setNewProject] = useState({ title: '', category: 'web', desc: '', img: '', link: '' });
    const [newBlog, setNewBlog] = useState({ title: '', content: '', img: '', tags: '', link: '' });
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [isAddingBlog, setIsAddingBlog] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');
    const password = localStorage.getItem('adminPassword');

    useEffect(() => {
        if (!token) navigate('/admin/login');
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/data`);
            const result = await response.json();

            // Fetch messages separately (since it's protected/admin only)
            const msgResponse = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
                headers: { 'password': password }
            });
            const messages = await msgResponse.json();

            setData({ ...result, messages: Array.isArray(messages) ? messages : [] });
            setLoading(false);
        } catch (err) {
            toast.error('Failed to load data');
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        setIsAddingProject(true);
        const delay = new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const [response] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/projects`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'password': password
                    },
                    body: JSON.stringify(newProject)
                }),
                delay
            ]);
            if (response.ok) {
                toast.success('Project added successfully! 🎉');
                setNewProject({ title: '', category: 'web', desc: '', img: '' });
                await fetchData();
            }
        } catch (err) {
            toast.error('Error adding project');
        } finally {
            setIsAddingProject(false);
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
                method: 'DELETE',
                headers: { 'password': password }
            });
            if (response.ok) {
                toast.success('Project deleted');
                fetchData();
            }
        } catch (err) {
            toast.error('Error deleting project');
        }
    };

    const handleAddBlog = async (e) => {
        e.preventDefault();
        setIsAddingBlog(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'password': password
                },
                body: JSON.stringify({
                    ...newBlog,
                    tags: newBlog.tags.split(',').map(tag => tag.trim()) // Convert CSV to array
                })
            });

            if (response.ok) {
                toast.success('Signal broadcasted! (Blog Posted) 📡');
                setNewBlog({ title: '', content: '', img: '', tags: '' });
                await fetchData();
            }
        } catch (err) {
            toast.error('Transmission failed');
        } finally {
            setIsAddingBlog(false);
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!confirm('Terminate this signal?')) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
                method: 'DELETE',
                headers: { 'password': password }
            });
            if (response.ok) {
                toast.success('Signal terminated');
                fetchData();
            }
        } catch (err) {
            toast.error('Error deleting blog');
        }
    };

    const handleUpdateSettings = async (e) => {
        e.preventDefault();
        setIsSavingSettings(true);
        const delay = new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const [response] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/settings`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'password': password
                    },
                    body: JSON.stringify(data.settings)
                }),
                delay
            ]);
            if (response.ok) {
                toast.success('Settings updated successfully! ✅');
            }
        } catch (err) {
            toast.error('Error updating settings');
        } finally {
            setIsSavingSettings(false);
        }
    };

    if (loading) return <div className="loader">Loading Dashboard...</div>;

    return (
        <div className="admin__dashboard section">
            <div className="container">
                <div className="dashboard__header">
                    <h2 className="section__title">Admin Dashboard_</h2>
                    <button className="button button--small" onClick={() => {
                        localStorage.clear();
                        navigate('/admin/login');
                    }}>Logout</button>
                </div>

                <div className="dashboard__grid grid">
                    {/* Settings Manager */}
                    <div className="dashboard__card">
                        <h3 className="card__title">Site Settings</h3>
                        <form onSubmit={handleUpdateSettings} className="admin__form">
                            <div className="form__group">
                                <input
                                    type="text"
                                    className="form__input"
                                    placeholder=" "
                                    value={data.settings.name}
                                    onChange={(e) => setData({ ...data, settings: { ...data.settings, name: e.target.value } })}
                                />
                                <label className="form__label">Display Name</label>
                            </div>
                            <div className="form__group">
                                <textarea
                                    className="form__input"
                                    placeholder=" "
                                    value={data.settings.bio}
                                    onChange={(e) => setData({ ...data, settings: { ...data.settings, bio: e.target.value } })}
                                ></textarea>
                                <label className="form__label">Bio Description</label>
                            </div>

                            <button className="button" disabled={isSavingSettings}>
                                {isSavingSettings ? 'Changing Settings...' : 'Change the Settings'}
                            </button>
                        </form>
                    </div>

                    {/* Project Manager */}
                    <div className="dashboard__card">
                        <h3 className="card__title">Add New Project</h3>
                        <form onSubmit={handleAddProject} className="admin__form">
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Project Title"
                                value={newProject.title}
                                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Image URL"
                                value={newProject.img}
                                onChange={(e) => setNewProject({ ...newProject, img: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Project Link (Optional)"
                                value={newProject.link}
                                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                            />
                            <textarea
                                className="form__input"
                                placeholder="Description"
                                value={newProject.desc}
                                onChange={(e) => setNewProject({ ...newProject, desc: e.target.value })}
                                required
                            ></textarea>
                            <button className="button" disabled={isAddingProject}>
                                {isAddingProject ? 'Adding Project...' : 'Add Project'}
                            </button>
                        </form>
                    </div>

                    {/* Blog Manager */}
                    <div className="dashboard__card" style={{ gridColumn: '1 / -1' }}>
                        <h3 className="card__title">Broadcast Signal (Write Blog)</h3>
                        <form onSubmit={handleAddBlog} className="admin__form">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    type="text"
                                    className="form__input"
                                    placeholder="Signal Title"
                                    value={newBlog.title}
                                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    className="form__input"
                                    placeholder="Image URL (Optional)"
                                    value={newBlog.img}
                                    onChange={(e) => setNewBlog({ ...newBlog, img: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="form__input"
                                    placeholder="External Link (Medium/Dev.to)"
                                    value={newBlog.link}
                                    onChange={(e) => setNewBlog({ ...newBlog, link: e.target.value })}
                                />
                            </div>
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Tags (comma separated) e.g. React, Cyber, AI"
                                value={newBlog.tags}
                                onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                            />
                            <textarea
                                className="form__input"
                                placeholder="Signal Content (Supports Markdown)"
                                value={newBlog.content}
                                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                                required
                                style={{ minHeight: '150px' }}
                            ></textarea>
                            <button className="button" disabled={isAddingBlog}>
                                {isAddingBlog ? 'Broadcasting...' : 'Broadcast Signal'}
                            </button>
                        </form>

                        <div className="projects__manage-grid" style={{ marginTop: '2rem' }}>
                            {data.blogs && data.blogs.map(blog => (
                                <div key={blog.id} className="manage__card">
                                    <div className="manage__info">
                                        <h4>{blog.title}</h4>
                                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                                    </div>
                                    <button
                                        className="delete__btn"
                                        onClick={() => handleDeleteBlog(blog.id)}
                                    >
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Inbox / Messages */}
                <div className="dashboard__card" style={{ gridColumn: '1 / -1', marginTop: '2rem' }}>
                    <h3 className="card__title">Incoming Transmissions (Inbox)</h3>
                    <div className="projects__manage-grid" style={{ gridTemplateColumns: '1fr' }}>
                        {data.messages && data.messages.length > 0 ? (
                            data.messages.map(msg => (
                                <div key={msg._id || msg.id} className="manage__card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <h4 style={{ color: 'var(--primary-color)' }}>{msg.name}</h4>
                                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{new Date(msg.date).toLocaleDateString()}</span>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-color)' }}>
                                        <strong>Email:</strong> {msg.email}
                                    </div>
                                    <p style={{ fontSize: '0.9rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '4px', width: '100%' }}>
                                        {msg.message}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p style={{ opacity: 0.7 }}>No messages received yet.</p>
                        )}
                    </div>
                </div>

                <div className="dashboard__projects-list">
                    <h3 className="card__title">Existing Projects</h3>
                    <div className="projects__manage-grid">
                        {data.projects.map(project => (
                            <div key={project.id} className="manage__card">
                                <div className="manage__info">
                                    <h4>{project.title}</h4>
                                    <span>{project.category}</span>
                                </div>
                                <button
                                    className="delete__btn"
                                    onClick={() => handleDeleteProject(project.id)}
                                >
                                    <i className="ri-delete-bin-line"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
