import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useCursor } from '../context/CursorContext';
import { ExternalLink, Github, ArrowRight, Eye, Code2, Image as ImageIcon } from 'lucide-react';
import './Projects.css';


gsap.registerPlugin(ScrollTrigger);


const Projects3DScene = ({ darkMode }) => {
    return (
        <div className={`projects-3d-scene ${darkMode ? 'projects-3d-scene-dark' : 'projects-3d-scene-light'}`}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={darkMode ? 0.3 : 0.5} />
                <pointLight position={[10, 10, 10]} intensity={darkMode ? 0.8 : 1} />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};


const ImageModal = ({ imageUrl, title, isOpen, onClose, darkMode }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            className="image-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className={`image-modal-content ${darkMode ? 'image-modal-content-dark' : 'image-modal-content-light'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={`modal-close-btn ${darkMode ? 'modal-close-btn-dark' : 'modal-close-btn-light'}`}
                    onClick={onClose}
                >
                    ×
                </button>
                <img src={imageUrl} alt={title} className="modal-image" />
                <p className={`modal-title ${darkMode ? 'modal-title-dark' : 'modal-title-light'}`}>{title}</p>
            </motion.div>
        </motion.div>
    );
};


const AnimatedProjectCard = ({ project, index, darkMode }) => {
    const cardRef = useRef();
    const { setCursorVariant } = useCursor();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const containerVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const handleImageClick = () => {
        setIsImageModalOpen(true);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <>
            <motion.div
                ref={cardRef}
                className={`project-card ${darkMode ? 'project-card-dark' : 'project-card-light'}`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ y: -5, scale: 1.02 }}
            >
                <div className={`project-card-glow ${darkMode ? 'project-card-glow-dark' : 'project-card-glow-light'}`}></div>


                {project.imageUrl && (
                    <div className="project-image-container">
                        <motion.div
                            className="project-image-wrapper"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {!imageLoaded && (
                                <div className="image-skeleton">
                                    <ImageIcon size={32} className="image-placeholder-icon" />
                                </div>
                            )}
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className={`project-image ${imageLoaded ? 'project-image-loaded' : 'project-image-loading'}`}
                                onClick={handleImageClick}
                                onLoad={handleImageLoad}
                                loading="lazy"
                            />
                            <motion.div
                                className="project-image-overlay"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                onClick={handleImageClick}
                            >
                                <Eye size={24} />
                                <span>View Project</span>
                            </motion.div>
                        </motion.div>
                    </div>
                )}


                <div className="project-header">
                    <div className="project-icon-wrapper">
                        <Code2 className={`project-icon ${darkMode ? 'project-icon-dark' : 'project-icon-light'}`} />
                    </div>
                    <div>
                        <h3 className={`project-title ${darkMode ? 'project-title-dark' : 'project-title-light'}`}>
                            {project.title}
                        </h3>
                        {project.featured && (
                            <div className={`project-badge ${darkMode ? 'project-badge-dark' : 'project-badge-light'}`}>
                                Featured
                            </div>
                        )}
                    </div>
                </div>


                <p className={`project-description ${darkMode ? 'project-description-dark' : 'project-description-light'}`}>
                    {project.description}
                </p>


                <div className="project-tech-stack">
                    {project.techStack.map((tech, techIndex) => (
                        <span
                            key={tech}
                            className={`tech-tag ${darkMode ? 'tech-tag-dark' : 'tech-tag-light'}`}
                            style={{
                                '--tech-color': project.techColors[techIndex],
                                '--tech-bg': project.techColors[techIndex] + '20'
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>


                <div className="project-links">
                    <motion.a
                        href={project.liveUrl}
                        className={`project-link primary-link ${darkMode ? 'primary-link-dark' : 'primary-link-light'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Eye size={18} />
                        <span>Live Demo</span>
                        <ArrowRight size={16} />
                    </motion.a>
                    <motion.a
                        href={project.githubUrl}
                        className={`project-link secondary-link ${darkMode ? 'secondary-link-dark' : 'secondary-link-light'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Github size={18} />
                        <span>Source Code</span>
                    </motion.a>
                </div>
            </motion.div>


            <ImageModal
                imageUrl={project.imageUrl}
                title={project.title}
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                darkMode={darkMode}
            />
        </>
    );
};


const ProjectFilter = ({ categories, activeCategory, onFilterChange, darkMode }) => {
    const { setCursorVariant } = useCursor();

    return (
        <motion.div
            className="project-filters"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {categories.map((category) => (
                <motion.button
                    key={category}
                    className={`filter-btn ${activeCategory === category ? 'filter-btn-active' : ''} ${darkMode ? 'filter-btn-dark' : 'filter-btn-light'}`}
                    onClick={() => onFilterChange(category)}
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={() => setCursorVariant("default")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {category}
                </motion.button>
            ))}
        </motion.div>
    );
};


const Projects = ({ darkMode }) => {
    const { setCursorVariant } = useCursor();
    const projectsRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const projectCategories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile', '3D Web'];


    const projects = [
      {
            id: 3,
            title: "Complaint Management System",
            description: "Full-stack organizational complaint resolution platform featuring role-based access portals for administrators, department heads, faculty directors, teachers, and users, integrated with MySQL hosted on Aiven Cloud and deployed via Docker on Render.",
            techStack: ["PHP", "MySQL", "DBeaver", "Docker", "Render"],
            techColors: darkMode ? ["#a78bfa", "#60a5fa", "#22d3ee", "#fbbf24", "#c084fc"] : ["#7c3aed", "#2563eb", "#0891b2", "#d97706", "#9333ea"],
            liveUrl: "https://complaint-management-system-nn3g.onrender.com",
            githubUrl: "https://github.com/merong901-wen/complaint_Management-system.git",
            category: "Full Stack",
            featured: true,
            imageUrl: "/images/complaint-management.svg"
        },
        {
            id: 7,
            title: "Healthcare Management System",
            description: "Full-stack web application for comprehensive healthcare management with patient records, appointment scheduling, and medical history tracking, featuring a React 18 frontend on Vercel and a Node.js/Express backend on Render with MongoDB Atlas.",
            techStack: ["React 18", "Node.js", "Express.js", "MongoDB Atlas", "Tailwind CSS", "Docker"],
            techColors: darkMode 
                ? ["#60a5fa", "#34d399", "#a78bfa", "#4ade80", "#22d3ee", "#38bdf8"] 
                : ["#2563eb", "#059669", "#7c3aed", "#16a34a", "#0891b2", "#0284c7"],
            liveUrl: "https://healthcare-management-system-hms-omega.vercel.app/",
            githubUrl: "https://github.com/yabcipher2/Healthcare-Management-System-HMS.git",
            category: "Full Stack",
            featured: false,
            imageUrl: "/images/healthcare-management.svg"
        },
    ];

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };


    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: projectsRef.current,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
            }
        });


        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
            '-=0.5'
        );

        tl.fromTo(subtitleRef.current,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.3'
        );
    }, []);

    const handleFilterChange = (category) => {
        setActiveCategory(category);
    };

    return (
        <section
            id="projects"
            ref={projectsRef}
            className={`projects-section ${darkMode ? 'projects-section-dark' : 'projects-section-light'}`}
        >

            <Projects3DScene darkMode={darkMode} />


            <div className="projects-grid-lines">

                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={`v-${i}`}
                        className="vertical-line"
                        style={{ left: `${i * 20}%` }}
                    />
                ))}


                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={`h-${i}`}
                        className="horizontal-line"
                        style={{ top: `${i * 20}%` }}
                    />
                ))}
            </div>


            <motion.div
                className="projects-glow"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            <motion.div
                className="projects-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="projects-content">
                    <div className="projects-text-content">
                        <motion.h2
                            ref={titleRef}
                            className={`projects-title ${darkMode ? 'projects-title-dark' : 'projects-title-light'}`}
                            variants={itemVariants}
                        >
                            My <span className={`projects-name ${darkMode ? 'projects-name-dark' : 'projects-name-light'}`}>Projects</span>
                        </motion.h2>

                        <motion.p
                            ref={subtitleRef}
                            className={`projects-subtitle ${darkMode ? 'projects-subtitle-dark' : 'projects-subtitle-light'}`}
                            variants={itemVariants}
                        >
                            A collection of my recent work showcasing full-stack development,
                            modern technologies, and creative solutions across various domains.
                        </motion.p>


                        <motion.div variants={itemVariants}>
                            <ProjectFilter
                                categories={projectCategories}
                                activeCategory={activeCategory}
                                onFilterChange={handleFilterChange}
                                darkMode={darkMode}
                            />
                        </motion.div>


                        <motion.div
                            className="projects-grid"
                            variants={itemVariants}
                        >
                            {filteredProjects.map((project, index) => (
                                <AnimatedProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    darkMode={darkMode}
                                />
                            ))}
                        </motion.div>


                        <motion.div
                            className="projects-cta"
                            variants={itemVariants}
                        >
                            <div className={`cta-content ${darkMode ? 'cta-content-dark' : 'cta-content-light'}`}>
                                <h3 className={`cta-title ${darkMode ? 'cta-title-dark' : 'cta-title-light'}`}>
                                    Ready to start your project?
                                </h3>
                                <p className={`cta-description ${darkMode ? 'cta-description-dark' : 'cta-description-light'}`}>
                                    Let's work together to bring your ideas to life with cutting-edge technology and innovative solutions.
                                </p>
                                <motion.a
                                    href="#contact"
                                    className={`cta-button ${darkMode ? 'cta-button-dark' : 'cta-button-light'}`}
                                    onMouseEnter={() => setCursorVariant("button")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Start a Project</span>
                                    <ArrowRight size={20} />
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
