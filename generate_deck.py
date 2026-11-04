"""
generate_deck.py
Executive Pitch Deck Generator for CyHub (18 Slides)
Matches Academic Entrepreneurship Micro-Project Assessment criteria (CST, DS - 40 Marks)
"""

import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

# ==============================================================================
# DESIGN SYSTEM & COLOR PALETTE
# ==============================================================================
SLIDE_WIDTH = Inches(13.333)
SLIDE_HEIGHT = Inches(7.5)

# Executive Color Palette
COLOR_BG_CANVAS      = RGBColor(248, 250, 252) # #F8FAFC Clean off-white
COLOR_CARD_BG        = RGBColor(255, 255, 255) # Clean White card
COLOR_CARD_SUBTLE    = RGBColor(241, 245, 249) # #F1F5F9 Slate-100
COLOR_CARD_BORDER    = RGBColor(226, 232, 240) # #E2E8F0 Crisp Slate-200
COLOR_TEXT_PRIMARY   = RGBColor(15, 23, 42)    # #0F172A Obsidian / Slate-900
COLOR_TEXT_MUTED     = RGBColor(71, 85, 105)   # #475569 Slate-600
COLOR_TEXT_SUBTLE    = RGBColor(100, 116, 139) # #64748B Slate-500
COLOR_CYAN_ACCENT    = RGBColor(2, 132, 199)   # #0284C7 Cyber Teal / Electric Cyan
COLOR_EMERALD_GREEN  = RGBColor(5, 150, 105)   # #059669 Verified / Metrics Success
COLOR_ROSE_ALERT     = RGBColor(225, 29, 72)   # #E11D48 Breach / Vulnerability Alert
COLOR_AMBER_ACCENT   = RGBColor(217, 119, 6)   # #D97706 Warning / Milestone Accent
COLOR_INDIGO_ACCENT  = RGBColor(79, 70, 229)   # #4F46E5 Academic / Architecture

FONT_HEADING = "Segoe UI"
FONT_BODY    = "Segoe UI"
FONT_MONO    = "Consolas"

# Resolve Authentic Logo
LOGO_PATH = None
for candidate in [
    os.path.join(os.getcwd(), "public", "CyHub_Logo_Black.jpg"),
    os.path.join(os.getcwd(), "CyHub_Logo_Black.jpg"),
    os.path.abspath("public/CyHub_Logo_Black.jpg"),
    os.path.abspath("CyHub_Logo_Black.jpg"),
]:
    if os.path.exists(candidate):
        LOGO_PATH = candidate
        break

print(f"[CyHub Deck] Using authentic logo at: {LOGO_PATH}")


# ==============================================================================
# HELPER FUNCTIONS FOR CLEAN EXECUTIVE CARDS & TYPOGRAPHY
# ==============================================================================

def create_base_slide(prs, title="", category_badge="", slide_num=1):
    """Creates a blank slide with the off-white canvas, header band, and corner logo watermark."""
    blank_layout = prs.slide_layouts[6] # completely blank layout
    slide = prs.slides.add_slide(blank_layout)

    # Background canvas rectangle
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, SLIDE_WIDTH, SLIDE_HEIGHT)
    bg.fill.solid()
    bg.fill.fore_color.rgb = COLOR_BG_CANVAS
    bg.line.color.rgb = COLOR_BG_CANVAS
    bg.line.width = Pt(0)

    # On slides 2-18, render executive header & brand watermark
    if slide_num > 1:
        # Category / Criteria Pill Tag
        if category_badge:
            cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.42), Inches(9.0), Inches(0.35))
            tf_cat = cat_box.text_frame
            tf_cat.word_wrap = True
            tf_cat.margin_left = tf_cat.margin_right = tf_cat.margin_top = tf_cat.margin_bottom = 0
            p_cat = tf_cat.paragraphs[0]
            p_cat.text = category_badge.upper()
            p_cat.font.name = FONT_MONO
            p_cat.font.size = Pt(9.5)
            p_cat.font.bold = True
            p_cat.font.color.rgb = COLOR_CYAN_ACCENT

        # Slide Main Title
        if title:
            title_top = Inches(0.72) if category_badge else Inches(0.5)
            title_box = slide.shapes.add_textbox(Inches(0.8), title_top, Inches(9.8), Inches(0.55))
            tf_title = title_box.text_frame
            tf_title.word_wrap = True
            tf_title.margin_left = tf_title.margin_right = tf_title.margin_top = tf_title.margin_bottom = 0
            p_title = tf_title.paragraphs[0]
            p_title.text = title
            p_title.font.name = FONT_HEADING
            p_title.font.size = Pt(22)
            p_title.font.bold = True
            p_title.font.color.rgb = COLOR_TEXT_PRIMARY

        # Thin crisp header divider line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.35), Inches(11.733), Pt(1))
        line.fill.solid()
        line.fill.fore_color.rgb = COLOR_CARD_BORDER
        line.line.color.rgb = COLOR_CARD_BORDER
        line.line.width = Pt(0)

        # Brand Watermark in Upper Right Corner
        if LOGO_PATH:
            try:
                slide.shapes.add_picture(LOGO_PATH, Inches(11.25), Inches(0.45), width=Inches(1.25))
            except Exception as e:
                pass

        # Slide number & evaluation label footer
        footer_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.05), Inches(11.733), Inches(0.3))
        tf_footer = footer_box.text_frame
        tf_footer.margin_left = tf_footer.margin_right = tf_footer.margin_top = tf_footer.margin_bottom = 0
        p_foot = tf_footer.paragraphs[0]
        p_foot.text = f"CyHub Academic Pitch Deck | Department of CSE (Cyber Security) | Slide {slide_num} of 18"
        p_foot.font.name = FONT_BODY
        p_foot.font.size = Pt(8.5)
        p_foot.font.color.rgb = COLOR_TEXT_SUBTLE

    return slide


def add_card(slide, left, top, width, height, bg_color=COLOR_CARD_BG, border_color=COLOR_CARD_BORDER, top_accent=None):
    """Adds an executive card container with crisp borders and an optional color top-accent bar."""
    # Main container
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    card.line.color.rgb = border_color
    card.line.width = Pt(1)

    # Optional top accent bar
    if top_accent:
        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left + Pt(1), top + Pt(1), width - Pt(2), Inches(0.06))
        bar.fill.solid()
        bar.fill.fore_color.rgb = top_accent
        bar.line.color.rgb = top_accent
        bar.line.width = Pt(0)

    return card


def add_bullet_point(tf, bold_label, text, font_size=Pt(10.5), label_color=COLOR_TEXT_PRIMARY, body_color=COLOR_TEXT_MUTED, space_after=Pt(6)):
    """Appends a cleanly styled paragraph with bold label and muted description."""
    p = tf.add_paragraph() if len(tf.paragraphs[0].text) > 0 else tf.paragraphs[0]
    p.space_after = space_after
    
    run_label = p.add_run()
    run_label.text = bold_label + " " if bold_label else ""
    run_label.font.name = FONT_BODY
    run_label.font.size = font_size
    run_label.font.bold = True
    run_label.font.color.rgb = label_color

    run_text = p.add_run()
    run_text.text = text
    run_text.font.name = FONT_BODY
    run_text.font.size = font_size
    run_text.font.bold = False
    run_text.font.color.rgb = body_color


# ==============================================================================
# SLIDE BUILDERS (1 TO 18)
# ==============================================================================

