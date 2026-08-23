import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import styles from './ContactModal.module.css'

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState('')

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // ============================================
      // EMAILJS CONFIGURATION
      // Replace with your actual EmailJS credentials
      // ============================================
      const serviceId = 'YOUR_SERVICE_ID'
      const adminTemplateId = 'YOUR_ADMIN_TEMPLATE_ID' // Email to you
      const customerTemplateId = 'YOUR_CUSTOMER_TEMPLATE_ID' // Email to customer
      const publicKey = 'YOUR_PUBLIC_KEY'

      // Mock submission to show success state if keys are not added yet
      if (serviceId === 'YOUR_SERVICE_ID') {
         await new Promise(resolve => setTimeout(resolve, 1500))
         setStatus('success')
         setTimeout(() => {
           onClose()
           setStatus('idle')
           setForm({ name: '', email: '', phone: '', subject: '', message: '' })
         }, 3000)
         return
      }

      // Email data
      const emailData = {
        from_name: form.name,
        reply_to: form.email,
        phone: form.phone || 'Not provided',
        subject: form.subject,
        message: form.message,
        to_email: form.email, // Customer email for confirmation
      }

      // Send email to ADMIN (you receive notification)
      await emailjs.send(
        serviceId,
        adminTemplateId,
        emailData,
        publicKey
      )

      // Send email to CUSTOMER (they receive confirmation)
      await emailjs.send(
        serviceId,
        customerTemplateId,
        emailData,
        publicKey
      )

      setStatus('success')
      setTimeout(() => {
        onClose()
        setStatus('idle')
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      }, 3000)
    } catch (error) {
      console.error('Email send failed:', error)
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
      if (msg.includes('403') || msg.includes('API access from non-browser')) {
        msg = 'Email provider blocked non-browser API calls — enable API access in your EmailJS dashboard (Account → Security) or use a server-side relay.'
      }
      setErrorMessage(msg || 'Submission failed — check console for details.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.content}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Rasheed Clothing International</p>
            <h2 className={styles.title}>Get In Touch</h2>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {status === 'success' ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Message Sent Successfully</h3>
              <p>Thank you for reaching out. We have received your message and will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Ahmed Khan"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+92 300 000 0000"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className={`btn-primary ${styles.submitBtn}`}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <span className={styles.spinner} />
                    Sending Message...
                  </>
                ) : status === 'error' ? (
                    'Error! Try Again'
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
              {status === 'error' && (
                <p className={styles.submitError} role="alert">{errorMessage || 'Submission failed — see console for details.'}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
