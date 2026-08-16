export const projects = [
  {
    slug: 'cmdb-identity-guard-offline',
    eyebrow: 'ServiceNow · Competition project',
    title: 'CMDB Identity Guard Offline Demo',
    description: 'Adapted a hackathon-built ServiceNow UI into a no-credentials offline demo with synthetic CMDB records, explainable duplicate evidence, and simulated steward decisions.',
    technologies: ['ServiceNow', 'Next.js', 'React', 'TypeScript', 'Vinext'],
    links: [{ label: 'View source', href: 'https://github.com/lcris689/cmdb-identity-guard-demo' }],
    image: '/projects/cmdb-identity-guard-offline.webp',
    imageAlt: 'CMDB Identity Guard offline demo overview with identity-health metrics and duplicate review queue'
  },
  {
    slug: 'vast-mc',
    eyebrow: 'Data visualization',
    title: 'VAST MC Challenge 2022',
    description: 'Visualized daily routines using city-scale datasets to uncover patterns through data modeling and interactive visual tools.',
    technologies: ['JavaScript', 'D3.js', 'Spark', 'Python', 'SQL'],
    links: [{ label: 'View project', href: 'https://github.com/lcris689/CSE578-VAST-Project-window-compatable' }],
    visual: 'data-grid'
  },
  {
    slug: 'psyche-ar',
    eyebrow: 'Immersive web',
    title: 'AR NASA Spacecraft Museum Model',
    description: "Developed an interactive AR model of NASA's Psyche spacecraft for educational use in museum web applications.",
    technologies: ['Three.js', 'AR.js', 'Blender', 'ARCore'],
    links: [],
    visual: 'orbit'
  },
  {
    slug: 'sleep-states',
    eyebrow: 'Machine learning',
    title: 'Detecting Pediatric Sleep States',
    description: 'Analyzed pediatric sleep data using models from logistic regression to LSTM networks to identify behavioral patterns.',
    technologies: ['Python', 'Pandas', 'NumPy', 'LSTM'],
    links: [{ label: 'View notebook', href: 'https://www.kaggle.com/code/cristoballizarraga/detect-sleep-states-baseline-solution/edit' }],
    visual: 'sleep-wave'
  }
]

export const experience = [
  {
    role: 'ServiceNow Intern',
    company: 'Keenstack',
    period: 'May 2026 — Present',
    points: [
      'Configure and administer the ServiceNow platform at a consulting firm focused on AI-driven customer service, employee workflows, and IT operations.',
      'Apply ServiceNow AI tools to improve service delivery and streamline enterprise workflows.',
      'Earned the ServiceNow Certified System Administrator (CSA) credential while building practical platform expertise.'
    ]
  },
  {
    role: 'Drafter',
    company: 'Phoenix Modulars',
    period: 'January 2025 — Present',
    points: [
      'Design detailed AutoCAD Architecture blueprints for modular buildings tailored to client and project requirements.',
      'Partner with sales, structural engineering, and production teams to deliver accurate, buildable designs.',
      'Verify drawings against state and local building codes across multiple jurisdictions.',
      'Create AutoLISP automations that reduce repetitive drafting work and improve team workflows.'
    ]
  },
  {
    role: 'Research Assistant · Fellowship',
    company: 'Arizona State University',
    period: 'August 2022 — April 2023',
    points: [
      'Built data pipelines and managed large datasets for SEIR models and COVID-19 research.',
      'Designed visualizations used to compare prevention strategies and support educational material.'
    ]
  }
]

export const education = [
  { degree: 'M.S. Computer Science', school: 'Arizona State University', date: 'May 2024', gpa: '3.89' },
  { degree: 'B.S. Computer Science', school: 'Arizona State University', date: 'May 2023', gpa: '3.96' },
  { degree: 'ServiceNow Certified System Administrator (CSA)', school: 'ServiceNow', date: 'Professional credential', type: 'credential' }
]

export const skillGroups = [
  { title: 'Programming', skills: ['JavaScript', 'Python', 'Java', 'C / C++', 'SQL', 'Bash', 'PowerShell', 'C#', 'HTML / CSS'] },
  { title: 'Data & AI', skills: ['TensorFlow', 'D3.js', 'Pandas', 'NumPy', 'Matplotlib', 'Spark', 'Hadoop', 'Tableau'] },
  { title: 'Web & Immersive', skills: ['React', 'Node.js', 'Three.js', 'AR.js', 'Unity', 'Blender', 'Google ARCore'] },
  { title: 'Cloud & Tools', skills: ['ServiceNow', 'AWS', 'Git / GitHub', 'PostgreSQL', 'MySQL', 'AutoCAD', 'Linux', 'Salesforce'] }
]
