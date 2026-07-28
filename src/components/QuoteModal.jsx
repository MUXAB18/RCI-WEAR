import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import styles from './QuoteModal.module.css'

export default function QuoteModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: '',
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
      // ============================================
      const serviceId = 'service_8rutxkg'
      const adminTemplateId = 'template_z3hi3hj' // Template for admin notification
      const customerTemplateId = 'template_4pfa2ea' // Template for customer confirmation
      const publicKey = '9U-BFk_8Du4GSjC2B'

      // Mock submission to show success state if keys are not added yet
      if (serviceId === 'YOUR_SERVICE_ID') {
         await new Promise(resolve => setTimeout(resolve, 1500))
         setStatus('success')
         setTimeout(() => {
           onClose()
           setStatus('idle')
           setForm({ name: '', email: '', phone: '', enquiryType: '', message: '' })
         }, 3000)
         return
      }

      // Template data for admin notification
      const adminEmailData = {
        from_name: form.name,
        reply_to: form.email,
        phone: form.phone || 'Not provided',
        enquiry_type: form.enquiryType,
        message: form.message,
      }

      // Template data for customer confirmation
      const customerEmailData = {
        to_email: form.email, // Customer's email
        from_name: form.name,
        enquiry_type: form.enquiryType,
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
      setTimeout(() => {
        onClose()
        setStatus('idle')
        setForm({ name: '', email: '', phone: '', enquiryType: '', message: '' })
      }, 3000)
    } catch (error) {
      console.error('Email send failed:', error)
      // Build helpful message
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
            <h2 className={styles.title}>Request a Quote</h2>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              Fill out the form below with your requirements, and our team will get back to you with a tailored proposal.
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
              <h3>Request Sent Successfully</h3>
              <p>Thank you for your interest. We have received your enquiry and will contact you shortly.</p>
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
                  <label htmlFor="enquiryType">Enquiry Type *</label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      required
                      value={form.enquiryType}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="Custom Order">Custom Order</option>
                      <option value="Bulk / Wholesale">Bulk / Wholesale</option>
                      <option value="Free Mock Up">Free Mock Up</option>
                      <option value="Corporate Uniforms">Corporate Uniforms</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className={styles.selectArrow}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Requirements / Details *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Please describe your requirements in detail..."
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
                    Sending Request...
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
