import './homepage.css';
import {FaInstagram, FaYoutube} from "react-icons/fa";
import {FaBoltLightning, FaBriefcase} from "react-icons/fa6";
import {TbPresentationAnalytics} from "react-icons/tb";
import {MdBrandingWatermark} from "react-icons/md";
import CTAForm from "../../components/Forms/CtaForm/CtaForm.tsx";

export default function HomePage() {
    return (
        <div className="container">
            <div className="home-page">
                <section className="hero">
                    <div className="hero-title">
                        <h1 className="title">Your one stop link for everything</h1>
                        <h3 className="subtitle">Share your links, social profiles, contact info and more in one
                            page</h3>

                        <CTAForm ctaText="Claim your username" />
                    </div>

                    <div className="hero-demo">
                        <strong><span className="yourname">@yourname</span></strong>
                        <div className="hero-link">
                            <FaYoutube/>
                            <span>YouTube Channel</span>
                        </div>
                        <div className="hero-link">
                            <FaInstagram/>
                            <span>Instagram</span>
                        </div>
                        <div className="hero-link">
                            <FaBriefcase/>
                            <span>Portfolio</span>
                        </div>
                    </div>
                </section>

                <section className="features">
                    <div className="feature">
                        <h3>
                            <TbPresentationAnalytics />
                            <span>Powerful Analytics</span>
                        </h3>
                        <p>Understand your audience with real-time insights.</p>
                    </div>
                    <div className="feature">
                        <h3>
                            <MdBrandingWatermark />
                            <span>Custom Branding</span>
                        </h3>
                        <p>Make your page truly yours with themes and styles.</p>
                    </div>
                    <div className="feature">
                        <h3>
                            <FaBoltLightning />
                            <span>Lightning Fast</span>
                        </h3>
                        <p>Optimized for speed and performance worldwide.</p>
                    </div>
                </section>

                <section className="cta">
                    <h2>Start growing your audience today</h2>
                    <div>
                        <CTAForm ctaText="Create Your Page" />
                    </div>
                </section>
            </div>
        </div>
    );
}