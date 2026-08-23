import { useEffect, useRef } from 'react'
import styles from './LegalModal.module.css'

/* ──────────────────────────────────────────────────────────
   LegalModal — shared shell for Privacy Policy & T&C
   Props:
     isOpen   : boolean
     onClose  : () => void
     type     : 'privacy' | 'terms'
   ────────────────────────────────────────────────────────── */

const LAST_UPDATED = 'July 2026'

/* ── Section helper ── */
function Section({ num, title, children }) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>
        <span className={styles.sectionNum}>{num}</span>
        {title}
      </h3>
      <div className={styles.sectionBody}>{children}</div>
    </div>
  )
}

/* ── Privacy Policy content ── */
function PrivacyContent() {
  return (
    <>
      <p className={styles.intro}>
        Welcome to <strong>Rasheed Clothing International ("RCI", "we", "our", or "us")</strong>.
        Your privacy is important to us. This Privacy Policy explains how we collect, use, protect,
        and disclose your information when you visit our website or submit an enquiry.
        By using our website, you agree to the practices described in this Privacy Policy.
      </p>

      <Section num="01" title="Information We Collect">
        <p>When you submit an enquiry or contact us, we may collect:</p>
        <ul>
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Company Name (if provided)</li>
          <li>Country</li>
          <li>Enquiry Type</li>
          <li>Message Content</li>
        </ul>
        <p>We may also automatically collect:</p>
        <ul>
          <li>IP Address</li>
          <li>Browser Type</li>
          <li>Device Information</li>
          <li>Operating System</li>
          <li>Pages Visited</li>
          <li>Referral Source</li>
          <li>Date and Time of Visit</li>
        </ul>
      </Section>

      <Section num="02" title="How We Use Your Information">
        <p>We use your information to:</p>
        <ul>
          <li>Respond to enquiries</li>
          <li>Provide quotations</li>
          <li>Communicate regarding orders</li>
          <li>Improve customer service</li>
          <li>Improve our website</li>
          <li>Prevent spam and fraudulent activity</li>
          <li>Maintain website security</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p className={styles.highlight}>We do not sell your personal information.</p>
      </Section>

      <Section num="03" title="Cookies">
        <p>Our website may use cookies to:</p>
        <ul>
          <li>Improve website performance</li>
          <li>Remember preferences</li>
          <li>Analyze website traffic</li>
          <li>Enhance user experience</li>
        </ul>
        <p>You can disable cookies through your browser settings.</p>
      </Section>

      <Section num="04" title="Analytics">
        <p>We may use analytics services to understand how visitors use our website. Collected information may include device type, browser, pages viewed, session duration, country, and general location. Analytics data is used only for improving our services.</p>
      </Section>

      <Section num="05" title="Contact Forms">
        <p>When you submit a contact or quotation request:</p>
        <ul>
          <li>Your information is securely transmitted.</li>
          <li>Your enquiry is delivered to our business email.</li>
          <li>We use the information solely to respond to your request.</li>
        </ul>
      </Section>

      <Section num="06" title="Data Security">
        <p>We implement reasonable administrative, technical, and organizational safeguards to protect your information from unauthorized access, alteration, disclosure, or destruction. While no online transmission or storage method is completely secure, we work to protect your information using industry-standard practices.</p>
      </Section>

      <Section num="07" title="Third-Party Services">
        <p>Our website may use trusted third-party services, including:</p>
        <ul>
          <li>Email delivery providers</li>
          <li>Website hosting providers</li>
          <li>Analytics providers</li>
          <li>Cloudflare security services</li>
        </ul>
        <p>These providers process information only as necessary to deliver their services.</p>
      </Section>

      <Section num="08" title="External Links">
        <p>Our website may contain links to external websites. We are not responsible for the privacy practices or content of third-party websites.</p>
      </Section>

      <Section num="09" title="Children's Privacy">
        <p>Our website is intended for business and general audiences and is not directed to children under the age of 13. We do not knowingly collect personal information from children.</p>
      </Section>

      <Section num="10" title="Your Rights">
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Request access to your personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information where applicable</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>
        <p>To exercise these rights, please contact us.</p>
      </Section>

      <Section num="11" title="Changes to this Policy">
        <p>We may update this Privacy Policy from time to time. Changes become effective immediately upon publication on this page.</p>
      </Section>

      <Section num="12" title="Contact Us">
        <p><strong>Rasheed Clothing International</strong></p>
        <ul>
          <li>Email: <a href="mailto:rasheedclothingintl@gmail.com">rasheedclothingintl@gmail.com</a></li>
          <li>Phone: <a href="tel:+447459700121">🇬🇧 +44 7459 700121</a> / <a href="tel:+923496014611">🇵🇰 +92 349 601 4611</a></li>
          <li>Location: Sialkot, Pakistan</li>
        </ul>
      </Section>
    </>
  )
}

