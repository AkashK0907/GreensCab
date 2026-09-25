'use client'

import { useState, useEffect } from 'react'
import { Briefcase, Leaf, Menu, X, PhoneCall, MessageCircle, ShieldCheck, HelpCircle, Car, Map, ChevronDown, ArrowRight, Clock, Tag } from 'lucide-react'

const tourPackages = [
  { id: 1, title: '2 Days Bangalore to Coorg Cab Package | Coorg Tour by Car', price: '12400', duration: '2 Days', category: 'Hill Stations', img: 'https://images.unsplash.com/photo-1610486339003-455a5ec337ee?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: '3 Days Kabini Tour Package from Bangalore by Cab | Wildlife & Jungle Trip', price: '14699', duration: '3 Days', category: 'Wildlife & Nature', img: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: '3 Days Coorg Tour Package from Bangalore by Cab | Coorg Sightseeing', price: '14799', duration: '3 Days', category: 'Hill Stations', img: 'https://images.unsplash.com/photo-1610486339003-455a5ec337ee?auto=format&fit=crop&w=600&q=80' },
  { id: 4, title: 'Coorg Taxi from Bangalore | 4 Days / 3 Nights Cab Service', price: '15999', duration: '4 Days', category: 'Hill Stations', img: 'https://images.unsplash.com/photo-1610486339003-455a5ec337ee?auto=format&fit=crop&w=600&q=80' },
  { id: 5, title: '3 Days Ooty Cab Service from Bangalore | Ooty Taxi Package Price', price: '16299', duration: '3 Days', category: 'Hill Stations', img: 'https://images.unsplash.com/photo-1643906352055-6b5ce534c0e9?auto=format&fit=crop&w=600&q=80' },
  { id: 6, title: '4 Days Coorg Tour Package from Bangalore by Cab | Coorg Sightseeing', price: '17999', duration: '4 Days', category: 'Hill Stations', img: 'https://images.unsplash.com/photo-1610486339003-455a5ec337ee?auto=format&fit=crop&w=600&q=80' },
  { id: 7, title: '4 Days Mysore Coorg Tour Package from Bangalore by Cab | 3 Nights', price: '18399', duration: '4 Days', category: 'Heritage & Culture', img: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=600&q=80' },
  { id: 8, title: '4 Days Coorg & Chikmagalur Tour Package from Bangalore by Cab', price: '19899', duration: '4 Days', category: 'Hill Stations', img: 'https://images.unsplash.com/photo-1610486339003-455a5ec337ee?auto=format&fit=crop&w=600&q=80' },
  { id: 9, title: '4 Days Wayanad Tour Package from Bangalore by Cab | Family & Couple Trip', price: '20299', duration: '4 Days', category: 'Hill Stations', img: 'https://images.unsplash.com/photo-1596426466367-926f9473bba7?auto=format&fit=crop&w=600&q=80' },
  { id: 10, title: '4 Days Munnar Tour Package from Bangalore by Cab | Kerala Trip', price: '22199', duration: '4 Days', category: 'Hill Stations', img: 'https://images.unsplash.com/photo-1593693397690-362bb9a1bfc5?auto=format&fit=crop&w=600&q=80' },
  { id: 11, title: '5 Days / 4 Nights Bangalore to Coorg Tour Package by Cab | Coorg Sightseeing', price: '22499', duration: '5 Days', category: 'Hill Stations', img: 'https://images.unsplash.com/photo-1610486339003-455a5ec337ee?auto=format&fit=crop&w=600&q=80' },
  { id: 12, title: '5 Days / 4 Nights Bangalore to Coorg & Ooty Tour Package by Cab', price: '24899', duration: '5 Days', category: 'Hill Stations', img: 'https://images.unsplash.com/photo-1610486339003-455a5ec337ee?auto=format&fit=crop&w=600&q=80' },
  { id: 13, title: 'Bangalore to Ooty, Coonoor & Coimbatore 5 Days Cab Package', price: '25499', duration: '5 Days', category: 'Hill Stations', img: 'https://images.unsplash.com/photo-1643906352055-6b5ce534c0e9?auto=format&fit=crop&w=600&q=80' },
  { id: 14, title: '5 Days Mysore Ooty Coorg Tour Package from Bangalore by Cab', price: '26299', duration: '5 Days', category: 'Heritage & Culture', img: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=600&q=80' },
  { id: 15, title: 'Bangalore to Ooty, Coorg & Mysore Cab Tour Package | 5 Nights / 6 Days', price: '28799', duration: '6 Days', category: 'Heritage & Culture', img: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=600&q=80' },
  { id: 16, title: '6 Nights 7 Days Bangalore Mysore Ooty Coorg Tour Package by Cab', price: '32699', duration: '7 Days', category: 'Heritage & Culture', img: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=600&q=80' },
  { id: 17, title: 'Coorg, Ooty & Kodaikanal Cab Package from Bangalore | 7 Days', price: '33499', duration: '7 Days', category: 'Hill Stations', img: 'https://images.unsplash.com/photo-1610486339003-455a5ec337ee?auto=format&fit=crop&w=600&q=80' },
  { id: 18, title: 'Bangalore to Nandi Hills Cab | One Day Taxi & Tour Package', price: '3499', duration: '1 Day', category: 'Heritage & Culture', img: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=600&q=80' },
  { id: 19, title: 'Places to Visit in Bangalore: 11 Best Places to Explore', price: '3999', duration: '1 Day', category: 'City Tour', img: 'https://images.unsplash.com/photo-1600111765039-4eeebc4b7875?auto=format&fit=crop&w=600&q=80' },
  { id: 20, title: 'Bangalore to Mysore, Coorg, Ooty & Kodaikanal Tour Package - 9 Days', price: '41200', duration: '9 Days', category: 'Heritage & Culture', img: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=600&q=80' },
  { id: 21, title: 'Bangalore Sightseeing Cab Package | Full Day City Tour by Cab', price: '4399', duration: '1 Day', category: 'City Tour', img: 'https://images.unsplash.com/photo-1600111765039-4eeebc4b7875?auto=format&fit=crop&w=600&q=80' },
  { id: 22, title: 'Bangalore City Tour Package by Cab | Local Sightseeing', price: '4399', duration: '1 Day', category: 'City Tour', img: 'https://images.unsplash.com/photo-1600111765039-4eeebc4b7875?auto=format&fit=crop&w=600&q=80' },
  { id: 23, title: '9 Days South India Tour Package from Bangalore | Coorg, Mysore & Kerala', price: '45299', duration: '9 Days', category: 'Heritage & Culture', img: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=600&q=80' },
  { id: 24, title: 'Bangalore to Isha Foundation Chikkaballapur Cab Package', price: '4599', duration: '1 Day', category: 'City Tour', img: 'https://images.unsplash.com/photo-1600111765039-4eeebc4b7875?auto=format&fit=crop&w=600&q=80' },
  { id: 25, title: 'Bangalore to Hogenakkal Cab Package', price: '6499', duration: '1 Day', category: 'Nature & Waterfalls', img: 'https://images.unsplash.com/photo-1596706918968-3bb8c005baaf?auto=format&fit=crop&w=600&q=80' },
  { id: 26, title: '1 Day Mysore Tour from Bangalore by Cab | Mysore Sightseeing Package', price: '7399', duration: '1 Day', category: 'Heritage & Culture', img: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=600&q=80' },
  { id: 27, title: 'Bangalore Airport to Coorg Taxi Fare', price: '8340', duration: '1 Day', category: 'Airport Transfers', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80' }
]

export default function ToursPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const whatsapp = 'https://wa.me/919686025999?text=Hello GreensCab%2C I am interested in a tour package.'
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
          <a href="/tours" onClick={() => setMenuOpen(false)} className="active"><Map size={16} /> Tours</a>
          <a href="/#why" onClick={() => setMenuOpen(false)}><ShieldCheck size={16} /> Why Us</a>
          <a href="/#faq" onClick={() => setMenuOpen(false)}><HelpCircle size={16} /> FAQs</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)}><PhoneCall size={16} /> Contact</a>
          <a className="button primary nav-quote" href={whatsapp}><MessageCircle size={16} /> WhatsApp Quote</a>
        </nav>
      </header>

      <section className="fleet-page-header">
        <div className="container">
          <div className="hero-eyebrow">Explore South India with Us</div>
          <h1>Premium Tour Packages</h1>
          <p className="subtitle">Discover breathtaking destinations with our expertly crafted tour cab packages.</p>
          <div className="header-actions">
            <a href={phone} className="button secondary"><PhoneCall size={18} /> Call 24X7 +91 96860 25999</a>
          </div>
        </div>
      </section>

      <section className="section bg-light" style={{paddingTop: '20px'}}>
        <div className="container">
          <div className="tours-grid">
            {tourPackages.map(pkg => (
              <div key={pkg.id} className="tour-card">
                <div className="tour-img-wrap">
                  <img src={pkg.img} alt={pkg.title} />
                </div>
                <div className="tour-card-body">
                  <span className="tour-category">{pkg.category}</span>
                  <h3>{pkg.title}</h3>
                  
                  <div className="tour-meta">
                    <div className="meta-item">
                      <Clock size={14} className="icon-blue" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="meta-item">
                      <Tag size={14} className="icon-orange" />
                      <span>Starts from ₹{pkg.price}/-</span>
                    </div>
                  </div>

                  <a href={whatsapp} className="tour-link">Explore route <ArrowRight size={14} /></a>
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
          <a href="/tours">Tour Packages</a>
          <a href="/#contact">Contact Us</a>
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

