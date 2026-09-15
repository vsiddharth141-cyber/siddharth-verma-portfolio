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
    githubStatus: "Active",
    githubUrl: "https://github.com/vsiddharth141-cyber",
    youtubeUrl: "https://youtube.com/@cutpixelz"
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
      id: "cert-ai",
      title: "AI for Everyone",
      issuer: "Coursera • DeepLearning.AI",
      category: "Artificial Intelligence",
      description: "Fundamentals of Artificial Intelligence, practical AI applications, machine learning workflows, and real-world impact.",
      image: "./assets/images/certificates/ai-for-everyone.jpg",
      verifyUrl: "https://coursera.org/verify/IT10SYF0O9KN",
      icon: "brain",
      orientation: "landscape"
    },
    {
      id: "cert-computer",
      title: "Completion in Computer",
      issuer: "EduPyramids • SINE, IIT Bombay",
      category: "Computer Systems",
      description: "Fundamentals of computer systems, architecture, operating principles, and computing literacy.",
      image: "./assets/images/certificates/completion-in-computer.jpg",
      verifyUrl: null,
      icon: "monitor",
      orientation: "landscape"
    },
    {
      id: "cert-java",
      title: "Java Programming",
      issuer: "EduPyramids • SINE, IIT Bombay",
      category: "Software Development",
      description: "Core Java concepts, object-oriented design, application logic, and software problem-solving.",
      image: "./assets/images/certificates/java-programming.jpg",
      verifyUrl: null,
      icon: "award",
      orientation: "landscape"
    },
    {
      id: "cert-offer",
      title: "Coursera Offer Letter",
      issuer: "CodeAlpha • Virtual Internship",
      category: "Internship Offer Letter",
      description: "Official selection and internship documentation for Virtual Java Programming Internship.",
      image: "./assets/images/certificates/coursera-offer-letter.jpg",
      verifyUrl: null,
      icon: "briefcase",
      orientation: "portrait"
    }
  ],

  videoEdits: [
    {
      id: "beat-effects",
      aliasId: "edit-1",
      title: "Beat Effects",
      subtitle: "High-Energy Rhythm & Transition Flow",
      category: "Beat Effects / Short Edit",
      featured: true,
      enabled: true,
      description: "Fast-paced short-form edit synchronized precisely with audio beats, featuring dynamic speed ramps, impact transitions, and visual rhythm.",
      tags: ["Beat Sync", "Transitions", "Sound FX", "Rhythm Flow"],
      videoSrc: "./assets/videos/Ghost Rider Is Built Different edit.mp4",
      poster: "./assets/images/video-posters/beat-effects-poster.jpg",
      badge: "Beat Effects",
      duration: "0:52"
    },
    {
      id: "animated-storytelling",
      aliasId: "edit-2",
      title: "Animated Storytelling",
      subtitle: "Character Animation & Dialogue Sync",
      category: "Animated Storytelling",
      featured: false,
      enabled: true,
      description: "Character-driven visual narrative combining 2D avatar animations, kinetic sound design, speech dialogue, and engaging social pacing.",
      tags: ["Character Animation", "Storytelling", "Audio Sync", "Creative Motion"],
      videoSrc: "./assets/videos/lv_0_20260617110234.mp4",
      poster: "./assets/images/video-posters/animated-storytelling-poster.jpg",
      badge: "Animated Storytelling",
      duration: "0:33"
    },
    {
      id: "creative-edit",
      aliasId: "edit-3",
      title: "Creative Edit",
      subtitle: "Visual Storytelling & Commercial Motion",
      category: "Creative Edit",
      featured: false,
      enabled: true,
      description: "Dynamic commercial motion edit featuring 3D product motion graphics, energetic pacing, fluid liquid effects, and sleek visual rhythm.",
      tags: ["Commercial FX", "Visual Storytelling", "3D Motion", "Transitions"],
      videoSrc: "./assets/videos/lv_0_20260621144611.mp4",
      poster: "./assets/images/video-posters/creative-edit-poster.jpg",
      badge: "Creative Edit",
      duration: "0:22"
    },
    {
      id: "motion-graphics",
      aliasId: "edit-4",
      title: "Motion Graphics",
      subtitle: "Creative Motion Graphics & Visual FX",
      category: "Motion Graphics",
      featured: false,
      enabled: true,
      description: "Atmospheric visual storytelling and motion graphics emphasizing moody color grading harmony, scene transitions, and cinematic narrative flow.",
      tags: ["Motion Graphics", "Visual Effects", "Color Grading", "Cinematic"],
      videoSrc: "./assets/videos/lv_0_20260708170940.mp4",
      poster: "./assets/images/video-posters/motion-graphics-poster.jpg",
      badge: "Motion Graphics",
      duration: "0:30"
    }
  ]
};