/* ── Terms & Conditions content ── */
function TermsContent() {
  return (
    <>
      <p className={styles.intro}>
        Welcome to <strong>Rasheed Clothing International</strong>.
        By accessing or using our website, you agree to these Terms &amp; Conditions.
      </p>

      <Section num="01" title="Website Use">
        <p>You agree to use this website only for lawful purposes. You must not:</p>
        <ul>
          <li>Submit false or misleading information</li>
          <li>Attempt unauthorized access to the website or servers</li>
          <li>Introduce malicious software or harmful code</li>
          <li>Interfere with the website's operation</li>
          <li>Use automated tools to scrape or misuse website content without permission</li>
        </ul>
      </Section>

      <Section num="02" title="Quotations">
        <p>All quotations provided through our website are:</p>
        <ul>
          <li>Non-binding</li>
          <li>Subject to product specifications</li>
          <li>Subject to order quantity</li>
          <li>Subject to material availability</li>
          <li>Subject to confirmation by Rasheed Clothing International</li>
        </ul>
        <p>Prices may change before order confirmation.</p>
      </Section>

      <Section num="03" title="Product Information">
        <p>We strive to present accurate information about our products and services. However:</p>
        <ul>
          <li>Product colors may vary depending on screen settings.</li>
          <li>Images are for illustration purposes unless otherwise stated.</li>
          <li>Specifications may change without prior notice.</li>
        </ul>
      </Section>

      <Section num="04" title="Orders">
        <p>An enquiry submitted through our website does not constitute an order. A binding agreement is formed only after:</p>
        <ul>
          <li>Price confirmation</li>
          <li>Production confirmation</li>
          <li>Mutual agreement on specifications</li>
          <li>Order acceptance by Rasheed Clothing International</li>
        </ul>
      </Section>

      <Section num="05" title="Intellectual Property">
        <p>All website content, including but not limited to logos, images, graphics, text, icons, branding, layouts, and designs, is the property of Rasheed Clothing International or used with appropriate permission. Unauthorized reproduction or distribution is prohibited without prior written consent.</p>
      </Section>

      <Section num="06" title="Limitation of Liability">
        <p>To the fullest extent permitted by law, Rasheed Clothing International shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of this website or reliance on its content.</p>
      </Section>

      <Section num="07" title="Website Availability">
        <p>We aim to keep our website available at all times. However, we do not guarantee uninterrupted access and may suspend or modify the website for maintenance, updates, or technical reasons.</p>
      </Section>

      <Section num="08" title="User Content">
        <p>By submitting enquiries, messages, or other content through our website, you confirm that:</p>
        <ul>
          <li>The information provided is accurate.</li>
          <li>You have the right to provide the information.</li>
          <li>The content does not violate any law or third-party rights.</li>
        </ul>
      </Section>

      <Section num="09" title="Privacy">
        <p>Your use of this website is also governed by our Privacy Policy.</p>
      </Section>

      <Section num="10" title="Changes to Terms">
        <p>We reserve the right to update these Terms &amp; Conditions at any time. Changes become effective immediately after publication on this page.</p>
      </Section>

      <Section num="11" title="Governing Law">
        <p>These Terms &amp; Conditions shall be governed by and interpreted in accordance with the laws of <strong>Pakistan</strong>, without regard to conflict of law principles.</p>
      </Section>

      <Section num="12" title="Contact Information">
        <p><strong>Rasheed Clothing International</strong></p>
        <ul>
          <li>Email: <a href="mailto:rasheedclothingintl@gmail.com">rasheedclothingintl@gmail.com</a></li>
          <li>Phone: <a href="tel:+447459700121">🇬🇧 +44 7459 700121</a> / <a href="tel:+923496014611">🇵🇰 +92 349 601 4611</a></li>
          <li>Location: Sialkot, Pakistan</li>
        </ul>
      </Section>
    </>
  )
}

/* ─────────────────────────────────────────────────────────
   Main modal component
   ───────────────────────────────────────────────────────── */
export default function LegalModal({ isOpen, onClose, type }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  const isPrivacy = type === 'privacy'
  const title     = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'
  const eyebrow   = isPrivacy ? 'Legal · Data Protection' : 'Legal · Website Usage'

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      /* Scroll modal content back to top on re-open */
      if (contentRef.current) contentRef.current.scrollTop = 0
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  /* Close on backdrop click */
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={styles.modal}>
        {/* ── Header bar ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.updated}>Last Updated: {LAST_UPDATED}</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* ── Scrollable content ── */}
        <div ref={contentRef} className={styles.content}>
          {isPrivacy ? <PrivacyContent /> : <TermsContent />}

          {/* Footer CTA */}
          <div className={styles.contentFooter}>
            <p className={styles.contentFooterText}>
              Questions? Contact us at{' '}
              <a href="mailto:rasheedclothingintl@gmail.com">rasheedclothingintl@gmail.com</a>
            </p>
            <button className={styles.closeFooterBtn} onClick={onClose}>
              Close Document
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
