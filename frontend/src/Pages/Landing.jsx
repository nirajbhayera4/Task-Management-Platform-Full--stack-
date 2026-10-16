import { Link } from 'react-router-dom';
import './Landing.css';

const FEATURES = [
    {
        title: "Visual boards",
        desc: "Drag tasks across To Do, In Progress, and Done so you always know what's next.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="4" width="18" height="4" rx="1" stroke="#0079bf" strokeWidth="2" />
                <rect x="3" y="10" width="18" height="4" rx="1" stroke="#0079bf" strokeWidth="2" />
                <rect x="3" y="16" width="10" height="4" rx="1" stroke="#0079bf" strokeWidth="2" />
            </svg>

        ),
    },
    {
        title: 'Email reminders',
        desc: "Set a reminder on any tasks and get notified by emain right when it's due.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="#0079bf" strokeWidth="2" />
                <path d="M12 7v5l3.5 2" stroke="#0079bf" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),

    },
    {
        title: 'Secure by default',
        desc: 'JWT-based authentication keeps every account\'s tasks private and protected.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#0079bf" strokeWidth="2" />
                <path d="M9 12l2 2 4-4" stroke="#0079bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },

];

function Landing() {
    return (
        <div className="landing">
            {/*nav*/}
            <header className="landing-nav">
                <div className="landing-nav-inner">
                    <div className="landing-logo">
                        <span className="landing-logo-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <rect x="3" y="4" width="7" height="16" rx="1.5" fill="white" />
                                <rect x="13" y="4" width="7" height="9" rx="1.5" fill="white" fillOpacity="0.8" />
                            </svg>

                        </span>
                        <span className="landing-logo-text">LikeTrello</span>
                    </div>
                    <nav className="landing-nav-links">
                        <a href="#features">Features</a>
                        <a href="#pricing">Pricing</a>
                        <Link to="/login" className="landing-nav-login">Login</Link>
                        <Link to="/signup" className="landing-btn landing-btn-primary">Signup for free</Link>
                    </nav>
                </div>

            </header>

            {/*hero*/}
            <section className="landing-hero">
                <div className="landing-hero-text">
                    <h1>Organise your work, <span className="landing-accent">
                        one task at a time</span></h1>
                    <p>A simple, visual board to plan, track, and finish your tasks-built for individual and small teams who want clarity without the clutter.</p>
                    <div>
                        <Link to="/signup" className="landing-btn landing-btn-primary landing-btn-lg">Get Started- it's free</Link>
                        <a href="#features" className="landing-btn landing-btn-secondary landing-btn-lg">See how it works</a>
                    </div>
                    <p className="landing-hero-note">No credit card required</p>
                </div>

                <div className="landing-hero-preview">
                    <div className="landing-preview-col">
                        <div className="landing-preview-col-title">To Do</div>
                        <div className="landing-preview-card" style={{ borderLeftColor: '#0079bf' }}>Design mockups</div>
                        <div className="landing-preview-card" style={{ borderLeftColor: '#0079bf' }}>Write docs</div>
                    </div>
                    <div className="landing-preview-col">
                        <div className="landing-preview-col-title">In progress</div>
                        <div className="landing-preview-card" style={{ borderLeftColor: '#ff991f' }}>Build API</div>
                    </div>
                    <div className="landing-preview-col">
                        <div className="landing-preview-col-title">Done</div>
                        <div className="landing-preview-card" style={{ borderLeftColor: '#61bd4f' }}>DB schema</div>
                    </div>
                </div>
            </section>
            {/*features*/}
            <section className="landing-features" id="features">
                <div className="landing-features-inner">
                    <h2>Everything you need to stay on track</h2>
                    <div className="landing-feature-grid">
                        {FEATURES.map((f) => (
                            <div className="landing-feature-card" key={f.title}>
                                <div className="landing-feature-icon">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/*CTA*/}
            <section>
                <h2>Ready to get organized</h2>
                <p>
                Create your first board in under a minute.
                </p>
            </section>



        </div>
    )
}
export default Landing;
