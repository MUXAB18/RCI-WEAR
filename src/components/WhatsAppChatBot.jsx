import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import styles from './WhatsAppChatBot.module.css'

/* ═══════════════════════════════════════════════
   CONFIGURATION
   ═══════════════════════════════════════════════ */
const CONFIG = {
  whatsappNumber: '923496014611',
  phone: '+92 349 6014611',
  email: 'rasheedclothingintl@gmail.com',
  linkedin: 'https://www.linkedin.com/company/rasheed-clothing-international', // Add your LinkedIn URL here
  businessName: 'Rasheed Clothing International',
  businessShort: 'RCI Wear',
  tagline: 'Premium Custom Clothing',
  responseTime: 'Typically replies within minutes',
  workingHours: 'Mon – Sat • 9:00 AM – 7:00 PM PKT',
  avatar: 'RW',
  verified: true,
}

/* ═══════════════════════════════════════════════
   GREETING MESSAGES
   ═══════════════════════════════════════════════ */
const GREETING_MESSAGES = [
  {
    id: 'welcome',
    text: `Welcome to *${CONFIG.businessName}* ✨\n\nWe specialize in premium custom clothing, bulk orders, and exquisite bridal collections.`,
    delay: 600,
  },
  {
    id: 'prompt',
    text: 'How can we assist you today?',
    delay: 1100,
    showOptions: true,
  },
]

/* ═══════════════════════════════════════════════
   SERVICE OPTIONS
   ═══════════════════════════════════════════════ */
const SERVICE_OPTIONS = [
  {
    id: 'custom',
    icon: '✨',
    title: 'Custom Orders',
    description: `*Excellent choice!* ✨\n\nOur bespoke service includes:\n✓ Personalized design consultation\n✓ Premium fabric selection\n✓ Expert craftsmanship\n✓ Perfect fit guarantee\n\nFrom concept to creation, we bring your vision to life.`,
    message: 'Hi! I am interested in placing a custom order. Can you help me with the design process?',
  },
  {
    id: 'bulk',
    icon: '📦',
    title: 'Bulk Orders',
    description: `*Perfect for businesses!* 📦\n\nOur wholesale program offers:\n✓ Competitive bulk pricing\n✓ Flexible minimum quantities\n✓ Brand customization\n✓ Dedicated account manager\n\nScale your business with our reliable bulk solutions.`,
    message: 'Hello! I would like to enquire about bulk/wholesale orders. Please share pricing and details.',
  },
  {
    id: 'bridal',
    icon: '💍',
    title: 'Bridal Collection',
    description: `*Congratulations!* 💍\n\nOur bridal collection features:\n✓ Exquisite traditional & modern designs\n✓ Premium luxury fabrics\n✓ Intricate handwork & embellishments\n✓ Custom fitting & alterations\n\nLet's create your dream wedding outfit.`,
    message: "Hi! I'm interested in your bridal collection. Can you share available designs and pricing?",
  },
  {
    id: 'pricing',
    icon: '💰',
    title: 'Pricing & Fabrics',
    description: `*Transparent pricing!* 💰\n\nWhat we provide:\n✓ Competitive market rates\n✓ Extensive fabric library\n✓ Options for every budget\n✓ Detailed itemized quotes\n\nGet a personalized quote today.`,
    message: 'Hello! Can you provide pricing information and available fabric options?',
  },
  {
    id: 'general',
    icon: '💬',
    title: 'General Inquiry',
    description: `*Happy to help!* 💬\n\nOur team can assist with:\n✓ Product information\n✓ Order tracking\n✓ Design consultations\n✓ Shipping & delivery\n\nNo question is too small!`,
    message: 'Hello! I have a question about your services.',
  },
]

/* ═══════════════════════════════════════════════
   WHATSAPP ICON COMPONENT
   ═══════════════════════════════════════════════ */
const WhatsAppIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

/* ═══════════════════════════════════════════════
   VERIFIED BADGE COMPONENT
   ═══════════════════════════════════════════════ */
