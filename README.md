# CyHub 🛡️
> Executive Two-Sided Cybersecurity Platform connecting Indian MSMEs, Cyber Learners, and Verified Freelance Security Specialists.

Built as an academic innovation and entrepreneurship micro-project assessment (CST, DS) by the Department of Computer Science & Engineering (Cyber Security).

---

## 🌟 Overview
**CyHub** bridges the critical digital defense divide for 6.3 Crore digitized Indian MSMEs while training the next generation of security analysts.
- **For Indian MSMEs**: Rapid vulnerability assessments, DPDP Act 2023 compliance audits, CERT-In reporting readiness, and fixed-price Security Starter Bundles (₹2,999) with zero exorbitant retainers.
- **For Cyber Learners & Students**: Zero-cost browser-based Cyber Arcade labs, hands-on certification training (CEH, CompTIA Security+), and 1-on-1 verified mentorship slots (₹499/slot).
- **For Verified Freelancers & Virtual CISOs**: Escrow-backed client engagements with an industry-leading **85% payout take-home** (15% platform take-rate).

---

## 📊 Empirical Field Validation (N=131 Survey)
CyHub's platform architecture and unit economics are directly grounded in primary field research ($N=131$ Indian MSME directors, IT administrators, and engineering students):
- **69.5% Market Readiness**: 91 of 131 confirmed likelihood to book verified 30-minute consultations.
- **65.6% Exposure Reality**: 86 of 131 experienced digital fraud, unauthorized account takeovers, or phishing scams.
- **65.5% False Security Paradox**: "Very Confident" respondents routinely practice password reuse (45.5%) or plaintext credential storage (20.0%).
- **55.0% Trust Bottleneck**: Breach victims cite finding trustworthy technical help as their single hardest challenge.
- **Statutory Alignment**: Digital Personal Data Protection (DPDP) Act 2023 compliance & mandatory CERT-In 6-hour incident reporting.

---

## 🎮 Interactive Labs / Cyber Arcade (`#arcade`)
Client-side interactive cybersecurity simulations executed entirely in the browser:
1. **Phish Catcher (Social Engineering Forensics)**: Corporate email client inspecting raw RFC 822 headers, typosquatting domains (`paypa1-support.com`), and concealed Windows executables (`.pdf.exe`).
2. **SQLi Breach Sandbox (AppSec)**: Visual injection query visualizer demonstrating authentication bypass (`' OR 1=1 --`) and parameterized prepared statement remediation.
3. **Firewall Defender (Perimeter Hardening)**: Real-time network packet inspection blocking exposed RDP (3389) and FTP (21) while permitting legitimate HTTPS (443).
4. **Verified Credentialing**: Generates an executive Cyber Defense Apprentice credential with SHA-256 validation hashes and direct 1-on-1 mentor booking.

---

## 💼 Unit Economics & Business Model (`#business-model`)
- **Marketplace Split**: 85% to Specialist / 15% CyHub platform take-rate.
- **Micro-Consulting & Rapid Triage**: ₹499 to ₹1,499 per 30-minute slot.
- **Fixed-Scope Starter Bundle**: ₹2,999 (password manager, 2FA enforcement, perimeter audit).
- **MSME Subscriptions**:
  - *Essential Shield*: ₹0 / Free Forever (Arcade, CERT-In advisories, checklists)
  - *Business Secure*: ₹1,499 / month (Automated vulnerability scans, DPDP Act templates, escrow matchmaking)
  - *Enterprise Defense*: ₹6,999 / month (Dedicated Virtual CISO advisory, priority emergency triage under 30 mins)
- **Year 1 Target ARR**: ~₹44.4 Lakhs Annual Run Rate with >90% software gross margins.

---

## 👥 Academic Leadership Team (`#team`)
- **Joshua S.** — Project Lead & Full-Stack System Architect
- **Ebenezer Paul** — Security Systems & Offensive/Defensive Lab Engineer
- **Moses Daniel Timothy** — Market Strategy, Survey Analytics & Customer Discovery
- **Kevin** — Product Operations, Governance & Compliance Lead

*Department of Computer Science & Engineering (Cyber Security) | Micro-Project Assessment (CST, DS)*

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite Development Server
npm run dev
# -> Opens on http://localhost:5173/

# Type-check and production build
npm run build
```

---

## 📑 Executive Pitch Deck Generation

Generate the official 18-slide executive pitch deck:

```bash
# Install python-pptx (if not already installed)
pip install python-pptx

# Generate 16:9 Widescreen Pitch Deck
python generate_deck.py
# -> Generates CyHub_Pitch_Deck.pptx
```
