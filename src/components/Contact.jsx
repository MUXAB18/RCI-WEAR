import { useState, useRef, useMemo } from 'react'
import emailjs from '@emailjs/browser'
import styles from './Contact.module.css'
import MagneticButton from './MagneticButton'

/* ── Luxury Order ID generator ── */
function generateOrderId() {
  const d = new Date()
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `RCI-${date}-${rand}`
}

/* ── Format today's date elegantly ── */
function formatDate() {
  return new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
}

/* ── Trust badge data ── */
const TRUST = [
  { stat: '10+', label: 'Years of Excellence', icon: '◈' },
  { stat: '500+', label: 'Products Manufactured', icon: '◈' },
  { stat: '50+', label: 'Countries Served', icon: '◈' },
  { stat: '100%', label: 'Quality Inspected', icon: '◈' },
  { stat: 'OEM', label: 'Private Label Ready', icon: '◈' },
  { stat: '24h', label: 'Response Guarantee', icon: '◈' },
]

/* ── Enquiry options ── */
const ENQUIRY_TYPES = [
  { value: 'Custom Order', label: 'Custom Manufacturing' },
  { value: 'Bulk / Wholesale', label: 'Bulk / Wholesale' },
  { value: 'Bridal Collection', label: 'Bridal Collection' },
  { value: 'Corporate Uniforms', label: 'Corporate Uniforms' },
  { value: 'Other', label: 'General Inquiry' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState('')

  /* Generated once per mount */
  const orderId = useMemo(() => generateOrderId(), [])
  const todayStr = useMemo(() => formatDate(), [])

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  /* (reCAPTCHA removed) */

  const submit = async (e) => {
    e.preventDefault()

    // reCAPTCHA removed: proceed directly to sending
    setStatus('sending')

    try {
      // ============================================
      // EMAILJS CONFIGURATION (Same as QuoteModal)
      // ============================================
      const serviceId = 'service_8rutxkg'
      const adminTemplateId = 'template_z3hi3hj'   // Template for admin notification
      const customerTemplateId = 'template_4pfa2ea'   // Template for customer confirmation
      const publicKey = '9U-BFk_8Du4GSjC2B'

      // Template data for admin notification
      const adminEmailData = {
        from_name: form.name,
        reply_to: form.email,
        phone: form.phone || 'Not provided',
        enquiry_type: form.subject || 'General Enquiry',
        message: form.message,
      }

      // Template data for customer confirmation
      const customerEmailData = {
        to_email: form.email,
        from_name: form.name,
        enquiry_type: form.subject || 'General Enquiry',
        message: form.message,
      }

      // Send email to admin
      await emailjs.send(serviceId, adminTemplateId, adminEmailData, publicKey)

      // Send confirmation email to customer
      await emailjs.send(serviceId, customerTemplateId, customerEmailData, publicKey)

      setStatus('success')
      setErrorMessage('')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Email send failed:', error)
      // Build a helpful error message: include HTTP status and response body when available
      let msg = ''
      try {
        if (error && typeof error === 'object' && 'status' in error) {
          msg = `HTTP ${error.status} ${error.statusText || ''}`
          if (typeof error.text === 'function') {
            const body = await error.text()
            msg += ` — ${body}`
          } else if (error.body) {
            msg += ` — ${JSON.stringify(error.body)}`
          }
        } else {
          msg = error?.message || (typeof error === 'string' ? error : JSON.stringify(error))
        }
      } catch (ex) {
        msg = `Submission failed — ${ex?.message || 'unknown error'}`
      }
      setErrorMessage(msg || 'Submission failed — check console for details.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      {/* ── Ambient background layers ── */}
      <div className={styles.bgGrain} aria-hidden="true" />
      <div className={styles.bgOrb1} aria-hidden="true" />
      <div className={styles.bgOrb2} aria-hidden="true" />

      <div className="container">

        {/* ══════════════════════════════════
            HERO INTRODUCTION
            ══════════════════════════════════ */}
        <div className={`${styles.heroIntro} reveal`}>
          <p className={`section-label ${styles.eyebrow}`}>Private Client Consultation</p>
          <h2 className={styles.heroHeading}>
            Let's Create Something<br />
            <span className={`gold-text ${styles.heroAccent}`}>Extraordinary</span>
          </h2>
          <p className={styles.heroSub}>
            Your ideas deserve exceptional craftsmanship.
            Start your custom manufacturing journey with Rasheed Clothing International.
          </p>
          {/* Thin bronze decorative rule */}
          <div className={styles.heroRule} aria-hidden="true" />
        </div>

        {/* ══════════════════════════════════
            LUXURY INQUIRY CARD
            ══════════════════════════════════ */}
        <div className={`${styles.inquiryCard} reveal`} style={{ transitionDelay: '0.12s' }}>

          {/* Corner accent marks — decorative */}
          <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

          {/* ── Card Header ── */}
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <p className={styles.cardEyebrow}>Private Client Request</p>
              <h3 className={styles.cardTitle}>Custom Manufacturing Inquiry</h3>
            </div>
            <div className={styles.cardHeaderRight}>
              <div className={styles.cardMeta}>
                <span className={styles.metaLabel}>Order Ref</span>
                <span className={styles.metaValue}>{orderId}</span>
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.metaLabel}>Date</span>
                <span className={styles.metaValue}>{todayStr}</span>
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.metaLabel}>Reply Within</span>
                <span className={`${styles.metaValue} ${styles.metaHighlight}`}>24 Hours</span>
              </div>
            </div>
          </div>

          {/* Bronze divider */}
          <div className={styles.cardDivider} aria-hidden="true">
            <span className={styles.cardDividerDot} />
            <span className={styles.cardDividerLine} />
            <span className={styles.cardDividerDot} />
          </div>

          {/* ── Form Body ── */}
          <form
            id="quote-form"
            className={styles.form}
            onSubmit={submit}
          >
            {/* Row 1: Name + Email */}
            <div className={styles.row}>
              <div className={`${styles.field} ${form.name ? styles['has-value'] : ''}`}>
                <label htmlFor="cf-name" className={styles.label}>Full Name</label>
                <input
                  id="cf-name"
                  name="name"
                  value={form.name}
                  onChange={handle}
                  className={styles.input}
                  placeholder="e.g. Ahmed Khan"
                  autoComplete="name"
                  required
                />
                <span className={styles.fieldLine} aria-hidden="true" />
              </div>
              <div className={`${styles.field} ${form.email ? styles['has-value'] : ''}`}>
                <label htmlFor="cf-email" className={styles.label}>Email Address</label>
                <input
                  id="cf-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handle}
                  className={styles.input}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                <span className={styles.fieldLine} aria-hidden="true" />
              </div>
            </div>

            {/* Row 2: Phone + Enquiry Type */}
            <div className={styles.row}>
              <div className={`${styles.field} ${form.phone ? styles['has-value'] : ''}`}>
                <label htmlFor="cf-phone" className={styles.label}>Phone Number</label>
                <input
                  id="cf-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handle}
                  className={styles.input}
                  placeholder="+92 300 000 0000"
                  autoComplete="tel"
                />
                <span className={styles.fieldLine} aria-hidden="true" />
              </div>
              <div className={`${styles.field} ${form.subject ? styles['has-value'] : ''}`}>
                <label htmlFor="cf-subject" className={styles.label}>Enquiry Type</label>
                <select
                  id="cf-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handle}
                  className={`${styles.input} ${styles.select} ${!form.subject ? styles['select-placeholder'] : ''}`}
                  required
                >
                  <option value="">Select a category</option>
                  {ENQUIRY_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <span className={styles.fieldLine} aria-hidden="true" />
                {/* Custom select arrow */}
                <svg className={styles.selectArrow} viewBox="0 0 12 8" fill="none">
                  <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Message */}
            <div className={`${styles.field} ${styles.fieldFull} ${form.message ? styles['has-value'] : ''}`}>
              <label htmlFor="cf-message" className={styles.label}>Requirements & Details</label>
              <textarea
                id="cf-message"
                name="message"
                value={form.message}
                onChange={handle}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Please describe your requirements, quantities, preferred fabrics, timeline…"
                rows={6}
                required
              />
              <span className={styles.fieldLine} aria-hidden="true" />
              {/* Character counter */}
              <span className={styles.charCount}>
                {form.message.length} characters
              </span>
            </div>

            {/* reCAPTCHA removed */}

            {/* ── Submit Button ── */}
            <div className={styles.submitRow}>
              <button
                type="submit"
                disabled={status === 'sending'}
                className={styles.submitBtn}
                aria-label={status === 'sending' ? 'Sending your request' : 'Submit inquiry'}
              >
                <span className={styles.submitBtnInner}>
                  {status === 'sending' ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      <span>Transmitting Request…</span>
                    </>
                  ) : status === 'success' ? (
                    <>
                      <svg className={styles.submitIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span>Request Received</span>
                    </>
                  ) : status === 'error' ? (
                    <>
                      <svg className={styles.submitIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Failed — Please Retry</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Private Request</span>
                      <svg className={styles.submitArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </span>
                {/* Hover shimmer layer */}
                <span className={styles.submitShimmer} aria-hidden="true" />
              </button>

              <p className={styles.submitNote}>
                Encrypted & confidential · We respond within 24 business hours
              </p>
              {status === 'error' && (
                <p className={styles.submitError} role="alert">
                  {errorMessage || 'Submission failed — see console for details.'}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* ══════════════════════════════════
            TRUST BADGES
            ══════════════════════════════════ */}
        <div className={`${styles.trustSection} reveal`} style={{ transitionDelay: '0.18s' }}>
          <p className={styles.trustEyebrow}>Our Manufacturing Promise</p>
          <div className={styles.trustGrid}>
            {TRUST.map((t, i) => (
              <div key={i} className={styles.trustCard}>
                <span className={styles.trustStat}>{t.stat}</span>
                <span className={styles.trustLabel}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
            WORLDWIDE CONTACT CARDS
            ══════════════════════════════════ */}
        <div className={`${styles.contactSection} reveal`} style={{ transitionDelay: '0.22s' }}>
          <p className={styles.trustEyebrow}>Worldwide Contact</p>

          <div className={styles.contactGrid}>

            {/* Email */}
            <a
              href="mailto:rasheedclothingintl@gmail.com"
              className={styles.contactCard}
              aria-label="Send us an email"
            >
              <div className={styles.contactCardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </div>
              <div className={styles.contactCardBody}>
                <span className={styles.contactCardLabel}>Email Us</span>
                <span className={styles.contactCardValue}>rasheedclothingintl@gmail.com</span>
              </div>
              <svg className={styles.contactCardArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Phone */}
            <a
              href="tel:+923496014611"
              className={styles.contactCard}
              aria-label="Call us"
            >
              <div className={styles.contactCardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.21 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
                </svg>
              </div>
              <div className={styles.contactCardBody}>
                <span className={styles.contactCardLabel}>Call Us</span>
                <span className={styles.contactCardValue}>+92 349 601 4611</span>
              </div>
              <svg className={styles.contactCardArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Hours */}
            <div className={styles.contactCard}>
              <div className={styles.contactCardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className={styles.contactCardBody}>
                <span className={styles.contactCardLabel}>Business Hours</span>
                <span className={styles.contactCardValue}>Mon – Sat: 9 AM – 7 PM</span>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/923496014611"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.contactCard} ${styles.contactCardWa}`}
              aria-label="Chat on WhatsApp"
            >
              <div className={styles.contactCardIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className={styles.contactCardBody}>
                <span className={styles.contactCardLabel}>WhatsApp</span>
                <span className={styles.contactCardValue}>Chat Directly</span>
              </div>
              <svg className={styles.contactCardArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

          </div>
        </div>


      </div>
    </section>
  )
}