def build_slide_1(prs):
    """Slide 1: Cover & Project Identity (Criterion 1)"""
    slide = create_base_slide(prs, slide_num=1)

    # Background decorative subtle bar
    top_band = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, SLIDE_WIDTH, Inches(0.1))
    top_band.fill.solid()
    top_band.fill.fore_color.rgb = COLOR_CYAN_ACCENT
    top_band.line.width = Pt(0)

    # Authentic Logo Display (Prominent)
    if LOGO_PATH:
        try:
            slide.shapes.add_picture(LOGO_PATH, Inches(1.0), Inches(1.1), width=Inches(2.5))
        except Exception:
            pass

    # Title & Subtitle block
    title_box = slide.shapes.add_textbox(Inches(1.0), Inches(2.2), Inches(11.3), Inches(2.2))
    tf = title_box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

    p_badge = tf.paragraphs[0]
    p_badge.text = "ACADEMIC INNOVATION & INCUBATOR PITCH DECK"
    p_badge.font.name = FONT_MONO
    p_badge.font.size = Pt(11)
    p_badge.font.bold = True
    p_badge.font.color.rgb = COLOR_CYAN_ACCENT
    p_badge.space_after = Pt(8)

    p_title = tf.add_paragraph()
    p_title.text = "CYHUB"
    p_title.font.name = FONT_HEADING
    p_title.font.size = Pt(46)
    p_title.font.bold = True
    p_title.font.color.rgb = COLOR_TEXT_PRIMARY
    p_title.space_after = Pt(6)

    p_sub = tf.add_paragraph()
    p_sub.text = "Democratizing Cybersecurity for Indian MSMEs & Learners"
    p_sub.font.name = FONT_HEADING
    p_sub.font.size = Pt(18)
    p_sub.font.bold = True
    p_sub.font.color.rgb = COLOR_CYAN_ACCENT
    p_sub.space_after = Pt(12)

    p_desc = tf.add_paragraph()
    p_desc.text = "A decentralized, escrow-protected marketplace and hands-on cyber range connecting 6.3 Crore digitized Indian MSMEs with verified freelance security talent and student mentors."
    p_desc.font.name = FONT_BODY
    p_desc.font.size = Pt(12)
    p_desc.font.color.rgb = COLOR_TEXT_MUTED

    # Bottom Metadata Card
    add_card(slide, Inches(1.0), Inches(4.7), Inches(11.333), Inches(2.1), bg_color=COLOR_CARD_BG, top_accent=COLOR_CYAN_ACCENT)

    meta_box = slide.shapes.add_textbox(Inches(1.3), Inches(4.9), Inches(10.7), Inches(1.7))
    tf_meta = meta_box.text_frame
    tf_meta.word_wrap = True
    tf_meta.margin_left = tf_meta.margin_right = tf_meta.margin_top = tf_meta.margin_bottom = 0

    p1 = tf_meta.paragraphs[0]
    p1.text = "Academic Evaluation Alignment:"
    p1.font.name = FONT_BODY
    p1.font.size = Pt(11)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_TEXT_PRIMARY
    p1.space_after = Pt(4)

    p2 = tf_meta.add_paragraph()
    p2.text = "Course: Entrepreneurship Micro-Project Assessment (CST, DS) — Total Marks: 40"
    p2.font.name = FONT_BODY
    p2.font.size = Pt(11)
    p2.font.color.rgb = COLOR_TEXT_MUTED
    p2.space_after = Pt(2)

    p3 = tf_meta.add_paragraph()
    p3.text = "Department: B.Tech Computer Science & Engineering (Cyber Security)"
    p3.font.name = FONT_BODY
    p3.font.size = Pt(11)
    p3.font.color.rgb = COLOR_TEXT_MUTED
    p3.space_after = Pt(6)

    p4 = tf_meta.add_paragraph()
    p4.text = "Team Members: Joshua S. (Lead Architect)  |  Ebenezer Paul (Security Labs)  |  Moses Daniel Timothy (Market Strategy)  |  Kevin (Compliance & Operations)"
    p4.font.name = FONT_BODY
    p4.font.size = Pt(10.5)
    p4.font.bold = True
    p4.font.color.rgb = COLOR_TEXT_PRIMARY
    p4.space_after = Pt(6)

    p5 = tf_meta.add_paragraph()
    p5.text = "Coverage Focus: [CO1: Opportunity Identification]   [CO2: Market Validation]   [CO3: Startup Plan Development]   [CO4: Financial & Economic Modeling]"
    p5.font.name = FONT_MONO
    p5.font.size = Pt(9.5)
    p5.font.bold = True
    p5.font.color.rgb = COLOR_EMERALD_GREEN


