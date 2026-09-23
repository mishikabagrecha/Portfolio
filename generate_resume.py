import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def create_resume(output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    navy = colors.HexColor("#1A2B4C")
    charcoal = colors.HexColor("#222222")
    gray = colors.HexColor("#444444")
    light_line = colors.HexColor("#999999")
    
    title_style = ParagraphStyle(
        'ResumeTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        alignment=1, # Center
        textColor=charcoal
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        alignment=1,
        textColor=colors.HexColor("#1a4d8c")
    )
    
    sec_heading_style = ParagraphStyle(
        'SecHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=navy,
        spaceBefore=7,
        spaceAfter=2
    )
    
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=charcoal
    )
    
    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=charcoal,
        leftIndent=12,
        firstLineIndent=-8
    )
    
    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=charcoal
    )
    
    item_right_style = ParagraphStyle(
        'ItemRight',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        alignment=2,
        textColor=charcoal
    )
    
    item_sub_style = ParagraphStyle(
        'ItemSub',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11.5,
        textColor=gray
    )

    item_sub_right = ParagraphStyle(
        'ItemSubRight',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        alignment=2,
        textColor=gray
    )

    story = []
    
    # Header
    story.append(Paragraph("<b>MISHIKA BAGRECHA</b>", title_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph("bagrechamishika@gmail.com &nbsp;|&nbsp; +91 9329114912 &nbsp;|&nbsp; linkedin.com/in/mishika-bag &nbsp;|&nbsp; github.com/mishikabagrecha", contact_style))
    story.append(Spacer(1, 6))
    
    # Section helper
    def add_section_header(title):
        story.append(Paragraph(f"<b>{title.upper()}</b>", sec_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.75, color=light_line, spaceBefore=1, spaceAfter=4))
        
    # Professional Summary
    add_section_header("PROFESSIONAL SUMMARY")
    summary_text = (
        "Final-year B.Tech CSE student specializing in AI/ML, with hands-on experience developing end-to-end "
        "machine learning pipelines and computer vision architectures. Proficient in Python, PyTorch, and Scikit-Learn, "
        "with a strong background in theoretical computer science and AI strategy. Passionate about building robust, "
        "scalable AI applications to solve complex real-world challenges."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))
    
    # Education
    add_section_header("EDUCATION")
    
    edu_data = [
        [
            Paragraph("<b>Acropolis Institute of Technology and Research</b>", item_title_style),
            Paragraph("<b>2023 – 2027</b>", item_right_style)
        ],
        [
            Paragraph("B.Tech in Computer Science Engineering (RL)", item_sub_style),
            Paragraph("", item_sub_right)
        ],
        [
            Paragraph("<b>The Vedansh International School</b>", item_title_style),
            Paragraph("<b>2022</b>", item_right_style)
        ],
        [
            Paragraph("Higher Secondary (CBSE)", item_sub_style),
            Paragraph("", item_sub_right)
        ],
        [
            Paragraph("<b>The Vedansh International School</b>", item_title_style),
            Paragraph("<b>2021</b>", item_right_style)
        ],
        [
            Paragraph("Secondary School (CBSE)", item_sub_style),
            Paragraph("", item_sub_right)
        ]
    ]
    t_edu = Table(edu_data, colWidths=[410, 130])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_edu)
    story.append(Spacer(1, 4))
    
    # Experience
    add_section_header("EXPERIENCE")
    
    # Exp 1
    exp1_head = Table([
        [
            Paragraph("<b>AI Intern: IBM SkillsBuild</b> (in collaboration with AICTE)", item_title_style),
            Paragraph("<b>6 Weeks</b>", item_right_style)
        ]
    ], colWidths=[430, 110])
    exp1_head.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(exp1_head)
    story.append(Paragraph("• Completed an intensive virtual internship focusing on AI Strategy, Business Intelligence, and data analysis", bullet_style))
    story.append(Paragraph("• Leveraged data insights to drive AI-based decision-making and optimize simulated business workflows", bullet_style))
    story.append(Spacer(1, 3))
    
    # Exp 2
    story.append(Paragraph("<b>Machine Learning Intern: YuvaIntern</b>", item_title_style))
    story.append(Paragraph("• Built and evaluated supervised learning models end-to-end — from data cleaning and feature engineering through training and validation — using Python, Pandas, and Scikit-Learn", bullet_style))
    story.append(Paragraph("• Streamlined preprocessing pipelines and benchmarked multiple algorithms with hyperparameter tuning, improving model accuracy and documenting results for the team", bullet_style))
    story.append(Spacer(1, 4))
    
    # Projects
    add_section_header("PROJECTS")
    
    story.append(Paragraph("<b>Mentara — CDC Mentor-Mentee Management Platform</b>", item_title_style))
    story.append(Paragraph("• Developed a role-based CDC platform with separate portals for Admin, Mentor, and Mentee to manage mentor-mentee activities, tasks, announcements, and placement coordination", bullet_style))
    story.append(Spacer(1, 2))
    
    story.append(Paragraph("<b>ARMMADIO — AI-Powered Virtual Wardrobe</b>", item_title_style))
    story.append(Paragraph("• Built a full-stack AI virtual closet enabling semantic wardrobe search, personalized styling, outfit generation, and packing assistance", bullet_style))
    story.append(Spacer(1, 2))
    
    story.append(Paragraph("<b>Driver Drowsiness Detection System</b>", item_title_style))
    story.append(Paragraph("• Developed a real-time driver safety system using facial landmarks, EAR, and MAR to detect drowsiness and yawning with automated alerts", bullet_style))
    story.append(Spacer(1, 2))
    
    story.append(Paragraph("<b>AI Resume Analyzer</b>", item_title_style))
    story.append(Paragraph("• Engineered an AI-powered resume evaluation and screening system using NLP to parse resumes, extract key skills/experience/qualifications, and score candidates against job descriptions by flagging missing keywords and skill gaps to improve ATS compatibility", bullet_style))
    story.append(Spacer(1, 4))
    
    # Skills
    add_section_header("SKILLS")
    skills_data = [
        [
            Paragraph("• Python", body_style),
            Paragraph("• OpenCV", body_style),
            Paragraph("• Scikit-Learn", body_style),
            Paragraph("• Deep Learning", body_style),
        ],
        [
            Paragraph("• C/C++", body_style),
            Paragraph("• NumPy", body_style),
            Paragraph("• Computer Vision", body_style),
            Paragraph("• Data Analysis", body_style),
        ],
        [
            Paragraph("• SQL", body_style),
            Paragraph("• Pandas", body_style),
            Paragraph("• Machine Learning", body_style),
            Paragraph("• Git", body_style),
        ],
        [
            Paragraph("• PyTorch", body_style),
            Paragraph("• Matplotlib", body_style),
            Paragraph("• Generative AI", body_style),
            Paragraph("• OOP", body_style),
        ]
    ]
    t_skills = Table(skills_data, colWidths=[135, 135, 135, 135])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 4))
    
    # Certifications
    add_section_header("CERTIFICATIONS")
    certs = [
        "AI Fluency: Framework & Foundations — Anthropic",
        "Applied AI: Build an AI Agent — IBM/CSRBOX",
        "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
        "Google Generative AI Certification",
        "NPTEL DBMS"
    ]
    for c in certs:
        story.append(Paragraph(f"• {c}", bullet_style))
    story.append(Spacer(1, 4))
    
    # Achievements
    add_section_header("ACHIEVEMENTS")
    achievements = [
        "Winner — Innovik 6.0 and Innovik 5.0 Hackathons; secured top-five positions in two additional national/international hackathons, all as an AI/ML Developer and Presenter",
        "Class Topper in Grade 11; 3rd Position in Bal Vigyaan for a chemistry waste management project",
        "Liaison Officer for school Youth Fest; active volunteer with Microsoft, Nirmaan Organization, and Redington Group"
    ]
    for a in achievements:
        story.append(Paragraph(f"• {a}", bullet_style))
        
    doc.build(story)
    print(f"Generated resume PDF at: {output_path}")

if __name__ == "__main__":
    create_resume("/Users/mishikaparshva/work/mishika-portfolio/frontend/public/Mishika_Resume.pdf")
    create_resume("/Users/mishikaparshva/work/mishika-portfolio/public/Mishika_Resume.pdf")
