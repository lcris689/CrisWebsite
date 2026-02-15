import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ProjectCard from './components/ProjectCard'
import useScrollAnimation from './hooks/useScrollAnimation'

const projects = [
  {
    id: 1,
    title: 'Vast MC Challenge 2022',
    description: 'Visualized daily routines using city-scale datasets to uncover patterns via data modeling and visual tools. Built with JavaScript, D3.js, Apache Spark, Python, and SQL.',
    url: 'https://github.com/lcris689/CSE578-VAST-Project-window-compatable',
    repo: '',
    image: '/assets/project1.jpg'
  },
  {
    id: 2,
    title: 'AR NASA Spacecraft Museum Model',
    description: 'CS Capstone Project: Developed an interactive AR model of NASA\'s Psyche spacecraft for educational use in museum web apps. Built with JavaScript, Blender, Google ARCore, AR.js, Three.js, and HTML/CSS.',
    url: '',
    repo: '',
    image: '/assets/project2.jpg'
  },
  {
    id: 3,
    title: 'Child Mind Institute - Detecting Sleep States',
    description: 'Analyzed pediatric sleep data using models from logistic regression to LSTM networks to identify behavior patterns. Built with Python, Matplotlib, Pandas, and NumPy.',
    url: 'https://www.kaggle.com/code/cristoballizarraga/detect-sleep-states-baseline-solution/edit',
    repo: '',
    image: '/assets/project3.jpg'
  }
]

export default function App() {
  const summaryRef = useScrollAnimation({ threshold: 0.2 })
  const projectsRef = useScrollAnimation({ threshold: 0.1 })
  const experienceRef = useScrollAnimation({ threshold: 0.1 })
  const educationRef = useScrollAnimation({ threshold: 0.2 })
  const skillsRef = useScrollAnimation({ threshold: 0.2 })
  
  return (
    <div className="app">
      <Header />

      <main className="container">
        <section id="summary" ref={summaryRef} className="scroll-animate">
          <h2>Summary</h2>
          <p>Software Engineer with a Master's degree in Computer Science and experience in full-stack development, data engineering, and AR/VR applications. Proficient in JavaScript, Python, Java, C/C++, and cloud technologies including AWS. Bilingual in English and Spanish with a strong foundation in data visualization, machine learning, and automated workflow solutions.</p>
        </section>

        <section id="projects" ref={projectsRef} className="scroll-animate">
          <h2>Projects</h2>
          <div className="grid">
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        <section id="experience" ref={experienceRef} className="scroll-animate">
          <h2>Experience</h2>
          <article className="job">
            <h3>Drafter — Phoenix Modulars</h3>
            <p className="meta">January 2025 - Present</p>
            <ul>
              <li>Design and develop detailed blueprints for modular buildings using AutoCAD Architecture, customized to meet client specifications and project goals.</li>
              <li>Collaborate with cross-functional teams—including sales, structural engineers, and production staff—to ensure accurate, buildable designs.</li>
              <li>Verify all drawings comply with state and local building codes across multiple jurisdictions, revising plans as needed to meet regulatory standards.</li>
              <li>Created custom AutoLISP scripts to automate repetitive drafting tasks and improve workflow efficiency.</li>
            </ul>
          </article>
          <article className="job">
            <h3>Research Assistant (Fellowship) — Arizona State University</h3>
            <p className="meta">August 2022 - April 2023</p>
            <ul>
              <li>Built data pipelines and managed large datasets for SEIR models and COVID-19 research, including data extraction, transformation, and integration.</li>
              <li>Designed visualizations to analyze prevention strategies and support educational materials.</li>
            </ul>
          </article>
        </section>

        <section id="education" ref={educationRef} className="scroll-animate">
          <h2>Education</h2>
          <p><strong>M.S. Computer Science</strong> — Arizona State University — May 2024 • GPA: 3.89</p>
          <p><strong>B.S. Computer Science</strong> — Arizona State University — May 2023 • GPA: 3.96</p>
        </section>

        <section id="skills" ref={skillsRef} className="scroll-animate">
          <h2>Skills</h2>
          <p><strong>Programming:</strong> Java, Python, C/C++, JavaScript, SQL, Bash, C#, HTML, CSS, PHP, PowerShell, Shell Scripting, Apex, Prolog, Scheme, LISP, Arduino</p>
          <p><strong>Frameworks & Libraries:</strong> React, Node.js, TensorFlow, D3.js, Three.js, AR.js, Pandas, NumPy, Matplotlib, Hadoop, Spark</p>
          <p><strong>Software & Tools:</strong> AWS, MySQL, PostgreSQL, NoSQL, Git/GitHub, Tableau, VMware, Blender, Unity, Salesforce, AutoCAD, MATLAB, Photoshop, Unix/Linux, Google ARCore</p>
          <p><strong>Languages:</strong> English (Native), Spanish (Fluent)</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}