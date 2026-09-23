'use client'

import { useState, useEffect } from 'react'
import { Briefcase, Leaf, Menu, X, PhoneCall, MessageCircle, ShieldCheck, HelpCircle, Car, Map, MapPin, Users, Phone, Tag, Route } from 'lucide-react'

const airportTaxis = [
  { id: 1, name: 'Sedan', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-18-08-SedanAirportTaxi.jpg', seats: '4+1', fare: '₹999.00', toll: 'Toll Optional', distance: 'Upto 30 km' },
  { id: 2, name: 'Etios Airport Taxi', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-18-38-EtiosAirportTaxi.jpg', seats: '4+1', fare: '₹1099.00', toll: 'Toll Optional', distance: 'Upto 30 km' },
  { id: 3, name: 'Ertiga Airport Taxi', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-19-36-ErtigaAirportTaxi.png', seats: '6+1', fare: '₹1499.00', toll: 'Toll Optional', distance: 'Upto 30 km' },
  { id: 4, name: 'Ciaz Airport Taxi', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-19-19-CiazAirportTaxi.png', seats: '4+1', fare: '₹1499.00', toll: 'Toll Optional', distance: 'Upto 30 km' },
  { id: 5, name: 'Innova Airport Taxi', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-21-56-InnovaAirportTaxi.png', seats: '7+1', fare: '₹1799.00', toll: 'Toll Optional', distance: 'Upto 30 km' },
  { id: 6, name: 'Kia Carens Airport Taxi', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-20-44-KiaCarnesAirportTaxi.png', seats: '6+1', fare: '₹1799.00', toll: 'Toll Optional', distance: 'Upto 30 km' },
  { id: 7, name: 'Innova Crysta Airport Taxi', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-25-05-InnovaCrystaAirportTaxi.png', seats: '7+1', fare: '₹2199.00', toll: 'Toll Optional', distance: 'Upto 40 km' },
  { id: 8, name: 'Innova Hycross Airport Taxi', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-25-48-InnovaHycrossAirportTaxi.png', seats: '7+1', fare: '₹2999.00', toll: 'Toll Optional', distance: 'Upto 40 km' },
  { id: 9, name: 'Tempo Traveller For Airport', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-26-23-TempoTravellerAirport.png', seats: '12+1', fare: '₹3999.00', toll: 'Toll Optional', distance: 'Upto 40 km' },
  { id: 10, name: 'Tempo Traveller AC', img: 'https://www.greensrentacab.com/media/assets/2026-01-18-11-27-10-TempoTravellerAirport.png', seats: '12+1', fare: '₹4499.00', toll: 'Toll Optional', distance: 'Upto 40 km' },
]

export default function AirportPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const whatsapp = 'https://wa.me/919008000000?text=Hello GreensCab%2C I need an airport taxi.'
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
          <a href="/airport" onClick={() => setMenuOpen(false)}><Briefcase size={16} /> Services</a>
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
          <h1>Book Airport Taxi in Bangalore</h1>
          <p className="subtitle">Choose from the wide range of cab/taxi with our airport taxi booking in Bangalore.</p>
          <div className="header-actions">
            <a href={phone} className="button secondary"><PhoneCall size={18} /> Call 24X7 +91 90080 00000</a>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="airport-grid">
            {airportTaxis.map(car => (
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
                    <li><Route size={14} className="icon-blue" /> {car.toll}</li>
                    <li><MapPin size={14} className="icon-orange" /> {car.distance}</li>
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
          <a href="/#tours">South India Tours</a>
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
