import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const codeSnippet = `
const initSystem = async () => {
  await loadModules([
    'NEURAL_NET',
    'CYBER_SECURITY',
    'QUANTUM_ENCRYPTION'
  ]);
  
  console.log("System Ready...");
  return new CyberCore({
    mode: 'GOD_TIER',
    power: 'UNLIMITED'
  });
};

class CyberCore {
  constructor(config) {
    this.mode = config.mode;
    this.active = true;
  }
  
  penetrateFirewall(target) {
    if (this.mode === 'GOD_TIER') {
      return "ACCESS GRANTED";
    }
  }
}
`;

const Arcade = () => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const codeRef = useRef(null);

    useEffect(() => {
        const handleKeyPress = (e) => {
            // Prevent default behavior to stop scrolling etc
            // But usually we just want to capture typing
        };

        const typeChar = () => {
            if (index < codeSnippet.length) {
                // Add next 3 chars for speed
                const nextChunk = codeSnippet.substring(index, index + 3);
                setText(prev => prev + nextChunk);
                setIndex(prev => prev + 3);
            }
        };

        window.addEventListener('keydown', typeChar);
        return () => window.removeEventListener('keydown', typeChar);
    }, [index]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (codeRef.current) {
            codeRef.current.scrollTop = codeRef.current.scrollHeight;
        }
    }, [text]);

    return (
        <section className="section container" style={{ paddingTop: '8rem', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Link to="/" className="back-link">
                <i className="ri-arrow-left-line"></i> Return_to_Base
            </Link>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2 className="section__title">The_Arcade <span className="cursor">_</span></h2>
                <p style={{ color: 'var(--text-color-alt)', marginBottom: '1rem' }}>
                    // MISSION: Type indiscriminately on your keyboard to hack the mainframe.
                </p>

                <div
                    className="hacking-terminal"
                    style={{
                        flex: 1,
                        background: '#050505',
                        border: '2px solid var(--primary-color)',
                        borderRadius: '0.5rem',
                        padding: '1.5rem',
                        fontFamily: 'monospace',
                        color: 'var(--primary-color)',
                        overflowY: 'auto',
                        whiteSpace: 'pre-wrap',
                        boxShadow: '0 0 20px rgba(0, 243, 255, 0.2)',
                        maxHeight: '600px'
                    }}
                    ref={codeRef}
                >
                    {text}
                    <span className="cursor" style={{ width: '10px', height: '1em', background: 'var(--primary-color)', display: 'inline-block' }}></span>
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

export default Arcade;
