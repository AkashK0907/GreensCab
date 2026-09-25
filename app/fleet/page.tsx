'use client'

import { useState, useEffect } from 'react'
import { Briefcase, Leaf, Menu, X, PhoneCall, MessageCircle, Search, LayoutGrid, Car, ShieldCheck, HelpCircle, Calendar, ChevronDown, Users, Image as ImageIcon } from 'lucide-react'

import contentData from '../../data/content.json'
const allCars = contentData.fleet

// Dummy car database simulating the 46 vehicles based on screenshots

const categories = ['All (7)', 'Sedan Etios', 'Ertiga', 'Kia Carens', 'Innova Crysta', 'Innova Hycross', 'Tempo Traveller', 'Urbania']

export default function FleetPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All (48)')
  const [search, setSearch] = useState('')
  const [tripMode, setTripMode] = useState('Local (8h/80k)')

  const whatsapp = 'https://wa.me/919686025999?text=Hello%20GreensCab%2C%20I%20need%20a%20travel%20quote.'

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category')
    if (cat) {
      const match = categories.find(c => c.toLowerCase() === cat.toLowerCase())
      if (match) setActiveCategory(match)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredCars = allCars.filter(car => {
    const matchesCat = activeCategory.startsWith('All') || car.category === activeCategory
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

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
          <a href="/#fleet" onClick={() => setMenuOpen(false)}><Car size={16} /> Fleet</a>
          <div className="nav-dropdown">
            <button className="nav-dropdown-btn"><Briefcase size={16} /> Services <ChevronDown size={14} /></button>
            <div className="nav-dropdown-content">
              <a href="/airport" onClick={() => setMenuOpen(false)}>Airport pickup & drop</a>
              <a href="/local-rental" onClick={() => setMenuOpen(false)}>City Local Rental</a>
              <a href="/outstation" onClick={() => setMenuOpen(false)}>Outstation Cabs</a>
              <a href="/tours" onClick={() => setMenuOpen(false)}>Tour Cab Booking</a>
            </div>
          </div>
          <a href="/#tours" onClick={() => setMenuOpen(false)}><LayoutGrid size={16} /> Tours</a>
          <a href="/#why" onClick={() => setMenuOpen(false)}><ShieldCheck size={16} /> Why Us</a>
          <a href="/#faq" onClick={() => setMenuOpen(false)}><HelpCircle size={16} /> FAQs</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)}><PhoneCall size={16} /> Contact</a>
          <a className="button primary nav-quote" href={whatsapp}><MessageCircle size={16} /> WhatsApp Quote</a>
        </nav>
      </header>

      <section className="fleet-page-header">
        <div className="fleet-page-inner">
          <div className="breadcrumbs">
            <a href="/">Home</a> <span>/</span> <span className="active">Complete Fleet</span>
          </div>
          <span className="badge yellow mt-3">Verified 2026 Fleet (46 Models)</span>
          <h1>Our Complete Passenger Fleet in Bengaluru</h1>
          <p>From airport executive sedans & hybrid SUVs to next-gen Force Urbania, luxury Tempo Travellers & 49-seater ultra luxury Volvo coaches with transparent per-km tariffs.</p>
          <div className="header-actions">
            <a href={whatsapp} className="button primary"><MessageCircle /> Instant WhatsApp Booking</a>
            <a href="tel:+919686025999" className="button secondary outline"><PhoneCall /> Call: +91 96860 25999</a>
          </div>
        </div>
      </section>

      <div className="fleet-filter-bar sticky-top">
        <div className="filter-inner">
          <div className="search-box">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search vehicles (e.g. Innova, Urbania)..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="category-pills custom-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(activeCategory === cat && !cat.startsWith('All') ? categories[0] : cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="trip-toggle">
            <button className={tripMode === 'Local (8h/80k)' ? 'active' : ''} onClick={() => setTripMode('Local (8h/80k)')} title="Bangalore Local">
              <LayoutGrid size={16} />
            </button>
            <button className={tripMode === 'Outstation' ? 'active' : ''} onClick={() => setTripMode('Outstation')} title="Outstation">
              <Car size={16} />
            </button>
            <button className={tripMode === 'Airport Transfer' ? 'active' : ''} onClick={() => setTripMode('Airport Transfer')} title="Airport Transfer">
              <PhoneCall size={16} />
            </button>
            <div className="date-picker-mock">
              <Calendar size={14} /> 21 Sep
            </div>
          </div>
        </div>
      </div>

      <section className="fleet-page-content">
        <div className="fleet-page-container">
          <div className="fleet-list-grid">
            {filteredCars.map(car => (
              <div key={car.id} className="fleet-list-card">
                <div className="card-img-wrap">
                  <img src={car.img} alt={car.name} />
                  <span className="passenger-badge"><Users size={12}/> {car.passengers} Passengers</span>
                  <span className="photos-badge"><ImageIcon size={12}/> {car.photos} Photos</span>
                </div>
                
                <div className="card-body">
                  <h3 className="fw-bold">{car.name}</h3>
                  <p className="text-muted">{car.desc}</p>
                  <a href="#" className="more-link">More...</a>
                  
                  <div className="tags">
                    {car.tags.map(tag => <span key={tag} className="tag-badge">{tag}</span>)}
                  </div>
                  
                  <div className="trip-box">
                    <div className="trip-box-header">
                      <span className="trip-mode-label"><LayoutGrid size={14}/> Trip Mode:</span>
                      <div className="trip-mode-select">
                        <LayoutGrid size={12} className="icon-blue" /> {tripMode} <ChevronDown size={14}/>
                      </div>
                    </div>
                    <div className="trip-box-price">
                      <span className="price-label">{tripMode === 'Outstation' ? 'Per Kilometre Fare:' : tripMode === 'Airport Transfer' ? 'KIAL Drop Fare:' : 'Bangalore Local (8h/80k) Fare:'}</span>
                      <span className="fw-bold price-val">
                        ₹{tripMode === 'Outstation' ? car.rates.outstation.toLocaleString() : tripMode === 'Airport Transfer' ? car.rates.airport.toLocaleString() : car.rates.local.toLocaleString()}
                      </span>
                    </div>
                    <div className="trip-box-footer">
                      <span><Calendar size={10} className="icon-orange"/> Date: 2026-09-21</span>
                      <span>Bata: ₹{car.rates.local > 5000 ? '800' : '500'}/day</span>
                    </div>
                    <p className="terms">* Night allowance applicable. Toll, permit, parking and if any at actual.</p>
                  </div>

                  <div className="card-actions">
                    <a href={whatsapp} className="btn-whatsapp">
                      <MessageCircle size={18} /> WhatsApp
                    </a>
                    <a href="tel:+919686025999" className="btn-call">
                      <PhoneCall size={18} /> Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="reveal">
          <div className="logo-text"><div className="logo-icon-wrap"><Leaf className="logo-icon" strokeWidth={2.5} /></div><span className="greens">Greens</span><span className="cab">Cab</span></div>
          <p>Premium chauffeur-driven mobility across Bengaluru and South India.</p>
        </div>
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <h3>Quick Links</h3>
          <a href="/#fleet">Our Fleet</a><a href="/#tours">Tour Packages</a><a href="/#faq">FAQs</a>
        </div>
        <div className="reveal" style={{ transitionDelay: '200ms' }}>
          <h3>Contact</h3>
          <a href="tel:+919686025999">+91 96860 25999</a><a href={whatsapp}>WhatsApp us</a><a href="mailto:hello@greenscab.com">hello@greenscab.com</a>
        </div>
      </footer>
    <a href={whatsapp} className="floating-whatsapp" aria-label="WhatsApp us"><MessageCircle /></a></main>
  )
}








