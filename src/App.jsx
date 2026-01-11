import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './App.css';

// Lazy Load Components
const Home = lazy(() => import('./components/Home'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Projects'));
const TheLab = lazy(() => import('./components/TheLab'));
const Contact = lazy(() => import('./components/Contact'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const Arsenal = lazy(() => import('./components/Arsenal'));
const Timeline = lazy(() => import('./components/Timeline'));
const Arcade = lazy(() => import('./components/Arcade'));
const Blog = lazy(() => import('./components/Blog'));
const Login = lazy(() => import('./admin/Login'));
const Dashboard = lazy(() => import('./admin/Dashboard'));

import { Toaster } from 'react-hot-toast';

import './App.css';

const HomeView = ({ data }) => (
  <>
    <Home data={data?.settings} />
    <Services />
    <Projects data={data?.projects} />
    <TheLab />
    <Contact data={data?.settings} />
  </>
);

function App() {
  const [isDark, setIsDark] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    document.body.className = isDark ? 'dark-theme' : 'light-theme';
    fetch(`${import.meta.env.VITE_API_URL}/data`)
      .then(res => res.json())
      .then(json => setData(json));
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <div className={`App ${isDark ? 'dark-theme' : 'light-theme'}`}>

        <Header toggleTheme={toggleTheme} isDark={isDark} />
        <main className="main">
          <Suspense fallback={
            <div className="flex justify-center items-center h-screen">
              <div className="loader">Loading...</div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomeView data={data} />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/arsenal" element={<Arsenal />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/arcade" element={<Arcade />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </main>

        <footer className="footer section">
          <div className="container footer__container">
            <p className="footer__copy">
              &#169; 2025 Vaibhav Kumar. All rights reserved.
            </p>
          </div>
        </footer>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--container-color)',
              color: 'var(--title-color)',
              border: '1px solid var(--border-color)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              fontSize: 'var(--fs-sm)',
              fontFamily: 'var(--body-font)',
              padding: '1rem 1.5rem',
            },
            success: {
              iconTheme: {
                primary: 'var(--primary-color)',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
