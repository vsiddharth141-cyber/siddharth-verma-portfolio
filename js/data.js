/**
 * Centralized Portfolio Data Configuration for Siddharth Verma
 * Edit this file to update your personal details, projects, skills, certificates, and contact links.
 */

export const PORTFOLIO_DATA = {
  personal: {
    name: "Siddharth Verma",
    greetingName: "Siddharth",
    titles: ["Web Developer", "Video Editor", "B.Tech CSE Student"],
    primaryRole: "Web Developer • Video Editor • CSE Student",
    tagline: "Building practical digital experiences through code, creativity and continuous learning.",
    quote: "Code • Create • Edit • Grow",
    location: "Sanganer, Jaipur, Rajasthan, India - 302029",
    locationShort: "Sanganer, Jaipur, Rajasthan - 302029",
    photoUrl: "./assets/images/siddharth-verma.jpg",
    photoAlt: "Siddharth Verma - Web Developer, Video Editor, and B.Tech CSE Student",
    resumePdfUrl: "./assets/docs/Siddharth_Verma_Resume.pdf",
    voiceGreetingText: "Hello, my name is Siddharth. I am a B.Tech CSE student.",
    aboutBio: [
      "I'm Siddharth Verma, a B.Tech Computer Science & Engineering student at Vivekananda Global University. I enjoy building web applications, exploring programming technologies and creating practical projects.",
      "Alongside development, I have more than 3 years of video editing experience, allowing me to combine technical skills with creativity, visual storytelling and attention to detail.",
      "I am continuously learning new technologies and looking for opportunities to improve my skills through real-world projects."
    ],
    highlights: [
      { label: "Degree", value: "B.Tech CSE", sub: "Vivekananda Global University (Pursuing)" },
      { label: "Video Editing", value: "3+ Years", sub: "Storytelling & Post-Production" },
      { label: "Programming", value: "Java, Python, C++", sub: "1+ Year Practical Practice" },
      { label: "Web Tech", value: "HTML, CSS, JS", sub: "Modern UI/UX & Responsive Web" }
    ]
  },

  social: {
    phone: "+91 9571264554",
    phoneDisplay: "+91 9571264554",
    whatsappUrl: "https://wa.me/919571264554",
    email: "vsiddharth141@gmail.com",
    emailMailto: "mailto:vsiddharth141@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/siddharth-verma-488a3340a",
    githubStatus: "Coming Soon",
    githubUrl: null // Awaiting public GitHub profile URL
  },

  skills: [
    {
      category: "Programming",
      description: "Core computer science and software development foundations",
      items: [
        { name: "Java", experience: "1+ Year Experience", icon: "code-2" },
        { name: "Python", experience: "1+ Year Experience", icon: "terminal" },
        { name: "C++", experience: "1+ Year Experience", icon: "cpu" }
      ]
    },
    {
      category: "Web Development",
      description: "Building responsive, modern, and accessible user interfaces",
      items: [
        { name: "HTML5", experience: "Semantic Web Structure", icon: "layout" },
        { name: "CSS3", experience: "Glassmorphism & Flex/Grid", icon: "palette" },
        { name: "JavaScript", experience: "ES6+ & DOM Logic", icon: "braces" },
        { name: "Frontend Development", experience: "Modern UI Workflows", icon: "monitor" },
        { name: "UI/UX Fundamentals", experience: "Visual Hierarchy & Usability", icon: "sparkles" }
      ]
    },
    {
      category: "Tools & Platforms",
      description: "Version control, IDEs, and developer workflows",
      items: [
        { name: "Git", experience: "Version Control Workflows", icon: "git-branch" },
        { name: "GitHub", experience: "Repository Collaboration", icon: "git-commit" },
        { name: "VS Code", experience: "Primary Development IDE", icon: "file-code" }
      ]
    },
    {
      category: "Creative & Media",
      description: "Visual storytelling, video pacing, and engaging post-production",
      items: [
        { name: "Video Editing", experience: "3+ Years Experience", icon: "video" },
        { name: "CapCut", experience: "Pacing & Viral Dynamics", icon: "film" },
        { name: "Alight Motion", experience: "Keyframe Motion & FX", icon: "play-circle" },
        { name: "Post-Production", experience: "Color, Audio & Assembly", icon: "sliders" },
        { name: "Visual Storytelling", experience: "Audience Engagement", icon: "clapperboard" }
      ]
    }
  ],

  projects: [
    {
      id: "home-remedies",
      title: "Home Remedies App",
      category: "Health & Wellness Application",
      badge: "Featured Application",
      shortDescription: "A user-friendly application that organizes home remedies for common health concerns into accessible categories.",
      longDescription: "Developed a user-friendly health and wellness application that organizes traditional home remedies for common health concerns into intuitive, accessible categories. Built with a focus on intuitive navigation, clean UI/UX, and structured categorization to help users discover relevant remedies effortlessly.",
      technologies: ["Java", "Python", "Frontend Development", "UI/UX Design"],
      features: [
        "Login interface and personalized user profiles",
        "Remedies categorized by concern (Cold & Cough, Digestion, Immunity, Skin Care)",
        "Multiple remedy types with preparation times and dosage guidelines",
        "Easy, intuitive navigation and responsive card layouts",
        "Scroll through remedies with instant search discovery",
        "Clean, aesthetic user-friendly interface with health disclaimer"
      ],
      disclaimer: "Information provided by the application is for general informational purposes and should not replace professional medical advice.",
      image: "./assets/images/home-remedies-mockup.svg",
      liveDemo: {
        available: false,
        label: "Live Demo — Coming Soon",
        url: null
      }
    }
  ],

  experience: [
    {
      id: "exp-1",
      role: "Freelance Video Editor",
      organization: "Independent",
      duration: "3+ Years",
      highlight: "Creative Post-Production",
      description: "Produced and edited digital video content from raw footage through final post-production. Applied pacing, visual composition, transitions and storytelling techniques to improve audience engagement."
    },
    {
      id: "exp-2",
      role: "Java Programming",
      organization: "Project & Skill Development",
      duration: "1+ Year",
      highlight: "Core Application Logic",
      description: "Hands-on experience through structured learning, practice and project development. Built logic-driven applications, core object-oriented models, and algorithm solutions."
    },
    {
      id: "exp-3",
      role: "Python Programming",
      organization: "Project & Skill Development",
      duration: "1+ Year",
      highlight: "Scripts & Data Handling",
      description: "Experience through learning, practice and project development. Implemented scripting routines, automation, and backend logic structures."
    },
    {
      id: "exp-4",
      role: "C++ Programming",
      organization: "Project & Skill Development",
      duration: "1+ Year",
      highlight: "DSA & System Fundamentals",
      description: "Experience through coursework and dedicated practice in foundational computer science, object-oriented concepts, and algorithmic problem solving."
    },
    {
      id: "exp-5",
      role: "Intern / Trainee",
      organization: "Code Alpha",
      duration: "Internship / Training",
      highlight: "Workflow Execution",
      description: "Gained practical exposure to professional development workflows, assigned technical tasks, and project execution. Strengthened problem-solving, learning agility, and ability to work toward defined project requirements."
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science & Engineering",
      institution: "Vivekananda Global University (VGU), Jaipur",
      status: "Currently Pursuing",
      description: "Focused on core computer science fundamentals, programming methodologies, web development, algorithms, and software engineering principles."
    },
    {
      degree: "Higher Secondary (School)",
      field: "Science Stream",
      institution: "Senior Secondary School Education",
      status: "Completed (76%)",
      description: "Completed comprehensive high school curriculum in Physics, Chemistry, and Mathematics, securing 76% in final examinations."
    }
  ],

  certificates: [
    {
      id: "cert-1",
      title: "Java Programming Completion Certificate",
      issuer: "Technical Training Program",
      description: "Core Java concepts, object-oriented design, application logic, and software problem-solving.",
      previewStatus: "Certificate Preview Coming Soon",
      icon: "award"
    },
    {
      id: "cert-2",
      title: "Introduction to Computer",
      issuer: "Foundational IT Certification",
      description: "Fundamentals of computer systems, architecture, operating principles, and computing literacy.",
      previewStatus: "Certificate Preview Coming Soon",
      icon: "monitor"
    },
    {
      id: "cert-3",
      title: "AI for Everyone",
      issuer: "Coursera",
      description: "Fundamentals of Artificial Intelligence, practical AI applications, machine learning workflows, and real-world impact.",
      previewStatus: "Certificate Preview Coming Soon",
      icon: "brain"
    },
    {
      id: "cert-4",
      title: "Code Alpha Internship",
      issuer: "Code Alpha",
      description: "Offer Letter and technical internship-related documentation. Verification document available.",
      previewStatus: "Certificate Preview Coming Soon",
      icon: "briefcase"
    }
  ]
};
