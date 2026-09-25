'use client'

import { useState, useEffect } from 'react'
import { Briefcase, Leaf, Menu, X, PhoneCall, MessageCircle, ShieldCheck, HelpCircle, Car, Map, MapPin, Users, Tag, ChevronDown, SteeringWheel } from 'lucide-react'

const outstationTaxis = [
  { id: 1, name: 'Sedan Outstation Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-29-11-SedanOutstationCabs.jpg', seats: '4+1', fare: '₹12.00/km', driver: 'Driver Bata 400.00/day', min: '300 Kms min rental/day' },
  { id: 2, name: 'Etios Outstation Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-29-47-EtiosOutstationCabs.jpg', seats: '4+1', fare: '₹13.00/km', driver: 'Driver Bata 400.00/day', min: '300 Kms min rental/day' },
  { id: 3, name: 'Ciaz Outstation Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-30-13-CiazOutstationCabs.png', seats: '4+1', fare: '₹14.00/km', driver: 'Driver Bata 400.00/day', min: '300 Kms min rental/day' },
  { id: 4, name: 'Ertiga Outstation Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-31-45-ErtigaOutstationCabs.png', seats: '6+1', fare: '₹15.00/km', driver: 'Driver Bata 400.00/day', min: '300 Kms min rental/day' },
  { id: 5, name: 'Kia Carens Outstation Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-32-27-KiaCarnesOutstationCabs.png', seats: '6+1', fare: '₹16.00/km', driver: 'Driver Bata 400.00/day', min: '300 Kms min rental/day' },
  { id: 6, name: 'Innova Outstation Cab', img: 'https://www.greensrentacab.com/media/assets/2025-09-04-03-37-54-ToyotaInnova.jpg', seats: '7+1', fare: '₹18.00/km', driver: 'Driver Bata 400.00/day', min: '300 Kms min rental/day' },
  { id: 7, name: 'Innova Crysta Outstation Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-35-00-InnovaCrystaOutstatinCabs.png', seats: '7+1', fare: '₹20.00/km', driver: 'Driver Bata 500.00/day', min: '300 Kms min rental/day' },
  { id: 8, name: 'Tempo Traveller Outstation', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-37-12-OutstationTempoTraveller.png', seats: '12+1', fare: '₹21.00/km', driver: 'Driver Bata 700.00/day', min: '300 Kms min rental/day' },
  { id: 9, name: 'Tempo Traveller Outstation ( A/C)', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-38-05-OutstationTempoTraveller.png', seats: '12+1', fare: '₹22.00/km', driver: 'Driver Bata 700.00/day', min: '300 Kms min rental/day' },
  { id: 10, name: 'Innova Hycross Outstation Cab', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-35-39-InnovaHycrossOutstationCabs.png', seats: '7+1', fare: '₹23.00/km', driver: 'Driver Bata 500.00/day', min: '300 Kms min rental/day' },
  { id: 11, name: 'Urbania Luxury 12+1 Seater', img: 'https://www.greensrentacab.com/media/assets/2026-09-16-11-39-13-UrbaniaLuxury121Seater.jfif', seats: '12+1', fare: '₹45.00/km', driver: 'Driver Bata 1000.00/day', min: '300 Kms min rental/day' },
  { id: 12, name: 'Urbania 16+1 Seater', img: 'https://www.greensrentacab.com/media/assets/2026-09-16-11-42-05-UrbaniaLuxury161Seater.jfif', seats: '16+1', fare: '₹45.00/km', driver: 'Driver Bata 1000.00/day', min: '300 Kms min rental/day' },
]

export default function OutstationPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const whatsapp = 'https://wa.me/919686025999?text=Hello GreensCab%2C I need an outstation taxi from Bangalore.'
  const phone = 'tel:+919686025999'

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
              <a href="/outstation" onClick={() => setMenuOpen(false)}>Outstation Cabs</a>
              <a href="/tours" onClick={() => setMenuOpen(false)}>Tour Cab Booking</a>
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
          <h1>Book Outstation Taxi Hire From Bangalore</h1>
          <p className="subtitle">Choose from the wide range of outstation taxi booking in Bangalore.</p>
          <div className="header-actions">
            <a href={phone} className="button secondary"><PhoneCall size={18} /> Call 24X7 +91 96860 25999</a>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="airport-grid">
            {outstationTaxis.map(car => (
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
                    <li><Car size={14} className="icon-blue" /> {car.driver}</li>
                    <li><MapPin size={14} className="icon-orange" /> {car.min}</li>
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
          <a href="/outstation">Outstation Cabs</a>
        </div>
        <div>
          <h3>Contact 24/7</h3>
          <p>Email: bookings@greenscab.in</p>
          <p>Phone: +91 96860 25999</p>
          <p>25, 2nd Cross St, Muniyappa Layout, Nagenahalli, Narayanapura, Bengaluru, Karnataka 560077</p>
        </div>
      </footer>
      <a href={whatsapp} className="floating-whatsapp" aria-label="Chat on WhatsApp"><MessageCircle /></a>
    </main>
  )
}


