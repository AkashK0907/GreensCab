'use client'

import { useState, useEffect } from 'react'
import { Briefcase, Leaf, ArrowRight, Car, ChevronDown, ChevronLeft, ChevronRight, Clock3, MapPin, Menu, MessageCircle, Users, X, Map, ShieldCheck, HelpCircle, PhoneCall } from 'lucide-react'

const fleet = [
  { 
    title: 'Sedan Etios', 
    description: 'Premium Sedan Etios for city meetings, local travel & KIAL airport transfers.', 
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800', 
    badge: 'From ₹2,000', 
    specs: [{icon: Users, text: '4 Passengers + 2 Bags'}, {icon: Clock3, text: 'Local: ₹2,000 (8h/80k)'}, {icon: MapPin, text: 'Outstation: ₹12 / km'}], 
    link: 'Book Etios', 
    url: '/fleet?category=Sedan+Etios' 
  },
  { 
    title: 'Ertiga', 
    description: 'Comfortable Maruti Suzuki Ertiga for family outings and local travel.', 
    image: 'https://safeway.travel/images/fleet_gallery/toyota-innova-crysta-gx7s/002.jpg?v=1', 
    badge: 'Family Travel', 
    specs: [{icon: Users, text: '6 Passengers + Luggage'}, {icon: Clock3, text: 'Local: ₹3,000 (8h/80k)'}, {icon: MapPin, text: 'Outstation: ₹18 / km'}], 
    link: 'Book Ertiga', 
    url: '/fleet?category=Ertiga' 
  },
  { 
    title: 'Kia Carens', 
    description: 'Premium Kia Carens for luxury travel, KIAL transfers and outstation trips.', 
    image: 'https://safeway.travel/images/fleet_gallery/toyota-innova-crysta-gx7s/001.jpg?v=1', 
    badge: 'Premium MPV', 
    specs: [{icon: Users, text: '6 Passengers + Luggage'}, {icon: Clock3, text: 'Local: ₹3,000 (8h/80k)'}, {icon: MapPin, text: 'Outstation: ₹20 / km'}], 
    link: 'Book Carens', 
    url: '/fleet?category=Kia+Carens' 
  },
  { 
    title: 'Innova Crysta', 
    description: 'Spacious Toyota Innova Crysta for outstation tours and long journeys.', 
    image: 'https://safeway.travel/images/fleet_gallery/toyota-innova-crysta-gx7s/001.jpg?v=1', 
    badge: 'Most Popular', 
    specs: [{icon: Users, text: '7 Passengers + Luggage'}, {icon: Clock3, text: 'Local: ₹3,500 (8h/80k)'}, {icon: MapPin, text: 'Outstation: ₹22 / km'}], 
    link: 'Book Crysta', 
    url: '/fleet?category=Innova+Crysta' 
  },
  { 
    title: 'Innova Hycross', 
    description: 'Hybrid Toyota Innova Hycross with panoramic sunroof and captain seats.', 
    image: 'https://safeway.travel/images/fleet_gallery/toyota-hycross-vx8s/001.jpg?v=1', 
    badge: 'Eco Luxury', 
    specs: [{icon: Users, text: '7 Passengers + Luggage'}, {icon: Clock3, text: 'Local: ₹4,000 (8h/80k)'}, {icon: MapPin, text: 'Outstation: ₹25 / km'}], 
    link: 'Book Hycross', 
    url: '/fleet?category=Innova+Hycross' 
  },
  { 
    title: 'Tempo Traveller', 
    description: 'Maharaja 12-Seater Tempo Traveller with pushback seats and ample legroom.', 
    image: 'https://safeway.travel/images/fleet_gallery/force-urbania-12/002.jpg?v=1', 
    badge: 'Group Travel', 
    specs: [{icon: Users, text: '12 Passengers'}, {icon: Car, text: 'Pushback Seats'}, {icon: MapPin, text: 'Outstation: ₹25 / km'}], 
    link: 'Book Tempo Traveller', 
    url: '/fleet?category=Tempo+Traveller' 
  },
  { 
    title: 'Urbania', 
    description: 'Next-Gen Force Urbania 16-Seater with luxury captain recliners.', 
    image: 'https://safeway.travel/images/fleet_gallery/force-urbania-12/001.jpg?v=1', 
    badge: 'VIP Recliners', 
    specs: [{icon: Users, text: '16 Passengers'}, {icon: Car, text: 'Luxury Captain Chairs'}, {icon: MapPin, text: 'Outstation: ₹35 / km'}], 
    link: 'Book Urbania', 
    url: '/fleet?category=Urbania' 
  },
]

