import { useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from './Contact.module.css'
import MagneticButton from './MagneticButton'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, sending, success, error

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // ============================================
      // EMAILJS CONFIGURATION (Same as QuoteModal)
      // ============================================
      const serviceId = 'service_8rutxkg'
      const adminTemplateId = 'template_z3hi3hj' // Template for admin notification
      const customerTemplateId = 'template_4pfa2ea' // Template for customer confirmation
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
        to_email: form.email, // Customer's email
        from_name: form.name,
        enquiry_type: form.subject || 'General Enquiry',
        message: form.message,
      }

      // Send email to admin
      await emailjs.send(
        serviceId,
        adminTemplateId,
        adminEmailData,
        publicKey
      )

      // Send confirmation email to customer
      await emailjs.send(
        serviceId,
        customerTemplateId,
        customerEmailData,
        publicKey
      )

      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (error) {
      console.error('Email send failed:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <p className="section-label">Get a Quote</p>
          <h2 className="section-title">
            Let's Create <span className="gold-text">Together</span>
          </h2>
          <div className="divider" />
        </div>

        <div className={styles.grid}>
          {/* Info */}
          <div className={`${styles.info} reveal-left`} style={{ transitionDelay: '0.1s' }}>
            <p className={styles.infoText}>
              Have a project in mind? Whether it's a custom order, bulk requirement, or a new
              collection — we'd love to hear from you. Reach out and let's bring your vision to life.
            </p>

            <div className={styles.contactItems}>
              <a href="mailto:rasheedclothingintl@gmail.com" className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="M22 6l-10 7L2 6"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Email Us</span>
                  <span className={styles.contactValue}>rasheedclothingintl@gmail.com</span>
                </div>
              </a>

              <a href="tel:+923496014611" className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.21 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Call Us</span>
                  <span className={styles.contactValue}>+92 349 601 4611</span>
                </div>
              </a>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Working Hours</span>
                  <span className={styles.contactValue}>Mon – Sat: 9:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* Social links placeholder */}
            <div className={styles.social}>
              <p className={styles.socialLabel}>Follow Us</p>
              <div className={styles.socialLinks}>
                <MagneticButton className={styles.socialBtn} onClick={() => window.open('https://www.instagram.com/rasheedclothingintl?igsh=MW9zYTk1dXdjdndvdw==', '_blank')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </MagneticButton>
                <MagneticButton className={styles.socialBtn} onClick={() => window.open('https://www.facebook.com/share/184dG574x7/', '_blank')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </MagneticButton>
                <MagneticButton className={styles.socialBtn} onClick={() => window.open('https://www.linkedin.com/company/rasheed-clothing-international', '_blank')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" stroke="none" fill="currentColor"/></svg>
                </MagneticButton>
                <MagneticButton className={styles.socialBtn} onClick={() => window.open('https://wa.me/923496014611', '_blank')}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Form */}
          <form id="quote-form" className={`${styles.form} reveal-right`} style={{ transitionDelay: '0.15s' }} onSubmit={submit}>
            <div className={styles.row}>
              <div className={`${styles.field} ${form.name ? styles['has-value'] : ''}`}>
                <label className={styles.label}>Your Name</label>
                <input name="name" value={form.name} onChange={handle} className={styles.input} placeholder="e.g. Ahmed Khan" required />
              </div>
              <div className={`${styles.field} ${form.email ? styles['has-value'] : ''}`}>
                <label className={styles.label}>Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handle} className={styles.input} placeholder="you@example.com" required />
              </div>
            </div>
            <div className={styles.row}>
              <div className={`${styles.field} ${form.phone ? styles['has-value'] : ''}`}>
                <label className={styles.label}>Phone Number</label>
                <input name="phone" value={form.phone} onChange={handle} className={styles.input} placeholder="+92 300 000 0000" />
              </div>
              <div className={`${styles.field} ${form.subject ? styles['has-value'] : ''}`}>
                <label className={styles.label}>Enquiry Type</label>
                <select name="subject" value={form.subject} onChange={handle} className={`${styles.input} ${!form.subject ? styles['select-placeholder'] : ''}`} required>
                  <option value="">Select a category</option>
                  <option value="Custom Order">Custom Order</option>
                  <option value="Bulk / Wholesale">Bulk / Wholesale</option>
                  <option value="Bridal Collection">Bridal Collection</option>
                  <option value="Corporate Uniforms">Corporate Uniforms</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className={`${styles.field} ${form.message ? styles['has-value'] : ''}`}>
              <label className={styles.label}>Requirements / Details</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handle}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Please describe your requirements in detail..."
                rows={5}
                required
              />
            </div>
            <button type="submit" disabled={status === 'sending'} className={`btn-primary ${styles.submitBtn}`}>
              {status === 'sending' ? (
                <>
                  <span className={styles.spinner} />
                  Sending Request...
                </>
              ) : status === 'success' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Request Sent!
                </>
              ) : status === 'error' ? (
                'Error! Try Again'
              ) : (
                <>
                  Submit Request
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