def build_slide_2(prs):
    """Slide 2: Academic Alignment & Course Outcomes (Criterion 1)"""
    slide = create_base_slide(
        prs,
        title="Academic Alignment: Course Outcomes (CO1 – CO4)",
        category_badge="CRITERION 1: PROBLEM IDENTIFICATION & COURSE OUTCOME MAPPING",
        slide_num=2
    )

    boxes = [
        {
            "tag": "CO1: OPPORTUNITY IDENTIFICATION",
            "accent": COLOR_CYAN_ACCENT,
            "title": "Unaddressed MSME Security Void",
            "bullets": [
                ("Macro Void:", "6.3 Crore Indian MSMEs rapidly digitizing via UPI and GSTN operate without in-house cyber defense personnel."),
                ("Statutory Catalyst:", "Enactment of the Digital Personal Data Protection (DPDP) Act 2023 with mandatory ₹250 Crore penalty caps."),
                ("Market Disconnect:", "Enterprise consultancies demand prohibitive ₹2L+ retainers, leaving regional healthcare, retail, and manufacturing exposed.")
            ]
        },
        {
            "tag": "CO2: MARKET VALIDATION",
            "accent": COLOR_EMERALD_GREEN,
            "title": "Empirical Primary Field Research (N=131)",
            "bullets": [
                ("Quantitative Scale:", "Surveyed 131 Indian MSME directors, IT administrators, and engineering students across South India."),
                ("The Behavioral Paradox:", "65.5% of 'security-confident' respondents routinely practice password reuse and plaintext credential storage."),
                ("High Tutoring Demand:", "69.5% confirmed willingness to book verified 1-on-1 micro-consulting and practical defense sessions.")
            ]
        },
        {
            "tag": "CO3: STARTUP PLAN DEVELOPMENT",
            "accent": COLOR_INDIGO_ACCENT,
            "title": "Triangular Ecosystem & De-risking RoE",
            "bullets": [
                ("Three-Sided Model:", "Directly binds MSMEs, certified freelance specialists, and student learners in a closed trust loop."),
                ("Standardized RoE:", "Legally vetted non-destructive Rules of Engagement protect businesses from operational disruptions."),
                ("Escrow Milestone Vault:", "Funds disbursed via UPI/Razorpay Escrow strictly upon documented milestone sign-off.")
            ]
        },
        {
            "tag": "CO4: FINANCIAL & ECONOMIC MODELING",
            "accent": COLOR_AMBER_ACCENT,
            "title": "Sustainable Unit Economics & High Margins",
            "bullets": [
                ("Fair Payout Split:", "Specialists keep an industry-leading 85%; CyHub retains a 15% platform take-rate."),
                ("Recurring SaaS:", "MSME subscriptions (₹1,499/mo Business Secure; ₹6,999/mo Enterprise Defense)."),
                ("Target Year 1 ARR:", "₹44.4 Lakhs Annual Run Rate projected at >90% software gross margins via zero-cloud-overhead browser execution.")
            ]
        }
    ]

    card_w = Inches(5.7)
    card_h = Inches(2.55)
    coords = [
        (Inches(0.8), Inches(1.6)),
        (Inches(6.8), Inches(1.6)),
        (Inches(0.8), Inches(4.35)),
        (Inches(6.8), Inches(4.35)),
    ]

    for b, (c_left, c_top) in zip(boxes, coords):
        add_card(slide, c_left, c_top, card_w, card_h, top_accent=b["accent"])
        tb = slide.shapes.add_textbox(c_left + Inches(0.3), c_top + Inches(0.2), card_w - Inches(0.6), card_h - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = b["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(9)
        p0.font.bold = True
        p0.font.color.rgb = b["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = b["title"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(13.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(6)

        for bold_lbl, text in b["bullets"]:
            add_bullet_point(tf, bold_lbl, text, font_size=Pt(9.5), space_after=Pt(4))


def build_slide_3(prs):
    """Slide 3: Problem Space — The Indian MSME Vulnerability Trap (Criterion 2)"""
    slide = create_base_slide(
        prs,
        title="Problem Space: The Enterprise-Pricing Divide in India",
        category_badge="CRITERION 2: PROBLEM DEFINITION & MACRO CONTEXT",
        slide_num=3
    )

    cards = [
        {
            "num": "01",
            "accent": COLOR_ROSE_ALERT,
            "title": "Rapid Digitization Without Defense",
            "stat": "6.3 Crore",
            "stat_label": "Indian MSMEs Rapidly Digitizing",
            "desc": "Small businesses across retail, logistics, and healthcare run on digital UPI, GST portals, and cloud SaaS, yet operate with zero full-time cybersecurity personnel.",
            "impact": "Exposed endpoints, default router configs, and unpatched web interfaces leave daily operations vulnerable to automated ransomware bots."
        },
        {
            "num": "02",
            "accent": COLOR_AMBER_ACCENT,
            "title": "Exorbitant Enterprise Retainers",
            "stat": "₹2,00,000+",
            "stat_label": "Typical Consultancy Retainer Quote",
            "desc": "Traditional Big-4 and cybersecurity consultancies design pricing models exclusively for Tier-1 enterprise budgets, quoting upfront annual retainers.",
            "impact": "MSMEs are priced out of professional protection, forcing them to rely on unverified freelance marketplaces or unmanaged free antiviruses."
        },
        {
            "num": "03",
            "accent": COLOR_ROSE_ALERT,
            "title": "Statutory Regulatory Liabilities",
            "stat": "₹250 Crore",
            "stat_label": "Maximum DPDP Act 2023 Statutory Penalty",
            "desc": "The Digital Personal Data Protection Act (2023) and CERT-In 6-hour mandatory breach reporting directives impose stringent compliance burdens on data fiduciaries.",
            "impact": "A single customer data breach can destroy an MSME's working capital through severe regulatory fines, commercial blacklisting, and brand destruction."
        }
    ]

    card_w = Inches(3.7)
    card_h = Inches(4.3)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, c in enumerate(cards):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=c["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.3), Inches(1.85), card_w - Inches(0.6), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p_num = tf.paragraphs[0]
        p_num.text = f"PILLAR {c['num']}"
        p_num.font.name = FONT_MONO
        p_num.font.size = Pt(9.5)
        p_num.font.bold = True
        p_num.font.color.rgb = c["accent"]
        p_num.space_after = Pt(2)

        p_title = tf.add_paragraph()
        p_title.text = c["title"]
        p_title.font.name = FONT_HEADING
        p_title.font.size = Pt(13)
        p_title.font.bold = True
        p_title.font.color.rgb = COLOR_TEXT_PRIMARY
        p_title.space_after = Pt(10)

        p_stat = tf.add_paragraph()
        p_stat.text = c["stat"]
        p_stat.font.name = FONT_HEADING
        p_stat.font.size = Pt(26)
        p_stat.font.bold = True
        p_stat.font.color.rgb = c["accent"]

        p_lbl = tf.add_paragraph()
        p_lbl.text = c["stat_label"]
        p_lbl.font.name = FONT_MONO
        p_lbl.font.size = Pt(9)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = COLOR_TEXT_SUBTLE
        p_lbl.space_after = Pt(12)

        add_bullet_point(tf, "Context:", c["desc"], font_size=Pt(9.5), space_after=Pt(6))
        add_bullet_point(tf, "MSME Impact:", c["impact"], font_size=Pt(9.5), space_after=Pt(4))

    # Bottom Highlight Callout Banner
    add_card(slide, Inches(0.8), Inches(6.05), Inches(11.733), Inches(0.85), bg_color=COLOR_CARD_SUBTLE, top_accent=COLOR_ROSE_ALERT)
    bot_box = slide.shapes.add_textbox(Inches(1.1), Inches(6.15), Inches(11.1), Inches(0.65))
    tf_bot = bot_box.text_frame
    tf_bot.word_wrap = True
    tf_bot.margin_left = tf_bot.margin_right = tf_bot.margin_top = tf_bot.margin_bottom = 0

    p_call = tf_bot.paragraphs[0]
    p_call.text = "EMPIRICAL THREAT REALITY (N=131 SURVEY DATA):"
    p_call.font.name = FONT_MONO
    p_call.font.size = Pt(9.5)
    p_call.font.bold = True
    p_call.font.color.rgb = COLOR_ROSE_ALERT
    p_call.space_after = Pt(2)

    p_call2 = tf_bot.add_paragraph()
    p_call2.text = "65.6% of surveyed respondents (86 of 131) confirmed that they, their company, or direct business associates have suffered financial loss or operational disruption from phishing scams, credential theft, or unauthorized payment callback breaches."
    p_call2.font.name = FONT_BODY
    p_call2.font.size = Pt(9.5)
    p_call2.font.color.rgb = COLOR_TEXT_PRIMARY


def build_slide_4(prs):
    """Slide 4: Problem Space — Behavioral Vulnerabilities & Trust Deficit (Criterion 2)"""
    slide = create_base_slide(
        prs,
        title="Problem Space: Behavioral Realities & The Trust Deficit",
        category_badge="CRITERION 2: PRIMARY EMPIRICAL RESEARCH (N=131 FIELD SURVEY)",
        slide_num=4
    )

    insights = [
        {
            "tag": "PARADOX 01: FALSE SECURITY",
            "accent": COLOR_ROSE_ALERT,
            "title": "The False Security Paradox",
            "stat": "65.5%",
            "stat_sub": "Vulnerable Despite High Confidence",
            "finding": "Out of 87 users rating their security knowledge as 'High' or 'Very Confident', 65.5% routinely engage in compromised habits:",
            "bullets": [
                ("45.5% Password Reuse:", "Single master passwords reused across business emails, banking, and social media accounts."),
                ("20.0% Plaintext Storage:", "Writing master credentials in unencrypted desktop text files, shared spreadsheets, or physical diaries.")
            ]
        },
        {
            "tag": "BARRIER 02: TRUST DEFICIT",
            "accent": COLOR_CYAN_ACCENT,
            "title": "The Trust & Discovery Bottleneck",
            "stat": "55.0%",
            "stat_sub": "Cannot Find Trustworthy Help",
            "finding": "When a cyber incident or breach occurs, breach victims cite finding trusted technical help as their single hardest challenge:",
            "bullets": [
                ("65.6% Word-of-Mouth Reliance:", "Businesses refuse generic freelance portals due to fears of data leakage and rogue access."),
                ("Dispute Risk:", "Fear of scope creep, unvetted access credentials, and extortion from unverified third-party consultants.")
            ]
        },
        {
            "tag": "BARRIER 03: THE JARGON WALL",
            "accent": COLOR_AMBER_ACCENT,
            "title": "The Technical Jargon Divide",
            "stat": "41.2%",
            "stat_sub": "Lack Actionable Guidance",
            "finding": "Standard institutional security advisories fail to convert into practical enterprise defense for non-technical managers:",
            "bullets": [
                ("41.2% No Actionable Steps:", "Advisories describe CVEs and CVE vectors without actionable, step-by-step mitigation checklists."),
                ("21.4% Overwhelmed by Jargon:", "Cryptic vocabulary (EDR, XDR, Zero-Trust) intimidates clinic directors and small manufacturers.")
            ]
        }
    ]

    card_w = Inches(3.7)
    card_h = Inches(5.1)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, c in enumerate(insights):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=c["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.3), Inches(1.85), card_w - Inches(0.6), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = c["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(9)
        p0.font.bold = True
        p0.font.color.rgb = c["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = c["title"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(13.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(8)

        p2 = tf.add_paragraph()
        p2.text = c["stat"]
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(28)
        p2.font.bold = True
        p2.font.color.rgb = c["accent"]

        p3 = tf.add_paragraph()
        p3.text = c["stat_sub"]
        p3.font.name = FONT_MONO
        p3.font.size = Pt(9)
        p3.font.bold = True
        p3.font.color.rgb = COLOR_TEXT_SUBTLE
        p3.space_after = Pt(10)

        p4 = tf.add_paragraph()
        p4.text = c["finding"]
        p4.font.name = FONT_BODY
        p4.font.size = Pt(9.5)
        p4.font.color.rgb = COLOR_TEXT_PRIMARY
        p4.space_after = Pt(6)

        for b_lbl, b_txt in c["bullets"]:
            add_bullet_point(tf, b_lbl, b_txt, font_size=Pt(9.2), space_after=Pt(6))


def build_slide_5(prs):
    """Slide 5: Innovation — The Triangular Solution Architecture (Criterion 3)"""
    slide = create_base_slide(
        prs,
        title="Innovation: The Three-Sided CyHub Solution Ecosystem",
        category_badge="CRITERION 3: PROPOSED INNOVATION & PLATFORM TOPOLOGY",
        slide_num=5
    )

    pillars = [
        {
            "role": "SIDE 01: INDIAN MSMES",
            "accent": COLOR_CYAN_ACCENT,
            "title": "Small Businesses & Clinics",
            "tagline": "Democratized, Plain-Language Defense",
            "deliverables": [
                ("Diagnostic Intake Wizard:", "Guided intake maps business risk profile to certified specialists in < 60 seconds."),
                ("Security Starter Bundle (₹2,999):", "Turnkey setup of enterprise password managers, 2FA, and perimeter lockdown."),
                ("DPDP Readiness Kits:", "Standardized templates ensuring compliance with statutory personal data regulations.")
            ]
        },
        {
            "role": "SIDE 02: LEARNERS & STUDENTS",
            "accent": COLOR_EMERALD_GREEN,
            "title": "Aspiring Security Defenders",
            "tagline": "Gamified Skills to Commercial Gigs",
            "deliverables": [
                ("Zero-Cost Cyber Arcade:", "Client-side browser labs teaching phishing header triage, SQLi mitigation, and firewall rules."),
                ("1-on-1 Mentor Bookings:", "Directly access senior CISSP/CEH specialists for ₹499/slot career coaching."),
                ("Verified Credential Pipeline:", "Top learners earn cryptographic badges unlocking verified junior triage gigs.")
            ]
        },
        {
            "role": "SIDE 03: VERIFIED SPECIALISTS",
            "accent": COLOR_INDIGO_ACCENT,
            "title": "Freelancers & Virtual CISOs",
            "tagline": "Escrow-Protected High-Value Yield",
            "deliverables": [
                ("Industry-Leading 85% Split:", "Specialists retain 85% of earnings (vs. 60-70% on legacy freelance portals)."),
                ("Pre-Qualified Leads:", "No bidding wars; clients matched via structured diagnostic triage requests."),
                ("Zero Liability Friction:", "Built-in standardized Rules of Engagement (RoE) protect consultants legally.")
            ]
        }
    ]

    card_w = Inches(3.7)
    card_h = Inches(4.3)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, p in enumerate(pillars):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=p["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.3), Inches(1.85), card_w - Inches(0.6), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = p["role"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(9)
        p0.font.bold = True
        p0.font.color.rgb = p["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = p["title"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(13.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(2)

        p2 = tf.add_paragraph()
        p2.text = p["tagline"]
        p2.font.name = FONT_BODY
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_TEXT_SUBTLE
        p2.space_after = Pt(10)

        for b_lbl, b_txt in p["deliverables"]:
            add_bullet_point(tf, b_lbl, b_txt, font_size=Pt(9.2), space_after=Pt(6))

    # Bottom Core Differentiator Callout
    add_card(slide, Inches(0.8), Inches(6.05), Inches(11.733), Inches(0.85), bg_color=COLOR_CARD_SUBTLE, top_accent=COLOR_CYAN_ACCENT)
    bot_box = slide.shapes.add_textbox(Inches(1.1), Inches(6.15), Inches(11.1), Inches(0.65))
    tf_bot = bot_box.text_frame
    tf_bot.word_wrap = True
    tf_bot.margin_left = tf_bot.margin_right = tf_bot.margin_top = tf_bot.margin_bottom = 0

    p_call = tf_bot.paragraphs[0]
    p_call.text = "CORE ARCHITECTURAL DIFFERENTIATOR VS. CONVENTIONAL PLATFORMS:"
    p_call.font.name = FONT_MONO
    p_call.font.size = Pt(9.5)
    p_call.font.bold = True
    p_call.font.color.rgb = COLOR_CYAN_ACCENT
    p_call.space_after = Pt(2)

    p_call2 = tf_bot.add_paragraph()
    p_call2.text = "Unlike isolated CTF sandboxes (HackTheBox, TryHackMe) that lack commercial pathways, and unlike generic freelance sites (Upwork, Fiverr) lacking cybersecurity verification, CyHub bridges student skill development directly into escrow-backed MSME security engagements."
    p_call2.font.name = FONT_BODY
    p_call2.font.size = Pt(9.5)
    p_call2.font.color.rgb = COLOR_TEXT_PRIMARY


def build_slide_6(prs):
    """Slide 6: Innovation — Security Vault & De-risking Mechanics (Criterion 3)"""
    slide = create_base_slide(
        prs,
        title="Innovation: Platform Trust & De-risking Governance",
        category_badge="CRITERION 3: RISK MITIGATION & ESCROW GOVERNANCE",
        slide_num=6
    )

    mechanics = [
        {
            "tag": "MECHANISM 01",
            "accent": COLOR_EMERALD_GREEN,
            "title": "Milestone Escrow Vault",
            "sub": "Eliminating Payment & Delivery Risk",
            "bullets": [
                ("Automated Holding:", "Client funds are locked securely via UPI / Razorpay Smart Escrow before audit initiation."),
                ("Disbursement Control:", "Funds are disbursed to the freelancer strictly after the client formally signs off on the delivered remediation report."),
                ("Platform Arbitration:", "Objective mediation panel led by senior certified CISSP assessors in case of contested findings.")
            ]
        },
        {
            "tag": "MECHANISM 02",
            "accent": COLOR_CYAN_ACCENT,
            "title": "Click-Wrap Rules of Engagement (RoE)",
            "sub": "Legally Enforceable Scoping Contract",
            "bullets": [
                ("Strict Non-Destructive Scans:", "Pre-authorized checklists limit testing to configuration inspections and passive telemetry."),
                ("Production Safeguard:", "Strict prohibition of brute-force DDoS, intrusive exploits, or database drop commands."),
                ("Mutual Indemnification:", "Shields MSME clients from service outages while protecting freelance security researchers from CFAA/IT Act liability.")
            ]
        },
        {
            "tag": "MECHANISM 03",
            "accent": COLOR_INDIGO_ACCENT,
            "title": "Zero-Data-Training Privacy Pledge",
            "sub": "Air-Gapped Confidentiality Assurance",
            "bullets": [
                ("No LLM Training:", "Client configuration files, vulnerability scan logs, and proprietary code are strictly excluded from external AI training sets."),
                ("Ephemerality:", "Diagnostic intake details and scan outputs are stored under AES-256 client-side encryption with 30-day auto-shredding."),
                ("DPDP Fiduciary Protocol:", "Complies with digital data minimization mandates under Section 6 of DPDP Act 2023.")
            ]
        }
    ]

    card_w = Inches(3.7)
    card_h = Inches(5.1)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, m in enumerate(mechanics):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=m["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.3), Inches(1.85), card_w - Inches(0.6), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = m["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(9)
        p0.font.bold = True
        p0.font.color.rgb = m["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = m["title"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(13.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(2)

        p2 = tf.add_paragraph()
        p2.text = m["sub"]
        p2.font.name = FONT_BODY
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_TEXT_SUBTLE
        p2.space_after = Pt(14)

        for b_lbl, b_txt in m["bullets"]:
            add_bullet_point(tf, b_lbl, b_txt, font_size=Pt(9.5), space_after=Pt(8))


def build_slide_7(prs):
    """Slide 7: Market Opportunity — Indian TAM, SAM & SOM (Criterion 4)"""
    slide = create_base_slide(
        prs,
        title="Market Sizing: Indian Cybersecurity Opportunity",
        category_badge="CRITERION 4: TARGET MARKET ANALYSIS & SIZING",
        slide_num=7
    )

    tiers = [
        {
            "tag": "TOTAL ADDRESSABLE MARKET (TAM)",
            "accent": COLOR_CYAN_ACCENT,
            "stat": "₹55,000 Cr",
            "stat_sub": "~$6.5B Projected Indian Market (2026)",
            "scope": "Macro Cybersecurity Market in India",
            "bullets": [
                ("Market Growth:", "Rapid expansion across enterprise security software, cloud infrastructure, and consulting growing at 15.6% CAGR."),
                ("Digitization Drivers:", "Rapid adoption of UPI, Aadhaar e-KYC, and national cloud stacks across every Indian commercial sector.")
            ]
        },
        {
            "tag": "SERVICEABLE ADDRESSABLE MARKET (SAM)",
            "accent": COLOR_EMERALD_GREEN,
            "stat": "₹24,500 Cr",
            "stat_sub": "Indian Professional Audits & Testing",
            "scope": "Professional Services & Compliance",
            "bullets": [
                ("Scope of Work:", "Third-party penetration testing, vulnerability assessments, and ISO/DPDP compliance audits."),
                ("Mid-Tier Exposure:", "Emerging demand from regional cooperative banks, private hospitals, SaaS firms, and industrial supply chains.")
            ]
        },
        {
            "tag": "SERVICEABLE OBTAINABLE MARKET (SOM)",
            "accent": COLOR_AMBER_ACCENT,
            "stat": "₹580 Cr",
            "stat_sub": "Regional MSMEs & 1.5L Tech Learners",
            "scope": "Phase 1 Beachhead (South India Hubs)",
            "bullets": [
                ("Beachhead Geography:", "Digitized manufacturing & retail clusters across Tamil Nadu, Karnataka, and Maharashtra."),
                ("Learner Density:", "1.5 Lakh engineering students seeking hands-on labs and low-cost verified mentorship.")
            ]
        }
    ]

    card_w = Inches(3.7)
    card_h = Inches(4.3)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, t in enumerate(tiers):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=t["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.3), Inches(1.85), card_w - Inches(0.6), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = t["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(9)
        p0.font.bold = True
        p0.font.color.rgb = t["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = t["scope"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(13)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(8)

        p2 = tf.add_paragraph()
        p2.text = t["stat"]
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(28)
        p2.font.bold = True
        p2.font.color.rgb = t["accent"]

        p3 = tf.add_paragraph()
        p3.text = t["stat_sub"]
        p3.font.name = FONT_MONO
        p3.font.size = Pt(9)
        p3.font.bold = True
        p3.font.color.rgb = COLOR_TEXT_SUBTLE
        p3.space_after = Pt(12)

        for b_lbl, b_txt in t["bullets"]:
            add_bullet_point(tf, b_lbl, b_txt, font_size=Pt(9.2), space_after=Pt(6))

    # Bottom Regulatory Drivers Bar
    add_card(slide, Inches(0.8), Inches(6.05), Inches(11.733), Inches(0.85), bg_color=COLOR_CARD_SUBTLE, top_accent=COLOR_CYAN_ACCENT)
    bot_box = slide.shapes.add_textbox(Inches(1.1), Inches(6.15), Inches(11.1), Inches(0.65))
    tf_bot = bot_box.text_frame
    tf_bot.word_wrap = True
    tf_bot.margin_left = tf_bot.margin_right = tf_bot.margin_top = tf_bot.margin_bottom = 0

    p_call = tf_bot.paragraphs[0]
    p_call.text = "STATUTORY CATALYSTS ACCELERATING INDIAN MSME ADOPTION:"
    p_call.font.name = FONT_MONO
    p_call.font.size = Pt(9.5)
    p_call.font.bold = True
    p_call.font.color.rgb = COLOR_CYAN_ACCENT
    p_call.space_after = Pt(2)

    p_call2 = tf_bot.add_paragraph()
    p_call2.text = "Mandatory 6-hour CERT-In cybersecurity breach reporting directives + Enactment of Digital Personal Data Protection (DPDP) Act 2023 with corporate fines of up to ₹250 Crores transform proactive cybersecurity from a luxury expense into a statutory compliance necessity."
    p_call2.font.name = FONT_BODY
    p_call2.font.size = Pt(9.5)
    p_call2.font.color.rgb = COLOR_TEXT_PRIMARY


def build_slide_8(prs):
    """Slide 8: Market Validation — Primary Survey Insights (Criterion 4)"""
    slide = create_base_slide(
        prs,
        title="Market Validation: Empirical Customer Discovery (N=131)",
        category_badge="CRITERION 4: EMPIRICAL EVIDENCE & USER READINESS",
        slide_num=8
    )

    metrics = [
        {
            "tag": "READINESS METRIC 01",
            "accent": COLOR_EMERALD_GREEN,
            "stat": "69.5%",
            "stat_label": "High Willingness to Book",
            "sub": "91 of 131 Survey Respondents",
            "bullets": [
                ("Active Demand:", "Confirmed readiness to book verified 30-minute triage consultations with vetted security specialists."),
                ("Key Driver:", "Resolving immediate anxieties (suspicious phishing emails, compromised passwords, router misconfigurations).")
            ]
        },
        {
            "tag": "LEARNING METRIC 02",
            "accent": COLOR_CYAN_ACCENT,
            "stat": "59.5%",
            "stat_label": "Prioritize 1-on-1 Tutoring",
            "sub": "78 of 131 Survey Respondents",
            "bullets": [
                ("Educational Demand:", "Students and IT staff prioritize human mentorship over static pre-recorded video lectures."),
                ("Skill Goals:", "Preparing for practical certifications (CEH, Security+) and hands-on vulnerability analysis.")
            ]
        },
        {
            "tag": "TRUST METRIC 03",
            "accent": COLOR_AMBER_ACCENT,
            "stat": "68.7%",
            "stat_label": "Require Platform Verification",
            "sub": "90 of 131 Survey Respondents",
            "bullets": [
                ("Credential Validation:", "Mandate verified certifications (CISSP, CEH, CompTIA) displayed directly on consultant profiles."),
                ("Anti-Scam Measure:", "Refuse to hire consultants without platform-backed identity and technical competency checks.")
            ]
        }
    ]

    card_w = Inches(3.7)
    card_h = Inches(5.1)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, m in enumerate(metrics):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=m["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.3), Inches(1.85), card_w - Inches(0.6), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = m["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(9)
        p0.font.bold = True
        p0.font.color.rgb = m["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = m["stat_label"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(13.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(8)

        p2 = tf.add_paragraph()
        p2.text = m["stat"]
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(32)
        p2.font.bold = True
        p2.font.color.rgb = m["accent"]

        p3 = tf.add_paragraph()
        p3.text = m["sub"]
        p3.font.name = FONT_MONO
        p3.font.size = Pt(9.5)
        p3.font.bold = True
        p3.font.color.rgb = COLOR_TEXT_SUBTLE
        p3.space_after = Pt(14)

        for b_lbl, b_txt in m["bullets"]:
            add_bullet_point(tf, b_lbl, b_txt, font_size=Pt(9.5), space_after=Pt(8))


def build_slide_9(prs):
    """Slide 9: Market Validation — Customer Segmentation & Barriers (Criterion 4)"""
    slide = create_base_slide(
        prs,
        title="Market Validation: Buyer Archetypes & Barrier Mitigation",
        category_badge="CRITERION 4: CUSTOMER SEGMENTATION & WILLINGNESS TO PAY (N=131)",
        slide_num=9
    )

    archetypes = [
        {
            "tag": "ARCHETYPE A: IMMEDIATE BUYERS",
            "accent": COLOR_EMERALD_GREEN,
            "share": "33.6%",
            "share_n": "(44 of 131 Surveyed)",
            "title": "Immediate Technical Need",
            "behavior": "High incident exposure; seeking urgent, specialized technical intervention.",
            "prefs": [
                ("Pricing Preference:", "52.3% demand Pay-As-You-Go pricing per 30-minute consultation slot."),
                ("Primary Bottleneck:", "50.0% report high hourly consulting retainers as their single greatest deterrent."),
                ("CyHub Solution Fix:", "Micro-consulting slots starting at ₹499/slot with zero minimum retainers.")
            ]
        },
        {
            "tag": "ARCHETYPE B: HESITANT ADOPTERS",
            "accent": COLOR_AMBER_ACCENT,
            "share": "35.9%",
            "share_n": "(47 of 131 Surveyed)",
            "title": "Precautionary Adopters",
            "behavior": "Aware of compliance risks but uncertain how to assess their digital security posture.",
            "prefs": [
                ("Pricing Preference:", "38.3% strongly prefer Fixed One-Time Project pricing over hourly rates."),
                ("Primary Bottleneck:", "31.9% cite uncertainty regarding required scope of protection."),
                ("CyHub Solution Fix:", "Fixed-price 'Security Starter Bundles' (₹2,999) with explicit itemized deliverables.")
            ]
        }
    ]

    card_w = Inches(5.7)
    card_h = Inches(5.1)
    start_left = Inches(0.8)
    gap = Inches(0.333)

    for i, a in enumerate(archetypes):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=a["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.4), Inches(1.85), card_w - Inches(0.8), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = a["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(9.5)
        p0.font.bold = True
        p0.font.color.rgb = a["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = a["title"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(14)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(8)

        p2 = tf.add_paragraph()
        p2.text = f"{a['share']} {a['share_n']}"
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(22)
        p2.font.bold = True
        p2.font.color.rgb = a["accent"]
        p2.space_after = Pt(8)

        p3 = tf.add_paragraph()
        p3.text = f"Profile Context: {a['behavior']}"
        p3.font.name = FONT_BODY
        p3.font.size = Pt(10)
        p3.font.bold = True
        p3.font.color.rgb = COLOR_TEXT_PRIMARY
        p3.space_after = Pt(12)

        for b_lbl, b_txt in a["prefs"]:
            add_bullet_point(tf, b_lbl, b_txt, font_size=Pt(9.5), space_after=Pt(8))


def build_slide_10(prs):
    """Slide 10: Business Model — Pricing Tiers & Revenue Split (Criterion 5)"""
    slide = create_base_slide(
        prs,
        title="Business Model: Flexible Plans & Fair Platform Split",
        category_badge="CRITERION 5: REVENUE ARCHITECTURE & SUBSCRIPTION TIERS",
        slide_num=10
    )

    tiers = [
        {
            "tag": "COMMUNITY TIER",
            "accent": COLOR_TEXT_SUBTLE,
            "name": "Essential Shield",
            "price": "₹0 / Free",
            "sub": "Zero-Barrier Onboarding",
            "features": [
                "Full access to Cyber Arcade simulations",
                "CERT-In weekly vulnerability digests",
                "Self-service phishing & 2FA checklists",
                "Community discussion & threat board"
            ]
        },
        {
            "tag": "MSME POPULAR TIER",
            "accent": COLOR_CYAN_ACCENT,
            "name": "Business Secure",
            "price": "₹1,499 / mo",
            "sub": "Continuous Small Business Defense",
            "features": [
                "Monthly automated perimeter port scans",
                "Escrow-backed specialist matchmaking",
                "Turnkey DPDP Act readiness templates",
                "Priority booking queue for rapid triage"
            ]
        },
        {
            "tag": "ENTERPRISE TIER",
            "accent": COLOR_EMERALD_GREEN,
            "name": "Enterprise Defense",
            "price": "₹6,999 / mo",
            "sub": "Dedicated Governance & Retainers",
            "features": [
                "Dedicated Virtual CISO (vCISO) advisory",
                "Quarterly hands-on employee cyber drill",
                "Priority emergency response SLA < 30 mins",
                "Executive regulatory audit certification"
            ]
        }
    ]

    card_w = Inches(3.7)
    card_h = Inches(3.7)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, t in enumerate(tiers):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=t["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.3), Inches(1.8), card_w - Inches(0.6), card_h - Inches(0.4))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = t["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(8.5)
        p0.font.bold = True
        p0.font.color.rgb = t["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = t["name"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(13.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(4)

        p2 = tf.add_paragraph()
        p2.text = t["price"]
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(22)
        p2.font.bold = True
        p2.font.color.rgb = t["accent"]

        p3 = tf.add_paragraph()
        p3.text = t["sub"]
        p3.font.name = FONT_MONO
        p3.font.size = Pt(8.5)
        p3.font.bold = True
        p3.font.color.rgb = COLOR_TEXT_SUBTLE
        p3.space_after = Pt(10)

        for feat in t["features"]:
            add_bullet_point(tf, "✓", feat, font_size=Pt(9), label_color=COLOR_EMERALD_GREEN, space_after=Pt(4))

    # Bottom Payout Split Visual Card
    add_card(slide, Inches(0.8), Inches(5.45), Inches(11.733), Inches(1.45), bg_color=COLOR_CARD_SUBTLE, top_accent=COLOR_CYAN_ACCENT)
    bot_box = slide.shapes.add_textbox(Inches(1.1), Inches(5.55), Inches(11.1), Inches(1.25))
    tf_bot = bot_box.text_frame
    tf_bot.word_wrap = True
    tf_bot.margin_left = tf_bot.margin_right = tf_bot.margin_top = tf_bot.margin_bottom = 0

    p_sp = tf_bot.paragraphs[0]
    p_sp.text = "MARKETPLACE COMMISSION & UNIT SPLIT ARCHITECTURE:"
    p_sp.font.name = FONT_MONO
    p_sp.font.size = Pt(9.5)
    p_sp.font.bold = True
    p_sp.font.color.rgb = COLOR_CYAN_ACCENT
    p_sp.space_after = Pt(4)

    p_sp2 = tf_bot.add_paragraph()
    p_sp2.text = "• 85% Specialist Take-Home: Certified freelance auditors and tutors retain 85% of contract fees, outcompeting Upwork/Fiverr (which claim 20-30% plus payment cuts)."
    p_sp2.font.name = FONT_BODY
    p_sp2.font.size = Pt(9.5)
    p_sp2.font.color.rgb = COLOR_TEXT_PRIMARY
    p_sp2.space_after = Pt(3)

    p_sp3 = tf_bot.add_paragraph()
    p_sp3.text = "• 15% CyHub Platform Fee: Sustainable margin that covers Razorpay/Cashfree escrow integration, client-side lab hosting, dispute mediation, and marketing acquisition."
    p_sp3.font.name = FONT_BODY
    p_sp3.font.size = Pt(9.5)
    p_sp3.font.color.rgb = COLOR_TEXT_PRIMARY


def build_slide_11(prs):
    """Slide 11: Business Model — 12-Month Financial Projections (Criterion 5)"""
    slide = create_base_slide(
        prs,
        title="Financial Plans: 12-Month Unit Economics & ARR",
        category_badge="CRITERION 5: UNIT ECONOMICS & 12-MONTH PROJECTIONS",
        slide_num=11
    )

    streams = [
        {
            "tag": "STREAM 01: AUDITS",
            "accent": COLOR_CYAN_ACCENT,
            "title": "MSME Security Audits",
            "math": "40 Audits / mo @ ₹20k avg",
            "gmv": "₹8,00,000 GMV",
            "take": "₹1,20,000 / mo",
            "desc": "15% platform take-rate on fixed-scope vulnerability assessments and DPDP readiness audits."
        },
        {
            "tag": "STREAM 02: TUTORING",
            "accent": COLOR_EMERALD_GREEN,
            "title": "Tutoring & Micro-Triage",
            "math": "250 Sessions / mo @ ₹800 avg",
            "gmv": "₹2,00,000 GMV",
            "take": "₹30,000 / mo",
            "desc": "15% platform take-rate on 1-on-1 certification prep, lab debugging, and rapid incident triage."
        },
        {
            "tag": "STREAM 03: BUSINESS SAAS",
            "accent": COLOR_INDIGO_ACCENT,
            "title": "Business Secure SaaS",
            "math": "100 Active MSME Subscribers",
            "gmv": "₹1,499 / subscriber / mo",
            "take": "₹1,49,900 / mo",
            "desc": "100% platform software recurring revenue for continuous scanning, compliance, and matchmaking."
        },
        {
            "tag": "STREAM 04: ENTERPRISE",
            "accent": COLOR_AMBER_ACCENT,
            "title": "Enterprise Defense SaaS",
            "math": "10 High-Tier MSME Retainers",
            "gmv": "₹6,999 / subscriber / mo",
            "take": "₹69,990 / mo",
            "desc": "100% platform recurring revenue for dedicated vCISO advisory and priority emergency triage."
        }
    ]

    card_w = Inches(2.7)
    card_h = Inches(3.7)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, s in enumerate(streams):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=s["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.25), Inches(1.8), card_w - Inches(0.5), card_h - Inches(0.4))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = s["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(8)
        p0.font.bold = True
        p0.font.color.rgb = s["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = s["title"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(4)

        p2 = tf.add_paragraph()
        p2.text = s["math"]
        p2.font.name = FONT_MONO
        p2.font.size = Pt(8.5)
        p2.font.color.rgb = COLOR_TEXT_SUBTLE
        p2.space_after = Pt(2)

        p3 = tf.add_paragraph()
        p3.text = s["gmv"]
        p3.font.name = FONT_HEADING
        p3.font.size = Pt(12)
        p3.font.bold = True
        p3.font.color.rgb = COLOR_TEXT_MUTED
        p3.space_after = Pt(6)

        p4 = tf.add_paragraph()
        p4.text = s["take"]
        p4.font.name = FONT_HEADING
        p4.font.size = Pt(18)
        p4.font.bold = True
        p4.font.color.rgb = s["accent"]
        p4.space_after = Pt(8)

        p5 = tf.add_paragraph()
        p5.text = s["desc"]
        p5.font.name = FONT_BODY
        p5.font.size = Pt(8.8)
        p5.font.color.rgb = COLOR_TEXT_MUTED

    # Bottom Financial Summary Banner
    add_card(slide, Inches(0.8), Inches(5.45), Inches(11.733), Inches(1.45), bg_color=COLOR_CARD_SUBTLE, top_accent=COLOR_EMERALD_GREEN)
    bot_box = slide.shapes.add_textbox(Inches(1.1), Inches(5.55), Inches(11.1), Inches(1.25))
    tf_bot = bot_box.text_frame
    tf_bot.word_wrap = True
    tf_bot.margin_left = tf_bot.margin_right = tf_bot.margin_top = tf_bot.margin_bottom = 0

    p_tot = tf_bot.paragraphs[0]
    p_tot.text = "12-MONTH PROJECTION TOTALS (YEAR 1 TARGET):"
    p_tot.font.name = FONT_MONO
    p_tot.font.size = Pt(9.5)
    p_tot.font.bold = True
    p_tot.font.color.rgb = COLOR_EMERALD_GREEN
    p_tot.space_after = Pt(4)

    p_tot2 = tf_bot.add_paragraph()
    p_tot2.text = "• Projected Monthly Platform Net Revenue: ₹3,69,890 / month  →  ~₹44.4 Lakhs Annual Run Rate (ARR)."
    p_tot2.font.name = FONT_HEADING
    p_tot2.font.size = Pt(11)
    p_tot2.font.bold = True
    p_tot2.font.color.rgb = COLOR_TEXT_PRIMARY
    p_tot2.space_after = Pt(3)

    p_tot3 = tf_bot.add_paragraph()
    p_tot3.text = "• Software Gross Margin > 90%: All interactive labs and sandboxes execute entirely client-side in modern browser engines, eliminating expensive cloud VM infrastructure costs."
    p_tot3.font.name = FONT_BODY
    p_tot3.font.size = Pt(9.5)
    p_tot3.font.color.rgb = COLOR_TEXT_MUTED


def build_slide_12(prs):
    """Slide 12: Functional MVP — Core Architecture & Diagnostics (Criterion 6)"""
    slide = create_base_slide(
        prs,
        title="Functional MVP: React 19 Technical Architecture",
        category_badge="CRITERION 6: PROTOTYPE ARCHITECTURE & USER WORKFLOWS",
        slide_num=12
    )

    modules = [
        {
            "tag": "MODULE 01",
            "accent": COLOR_CYAN_ACCENT,
            "title": "Modern Frontend Core",
            "sub": "Vite + React 19 + TypeScript",
            "bullets": [
                ("Vite 8 & React 19:", "Sub-millisecond hot-module replacement and instant bundle delivery with zero backend latency."),
                ("Strict TypeScript Typing:", "100% type safety across expert models, consultation booking states, and interactive telemetry."),
                ("Tailwind CSS v4 & Lucide:", "Crisp, executive off-white layout adhering strictly to academic pitch deck visual guidelines.")
            ]
        },
        {
            "tag": "MODULE 02",
            "accent": COLOR_EMERALD_GREEN,
            "title": "Dynamic Marketplace Engine",
            "sub": "Specialist Filtering & Packages",
            "bullets": [
                ("Specialist Directory:", "Showcases verified Indian practitioners with transparent fixed & hourly rates in INR (₹)."),
                ("Expandable Packages:", "Direct access to bundled solutions (₹2,999 Starter Setup, ₹3,999 Perimeter Lockdown)."),
                ("Instant Modals:", "Clean, multi-step booking workflows calculating escrow splits and session deliverables.")
            ]
        },
        {
            "tag": "MODULE 03",
            "accent": COLOR_INDIGO_ACCENT,
            "title": "Diagnostic Intake Wizard",
            "sub": "Automated Risk & Specialist Match",
            "bullets": [
                ("4-Step Diagnostic:", "Captures business sector, team size, immediate security need, and budget tier in INR."),
                ("DPDP Act Alignment:", "Flagging statutory compliance priorities for healthcare, fintech, and retail MSMEs."),
                ("Automated Recommendation:", "Connects client requirements directly with the highest-rated verified specialist.")
            ]
        }
    ]

    card_w = Inches(3.7)
    card_h = Inches(5.1)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, m in enumerate(modules):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=m["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.3), Inches(1.85), card_w - Inches(0.6), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = m["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(9)
        p0.font.bold = True
        p0.font.color.rgb = m["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = m["title"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(13.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(2)

        p2 = tf.add_paragraph()
        p2.text = m["sub"]
        p2.font.name = FONT_BODY
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_TEXT_SUBTLE
        p2.space_after = Pt(14)

        for b_lbl, b_txt in m["bullets"]:
            add_bullet_point(tf, b_lbl, b_txt, font_size=Pt(9.5), space_after=Pt(8))


def build_slide_13(prs):
    """Slide 13: Functional MVP — In-Browser Cyber Arcade Engine (Criterion 6)"""
    slide = create_base_slide(
        prs,
        title="Functional MVP: Browser-Based Cyber Arcade Engine",
        category_badge="CRITERION 6: INTERACTIVE SIMULATION SANDBOX & CREDENTIALING",
        slide_num=13
    )

    labs = [
        {
            "tag": "LAB SIMULATION 01",
            "accent": COLOR_CYAN_ACCENT,
            "title": "Phish Catcher",
            "type": "Social Engineering Forensics",
            "bullets": [
                ("Raw Header Triage:", "Inspects envelope Sender, Return-Path, and SPF/DKIM verification tags in real-time."),
                ("Typosquat Detection:", "Simulates malicious lookalike domains (paypa1-support.com, invoice-portal.in)."),
                ("Double Extension Defense:", "Flags concealed Windows executable binaries masked as harmless invoice PDFs (.pdf.exe).")
            ]
        },
        {
            "tag": "LAB SIMULATION 02",
            "accent": COLOR_EMERALD_GREEN,
            "title": "SQLi Breach Sandbox",
            "type": "Web Application Security",
            "bullets": [
                ("Runtime Injection Query:", "Executes real authentication bypass payloads (' OR 1=1 --) against simulated database tables."),
                ("Visual Query Reflection:", "Demonstrates query logic collapse and unauthorized administrative record exfiltration."),
                ("Remediation Sandbox:", "Enforces parameterized prepared statements, teaching students how to neutralize injection bugs.")
            ]
        },
        {
            "tag": "LAB SIMULATION 03",
            "accent": COLOR_INDIGO_ACCENT,
            "title": "Firewall Defender",
            "type": "Network Perimeter Hardening",
            "bullets": [
                ("Real-Time Packet Filter:", "Simulates incoming TCP/UDP packets across high-risk enterprise ports."),
                ("Perimeter Rules:", "Blocks hazardous exposed ports (RDP 3389, FTP 21) while permitting valid HTTPS 443 web traffic."),
                ("Threat Mitigation:", "Prevents automated brute-force port scanning and unauthorized remote desktop intrusions.")
            ]
        }
    ]

    card_w = Inches(3.7)
    card_h = Inches(4.3)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, l in enumerate(labs):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=l["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.3), Inches(1.85), card_w - Inches(0.6), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = l["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(9)
        p0.font.bold = True
        p0.font.color.rgb = l["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = l["title"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(13.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(2)

        p2 = tf.add_paragraph()
        p2.text = l["type"]
        p2.font.name = FONT_BODY
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_TEXT_SUBTLE
        p2.space_after = Pt(10)

        for b_lbl, b_txt in l["bullets"]:
            add_bullet_point(tf, b_lbl, b_txt, font_size=Pt(9.2), space_after=Pt(6))

    # Bottom Certificate Verification Callout
    add_card(slide, Inches(0.8), Inches(6.05), Inches(11.733), Inches(0.85), bg_color=COLOR_CARD_SUBTLE, top_accent=COLOR_EMERALD_GREEN)
    bot_box = slide.shapes.add_textbox(Inches(1.1), Inches(6.15), Inches(11.1), Inches(0.65))
    tf_bot = bot_box.text_frame
    tf_bot.word_wrap = True
    tf_bot.margin_left = tf_bot.margin_right = tf_bot.margin_top = tf_bot.margin_bottom = 0

    p_call = tf_bot.paragraphs[0]
    p_call.text = "CRYPTOGRAPHIC SKILL CREDENTIALING & CERTIFICATE MODAL:"
    p_call.font.name = FONT_MONO
    p_call.font.size = Pt(9.5)
    p_call.font.bold = True
    p_call.font.color.rgb = COLOR_EMERALD_GREEN
    p_call.space_after = Pt(2)

    p_call2 = tf_bot.add_paragraph()
    p_call2.text = "Completing the three defense simulations triggers the dynamic CertificateModal, generating an executive Cyber Defense Apprentice credential with a unique SHA-256 validation identifier, verified XP tracking, and direct 1-on-1 specialist mentorship booking."
    p_call2.font.name = FONT_BODY
    p_call2.font.size = Pt(9.5)
    p_call2.font.color.rgb = COLOR_TEXT_PRIMARY


def build_slide_14(prs):
    """Slide 14: Execution Strategy — 4-Phase Operational Roadmap (Criterion 7)"""
    slide = create_base_slide(
        prs,
        title="Execution Strategy: Milestone & Growth Roadmap",
        category_badge="CRITERION 7: OPERATIONAL ROADMAP & COMMERCIAL MILESTONES",
        slide_num=14
    )

    phases = [
        {
            "tag": "PHASE 01: COMPLETED",
            "accent": COLOR_EMERALD_GREEN,
            "period": "Q1 2026",
            "title": "MVP & Field Validation",
            "milestones": [
                "Production React 19 single-page platform deployed.",
                "3 client-side arcade labs (Phish, SQLi, Firewall).",
                "Diagnostic intake diagnostic wizard fully wired.",
                "Empirical survey (N=131) completed and analyzed."
            ]
        },
        {
            "tag": "PHASE 02: IN PROGRESS",
            "accent": COLOR_CYAN_ACCENT,
            "period": "Q2 2026",
            "title": "Escrow & API Trust",
            "milestones": [
                "Razorpay / Cashfree Smart Escrow API integration.",
                "Automated Click-Wrap RoE legal signing flow.",
                "Credly & LinkedIn verified digital credential badges.",
                "Onboarding 20 verified CISSP / CEH specialists."
            ]
        },
        {
            "tag": "PHASE 03: UPCOMING",
            "accent": COLOR_INDIGO_ACCENT,
            "period": "Q3 2026",
            "title": "Regional Industrial Pilot",
            "milestones": [
                "Pilot launch in Tamil Nadu MSME industrial hubs.",
                "40 subsidized MSME security audits delivered.",
                "Partnerships with 5 technical universities.",
                "Calibrating dispute mediation & review algorithms."
            ]
        },
        {
            "tag": "PHASE 04: SCALE",
            "accent": COLOR_AMBER_ACCENT,
            "period": "Q4 2026",
            "title": "Commercial Scaling",
            "milestones": [
                "Automated DPDP Act compliance kit generator.",
                "Scaling Business Secure SaaS to 150+ subscribers.",
                "Expanding pan-India across 10 industrial belts.",
                "Reaching ₹44.4 Lakhs Annual Run Rate target."
            ]
        }
    ]

    card_w = Inches(2.7)
    card_h = Inches(5.1)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, p in enumerate(phases):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=p["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.25), Inches(1.85), card_w - Inches(0.5), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = p["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(8.5)
        p0.font.bold = True
        p0.font.color.rgb = p["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = p["period"]
        p1.font.name = FONT_MONO
        p1.font.size = Pt(11)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_MUTED
        p1.space_after = Pt(4)

        p2 = tf.add_paragraph()
        p2.text = p["title"]
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(13)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_TEXT_PRIMARY
        p2.space_after = Pt(12)

        for m_item in p["milestones"]:
            add_bullet_point(tf, "•", m_item, font_size=Pt(9.2), label_color=p["accent"], space_after=Pt(8))


def build_slide_15(prs):
    """Slide 15: Execution Strategy — Low-CAC Acquisition Flywheel (Criterion 7)"""
    slide = create_base_slide(
        prs,
        title="Execution Strategy: User Acquisition Flywheel",
        category_badge="CRITERION 7: GO-TO-MARKET FLYWHEEL & ZERO-CAC ACQUISITION",
        slide_num=15
    )

    flywheels = [
        {
            "tag": "FLYWHEEL HOOK 01",
            "accent": COLOR_EMERALD_GREEN,
            "title": "Zero-CAC Learner Inbound",
            "sub": "Organic Student Engagement",
            "desc": "Free interactive browser labs distributed across university engineering departments generate high-intent inbound learner traffic without expensive paid digital ads.",
            "impact": "Students compete for XP, earn shareable credentials, and invite peers across engineering networks, establishing a viral self-funding acquisition loop."
        },
        {
            "tag": "FLYWHEEL ENGINE 02",
            "accent": COLOR_CYAN_ACCENT,
            "title": "The Student-to-Specialist Pipeline",
            "sub": "Talent Monetization Flywheel",
            "desc": "Top students engage in 1-on-1 mentorship with verified specialists (generating 15% platform take), while developing practical skills to conduct entry-level audits.",
            "impact": "Supplies CyHub with an army of vetted, cost-effective junior security analysts capable of executing affordable ₹2,999 MSME starter bundles."
        },
        {
            "tag": "FLYWHEEL B2B 03",
            "accent": COLOR_INDIGO_ACCENT,
            "title": "Institutional B2B Partnerships",
            "sub": "Trusted Channel Synergies",
            "desc": "Partnering with regional MSME industrial trade associations, District Industries Centres (DICs), and Chartered Accountant (CA) networks managing GST and IT audits.",
            "impact": "Positions CyHub as the default cybersecurity compliance partner at the point of accounting, achieving instant trust and minimal sales friction."
        }
    ]

    card_w = Inches(3.7)
    card_h = Inches(5.1)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, f in enumerate(flywheels):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=f["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.3), Inches(1.85), card_w - Inches(0.6), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = f["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(9)
        p0.font.bold = True
        p0.font.color.rgb = f["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = f["title"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(13.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(2)

        p2 = tf.add_paragraph()
        p2.text = f["sub"]
        p2.font.name = FONT_BODY
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_TEXT_SUBTLE
        p2.space_after = Pt(14)

        add_bullet_point(tf, "Mechanic:", f["desc"], font_size=Pt(9.5), space_after=Pt(10))
        add_bullet_point(tf, "Commercial Impact:", f["impact"], font_size=Pt(9.5), space_after=Pt(6))


def build_slide_16(prs):
    """Slide 16: Teamwork, Roles & Leadership Distribution (Criterion 8)"""
    slide = create_base_slide(
        prs,
        title="Team Leadership & Operational Ownership",
        category_badge="CRITERION 8: TEAM COLLABORATION & DIVISION OF RESPONSIBILITIES",
        slide_num=16
    )

    team = [
        {
            "name": "Joshua S.",
            "role": "Project Lead & Full-Stack Architect",
            "accent": COLOR_CYAN_ACCENT,
            "domain": "Architecture & Engineering",
            "contributions": [
                "Spearheaded overall system design, Vite/React 19 single-page architecture, and state machines.",
                "Engineered responsive high-contrast minimalist UI components matching pitch deck standards.",
                "Modeled unit economics, 85/15 take-rate formulas, and dynamic financial projection calculators."
            ]
        },
        {
            "name": "Ebenezer Paul",
            "role": "Security Systems & Lab Engineer",
            "accent": COLOR_EMERALD_GREEN,
            "domain": "Offensive & Defensive Security Labs",
            "contributions": [
                "Engineered client-side Cyber Arcade interactive simulations (Phish Catcher, SQLi Sandbox, Firewall).",
                "Formulated RFC 822 email forensic inspection rules, SPF/DKIM tags, and typosquatting detection logic.",
                "Structured query parameterization models demonstrating SQL injection remediation."
            ]
        },
        {
            "name": "Moses Daniel Timothy",
            "role": "Market Strategy & Analytics Lead",
            "accent": COLOR_INDIGO_ACCENT,
            "domain": "Empirical Research & Discovery",
            "contributions": [
                "Designed and executed the primary empirical survey across N=131 MSME stakeholders and students.",
                "Identified the 65.5% 'False Security Paradox' and verified 69.5% tutoring booking readiness.",
                "Calibrated pricing willingness to pay across micro-consulting (₹499) and starter bundles (₹2,999)."
            ]
        },
        {
            "name": "Kevin",
            "role": "Product Operations & Compliance",
            "accent": COLOR_AMBER_ACCENT,
            "domain": "Governance & Regulatory Compliance",
            "contributions": [
                "Drafted standardized Rules of Engagement (RoE) protocols ensuring strictly non-destructive testing.",
                "Aligned intake workflows with DPDP Act 2023 obligations and CERT-In 6-hour incident reporting rules.",
                "Structured specialist credential verification gates and quality assurance mediation rubrics."
            ]
        }
    ]

    card_w = Inches(2.7)
    card_h = Inches(5.1)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, t in enumerate(team):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=t["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.25), Inches(1.85), card_w - Inches(0.5), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = t["name"]
        p0.font.name = FONT_HEADING
        p0.font.size = Pt(14)
        p0.font.bold = True
        p0.font.color.rgb = COLOR_TEXT_PRIMARY
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = t["role"]
        p1.font.name = FONT_BODY
        p1.font.size = Pt(9.5)
        p1.font.bold = True
        p1.font.color.rgb = t["accent"]
        p1.space_after = Pt(2)

        p2 = tf.add_paragraph()
        p2.text = t["domain"]
        p2.font.name = FONT_MONO
        p2.font.size = Pt(8.5)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_TEXT_SUBTLE
        p2.space_after = Pt(12)

        for c_item in t["contributions"]:
            add_bullet_point(tf, "•", c_item, font_size=Pt(9), label_color=t["accent"], space_after=Pt(8))


def build_slide_17(prs):
    """Slide 17: Ethical Governance & Legal Framework (Criterion 8)"""
    slide = create_base_slide(
        prs,
        title="Ethical Governance, Compliance & Risk Management",
        category_badge="CRITERION 8: ETHICS, COMPLIANCE & LEGAL SAFEGUARDS",
        slide_num=17
    )

    safeguards = [
        {
            "tag": "SAFEGUARD 01",
            "accent": COLOR_CYAN_ACCENT,
            "title": "Strictly Non-Destructive Scans",
            "sub": "Operational Protection",
            "bullets": [
                ("Pre-Approved Scope:", "All diagnostic audits are restricted to non-destructive configuration reviews and passive vulnerability scanning."),
                ("Zero Production Downtime:", "Strict RoE clauses forbid payload deployment, automated brute-force attacks, or service disruption."),
                ("Liability Boundaries:", "Clear demarcation protecting client infrastructure while shielding security researchers under legal contract.")
            ]
        },
        {
            "tag": "SAFEGUARD 02",
            "accent": COLOR_EMERALD_GREEN,
            "title": "Zero-Data-Training Privacy Pledge",
            "sub": "Fiduciary Data Integrity",
            "bullets": [
                ("Air-Gapped Telemetry:", "Client logs, network topologies, and proprietary source code are never utilized to train AI models."),
                ("Data Minimization:", "Strict adherence to DPDP Act 2023 principles — client information is retained solely for report delivery."),
                ("Automated Shredding:", "Diagnostic records and configuration uploads are purged automatically following escrow sign-off.")
            ]
        },
        {
            "tag": "SAFEGUARD 03",
            "accent": COLOR_INDIGO_ACCENT,
            "title": "Anti-Disintermediation Mechanics",
            "sub": "Platform Value Retention",
            "bullets": [
                ("Escrow Protection:", "Both clients and freelancers retain high incentives to transact on-platform due to dispute arbitration."),
                ("Automated Reporting:", "Standardized compliance audit generation saves consultants 4+ hours per engagement."),
                ("Reputation Capital:", "Verified reviews and Credly-backed credential points permanently accrue to on-platform freelancer profiles.")
            ]
        }
    ]

    card_w = Inches(3.7)
    card_h = Inches(5.1)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, s in enumerate(safeguards):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=s["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.3), Inches(1.85), card_w - Inches(0.6), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = s["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(9)
        p0.font.bold = True
        p0.font.color.rgb = s["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = s["title"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(13.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(2)

        p2 = tf.add_paragraph()
        p2.text = s["sub"]
        p2.font.name = FONT_BODY
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_TEXT_SUBTLE
        p2.space_after = Pt(14)

        for b_lbl, b_txt in s["bullets"]:
            add_bullet_point(tf, b_lbl, b_txt, font_size=Pt(9.5), space_after=Pt(8))


def build_slide_18(prs):
    """Slide 18: Pitch Conclusion & Live Demonstration (Criteria 9 & 10)"""
    slide = create_base_slide(
        prs,
        title="Live Demo & Q&A: Securing India's Digital Future",
        category_badge="CRITERIA 9 & 10: SYNTHESIS, WORKING DEMONSTRATION & Q&A",
        slide_num=18
    )

    reasons = [
        {
            "tag": "SUMMARY 01",
            "accent": COLOR_EMERALD_GREEN,
            "title": "Proven Market Demand",
            "stat": "69.5%",
            "stat_lbl": "Ready for Verified Support",
            "desc": "Primary discovery (N=131) empirically confirms widespread demand for affordable, plain-language cybersecurity defense across Indian MSMEs."
        },
        {
            "tag": "SUMMARY 02",
            "accent": COLOR_CYAN_ACCENT,
            "title": "Scalable Unit Economics",
            "stat": "₹44.4L",
            "stat_lbl": "Target Year 1 ARR",
            "desc": "15% marketplace take-rate paired with high-retention SaaS tiers achieves strong unit economics with >90% software gross margins."
        },
        {
            "tag": "SUMMARY 03",
            "accent": COLOR_INDIGO_ACCENT,
            "title": "Functional MVP Delivered",
            "stat": "100%",
            "stat_lbl": "Live Production Prototype",
            "desc": "Fully functional React 19 web application complete with 3 interactive labs, directory, intake wizard, and Indian Rupee pricing."
        },
        {
            "tag": "SUMMARY 04",
            "accent": COLOR_AMBER_ACCENT,
            "title": "Academic Rigor",
            "stat": "CO1 – CO4",
            "stat_lbl": "Course Outcome Alignment",
            "desc": "Comprehensive coverage of all evaluated entrepreneurship criteria: Opportunity, Validation, Startup Planning, and Financial Modeling."
        }
    ]

    card_w = Inches(2.7)
    card_h = Inches(3.7)
    start_left = Inches(0.8)
    gap = Inches(0.3)

    for i, r in enumerate(reasons):
        c_left = start_left + i * (card_w + gap)
        add_card(slide, c_left, Inches(1.6), card_w, card_h, top_accent=r["accent"])

        tb = slide.shapes.add_textbox(c_left + Inches(0.25), Inches(1.8), card_w - Inches(0.5), card_h - Inches(0.4))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = r["tag"]
        p0.font.name = FONT_MONO
        p0.font.size = Pt(8.5)
        p0.font.bold = True
        p0.font.color.rgb = r["accent"]
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = r["title"]
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(12.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(6)

        p2 = tf.add_paragraph()
        p2.text = r["stat"]
        p2.font.name = FONT_HEADING
        p2.font.size = Pt(24)
        p2.font.bold = True
        p2.font.color.rgb = r["accent"]

        p3 = tf.add_paragraph()
        p3.text = r["stat_lbl"]
        p3.font.name = FONT_MONO
        p3.font.size = Pt(8.5)
        p3.font.bold = True
        p3.font.color.rgb = COLOR_TEXT_SUBTLE
        p3.space_after = Pt(10)

        p4 = tf.add_paragraph()
        p4.text = r["desc"]
        p4.font.name = FONT_BODY
        p4.font.size = Pt(9.2)
        p4.font.color.rgb = COLOR_TEXT_MUTED

    # Bottom Call to Action Card
    add_card(slide, Inches(0.8), Inches(5.45), Inches(11.733), Inches(1.45), bg_color=COLOR_CARD_SUBTLE, top_accent=COLOR_CYAN_ACCENT)
    bot_box = slide.shapes.add_textbox(Inches(1.1), Inches(5.55), Inches(11.1), Inches(1.25))
    tf_bot = bot_box.text_frame
    tf_bot.word_wrap = True
    tf_bot.margin_left = tf_bot.margin_right = tf_bot.margin_top = tf_bot.margin_bottom = 0

    p_cta = tf_bot.paragraphs[0]
    p_cta.text = "LIVE SYSTEM DEMONSTRATION & COMMITTEE EVALUATION:"
    p_cta.font.name = FONT_MONO
    p_cta.font.size = Pt(10)
    p_cta.font.bold = True
    p_cta.font.color.rgb = COLOR_CYAN_ACCENT
    p_cta.space_after = Pt(4)

    p_cta2 = tf_bot.add_paragraph()
    p_cta2.text = "We invite the evaluation committee to experience CyHub live on localhost:5173 — test the Phish Catcher triage engine, trigger the SQLi authentication bypass sandbox, and book an intake diagnostic consultation."
    p_cta2.font.name = FONT_BODY
    p_cta2.font.size = Pt(10)
    p_cta2.font.bold = True
    p_cta2.font.color.rgb = COLOR_TEXT_PRIMARY
    p_cta2.space_after = Pt(4)

    p_cta3 = tf_bot.add_paragraph()
    p_cta3.text = "Team Presenters: Joshua S. | Ebenezer Paul | Moses Daniel Timothy | Kevin  — Department of CSE (Cyber Security)"
    p_cta3.font.name = FONT_MONO
    p_cta3.font.size = Pt(9.5)
    p_cta3.font.color.rgb = COLOR_TEXT_MUTED


# ==============================================================================
# MAIN DECK GENERATION ENTRYPOINT
# ==============================================================================

def main():
    print("[CyHub Deck] Initializing python-pptx presentation...")
    prs = Presentation()
    prs.slide_width = SLIDE_WIDTH
    prs.slide_height = SLIDE_HEIGHT

    print("[CyHub Deck] Building 18 executive slides...")
    build_slide_1(prs)
    build_slide_2(prs)
    build_slide_3(prs)
    build_slide_4(prs)
    build_slide_5(prs)
    build_slide_6(prs)
    build_slide_7(prs)
    build_slide_8(prs)
    build_slide_9(prs)
    build_slide_10(prs)
    build_slide_11(prs)
    build_slide_12(prs)
    build_slide_13(prs)
    build_slide_14(prs)
    build_slide_15(prs)
    build_slide_16(prs)
    build_slide_17(prs)
    build_slide_18(prs)

    output_filename = "CyHub_Pitch_Deck.pptx"
    prs.save(output_filename)
    print(f"[CyHub Deck] SUCCESS! Executive presentation saved to: {os.path.abspath(output_filename)}")


if __name__ == "__main__":
    main()
