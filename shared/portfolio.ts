export const portfolio = {
  profile: {
    name: "Ikram Ullah Afridi",
    title: "AI / ML-focused Computer Systems Engineering Undergraduate",
    shortTitle: "Computer Systems Engineering Undergraduate",
    tagline: "Building practical foundations across artificial intelligence, cloud communities, and networked systems.",
    summary:
      "Computer Systems Engineering undergraduate with hands-on exposure to Python, AI-related work, cloud-community leadership, and telecom/network infrastructure. I am developing a career at the intersection of intelligent systems, reliable infrastructure, and collaborative problem-solving.",
    location: "Peshawar, Pakistan",
    email: "ikramullahafridi945@gmail.com",
    phone: "+92 333 5003110",
    languages: ["English", "Urdu", "Pashto"],
  },
  cvUrl: "/manus-storage/Ikram-Ullah-Afridi-CV_038579c3.pdf",
  skillGroups: [
    {
      title: "Programming",
      detail: "Languages used across coursework and hands-on technical work.",
      skills: ["Python", "C++", "JavaScript", "HTML", "CSS"],
    },
    {
      title: "Artificial Intelligence & Data",
      detail: "AI-related internship work and academic project exposure.",
      skills: ["Machine Learning", "Data Analysis", "Data/ML Libraries", "AI-related Projects"],
    },
    {
      title: "Cloud & Networks",
      detail: "Foundational cloud community work and telecom infrastructure exposure.",
      skills: ["AWS Fundamentals", "GSM/NGMS", "Microwave Transmission", "GPON", "PSTN", "Optical Fiber", "IP Networking"],
    },
    {
      title: "Tools & Practice",
      detail: "Tools and professional practices recorded in the CV.",
      skills: ["Git/GitHub", "Cisco Packet Tracer", "Telecom Power Systems", "Cross-functional Coordination", "Team Leadership"],
    },
  ],
  experience: [
    {
      organization: "DecodeLabs",
      role: "AI Intern (Virtual)",
      dates: "Jun 2026 — Jul 2026",
      type: "Applied AI",
      highlights: [
        "Completed a virtual internship focused on artificial intelligence, including AI-related projects and collaborative tasks.",
        "Applied a structured, analytical approach to AI-related technical problems, translating theoretical concepts into practical working solutions.",
        "Collaborated remotely with cross-functional engineering and design teams throughout the internship.",
      ],
    },
    {
      organization: "AWS Cloud Club, MUST",
      role: "Event Management Lead",
      dates: "Feb 2025 — 2026",
      type: "Cloud community leadership",
      highlights: [
        "Led planning and execution for AWS Student Community Day 2025, a flagship cloud-computing event for the university's AWS Cloud Club.",
        "Directed a cross-functional volunteer team for scheduling, vendor coordination, and attendee experience.",
        "Collaborated with AWS Cloud Clubs community program managers and received official recognition for contribution and leadership.",
      ],
    },
    {
      organization: "SCO, Mirpur",
      role: "Telecom & Network Infrastructure Intern",
      dates: "Jul 2025 — Sep 2025",
      type: "Network infrastructure",
      highlights: [
        "Completed a structured internship across telecom infrastructure domains including GSM/NGMS, microwave transmission, GPON service delivery, and broadband provisioning.",
        "Worked hands-on with PSTN operations, optical-fiber transmission systems, and related operational processes.",
        "Received formal commendation for hard work and punctual performance from supervising leadership.",
      ],
    },
  ],
  featuredWork: [
    {
      index: "01",
      name: "Virtual AI Internship",
      organization: "DecodeLabs · Jun 2026 — Jul 2026",
      description:
        "Applied AI-related concepts in a collaborative virtual environment, moving from structured analysis toward practical technical solutions.",
      tags: ["Python", "AI-related Work", "Data/ML Libraries", "Remote Collaboration"],
      signal: "Applied AI",
    },
    {
      index: "02",
      name: "AWS Student Community Day 2025",
      organization: "AWS Cloud Club, MUST · Event Management Lead",
      description:
        "Led the university cloud community's flagship event through logistics, speaker coordination, volunteer management, and attendee operations.",
      tags: ["AWS Fundamentals", "Cloud Community", "Leadership", "Operations"],
      signal: "Cloud leadership",
    },
    {
      index: "03",
      name: "Telecom & Network Infrastructure Internship",
      organization: "SCO, Mirpur · Jul 2025 — Sep 2025",
      description:
        "Developed practical exposure to network infrastructure and service-delivery systems, from GSM/NGMS to GPON and optical-fiber transmission.",
      tags: ["GPON", "Microwave", "PSTN", "Optical Fiber"],
      signal: "Infrastructure",
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Systems Engineering",
      institution: "MUST, AJK",
      dates: "2022 — 2026",
      detail: "Currently in 8th semester · CGPA 3.15/4.0",
    },
    {
      degree: "Intermediate, Pre-Engineering",
      institution: "Government College Peshawar",
      dates: "2020 — 2022",
      detail: "Marks: 888/1100",
    },
  ],
  certifications: [
    "DecodeLabs — Letter of Recommendation, Artificial Intelligence (AI) Internship",
    "AWS Student Community Day Mirpur 2025 — Recognition Certificate, AWS Cloud Clubs",
    "Artificial Intelligence (AI) for Social Impact — Asian Development Bank Institute (ADBI)",
    "Cyber Security — Asian Development Bank Institute (ADBI)",
    "SCSE Content Writing Team Member — Society of Computer Systems Engineering, MUST",
    "AWS AI Practitioner Challenge Certificate",
    "Google AI Essentials Specialization — Coursera",
  ],
} as const;

export type Portfolio = typeof portfolio;
