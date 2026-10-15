import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { Project } from '../models/Project.js';
import { Experience } from '../models/Experience.js';
import { Gallery } from '../models/Gallery.js';

const initialProjects = [
  {
    title: 'SYNCUBE',
    category: 'Full Stack App',
    description: 'A real-time synchronization and collaboration platform with secure user authentication, workspace management, and dynamic live updates.',
    image: 'assets/SYNCUBE.png',
    tools: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'Vercel'],
    link: 'https://syncube.vercel.app/login',
    github: 'https://github.com/naivedhP2518/SYNCUBE',
    order: 1,
    featured: true,
  },
  {
    title: 'Hotel Website',
    category: 'MEAN Stack',
    description: 'Developed a modern hotel booking interface with premium UI design, smooth animations, and responsive layout.',
    image: 'assets/hotel-web.png',
    tools: ['MongoDB', 'Express', 'Angular', 'Node.js'],
    link: 'https://the-grand-oasis-resort.vercel.app',
    github: 'https://github.com/naivedhP2518/The-Grand-Oasis-Resort',
    order: 2,
    featured: true,
  },
  {
    title: 'Rental Website',
    category: 'MEAN Stack',
    description: 'Built a complete rental platform with backend integration, database handling, and user interaction features.',
    image: 'assets/Rental-web.png',
    tools: ['MongoDB', 'Express', 'Angular', 'Node.js'],
    link: 'https://urban-nest-flax.vercel.app',
    github: 'https://github.com/naivedhP2518/UrbanNest',
    order: 3,
    featured: true,
  },
  {
    title: 'Live Chat Website',
    category: 'Socket.IO Integration',
    description: 'Created a real-time chat application using Socket.IO with instant messaging and dynamic updates.',
    image: 'assets/Chat-Web.png',
    tools: ['Socket.io', 'Node.js', 'Express', 'Angular'],
    link: 'https://naivedhp2518.github.io/Under-Maintenance/',
    github: 'https://github.com/naivedhP2518/Chat-Web',
    order: 4,
    featured: true,
  },
  {
    title: 'Headphone Website',
    category: 'Frontend & Canvas',
    description: 'Designed a premium audio product landing page with interactive 3D canvas animations, glassmorphism UI, and kinetic mechanics.',
    image: 'assets/headpnone.png',
    tools: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    link: 'https://naivedhp2518.github.io/Aurora-X-Headphone/',
    github: 'https://github.com/naivedhP2518/Aurora-X-Headphone',
    order: 5,
    featured: false,
  },
  {
    title: '10+ Small Projects',
    category: 'Frontend Only',
    description: 'Including UI-based apps, tools, and mini web applications showcasing various developer skills.',
    image: 'assets/More-Projects.png',
    tools: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://naivedhp2518.github.io/Small-Projects/index.html',
    github: 'https://github.com/naivedhP2518?tab=repositories',
    order: 6,
    featured: false,
  },
];

const initialExperiences = [
  {
    company: 'Web Development',
    role: 'Web Developer',
    location: 'Vadodara',
    duration: 'Ongoing',
    description: 'Building responsive and interactive web applications with modern UI/UX design.',
    highlights: [
      'Built responsive and interactive web applications.',
      'Designed modern UI layouts with smooth user experience.',
      'Worked on multiple real-world inspired projects.',
    ],
    order: 1,
  },
  {
    company: 'Video Editing',
    role: 'Modern Video Editor',
    location: 'YouTube & Instagram',
    duration: 'Ongoing',
    description: 'Creating trending and high-quality digital content for social media.',
    highlights: [
      'Editing modern & trending videos for YouTube and Instagram.',
      'Specialized in devotional, aesthetic, and cinematic edits.',
      'Full workflow: clipping, transitions, effects, color correction & export.',
    ],
    order: 2,
  },
  {
    company: 'Parul Institute of Engineering & Technology',
    role: 'Bachelor of Technology',
    location: 'Vadodara',
    duration: '2023 — 2027',
    description: 'Pursuing B.Tech in Engineering & Technology.',
    highlights: [
      'Focusing on modern web technologies and full-stack development.',
      'Active member of the tech community.',
    ],
    order: 3,
  },
  {
    company: 'Modi Boarding School',
    role: 'HSCE',
    location: 'Rajkot',
    duration: '2022 — 2023',
    description: 'Higher Secondary School Certificate.',
    highlights: [],
    order: 4,
  },
  {
    company: 'New Sarwa Mangal School',
    role: 'SSCE',
    location: 'Vadodara',
    duration: '2020 — 2021',
    description: 'Secondary School Certificate.',
    highlights: [],
    order: 5,
  },
];

const initialGallery = [
  {
    title: 'Lyrics Based Editing',
    category: 'Editing',
    size: 'large',
    image: 'assets/CoverPage.png',
    video: 'assets/SojaZara.mp4',
    order: 1,
  },
  {
    title: 'Rental Platform',
    category: 'Full Stack',
    size: 'small',
    image: 'assets/Rental-web.png',
    video: '',
    order: 2,
  },
  {
    title: 'Chat Interface',
    category: 'Real-time',
    size: 'medium',
    image: 'assets/Chat-Web.png',
    video: '',
    order: 3,
  },
  {
    title: 'Meme Based Video',
    category: 'Comedy',
    size: 'medium',
    image: 'assets/CoverPage1.jpg',
    video: 'assets/MemeBaseVideo.mp4',
    order: 4,
  },
  {
    title: 'Video Motion Graphic',
    category: 'Creative',
    size: 'large',
    image: 'assets/Dwarka-img.png',
    video: 'assets/Dwarka.mp4',
    order: 5,
  },
  {
    title: 'Mini Web App',
    category: 'Frontend',
    size: 'small',
    image: 'assets/More-Projects.png',
    video: '',
    order: 6,
  },
];

const seed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);

    console.log('Clearing old collections (projects, experience, gallery)...');
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Gallery.deleteMany({});

    console.log('Seeding initial projects...');
    await Project.insertMany(initialProjects);

    console.log('Seeding initial experiences...');
    await Experience.insertMany(initialExperiences);

    console.log('Seeding initial gallery items...');
    await Gallery.insertMany(initialGallery);

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();

