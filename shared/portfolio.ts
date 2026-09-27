export const portfolio = {
  profile: {
    name: "Ikram Ullah Afridi",
    title:
      "Computer Systems Engineering Graduate | AI & Machine Learning | Python Development",
    shortTitle: "AI / ML & Python Developer",
    tagline:
      "Building practical AI applications across machine learning, computer vision, speech, and mobile development.",
    summary:
      "Computer Systems Engineering graduate with practical experience in Python, machine learning, API integration, and AI application development. Completed an AI internship covering classification, recommendation systems, and OCR, and co-developed a Flutter-based glucose management application. Seeking a graduate trainee position or entry-level role in AI/ML or software engineering.",
    location: "Peshawar, Pakistan",
    email: "ikramullahafridi945@gmail.com",
    phone: "+92 333 5003110",
    languages: ["English", "Urdu", "Pashto"],
  },
  cvUrl: "/manus-storage/Ikram_Ullah_Afridi_CV_Corrected_3e122480.pdf",
  skillGroups: [
    {
      title: "Programming",
      detail:
        "Languages used across application development and engineering coursework.",
      skills: ["Python", "C++", "Dart", "JavaScript", "HTML", "CSS"],
    },
    {
      title: "Machine Learning & Data",
      detail:
        "Practical modeling, feature engineering, and evaluation techniques recorded in the CV.",
      skills: [
        "scikit-learn",
        "XGBoost",
        "pandas",
        "NumPy",
        "Classification",
        "Feature Scaling",
        "Cross-validation",
        "TF-IDF",
        "Cosine Similarity",
      ],
    },
    {
      title: "AI & Computer Vision",
      detail:
        "Multimodal, OCR, and speech-related integrations used in documented projects.",
      skills: [
        "OpenCV",
        "Tesseract OCR",
        "Gemini API",
        "Groq API",
        "Whisper Speech Recognition",
        "Deepgram Text-to-Speech",
      ],
    },
    {
      title: "Application Development",
      detail:
        "Frameworks and APIs used to turn models and AI services into working applications.",
      skills: ["Flutter", "BLoC/Cubit", "Flask", "Gradio", "REST APIs"],
    },
    {
      title: "Databases & Tools",
      detail:
        "Development platforms, authentication, storage, and analysis tools listed in the CV.",
      skills: [
        "Firebase Authentication",
        "Cloud Firestore",
        "Git",
        "GitHub",
        "Jupyter Notebook",
        "Matplotlib",
      ],
    },
  ],
  experience: [
    {
      organization: "DecodeLabs",
      role: "AI Intern (Virtual)",
      dates: "June — July 2026",
      type: "Applied AI",
      highlights: [
        "Completed four Python projects covering rule-based conversation, classification, recommendations, and OCR, with data preparation, input handling, and evaluation outputs.",
      ],
    },
    {
      organization: "Special Communications Organization, Mirpur",
      role: "Telecom & Network Infrastructure Intern",
      dates: "July — September 2025",
      type: "Network infrastructure",
      highlights: [
        "Gained practical exposure to GSM/NGMS, microwave transmission, GPON, broadband provisioning, PSTN operations, and optical fibre systems.",
        "Supported telecom power-system operations and call-centre processes, building an understanding of network reliability and service continuity.",
      ],
    },
    {
      organization: "AWS Cloud Club, MUST",
      role: "Event Management Lead",
      dates: "February 2025 — 2026",
      type: "Leadership & activities",
      highlights: [
        "Led AWS Student Community Day Mirpur 2025 planning and delivery, coordinating speakers, logistics, scheduling, and volunteers; received recognition from AWS Cloud Clubs.",
        "Served as a Content Writing Team Member for the Society of Computer Systems Engineering, MUST.",
      ],
    },
  ],
  featuredWork: [
    {
      index: "01",
      name: "GlucoSense AI",
      organization: "Final-Year Team Project",
      description:
        "Co-developed a Flutter and Firebase mobile application for glucose logging, medical profiles, meal-image analysis, and historical glucose trends.",
      tags: [
        "Flutter",
        "Dart",
        "Firebase",
        "Python",
        "Flask",
        "XGBoost",
        "Gemini API",
      ],
      signal: "Health AI",
    },
    {
      index: "02",
      name: "AI Skin Specialist",
      organization: "Multimodal AI Assistant",
      description:
        "Built a Gradio application combining spoken descriptions and uploaded skin images to generate informational responses in text and audio.",
      tags: ["Python", "Gradio", "Groq", "Whisper", "Deepgram", "Pillow"],
      signal: "Multimodal AI",
    },
    {
      index: "03",
      name: "Document OCR Pipeline",
      organization: "Computer Vision Project",
      description:
        "Developed an image-to-text pipeline with grayscale conversion, Gaussian blur, deskewing, Otsu thresholding, and annotated confidence-based detections.",
      tags: ["Python", "OpenCV", "Tesseract", "NumPy", "80% Threshold"],
      signal: "Computer vision",
    },
    {
      index: "04",
      name: "Tech Stack and Career Recommender",
      organization: "Content-Based Recommendation Project",
      description:
        "Built a recommender that matches user-entered skills to job roles using vocabulary construction, TF-IDF weighting, cosine similarity, and zero-match handling.",
      tags: ["Python", "TF-IDF", "Cosine Similarity", "CSV"],
      signal: "Recommendation",
    },
    {
      index: "05",
      name: "Iris Classification Pipeline",
      organization: "Machine Learning Evaluation Project",
      description:
        "Developed a k-nearest neighbours classifier with a stratified 80/20 split, standardized features, five-fold cross-validation, and classification evaluation outputs.",
      tags: ["Python", "scikit-learn", "pandas", "NumPy", "Matplotlib"],
      signal: "Classification",
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Systems Engineering",
      institution: "Mirpur University of Science and Technology (MUST), AJK",
      dates: "2022 — 2026",
      detail: "CGPA: 3.2/4.0",
    },
  ],
  certifications: [
    "Google AI Essentials Specialization — Coursera",
    "Artificial Intelligence (AI) for Social Impact — Asian Development Bank Institute (ADBI)",
    "Cyber Security — Asian Development Bank Institute (ADBI)",
    "AWS AI Practitioner Challenge Certificate",
  ],
} as const;

export type Portfolio = typeof portfolio;
