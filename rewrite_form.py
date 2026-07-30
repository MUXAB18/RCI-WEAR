import re

with open('src/components/Contact.module.css', 'r') as f:
    content = f.read()

new_css = """/* ══════════════════════════════════════════════
   LUXURY INQUIRY CARD
   ══════════════════════════════════════════════ */
.inquiryCard {
  max-width: 900px;
  margin: 0 auto 88px;
  background: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0,0,0,0.02);
  padding: 80px 80px;
  position: relative;
  z-index: 10;
}

.corner { display: none; }

.cardHeader {
  text-align: center;
  margin-bottom: 72px;
}

.cardEyebrow {
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--grey-400);
  margin-bottom: 16px;
}

.cardTitle {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 400;
  color: var(--near-black);
  letter-spacing: -0.01em;
}

.cardHeaderRight, .cardDivider {
  display: none;
}

/* ══════════════════════════════════════════════
   FORM
   ══════════════════════════════════════════════ */
.form {
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
}

.fieldLine { display: none; }

.label {
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--grey-500);
}

.input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  border-radius: 0;
  color: var(--near-black);
  font-family: var(--font-sans);
  font-size: 15px;
  padding: 8px 0 12px;
  outline: none;
  transition: border-color 0.4s ease;
}

.input::placeholder {
  color: rgba(0,0,0,0.2);
}

.input:focus {
  border-bottom-color: var(--near-black);
}

.select {
  /* cursor: none; */
  padding-right: 28px;
  appearance: none;
}

.selectArrow {
  position: absolute;
  right: 0;
  bottom: 20px;
  width: 12px;
  height: 8px;
  color: var(--grey-400);
  pointer-events: none;
}

.fieldFull { grid-column: 1 / -1; }

.textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

.charCount {
  position: absolute;
  bottom: -24px;
  right: 0;
  font-family: var(--font-sans);
  font-size: 10px;
  color: var(--grey-400);
  opacity: 0.8;
}

/* ══════════════════════════════════════════════
   SUBMIT BUTTON
   ══════════════════════════════════════════════ */
.submitRow {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.submitBtn {
  background: var(--near-black);
  color: #FFFFFF;
  border: none;
  border-radius: 2px;
  padding: 24px 80px;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  transition: all 0.4s var(--ease-luxury);
  /* cursor: none; */
  position: relative;
  overflow: hidden;
}

.submitBtn:hover {
  background: #000000;
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.15);
}

.submitBtn[data-status='success'] { background: #1A6B3C; }
.submitBtn[data-status='error'] { background: #8B2020; }

.submitBtnInner {
  display: flex;
  align-items: center;
  gap: 12px;
}

.submitArrow {
  width: 16px;
  height: 16px;
  transition: transform 0.4s ease;
}

.submitBtn:hover .submitArrow {
  transform: translateX(4px);
}

.submitShimmer { display: none; }

.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 1.5px solid rgba(255,255,255,0.25);
  border-top-color: rgba(255,255,255,0.9);
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

"""

pattern = re.compile(r'/\* ══════════════════════════════════════════════\n\s*LUXURY INQUIRY CARD.*?(?=/\* ══════════════════════════════════════════════\n\s*TRUST BADGES)', re.DOTALL)

# Ensure match
if pattern.search(content):
    new_content = pattern.sub(new_css, content)
    with open('src/components/Contact.module.css', 'w') as f:
        f.write(new_content)
    print("Successfully replaced CSS section.")
else:
    print("Pattern not found!")