const VerifiedBadge = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.verifiedBadge}>
    <path
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#4ADE80"
    />
    <path
      d="M9 12l2 2 4-4"
      stroke="#075E54"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/* ═══════════════════════════════════════════════
   TYPING INDICATOR COMPONENT
   ═══════════════════════════════════════════════ */
const TypingIndicator = () => (
  <div className={styles.typingContainer}>
    <div className={styles.typingAvatar}>{CONFIG.avatar}</div>
    <div className={styles.typingBubble}>
      <div className={styles.typingDots}>
        <span />
        <span />
        <span />
      </div>
    </div>
  </div>
)

/* ═══════════════════════════════════════════════
   MESSAGE BUBBLE COMPONENT
   ═══════════════════════════════════════════════ */
const MessageBubble = ({ message, isUser, showAvatar }) => {
  const formatText = useCallback((text) => {
    const parts = text.split(/(\*[^*]+\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <strong key={i} className={styles.boldText}>
            {part.slice(1, -1)}
          </strong>
        )
      }
      return <span key={i}>{part}</span>
    })
  }, [])

  return (
    <div className={`${styles.messageRow} ${isUser ? styles.messageRowUser : styles.messageRowAgent}`}>
      {!isUser && showAvatar && (
        <div className={styles.messageAvatar}>{CONFIG.avatar}</div>
      )}
      {!isUser && !showAvatar && <div className={styles.messageSpacer} />}
      
      <div className={`${styles.messageBubble} ${isUser ? styles.bubbleUser : styles.bubbleAgent}`}>
        <div className={styles.messageText}>{formatText(message)}</div>
        <div className={styles.messageTime}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SERVICE CARD COMPONENT
   ═══════════════════════════════════════════════ */
const ServiceCard = ({ option, onSelect }) => (
  <button
    className={styles.serviceCard}
    onClick={() => onSelect(option)}
    aria-label={`Select ${option.title}`}
  >
    <span className={styles.cardIcon}>{option.icon}</span>
    <span className={styles.cardTitle}>{option.title}</span>
  </button>
)

/* ═══════════════════════════════════════════════
   WHATSAPP CTA BUTTON COMPONENT
   ═══════════════════════════════════════════════ */
const WhatsAppButton = ({ link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.whatsappButton}
    aria-label="Open WhatsApp conversation"
  >
    <WhatsAppIcon size={16} />
    <span>Chat on WhatsApp</span>
  </a>
)

/* ═══════════════════════════════════════════════
   MORE OPTIONS BUTTON COMPONENT
   ═══════════════════════════════════════════════ */
const MoreOptionsButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className={styles.moreOptionsButton}
    aria-label="View more options"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span>More Options</span>
  </button>
)

/* ═══════════════════════════════════════════════
   CONTACT OPTIONS COMPONENT
   ═══════════════════════════════════════════════ */
