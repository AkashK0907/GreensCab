'use client'

import { useState, useEffect } from 'react'
import { Briefcase, Leaf, Menu, X, PhoneCall, MessageCircle, ShieldCheck, HelpCircle, Car, Map, MapPin, Users, Tag, Clock } from 'lucide-react'

const localTaxis = [
  { id: 1, name: 'Etios Rental Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-39-09-EtiosCarRental.jpg', seats: '4+1', fare: '₹2400.00', included: '8Hrs 80Kms included', extra: 'Extra ₹15.00/km \n ₹150.00/hour' },
  { id: 2, name: 'Ertiga Rental Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-40-32-ErtigaCarRental.png', seats: '6+1', fare: '₹2799.00', included: '8Hrs 80Kms included', extra: 'Extra ₹20.00/km \n ₹200.00/hour' },
  { id: 3, name: 'Innova Rental Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-42-20-InnovaCarRental.png', seats: '7+1', fare: '₹2999.00', included: '4Hrs 40Kms included', extra: 'Extra ₹20.00/km \n ₹200.00/hour' },
  { id: 4, name: 'Kia Carens Rental Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-41-15-KiaCarnesCarRental.png', seats: '6+1', fare: '₹2999.00', included: '8Hrs 80Kms included', extra: 'Extra ₹20.00/km \n ₹200.00/hour' },
  { id: 5, name: 'Crysta Rental Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-43-38-InnovaCrystaCarRental.png', seats: '7+1', fare: '₹3499.00', included: '8Hrs 80Kms included', extra: 'Extra ₹25.00/km \n ₹250.00/hour' },
  { id: 6, name: 'Hycross Rental Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-46-30-InnovaHycrossCarRental.png', seats: '7+1', fare: '₹4199.00', included: '8Hrs 80Kms included', extra: 'Extra ₹30.00/km \n ₹300.00/hour' },
]

export default function LocalRentalPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const whatsapp = 'https://wa.me/919008000000?text=Hello GreensCab%2C I need a local taxi in Bangalore.'
  const phone = 'tel:+919008000000'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="site-shell bg-light min-h-screen">
      <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
        <a className="brand" href="/#top">
          <div className="logo-text"><div className="logo-icon-wrap"><Leaf className="logo-icon" strokeWidth={2.5} /></div><span className="greens">Greens</span><span className="cab">Cab</span></div>
        </a>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="/fleet" onClick={() => setMenuOpen(false)}><Car size={16} /> Fleet</a>
          <div className="nav-dropdown">
            <button className="nav-dropdown-btn"><Briefcase size={16} /> Services <ChevronDown size={14} /></button>
            <div className="nav-dropdown-content">
              <a href="/airport" onClick={() => setMenuOpen(false)}>Airport pickup & drop</a>
              <a href="/local-rental" onClick={() => setMenuOpen(false)}>City Local Rental</a>
              <a href="/#services" onClick={() => setMenuOpen(false)}>Outstation Cabs</a>
              <a href="/#services" onClick={() => setMenuOpen(false)}>Tour Cab Booking</a>
            </div>
          </div>
          <a href="/#tours" onClick={() => setMenuOpen(false)}><Map size={16} /> Tours</a>
          <a href="/#why" onClick={() => setMenuOpen(false)}><ShieldCheck size={16} /> Why Us</a>
          <a href="/#faq" onClick={() => setMenuOpen(false)}><HelpCircle size={16} /> FAQs</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)}><PhoneCall size={16} /> Contact</a>
          <a className="button primary nav-quote" href={whatsapp}><MessageCircle size={16} /> WhatsApp Quote</a>
        </nav>
      </header>

      <section className="fleet-page-header">
        <div className="container">
          <div className="hero-eyebrow">Affordable Taxi for Outstation Travel and Trips</div>
          <h1>Best Bangalore Local Taxi Hire Service</h1>
          <p className="subtitle">Choose from the wide range of cab/taxi with our local taxi booking in Bangalore.</p>
          <div className="header-actions">
            <a href={phone} className="button secondary"><PhoneCall size={18} /> Call 24X7 +91 90080 00000</a>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="airport-grid">
            {localTaxis.map(car => (
              <div key={car.id} className="airport-card">
                <div className="airport-img-wrap">
                  <img src={car.img} alt={car.name} onError={(e) => { e.currentTarget.src = 'https://safeway.travel/images/fleet_gallery/toyota-etios-sedan/001.jpg?v=1' }} />
                </div>
                <div className="airport-card-body">
                  <h3>{car.name}</h3>
                  <div className="seat-info">
                    <span><Users size={14} className="icon-orange" /> {car.seats}</span>
                  </div>
                  <div className="divider"></div>
                  <ul className="airport-features">
                    <li><Tag size={14} className="icon-blue" /> Fare <strong>{car.fare}</strong></li>
                    <li><Car size={14} className="icon-blue" /> {car.included}</li>
                    <li style={{alignItems: 'flex-start'}}>
                      <MapPin size={14} className="icon-orange" style={{marginTop: '2px'}} />
                      <span style={{whiteSpace: 'pre-line', lineHeight: '1.4'}}>{car.extra}</span>
                    </li>
                  </ul>
                  <div className="airport-actions">
                    <a href={phone} className="btn-dark">Book</a>
                    <a href={phone} className="btn-yellow">Call Now</a>
                    <a href={whatsapp} className="btn-green">Watsapp</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div>
          <a className="brand" href="/#top">
            <div className="logo-text"><div className="logo-icon-wrap"><Leaf className="logo-icon" strokeWidth={2.5} /></div><span className="greens">Greens</span><span className="cab">Cab</span></div>
          </a>
          <p>Premium chauffeur-driven transportation in Bengaluru. Punctual, safe, and professional service.</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <a href="/fleet">Our Fleet</a>
          <a href="/airport">Airport Taxi</a>
          <a href="/local-rental">Local Taxi</a>
          <a href="/#contact">Contact Us</a>
        </div>
        <div>
          <h3>Contact 24/7</h3>
          <p>Email: bookings@greenscab.in</p>
          <p>Phone: +91 90080 00000</p>
          <p>Bengaluru, Karnataka</p>
        </div>
      </footer>
      <a href={whatsapp} className="floating-whatsapp" aria-label="Chat on WhatsApp"><MessageCircle /></a>
    </main>
  )
}