const tours = [
  ['Bangalore to Mysore Heritage', 'https://safeway.travel/images/tours/mysore.jpg?v=9a924093', 'Heritage & Culture'],
  ['Bangalore to Hampi UNESCO', 'https://safeway.travel/images/tours/hampi.jpg?v=b45e888f', 'Heritage & Culture'],
  ['Bangalore to Coorg Coffee Hills', 'https://safeway.travel/images/tours/coorg.jpg?v=05b46bee', 'Hill Stations'],
  ['Bangalore to Ooty & Coonoor', 'https://safeway.travel/images/tours/ooty.jpg?v=989ae3b8', 'Hill Stations'],
]

const faqs = [
  ['What vehicle rental options are available with GreensCab in Bengaluru?', 'GreensCab provides a premium 46-model fleet including executive sedans, premium SUVs, luxury Force Urbania, Maharaja Tempo Travellers, luxury tourist buses, sleeper coaches, and more.'],
  ['How are outstation cab and bus rental tariffs calculated from Bangalore?', 'Our transparent quotes are calculated using the vehicle category, total round-trip kilometres, driver allowance, tolls and applicable taxes.'],
  ['Does GreensCab provide airport transfers for KIAL?', 'Yes. We provide fixed-price, chauffeur-driven airport transfers to and from Kempegowda International Airport.'],
  ['Do you provide 100% tax-compliant GST invoices for corporate travel?', 'Yes, GST invoices are available for corporate bookings and recurring employee transport services.'],
  ['Are GreensCab chauffeurs background-verified and commercially licensed?', 'Our chauffeurs are commercially licensed, trained and background-verified for passenger safety.'],
  ['How can I book or get an instant quotation for my trip?', 'Message us on WhatsApp or use any enquiry button to share your route, dates and passenger count.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [slide, setSlide] = useState(0)
  const [faq, setFaq] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    const elements = document.querySelectorAll('.reveal')
    elements.forEach(el => observer.observe(el))

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    // Run once on mount to catch initial state
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(s => (s + 1) % 5)
    }, 4500)
    return () => clearInterval(timer)
  }, [])
  const heroSlides = [
    { name: 'Force Urbania (9 - 16 Seater)', desc: 'Ultra-modern European styling, panoramic glass, chilled individual climate control, and fast Type-C charging.', img: 'https://safeway.travel/images/fleet_gallery/force-urbania-12/001.jpg?v=3ac94da5', badge1: 'Next-Gen Van', badge2: 'VIP Captain Recliners', price: 'From ₹35 / km', capacity: '9, 12, 16 Passengers' },
    { name: 'Volvo 9400 & 9600 Ultra Luxury', desc: 'Whisper-quiet electronically controlled air suspension, smart LED entertainment, and cavernous belly luggage holds.', img: 'https://safeway.travel/images/fleet_gallery/volvo-9400-luxury-45/001.jpg?v=b5570a93', badge1: 'Flagship Coaches', badge2: '45 - 49 Seater', price: 'From ₹75 / km', capacity: 'Air Suspension Comfort' },
    { name: 'Force Tempo Traveller (9 - 12S)', desc: 'High headroom, deep pushback recliners, powerful dual AC, and individual audio surround for pilgrimage & family vacations.', img: 'https://safeway.travel/images/fleet_gallery/force-traveller-12/001.jpg?v=080bde34', badge1: 'Family Favorite', badge2: '1x1 Maharaja Seats', price: 'From ₹25 / km', capacity: 'Audio + PA Mic' },
    { name: 'Toyota Innova Hycross & Crysta', desc: 'Ultra-refined Ottoman hybrid ride, dual-zone climate control, and smooth chauffeur drive for KIAL airport & VIP outstation trips.', img: 'https://safeway.travel/images/fleet_gallery/toyota-hycross-vx7s/001.jpg?v=352db437', badge1: 'VIP Hybrid MPV', badge2: 'Captain Seats', price: 'From ₹18 / km', capacity: '7 & 8 Seater Hybrid' },
    { name: 'Mercedes-Benz & BMW Luxury', desc: 'Flagship luxury sedans with uniformed executive chauffeurs for celebrity arrivals, corporate delegations, and luxury weddings.', img: 'https://safeway.travel/images/fleet_gallery/mercedes-bmw-luxury/001.jpg?v=57aaab0b', badge1: 'VIP Limousine', badge2: 'Chauffeur VIP', price: 'From ₹100 / km', capacity: '5-Star Luxury' }
  ]
  const current = heroSlides[slide]
  const whatsapp = 'https://wa.me/919008000000?text=Hello%20GreensCab%2C%20I%20need%20a%20travel%20quote.'
  return (
    <main className="site-shell">
      <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
        <a className="brand" href="#top"><div className="logo-text"><div className="logo-icon-wrap"><Leaf className="logo-icon" strokeWidth={2.5} /></div><span className="greens">Greens</span><span className="cab">Cab</span></div></a>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="/fleet" onClick={() => setMenuOpen(false)}><Car size={16} /> Fleet</a>
          <div className="nav-dropdown">
            <button className="nav-dropdown-btn"><Briefcase size={16} /> Services <ChevronDown size={14} /></button>
            <div className="nav-dropdown-content">
              <a href="/airport" onClick={() => setMenuOpen(false)}>Airport pickup & drop</a>
              <a href="/local-rental" onClick={() => setMenuOpen(false)}>City Local Rental</a>
              <a href="/outstation" onClick={() => setMenuOpen(false)}>Outstation Cabs</a>
              <a href="/#services" onClick={() => setMenuOpen(false)}>Tour Cab Booking</a>
            </div>
          </div>
          <a href="#tours" onClick={() => setMenuOpen(false)}><Map size={16} /> Tours</a>
          <a href="#why" onClick={() => setMenuOpen(false)}><ShieldCheck size={16} /> Why Us</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}><HelpCircle size={16} /> FAQs</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}><PhoneCall size={16} /> Contact</a>
          <a className="button primary nav-quote" href={whatsapp}><MessageCircle size={16} /> WhatsApp Quote</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy reveal">
          <div className="eyebrow"><strong>2026 Fleet</strong><span>46 Models&nbsp; | &nbsp;Sedans, Urbania, Luxury Coaches & Sleepers</span></div>
          <h1>Chauffeur-Driven Cars, Force Urbania & Luxury Bus Rentals in Bengaluru</h1>
          <p>Karnataka&apos;s premier passenger mobility provider. From executive airport cabs (KIAL) to 49-seater Volvo luxury coaches and South India outstation tours with transparent per-km billing.</p>
          <div className="stats">{[['46+', 'Vehicle Models'], ['24/7', 'Dispatch Desk'], ['14+', 'South Destinations'], ['4.9★', '5,000+ Reviews']].map(([a,b]) => <div className="stat" key={b}><b>{a}</b><span>{b}</span></div>)}</div>
          <div className="hero-actions"><a className="button primary" href={whatsapp}><MessageCircle /> Instant WhatsApp Quote</a><a className="button secondary" href="/fleet"><Car /> Explore 46 Fleet Models</a></div>
        </div>
        <div className="hero-card reveal" style={{ transitionDelay: '150ms' }}>
          <div className="hero-image-wrap"><img src={current.img} alt={current.name} /><span className="badge yellow">{current.badge1}</span><span className="rate">{current.price}</span><button className="slider-arrow left" onClick={() => setSlide((slide + heroSlides.length - 1) % heroSlides.length)} aria-label="Previous"><ChevronLeft /></button><button className="slider-arrow right" onClick={() => setSlide((slide + 1) % heroSlides.length)} aria-label="Next"><ChevronRight /></button></div>
          <div className="hero-card-body"><div className="card-heading"><h2>{current.name}</h2><span className="badge blue">{current.badge2}</span></div><p>{current.desc}</p><div className="card-bottom"><span><Users /> {current.capacity}</span><a href="/fleet">View Models & Rates <ArrowRight /></a></div></div>
          <div className="dots">{heroSlides.map((item, i) => <button key={item.name} className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />)}</div>
        </div>
      </section>

      <section className="quick-links reveal"><a href="#contact"><MapPin /> <span>KIAL Airport Transfers<small>Fixed from ₹2,000</small></span></a><a href="#tours"><Car /> <span>Outstation Getaways<small>14+ Tour Circuits</small></span></a><a href="#contact"><Clock3 /> <span>Corporate ETS Shuttles<small>GST SAC 9964 Invoicing</small></span></a><a href="#contact"><Users /> <span>Wedding VIP Convoys<small>Luxury Fleet Mix</small></span></a></section>

      <section className="section" id="fleet"><div className="section-heading reveal"><span>Premium vehicles</span><h2>Our Fleet</h2><p>Choose from our wide range of well-maintained vehicles</p></div><div className="fleet-grid">{fleet.map((item, i) => <article className="fleet-card reveal" key={item.title} style={{ transitionDelay: `${i * 100}ms` }}><div className="fleet-image"><img src={item.image} alt={item.title} /><span className="badge">{item.badge}</span></div><div className="fleet-content"><h3>{item.title}</h3><p>{item.description}</p>              <ul>
                {item.specs.map((spec, j) => {
                  const Icon = spec.icon
                  return <li key={j}><Icon size={16} /> {spec.text}</li>
                })}
              </ul><a className="button primary" style={{width: '100%', justifyContent: 'center', marginTop: 'auto'}} href={item.url}>{item.link}</a></div></article>)}</div></section>

      <section className="section tours" id="tours"><div className="section-heading reveal"><span>Curated outstation itineraries</span><h2>Popular Outstation Routes & Tour Packages</h2><p>Direct chauffeur-driven round-trip packages from Bengaluru with transparent per-km billing and verified highway drivers.</p></div><div className="filters reveal">{['All Tours (20)', 'Heritage & Culture (4)', 'Hill Stations (5)', 'Sacred Pilgrimage (4)', 'Wildlife & Safari (3)', 'Coastal & Beach (4)'].map((x, i) => <button className={i === 0 ? 'selected' : ''} key={x}>{x}</button>)}</div><div className="tour-grid">{tours.map(([name, image, category], i) => <article className="tour-card reveal" key={name} style={{ transitionDelay: `${i * 100}ms` }}><img src={image} alt={name} /><div><span>{category}</span><h3>{name}</h3><a href="#contact">Explore route <ArrowRight /></a></div></article>)}</div><div className="custom-banner reveal"><div><h3>Planning a custom group outing or interstate corporate yatra?</h3><p>We customize multi-day itineraries for 4 to 50+ passengers with Tempo Travellers & Luxury Coaches.</p></div><a className="button secondary" href="#contact">Choose Fleet Vehicle <ArrowRight /></a><a className="button primary" href={whatsapp}><MessageCircle /> Custom Tour Quote</a></div></section>

      <section className="why" id="why"><div className="section-heading reveal"><span>Travel with confidence</span><h2>Why Choose Us?</h2><p>We provide the best travel experience with trust and dedication</p></div><div className="why-grid"><div className="reveal"><strong>24/7</strong><h3>Dispatch Desk</h3><p>Reliable support before, during and after every journey.</p></div><div className="reveal" style={{ transitionDelay: '100ms' }}><strong>46+</strong><h3>Verified Fleet Models</h3><p>Clean, comfortable vehicles for every group size.</p></div><div className="reveal" style={{ transitionDelay: '200ms' }}><strong>4.9★</strong><h3>Trusted Service</h3><p>Professional chauffeurs and transparent billing.</p></div></div></section>

      <section className="section faq-section" id="faq"><div className="section-heading reveal"><span>Got questions? We&apos;ve got answers</span><h2>Frequently Asked Questions</h2><p>Transparent policies, billing rules, chauffeur standards & booking details.</p></div><div className="faq-list reveal">{faqs.map(([q,a], i) => <div className={faq === i ? 'faq open' : 'faq'} key={q}><button onClick={() => setFaq(faq === i ? -1 : i)}><span>{q}</span><ChevronDown /></button>{faq === i && <p>{a}</p>}</div>)}</div></section>

      <footer id="contact"><div className="reveal"><div className="logo-text"><div className="logo-icon-wrap"><Leaf className="logo-icon" strokeWidth={2.5} /></div><span className="greens">Greens</span><span className="cab">Cab</span></div><p>Premium chauffeur-driven mobility across Bengaluru and South India.</p></div><div className="reveal" style={{ transitionDelay: '100ms' }}><h3>Quick Links</h3><a href="/fleet">Our Fleet</a><a href="#tours">Tour Packages</a><a href="#faq">FAQs</a></div><div className="reveal" style={{ transitionDelay: '200ms' }}><h3>Contact</h3><a href="tel:+919008000000">+91 90080 00000</a><a href={whatsapp}>WhatsApp us</a><a href="mailto:hello@greenscab.com">hello@greenscab.com</a></div></footer>
      <a className="floating-whatsapp" href={whatsapp} aria-label="Chat on WhatsApp"><MessageCircle /></a>
    </main>
  )
}












