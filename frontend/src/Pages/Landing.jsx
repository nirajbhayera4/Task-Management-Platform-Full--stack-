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
                        <span className="landing-logo-text">Task Manager</span>
                    </div>
                    <nav className="landing-nav-links">
                        <a href="#features">Features</a>
                        <a href="#pricing">Pricing</a>
                        <Link to="/login" className="landing-nav-login">Login</Link>
                        <Link to="/signup" className="landing-btn landing-btn-primary">Signup for free</Link>
                    </nav>
                </div>

            </header>


        </div>
    )
}
export default Landing;
