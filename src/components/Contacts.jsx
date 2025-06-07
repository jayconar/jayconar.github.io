import { useRef, useEffect, useState } from 'react';
import { FaEnvelope, FaGithub, FaInstagram } from 'react-icons/fa';
import { BsFillSendFill } from "react-icons/bs";
import emailjs from '@emailjs/browser';
import { myEmail, github, instagram } from '../data/config.json';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const contactCards = useRef([]);
  const formRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    } else {
      alert('Missing credentials. Contact functionality unavailable.');
    }

    const handleMouseMove = (e) => {
      contactCards.current.forEach(card => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current || !SERVICE_ID || !TEMPLATE_ID) {
      alert('Missing credentials. Contact functionality unavailable.');
      return;
    }

    setIsSending(true);
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current)
      .then(() => {
        setIsSending(false);
        setIsSubmitted(true);
        formRef.current.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      })
      .catch(() => {
        setIsSending(false);
      });
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-grid">
        <div className="contact-card" ref={el => contactCards.current[0] = el}>
          <div className="card-content">
            <h3 className="contact-title">Connect With Me</h3>
            <p className="contact-text">
              Feel free to reach out if you have any thoughts or just want to say hi. I’d love to hear what you think about the site. Hope you like it and thanks for stopping by!            
            </p>
            <div className="contact-info">
              <div className="info-item">
                <div className="info-icon"><FaEnvelope /></div>
                <div className="info-content">
                  <h4>Email</h4>
                  <a href={`mailto:${myEmail}`}>{myEmail}</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><FaGithub /></div>
                <div className="info-content">
                  <h4>GitHub</h4>
                  <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer">github.com/{github}</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><FaInstagram /></div>
                <div className="info-content">
                  <h4>Instagram</h4>
                  <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">instagram.com/{instagram}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-card" ref={el => contactCards.current[1] = el}>
          <div className="card-content">
            <h3 className="contact-title">Send a Message</h3>
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Message Received!</h3>
                <p>Thanks for reaching out. I’ll get back to you within 36 hours.</p>
              </div>
            ) : (
              <form ref={formRef} id="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="text" className="form-input" id="name" name="name" required placeholder=" " />
                  <label htmlFor="name" className="form-label">Your Name</label>
                </div>
                <div className="form-group">
                  <input type="email" className="form-input" id="email" name="email" required placeholder=" " />
                  <label htmlFor="email" className="form-label">Your Email Address</label>
                </div>
                <div className="form-group">
                  <textarea className="form-input" id="message" name="message" required placeholder=" " rows="5"></textarea>
                  <label htmlFor="message" className="form-label">Your Message</label>
                </div>
                <button type="submit" className="submit-btn" disabled={isSending}>
                  {isSending ? 'Sending...' : 'Send Message'}
                  <BsFillSendFill className="icon" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;