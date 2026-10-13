import { useEffect, useMemo, useState } from 'react'
import './App.css'
import peachSpritzImage from './assets/images.jpg'
import breadImage from './bread.jpg'
import bloodOrangeImage from './blood.jpg'
import olivesImage from './olives.jpg'

const dishes = [
  { id: 1, name: 'Burrata & stone fruit', category: 'To begin', price: 16, description: 'Heirloom tomato, ripe peach, basil oil, grilled sourdough', image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=85', tag: 'A guest favourite' },
  { id: 2, name: 'Whipped ricotta', category: 'To begin', price: 13, description: 'Wildflower honey, crushed pistachio, warm flatbread', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Crispy artichokes', category: 'To begin', price: 14, description: 'Lemon, pecorino, garden herbs, green goddess dip', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Wild mushroom tagliatelle', category: 'From the kitchen', price: 27, description: 'Hand-cut pasta, forest mushrooms, parmesan, thyme', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', tag: 'House-made pasta' },
  { id: 5, name: 'Charred half chicken', category: 'From the kitchen', price: 31, description: 'Lemon potatoes, salsa verde, pan jus', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Roasted market vegetables', category: 'From the kitchen', price: 24, description: 'Whatever is lovely today, whipped tahini, za’atar', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85', tag: 'Plant based' },
  { id: 7, name: 'Olive oil cake', category: 'Something sweet', price: 12, description: 'Macerated berries, crème fraîche, a little sea salt', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85' },
  { id: 8, name: 'Basque cheesecake', category: 'Something sweet', price: 13, description: 'Burnt top, soft centre, seasonal fruit', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85', tag: 'Almost too good' },
  { id: 9, name: 'Aperol spritz', category: 'At the bar', price: 15, description: 'Aperol, prosecco, soda, big orange energy', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=900&q=85' },
  { id: 10, name: 'Garden martini', category: 'At the bar', price: 17, description: 'Gin, dry vermouth, a very good olive', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=85' },
  { id: 11, name: 'Fresh peach spritz', category: 'At the bar', price: 14, description: 'White peach, sparkling wine, lemon, mint', image: peachSpritzImage, tag: 'Best Seller' },
  { id: 12, name: 'Pillowy focaccia', category: 'To begin', price: 9, description: 'Rosemary, flaky salt, our very good olive oil', image: breadImage },
  { id: 13, name: 'Marinated olives', category: 'To begin', price: 8, description: 'Citrus peel, rosemary, a little chilli', image: olivesImage },
  { id: 14, name: 'Calamari fritti', category: 'To begin', price: 17, description: 'Crisp squid, lemon, parsley, saffron aioli', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85' },
  { id: 15, name: 'Lemon ricotta ravioli', category: 'From the kitchen', price: 26, description: 'Brown butter, sage, toasted hazelnut, parmesan', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85', tag: 'House-made pasta' },
  { id: 16, name: 'Sunday beef ragu', category: 'From the kitchen', price: 29, description: 'Slow-braised beef, pappardelle, pecorino', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=85' },
  { id: 17, name: 'Grilled salmon', category: 'From the kitchen', price: 32, description: 'Spring peas, crispy potatoes, dill yoghurt', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85' },
  { id: 18, name: 'Tiramisu for two', category: 'Something sweet', price: 14, description: 'Espresso-soaked sponge, mascarpone, cocoa', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85', tag: 'Made in-house' },
  { id: 19, name: 'Blood orange soda', category: 'At the bar', price: 8, description: 'Fresh blood orange, sparkling water, rosemary', image: bloodOrangeImage },
  { id: 20, name: 'Limoncello lemonade', category: 'At the bar', price: 12, description: 'House limoncello, lemon, soda, fresh thyme', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=85' },
  { id: 21, name: 'Rosato by the glass', category: 'At the bar', price: 16, description: 'Chilled Italian rosé, wild strawberry, citrus', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85' },
]

const categories = ['Everything', 'To begin', 'From the kitchen', 'Something sweet', 'At the bar']
const pages = ['home', 'menu', 'story', 'visit', 'contact']
const pageTitles = { home: 'Home', menu: 'Our Menu', story: 'Our Story', visit: 'Visit Us', contact: 'Contact' }

function getPageFromPath(pathname) {
  const page = pathname.replace(/^\/+|\/+$/g, '') || 'home'
  return pages.includes(page) ? page : 'home'
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [currentPage, setCurrentPage] = useState(() => getPageFromPath(window.location.pathname))
  const [activeCategory, setActiveCategory] = useState('Everything')
  const [basket, setBasket] = useState([])
  const [basketOpen, setBasketOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [minDate, setMinDate] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [reservation, setReservation] = useState(null)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [newsletterStatus, setNewsletterStatus] = useState('')
  const [contactStatus, setContactStatus] = useState('')
  const [contactSubmitting, setContactSubmitting] = useState(false)
  const [notice, setNotice] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)

  const visibleDishes = useMemo(
    () => activeCategory === 'Everything' ? dishes : dishes.filter((dish) => dish.category === activeCategory),
    [activeCategory],
  )
  const basketCount = basket.reduce((total, item) => total + item.quantity, 0)
  const basketTotal = basket.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    const startedAt = Date.now()
    const interval = window.setInterval(() => {
      const progress = Math.min(Math.round(((Date.now() - startedAt) / 1800) * 100), 100)
      setLoadingProgress(progress)
      if (progress === 100) {
        window.clearInterval(interval)
        window.setTimeout(() => setIsLoading(false), 180)
      }
    }, 40)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined

    const targets = document.querySelectorAll(
      '.hero-image, .hero-copy, .welcome-strip, .home-occasions-heading, .occasion-grid article, .home-favourites-heading, .favourite-card, .home-questions-heading, .question-list details, .home-location-copy, .home-location-map, .section-heading, .menu-tools, .dish-card, .menu-note, .story-copy, .story-image, .reservation-copy, .reservation-card, .visit-section > div, .footer-top > div',
    )
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' })

    targets.forEach((target) => {
      if (!target.classList.contains('is-revealed')) {
        target.classList.add('reveal-pending')
        observer.observe(target)
      }
    })

    return () => observer.disconnect()
  }, [activeCategory, currentPage])

  useEffect(() => {
    const updateBackToTopVisibility = () => setShowBackToTop(window.scrollY > 500)
    updateBackToTopVisibility()
    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateBackToTopVisibility)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname))
      setMobileMenuOpen(false)
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.title = `${pageTitles[currentPage]} | Olio Cucina`
  }, [currentPage])

  useEffect(() => {
    if (!basketOpen && !reservationOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setBasketOpen(false)
        setReservationOpen(false)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [basketOpen, reservationOpen])

  const addToBasket = (dish) => {
    setBasket((current) => current.some((item) => item.id === dish.id)
      ? current.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...current, { ...dish, quantity: 1 }])
    setOrderPlaced(false)
    setNotice(`${dish.name} added to your order`)
    window.setTimeout(() => setNotice(''), 2400)
  }

  const changeQuantity = (dishId, adjustment) => {
    setBasket((current) => current
      .map((item) => item.id === dishId ? { ...item, quantity: item.quantity + adjustment } : item)
      .filter((item) => item.quantity > 0))
    setOrderPlaced(false)
  }

  const goTo = (page) => {
    setMobileMenuOpen(false)
    const targetPage = pages.includes(page) ? page : 'home'
    const path = targetPage === 'home' ? '/' : `/${targetPage}`
    if (window.location.pathname !== path) window.history.pushState({}, '', path)
    setCurrentPage(targetPage)
    window.scrollTo(0, 0)
  }

  const openReservation = () => {
    const today = new Date()
    setMinDate(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`)
    setReservation(null)
    setReservationOpen(true)
  }

  const submitReservation = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setReservation(Object.fromEntries(formData.entries()))
  }

  const subscribe = (event) => {
    event.preventDefault()
    setNewsletterStatus('Thanks for stopping by! Newsletter sign-up is a demo.')
    event.currentTarget.reset()
  }

  const submitContact = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    setContactSubmitting(true)
    setContactStatus('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      })
      const responseText = await response.text()
      let result
      try {
        result = responseText ? JSON.parse(responseText) : null
      } catch {
        result = null
      }
      if (!result || typeof result !== 'object') {
        throw new Error(`The contact service returned an empty or invalid response (HTTP ${response.status}). Please restart the local dev server or check the deployed API logs.`)
      }
      if (!response.ok) throw new Error(result.error || `We could not send your message (HTTP ${response.status}). Please try again.`)
      if (typeof result.message !== 'string') throw new Error('The contact service did not confirm that your message was sent.')
      form.reset()
      setContactStatus(result.message)
    } catch (error) {
      setContactStatus(error instanceof Error ? error.message : 'We could not send your message. Please try again.')
    } finally {
      setContactSubmitting(false)
    }
  }

  return (
    <main className={`restaurant ${darkMode ? 'is-dark' : ''}`} aria-busy={isLoading}>
      {isLoading && <div className="loading-screen" role="status" aria-label={`Loading Olio Cucina, ${loadingProgress}%`}>
        <div className="loading-content">
          <span className="loading-mark" aria-hidden="true">✳</span>
          <p className="loading-brand">olio<span>cucina</span></p>
          <p className="loading-message">Setting the table<span className="loading-ellipsis" aria-hidden="true">...</span></p>
          <div className="loading-track" role="progressbar" aria-label="Loading restaurant" aria-valuemin="0" aria-valuemax="100" aria-valuenow={loadingProgress}>
            <span style={{ width: `${loadingProgress}%` }} />
          </div>
        </div>
      </div>}
      <div className="announcement">A little more sunshine, a little more supper <span>✳</span> Open daily from noon</div>
      <header className="site-header">
        <a className="brand" href="/" onClick={(event) => { event.preventDefault(); goTo('home') }}>olio<span> cucina</span></a>
        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? '×' : '☰'}</button>
        <nav className={`main-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="/menu" aria-current={currentPage === 'menu' ? 'page' : undefined} onClick={(event) => { event.preventDefault(); goTo('menu') }}>Our menu</a>
          <a href="/story" aria-current={currentPage === 'story' ? 'page' : undefined} onClick={(event) => { event.preventDefault(); goTo('story') }}>Our story</a>
          <a href="/visit" aria-current={currentPage === 'visit' ? 'page' : undefined} onClick={(event) => { event.preventDefault(); goTo('visit') }}>Find us</a>
          <a href="/contact" aria-current={currentPage === 'contact' ? 'page' : undefined} onClick={(event) => { event.preventDefault(); goTo('contact') }}>Contact</a>
          <button className="theme-toggle" type="button" aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`} aria-pressed={darkMode} onClick={() => setDarkMode((enabled) => !enabled)}>
            <span key={darkMode ? 'sun' : 'moon'} className="theme-toggle-icon" aria-hidden="true">{darkMode ? '☀' : '☾'}</span>
            <span className="theme-toggle-label">{darkMode ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <button className="mobile-reserve" onClick={() => { setMobileMenuOpen(false); openReservation() }}>Book a table <span>↗</span></button>
        </nav>
        <button className="basket-button" onClick={() => setBasketOpen(true)} aria-label={`Open order, ${basketCount} items`}>Your order <span>{basketCount}</span></button>
        <button className="header-reserve" onClick={openReservation}>Book a table <span>↗</span></button>
      </header>

      {currentPage === 'home' && <>
      <section className="hero" id="home">
        <div className="hero-image" role="img" aria-label="A table set for a relaxed Mediterranean dinner">
          <div className="hero-image-caption"><span>Good food. Good company.</span><span>Est. with love, 2018</span></div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-mark">✳</span> Your neighbourhood cucina</p>
          <h1>Come hungry.<br /><em>Leave happy.</em></h1>
          <p className="hero-description">A long lunch that turns into dinner. One more glass, one more story. Pull up a chair — there’s always room for you.</p>
          <div className="hero-actions">
            <button className="button button-dark" onClick={() => goTo('menu')}>See what’s cooking <span>↗</span></button>
            <button className="button button-text" onClick={openReservation}>Book your table <span>→</span></button>
          </div>
          <div className="hero-details"><span>Seasonal Italian-ish</span><i>✳</i><span>Made for sharing</span></div>
        </div>
        <span className="hero-side-note">A GOOD DAY STARTS AT THE TABLE — OLIO CUCINA</span>
      </section>

      <section className="welcome-strip" aria-label="Restaurant details">
        <p>Good things take <em>olive oil.</em></p>
        <span>Locally grown, lovingly made, always shared.</span>
        <button onClick={() => goTo('story')}>A little about us <span>↗</span></button>
      </section>
      <section className="home-discover">
        <p className="eyebrow">Make yourself at home</p>
        <h2>A little more <em>Olio.</em></h2>
        <div className="discover-grid">
          <a href="/menu" onClick={(event) => { event.preventDefault(); goTo('menu') }}><span>01 / The good stuff</span><strong>See what’s cooking</strong><i>Explore the menu ↗</i></a>
          <a href="/story" onClick={(event) => { event.preventDefault(); goTo('story') }}><span>02 / Around our table</span><strong>Get to know us</strong><i>Our story ↗</i></a>
          <a href="/visit" onClick={(event) => { event.preventDefault(); goTo('visit') }}><span>03 / Just around the corner</span><strong>Come on over</strong><i>Find us ↗</i></a>
        </div>
      </section>
      <section className="home-occasions">
        <div className="home-occasions-heading">
          <p className="eyebrow">A seat for every sort of day</p>
          <h2>Stay for <em>another.</em></h2>
          <p>Drop in for a little something or gather everyone around the table. There’s always time for one more good meal.</p>
        </div>
        <div className="occasion-grid">
          <article><span>01 / Weekends</span><h3>Slow brunches</h3><p>Ease into the day with weekend brunch, fresh coffee, and something lovely from the kitchen.</p></article>
          <article><span>02 / Any day</span><h3>Long lunches</h3><p>Order a few plates for the middle of the table and let the afternoon take its time.</p></article>
          <article><span>03 / Together</span><h3>Evening gatherings</h3><p>Birthdays, date nights, and Tuesday dinners all deserve a little extra olive oil.</p></article>
        </div>
        <button className="button button-dark" onClick={openReservation}>Save your seat <span>↗</span></button>
      </section>
      <section className="home-favourites">
        <div className="home-favourites-heading">
          <div><p className="eyebrow">A little taste of Olio</p><h2>Made for the <em>middle.</em></h2></div>
          <p>A few favourites to get the table started. Find something you love, then pass it around.</p>
        </div>
        <div className="favourites-grid">
          {[dishes[0], dishes[3], dishes[17]].map((dish, index) => (
            <article className="favourite-card" key={dish.id}>
              <button className="favourite-image" onClick={() => goTo('menu')} aria-label={`See ${dish.name} on the menu`}>
                <img src={dish.image} alt={dish.name} loading="lazy" />
                <span>0{index + 1} <i>↗</i></span>
              </button>
              <div className="favourite-info">
                <div><span>{dish.category}</span><h3>{dish.name}</h3><p>{dish.description}</p></div>
                <strong>${dish.price}</strong>
              </div>
            </article>
          ))}
        </div>
        <button className="button button-text" onClick={() => goTo('menu')}>Explore the full menu <span>→</span></button>
      </section>
      <section className="home-questions">
        <div className="home-questions-heading">
          <p className="eyebrow">Before you join us</p>
          <h2>A few little <em>details.</em></h2>
          <p>Everything you need to feel right at home. Still wondering? <button onClick={() => goTo('contact')}>Drop us a line ↗</button></p>
        </div>
        <div className="question-list">
          <details><summary>Do I need to book a table?<span>+</span></summary><p>Walk-ins are always welcome when we have space. For a special occasion or a particular time, we recommend booking ahead so we can save you a seat.</p><button onClick={openReservation}>Make a reservation ↗</button></details>
          <details><summary>When can I stop by?<span>+</span></summary><p>We’re open every day from 12pm to 10pm. Weekend brunch is served from 10am to 2pm.</p></details>
          <details><summary>Can you accommodate dietary needs?<span>+</span></summary><p>We have a range of dishes, including plant-based options. Please let our team know about allergies or dietary needs when booking and again when you arrive.</p><button onClick={() => goTo('contact')}>Ask us about the menu ↗</button></details>
          <details><summary>Can I bring a big group?<span>+</span></summary><p>We’d love to celebrate with you. For parties of nine or more, please call us at <a href="tel:+17185550148">+1 (718) 555-0148</a> and we’ll help plan your visit.</p></details>
        </div>
      </section>
      <section className="home-location">
        <div className="home-location-copy">
          <p className="eyebrow">Just around the corner</p>
          <h2>Your table is <em>waiting.</em></h2>
          <p>Find us in Brooklyn. We’re open every day from noon, with weekend brunch from 10am to 2pm.</p>
          <address>18 Bellflower Lane<br />Brooklyn, NY 11222</address>
          <div className="home-location-actions">
            <a className="button button-dark" href="https://www.google.com/maps/dir/?api=1&destination=18+Bellflower+Lane%2C+Brooklyn%2C+NY+11222" target="_blank" rel="noreferrer">Get directions <span>↗</span></a>
            <button className="button button-text" onClick={() => goTo('visit')}>Plan your visit <span>→</span></button>
          </div>
        </div>
        <div className="home-location-map">
          <iframe title="Map to Olio Cucina in Brooklyn" src="https://maps.google.com/maps?q=18%20Bellflower%20Lane%2C%20Brooklyn%2C%20NY%2011222&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
      </>}

      {currentPage === 'menu' && <div className="page-intro menu-page-intro">
        <img className="menu-intro-image" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85" alt="Elegant restaurant dining room set for dinner" />
        <div className="menu-intro-copy"><p className="eyebrow">Fresh from our kitchen</p><h1>Good things, <em>served generously.</em></h1><p>Seasonal plates, house-made favourites, and something lovely to share around the table.</p></div>
      </div>}
      {currentPage === 'menu' &&
      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div><p className="eyebrow">The good stuff</p><h2>A menu for <em>the moment.</em></h2></div>
          <p>Inspired by the season, best enjoyed<br />with your elbows on the table.</p>
        </div>
        <div className="menu-tools">
          <div className="category-list" role="group" aria-label="Filter menu by category">
            {categories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}>{category}</button>)}
          </div>
          <span className="dish-count">{visibleDishes.length} lovely things</span>
        </div>
        <div className="dish-grid">
          {visibleDishes.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <div className="dish-image-wrap">
                <img src={dish.image} alt={dish.name} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = breadImage }} />
                {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                <button className="add-dish" onClick={() => addToBasket(dish)} aria-label={`Add ${dish.name} to your order`}>Add to order <span>+</span></button>
              </div>
              <div className="dish-info">
                <div><h3>{dish.name}</h3><p>{dish.description}</p></div>
                <strong>${dish.price}</strong>
              </div>
            </article>
          ))}
        </div>
        <p className="menu-note">Our menu changes with the seasons. Please let us know about allergies when booking.</p>
      </section>}

      {currentPage === 'story' && <>
      <div className="page-intro"><p className="eyebrow">A neighbourhood kind of place</p><h1>Our table is <em>your table.</em></h1><p>Good food, good company, and a warm welcome — that’s the whole recipe.</p></div>
      <section className="story-section" id="story">
        <div className="story-copy">
          <p className="eyebrow">A table with your name on it</p>
          <h2>Food tastes better<br />when it’s <em>shared.</em></h2>
          <p>Olio began with a little family recipe book, a big bottle of olive oil, and an open door. We’re here for the birthdays, the Tuesdays, and the “we should do this more often” dinners.</p>
          <p>Good ingredients, generous plates, and a warm welcome. That’s the whole recipe.</p>
          <button className="button button-text" onClick={() => goTo('visit')}>Come say hello <span>→</span></button>
        </div>
        <div className="story-image" role="img" aria-label="Fresh pasta and seasonal ingredients being prepared">
          <div className="story-stamp"><span>Fatto con</span><strong>amore</strong><span>✳ ogni giorno ✳</span></div>
          <span className="story-photo-note">From our kitchen, with love</span>
        </div>
      </section>
      <section className="story-values">
        <p className="eyebrow">The Olio way</p>
        <h2>Simple things, <em>done with love.</em></h2>
        <div className="values-grid">
          <article><span>01</span><h3>Follow the seasons</h3><p>We cook with what’s fresh and let the market inspire what lands on your plate.</p></article>
          <article><span>02</span><h3>Always make room</h3><p>For one more guest, one more story, and definitely one more slice of cake.</p></article>
          <article><span>03</span><h3>Keep it generous</h3><p>Big-hearted hospitality, food made from scratch, and a little extra olive oil.</p></article>
        </div>
        <blockquote>“The best meals are the ones that make you forget to check the time.”</blockquote>
      </section>
      </>}

      {currentPage === 'visit' && <>
      <div className="page-intro"><p className="eyebrow">We saved you a seat</p><h1>Come hungry. <em>We’re right here.</em></h1><p>Plan your visit, find your way, or book a table. We can’t wait to have you.</p></div>
      <section className="reservation-section" id="reserve">
        <div className="reservation-copy"><p className="eyebrow">Your seat is waiting</p><h2>Make a little<br /><em>time for dinner.</em></h2><p>Date night, big night, just-because night. We’ll save you the good table.</p></div>
        <div className="reservation-card"><span className="reservation-icon">✳</span><p className="eyebrow">A proper evening out</p><h3>There’s always room<br />for one more.</h3><p>Join us for lunch, linger over dinner, celebrate the little things.</p><button className="button button-dark reservation-cta" onClick={openReservation}>Find your table <span aria-hidden="true">↗</span></button><span className="reservation-hours">Open daily · 12pm–10pm</span></div>
      </section>

      <section className="visit-section" id="visit">
        <div><p className="eyebrow">Right around the corner</p><h2>Find your way <em>to us.</em></h2><p className="visit-intro">Good food is closer than you think.</p></div>
        <div className="visit-details">
          <div><span className="detail-label">Come by</span><p>18 Bellflower Lane<br />Brooklyn, NY 11222</p><a href="https://maps.google.com/?q=18+Bellflower+Lane+Brooklyn+NY" target="_blank" rel="noreferrer">Get directions ↗</a></div>
          <div><span className="detail-label">We’re here</span><p>Every day, 12pm–10pm<br />Brunch on weekends, 10am–2pm</p><a href="tel:+17185550148">+1 (718) 555-0148</a></div>
          <div><span className="detail-label">Stay a little longer</span><p>Bring your people.<br />We’ll bring the good stuff.</p><button onClick={openReservation}>Book a table ↗</button></div>
        </div>
        <div className="visit-map"><iframe title="Map to Olio Cucina in Brooklyn" src="https://maps.google.com/maps?q=18%20Bellflower%20Lane%2C%20Brooklyn%2C%20NY%2011222&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href="https://www.google.com/maps/dir/?api=1&destination=18+Bellflower+Lane%2C+Brooklyn%2C+NY+11222" target="_blank" rel="noreferrer">Open directions in Google Maps ↗</a></div>
      </section>
      </>}

      {currentPage === 'contact' && <>
        <div className="page-intro"><p className="eyebrow">We’d love to hear from you</p><h1>Drop us <em>a line.</em></h1><p>Questions, celebrations, or just want to say hello? Leave us a note and we’ll be glad you did.</p></div>
        <section className="contact-section">
          <div className="contact-details">
            <p className="eyebrow">Come say hello</p>
            <h2>Good conversations<br />start <em>at the table.</em></h2>
            <p>For same-day reservations or urgent questions, give us a call. For everything else, send us a note using the form.</p>
            <div><span className="detail-label">Call the restaurant</span><a href="tel:+17185550148">+1 (718) 555-0148</a></div>
            <div><span className="detail-label">Come by</span><p>18 Bellflower Lane<br />Brooklyn, NY 11222</p></div>
            <div><span className="detail-label">Hours</span><p>Every day, 12pm–10pm<br />Weekend brunch, 10am–2pm</p></div>
          </div>
          <form className="contact-form" onSubmit={submitContact} aria-busy={contactSubmitting}>
            <label>Your name<input name="name" autoComplete="name" placeholder="How should we greet you?" required /></label>
            <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
            <label>Subject<input name="subject" placeholder="What’s on your mind?" required /></label>
            <label>Your message<textarea name="message" rows="6" placeholder="Write us a little note..." required /></label>
            <button className="button button-dark" type="submit" disabled={contactSubmitting}>{contactSubmitting ? 'Sending…' : 'Send your message'} {!contactSubmitting && <span>↗</span>}</button>
            <p className="contact-status" role="status" aria-live="polite">{contactStatus}</p>
          </form>
        </section>
      </>}

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><a className="brand" href="/" onClick={(event) => { event.preventDefault(); goTo('home') }}>olio<span> cucina</span></a><p>A neighbourhood kind of place.<br />Always save room for dessert.</p></div>
          <div className="footer-links"><span className="detail-label">Come on in</span><a href="/menu" onClick={(event) => { event.preventDefault(); goTo('menu') }}>Menu</a><a href="/story" onClick={(event) => { event.preventDefault(); goTo('story') }}>Our story</a><a href="/visit" onClick={(event) => { event.preventDefault(); goTo('visit') }}>Visit us</a><a href="/contact" onClick={(event) => { event.preventDefault(); goTo('contact') }}>Contact</a><button onClick={openReservation}>Reservations</button><a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
          <div className="newsletter"><span className="detail-label">A note from our table</span><p>Seasonal specials, happy news, the occasional recipe.</p><form className="newsletter-form" onSubmit={subscribe}><label className="visually-hidden" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" name="email" type="email" placeholder="Your email address" required /><button aria-label="Sign up for the newsletter">↗</button></form><span className="newsletter-status" aria-live="polite">{newsletterStatus}</span></div>
        </div>
        <div className="footer-bottom"><span>© 2025 Olio Cucina · Made with amore</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to the top ↑</button><span>Good food, no fuss.</span></div>
      </footer>

      {notice && <div className="toast" role="status">{notice}</div>}
      {showBackToTop && <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to the top">↑<span>Back to top</span></button>}

      {basketOpen && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setBasketOpen(false) }}>
        <aside className="basket-drawer" role="dialog" aria-modal="true" aria-labelledby="basket-heading">
          <div className="drawer-heading"><div><p className="eyebrow">Made for sharing</p><h2 id="basket-heading">Your order <span>({basketCount})</span></h2></div><button onClick={() => setBasketOpen(false)} aria-label="Close order">×</button></div>
          {orderPlaced ? <div className="basket-confirmation"><span>✳</span><h3>That’s the spirit.</h3><p>Your order is ready. In a real restaurant, we’d send it straight to the kitchen — for now, consider it a lovely preview.</p><button className="button button-dark" onClick={() => { setBasket([]); setOrderPlaced(false); setBasketOpen(false) }}>Lovely, thanks</button></div>
            : basket.length === 0 ? <div className="empty-basket"><span>✳</span><p>Your order’s looking a little light.</p><button className="button button-dark" onClick={() => { setBasketOpen(false); goTo('menu') }}>Find something delicious</button></div>
              : <><div className="basket-items">{basket.map((item) => <div className="basket-item" key={item.id}><img src={item.image} alt="" /><div className="basket-item-info"><h3>{item.name}</h3><span>${item.price} each</span><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button></div></div><strong>${item.price * item.quantity}</strong></div>)}</div>
                <div className="basket-summary"><div><span>Subtotal</span><strong>${basketTotal}</strong></div><p>Place your order to confirm. Payment is handled in person.</p><button className="button button-dark" onClick={() => setOrderPlaced(true)}>Place order <span>↗</span></button></div></>}
        </aside>
      </div>}

      {reservationOpen && <div className="overlay reservation-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) { setReservationOpen(false); setReservation(null) } }}>
        <div className="reservation-layout">
          <aside className="reservation-map">
            <iframe title="Map to Olio Cucina in Brooklyn" src="https://maps.google.com/maps?q=18%20Bellflower%20Lane%2C%20Brooklyn%2C%20NY%2011222&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <div className="reservation-map-info">
              <span className="detail-label">Find us in Brooklyn</span>
              <p>18 Bellflower Lane<br />Brooklyn, NY 11222</p>
              <a href="https://www.google.com/maps/dir/?api=1&destination=18+Bellflower+Lane%2C+Brooklyn%2C+NY+11222" target="_blank" rel="noreferrer">Get directions ↗</a>
            </div>
          </aside>
          <section className="reservation-modal" role="dialog" aria-modal="true" aria-labelledby="reservation-heading">
            <button className="modal-close" onClick={() => { setReservationOpen(false); setReservation(null) }} aria-label="Close reservation form">×</button>
            {reservation ? <div className="reservation-confirmation"><span className="reservation-icon">✳</span><p className="eyebrow">A lovely choice</p><h2 id="reservation-heading">We’ve saved<br /><em>a seat for you.</em></h2><p>Thanks, {reservation.name}. Your request for {reservation.guests} on {reservation.date} at {reservation.time} is noted.</p><p className="confirmation-note">This demo doesn’t send bookings to the restaurant. Please call <a href="tel:+17185550148">+1 (718) 555-0148</a> to confirm.</p><button className="button button-dark" onClick={() => { setReservationOpen(false); setReservation(null) }}>Can’t wait <span>↗</span></button></div>
              : <><p className="eyebrow">We’ll put the kettle on</p><h2 id="reservation-heading">Book your <em>table.</em></h2><p className="modal-intro">Tell us when you’re coming and we’ll get things ready.</p><form className="reservation-form" onSubmit={submitReservation}>
                <label>Your name<input name="name" autoComplete="name" placeholder="How should we greet you?" required /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
                <div className="form-row"><label>Date<input name="date" type="date" min={minDate} required /></label><label>Time<select name="time" defaultValue="" required><option value="" disabled>Choose a time</option>{['12:00', '12:30', '13:00', '13:30', '14:00', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map((time) => <option key={time} value={time}>{time}</option>)}</select></label></div>
                <label>Party size<select name="guests" defaultValue="2">{[1, 2, 3, 4, 5, 6, 7, 8].map((size) => <option key={size} value={size}>{size} {size === 1 ? 'guest' : 'guests'}</option>)}</select></label>
                <button className="button button-dark" type="submit">Request a table <span>↗</span></button>
                <span className="form-footnote">For parties of 9 or more, please call us directly.</span>
              </form></>}
          </section>
        </div>
      </div>}
    </main>
  )
}

export default App