const ContactOptions = () => (
  <div className={styles.contactOptions}>
    <a
      href={`https://wa.me/${CONFIG.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.contactOption}
    >
      <WhatsAppIcon size={16} />
      <span>WhatsApp</span>
    </a>
    <a
      href={`tel:${CONFIG.phone}`}
      className={styles.contactOption}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
      <span>Call Us</span>
    </a>
    <a
      href={`mailto:${CONFIG.email}`}
      className={styles.contactOption}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
      <span>Email</span>
    </a>
    <a
      href={CONFIG.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.contactOption}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2" stroke="none" fill="currentColor"/>
      </svg>
      <span>LinkedIn</span>
    </a>
  </div>
)

/* ═══════════════════════════════════════════════
   MAIN CHATBOT COMPONENT
   ═══════════════════════════════════════════════ */
export default function WhatsAppChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationDismissed, setNotificationDismissed] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const [greetingComplete, setGreetingComplete] = useState(false)
  
  const messagesEndRef = useRef(null)
  const timerRefs = useRef([])

  /* ─────────────────────────────────────────────
     AUTO SCROLL TO BOTTOM
     ───────────────────────────────────────────── */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  /* ─────────────────────────────────────────────
     NOTIFICATION BADGE
     ───────────────────────────────────────────── */
  useEffect(() => {
    if (notificationDismissed || isOpen) return
    const timer = setTimeout(() => {
      setShowNotification(true)
      setHasUnread(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [notificationDismissed, isOpen])

  /* ─────────────────────────────────────────────
     GREETING FLOW
     ───────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen || greetingComplete) return

    setMessages([])
    setIsTyping(true)

    timerRefs.current.forEach(clearTimeout)
    timerRefs.current = []

    let cumulativeDelay = 0

    GREETING_MESSAGES.forEach((msg, index) => {
      cumulativeDelay += msg.delay

      const timer = setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: msg.id,
            text: msg.text,
            isUser: false,
            showOptions: msg.showOptions,
            timestamp: new Date(),
          },
        ])

        if (index < GREETING_MESSAGES.length - 1) {
          setTimeout(() => setIsTyping(true), 300)
        }
      }, cumulativeDelay)

      timerRefs.current.push(timer)
    })

    const completeTimer = setTimeout(() => {
      setGreetingComplete(true)
    }, cumulativeDelay + 300)

    timerRefs.current.push(completeTimer)

    return () => timerRefs.current.forEach(clearTimeout)
  }, [isOpen, greetingComplete])

  /* ─────────────────────────────────────────────
     HANDLE SERVICE SELECTION
     ───────────────────────────────────────────── */
  const handleServiceSelect = useCallback((option) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${option.id}-${Date.now()}`,
        text: option.title,
        isUser: true,
        timestamp: new Date(),
      },
    ])

    // Show typing and description
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        
        // For general inquiry, show contact options
        if (option.id === 'general') {
          setMessages((prev) => [
            ...prev,
            {
              id: `desc-${option.id}-${Date.now()}`,
              text: option.description,
              isUser: false,
              timestamp: new Date(),
            },
            {
              id: `contact-${option.id}-${Date.now()}`,
              text: `Choose how you'd like to reach us:`,
              isUser: false,
              showContactOptions: true,
              timestamp: new Date(),
            },
          ])
        } else {
          // For other options, show description with WhatsApp button
          const whatsappLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(option.message)}`
          setMessages((prev) => [
            ...prev,
            {
              id: `desc-${option.id}-${Date.now()}`,
              text: option.description,
              isUser: false,
              timestamp: new Date(),
            },
            {
              id: `action-${option.id}-${Date.now()}`,
              text: '',
              isUser: false,
              showActions: true,
              whatsappLink,
              timestamp: new Date(),
            },
          ])
        }
      }, 900)
    }, 400)
  }, [])

  /* ─────────────────────────────────────────────
     SHOW MORE OPTIONS
     ───────────────────────────────────────────── */
  const handleShowMoreOptions = useCallback(() => {
    setMessages((prev) => [
      ...prev,
      {
        id: `more-${Date.now()}`,
        text: 'What else can we help you with?',
        isUser: false,
        showOptions: true,
        timestamp: new Date(),
      },
    ])
  }, [])

  /* ─────────────────────────────────────────────
     OPEN/CLOSE HANDLERS
     ───────────────────────────────────────────── */
  const handleOpen = useCallback(() => {
    setIsOpen(true)
    setShowNotification(false)
    setNotificationDismissed(true)
    setHasUnread(false)
    if (greetingComplete) {
      setGreetingComplete(false)
    }
  }, [greetingComplete])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    timerRefs.current.forEach(clearTimeout)
    setIsTyping(false)
    setGreetingComplete(false)
    setMessages([])
  }, [])

  const dismissNotification = useCallback(() => {
    setShowNotification(false)
    setNotificationDismissed(true)
    setHasUnread(false)
  }, [])

  /* ─────────────────────────────────────────────
     MEMOIZED SERVICE OPTIONS
     ───────────────────────────────────────────── */
  const serviceCards = useMemo(
    () =>
      SERVICE_OPTIONS.map((option) => (
        <ServiceCard key={option.id} option={option} onSelect={handleServiceSelect} />
      )),
    [handleServiceSelect]
  )

  return (
    <>
      {/* ═══════════════════════════════════════════
          CHAT PANEL
          ═══════════════════════════════════════════ */}
      <div
        className={`${styles.chatPanel} ${isOpen ? styles.chatPanelOpen : ''}`}
        role="dialog"
        aria-label="WhatsApp Support Chat"
        aria-modal="true"
      >
        {/* HEADER */}
        <div className={styles.chatHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.headerAvatar}>
              <span>{CONFIG.avatar}</span>
              <div className={styles.onlinePulse} />
            </div>
            <div className={styles.headerInfo}>
              <div className={styles.headerName}>
                {CONFIG.businessShort}
                {CONFIG.verified && <VerifiedBadge />}
              </div>
              <div className={styles.headerStatus}>
                <span className={styles.onlineDot} />
                Online • {CONFIG.responseTime}
              </div>
            </div>
          </div>
          <div className={styles.headerActions}>
            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.headerAction}
              aria-label="Open WhatsApp directly"
            >
              <WhatsAppIcon size={18} />
            </a>
            <button
              className={styles.headerAction}
              onClick={handleClose}
              aria-label="Close chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* INFO BAR */}
        <div className={styles.infoBar}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" strokeLinecap="round" />
          </svg>
          <span>{CONFIG.workingHours}</span>
        </div>

        {/* MESSAGES AREA */}
        <div className={styles.messagesArea}>
          <div className={styles.dateLabel}>Today</div>

          {messages.map((msg, index) => {
            const showAvatar = index === 0 || messages[index - 1]?.isUser !== msg.isUser
            return (
              <div key={msg.id}>
                {msg.text && (
                  <MessageBubble message={msg.text} isUser={msg.isUser} showAvatar={showAvatar} />
                )}
                
                {msg.showOptions && (
                  <div className={styles.serviceCardsGrid}>{serviceCards}</div>
                )}
                
                {msg.showActions && (
                  <div className={styles.actionButtons}>
                    <WhatsAppButton link={msg.whatsappLink} />
                    <MoreOptionsButton onClick={handleShowMoreOptions} />
                  </div>
                )}
                
                {msg.showContactOptions && (
                  <>
                    <ContactOptions />
                    <button className={styles.moreOptionsButton} onClick={handleShowMoreOptions}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>More Options</span>
                    </button>
                  </>
                )}
              </div>
            )
          })}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* FOOTER */}
        <div className={styles.chatFooter}>
          <div className={styles.footerContent}>
            <WhatsAppIcon size={16} className={styles.footerIcon} />
            <span>Powered by WhatsApp Business</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          NOTIFICATION BUBBLE
          ═══════════════════════════════════════════ */}
      {showNotification && !isOpen && (
        <div className={styles.notificationBubble}>
          <button className={styles.notifClose} onClick={dismissNotification} aria-label="Dismiss notification">
            ×
          </button>
          <div className={styles.notifAvatar}>{CONFIG.avatar}</div>
          <div className={styles.notifContent}>
            <div className={styles.notifTitle}>👋 Hi there!</div>
            <div className={styles.notifMessage}>Need help? We're here to assist you!</div>
            <div className={styles.notifMeta}>{CONFIG.responseTime}</div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          FLOATING ACTION BUTTON
          ═══════════════════════════════════════════ */}
      <div className={styles.fabContainer}>
        <button
          className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`}
          onClick={isOpen ? handleClose : handleOpen}
          aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
          aria-expanded={isOpen}
        >
          {hasUnread && !isOpen && <div className={styles.unreadBadge}>1</div>}
          {!isOpen && <div className={styles.fabNotificationDot} />}
          <div className={styles.fabPulse} />
          <div className={styles.fabPulse2} />
          <div className={styles.fabIcon}>
            {isOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <WhatsAppIcon size={30} />
            )}
          </div>
          {!isOpen && (
            <div className={styles.fabTooltip}>
              <div className={styles.tooltipHeader}>
                <div className={styles.tooltipDot} />
                <div className={styles.tooltipText}>Need Help?</div>
              </div>
              <div className={styles.tooltipSubtext}>Chat with us on WhatsApp</div>
            </div>
          )}
        </button>
      </div>
    </>
  )
}
