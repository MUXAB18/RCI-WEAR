import { useState } from 'react'
import styles from './Footer.module.css'
import OptimizedImage from './OptimizedImage'
import LegalModal from './LegalModal'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const [modalType, setModalType] = useState(null) // null | 'privacy' | 'terms'

  const nav = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <footer className={styles.footer}>
      <div className={styles.topDivider} />
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={`${styles.brand} reveal`}>
            <div className={styles.logoRow}>
              <div className={styles.logoCircle}>
                <img 
                  src="/logo.jpg" 
                  alt="Rasheed Clothing International" 
                  className={styles.logoImg}
                  width={60}
                  height={60}
                />
              </div>
              <div className={styles.brandNameWrap}>
                <span className={styles.brandName}>Rasheed Clothing</span>
                <span className={styles.brandSub}>International · Est. 2017</span>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Where Imagination Meets Fabrication. Crafting premium garments with passion, precision, and unmatched artisanship since 2017.
            </p>
            <p className={styles.slogan}>" Where Imagination Meets Fabrication "</p>
          </div>

          {/* Nav */}
          <div>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.navList}>
              {links.map(l => (
                <li key={l.label}>
                  <button className={styles.navLink} onClick={() => nav(l.href)}>{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <div className={styles.contactList}>
              <a href="mailto:rasheedclothingintl@gmail.com" className={styles.contactLink}>
                <span className={styles.contactIcon}>✉</span>
                rasheedclothingintl@gmail.com
              </a>
              <a href="tel:+923496014611" className={styles.contactLink}>
                <span className={styles.contactIcon}>☎</span>
                +92 349 601 4611
              </a>
              <p className={styles.contactLink}>
                <span className={styles.contactIcon}>⏰</span>
                Mon–Sat: 9:00 AM – 7:00 PM
              </p>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h4 className={styles.colTitle} style={{ marginBottom: '12px' }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a 
                  href="https://www.instagram.com/rasheedclothingintl?igsh=MW9zYTk1dXdjdndvdw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/share/184dG574x7/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/rasheed-clothing-international" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2" stroke="none" fill="currentColor"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/923496014611" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <img src="/chamber.png" alt="Sialkot Chamber of Commerce & Industry" width={120} height={42} style={{ height: '42px', objectFit: 'contain', opacity: 0.95, backgroundColor: 'white', padding: '6px 12px', borderRadius: '4px' }} />
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.legalLinks}>
            <p className={styles.copy}>
              © {new Date().getFullYear()} Rasheed Clothing International. All Rights Reserved.
            </p>
            <span className={styles.legalDot}>●</span>
            <button className={styles.legalBtn} onClick={() => setModalType('privacy')}>Privacy Policy</button>
            <span className={styles.legalDot}>●</span>
            <button className={styles.legalBtn} onClick={() => setModalType('terms')}>Terms & Conditions</button>
          </div>
          <div className={styles.madeContainer}>
            <p className={styles.made}>
              Developed by <span className={styles.developer}>Musab Iftikhar</span>
            </p>
            <a href="mailto:musabiftikhar44@gmail.com" className={styles.madeEmail} data-cursor>
              musabiftikhar44@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>

    <LegalModal 
      isOpen={modalType !== null} 
      onClose={() => setModalType(null)} 
      type={modalType} 
    />
    </>
  )
}
