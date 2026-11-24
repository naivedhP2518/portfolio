import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { Project } from '../models/Project.js';

const initialProjects = [
  {
    title: 'SYNCUBE',
    category: 'Full Stack App',
    description: 'A full stack collaboration platform with authenticated access and workspace management. It keeps team activity synchronized through live updates.',
    feature: 'Real-time workspace synchronization with secure user authentication.',
    image: 'assets/SYNCUBE.webp',
    tools: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'Vercel'],
    link: 'https://syncube.vercel.app/login',
    github: 'https://github.com/naivedhP2518/SYNCUBE',
    order: 1,
    featured: true,
  },
  {
    title: 'Hotel Website',
    category: 'MEAN Stack',
    description: 'A responsive hotel booking experience built with the MEAN stack. The interface presents resort information and booking flows in a polished layout.',
    feature: 'Responsive booking interface for exploring a hotel resort.',
    image: 'assets/hotel-web.webp',
    tools: ['MongoDB', 'Express', 'Angular', 'Node.js'],
    link: 'https://the-grand-oasis-resort.vercel.app',
    github: 'https://github.com/naivedhP2518/The-Grand-Oasis-Resort',
    order: 4,
    featured: true,
  },
  {
    title: 'Rental Website',
    category: 'MEAN Stack',
    description: 'A full stack rental platform with backend and database integration. It brings rental listings and user interactions together in one application.',
    feature: 'Connects rental listings to backend services and persistent data.',
    image: 'assets/Rental-web.webp',
    tools: ['MongoDB', 'Express', 'Angular', 'Node.js'],
    link: 'https://urban-nest-flax.vercel.app',
    github: 'https://github.com/naivedhP2518/UrbanNest',
    order: 2,
    featured: true,
  },
  {
    title: 'Live Chat Website',
    category: 'Socket.IO Integration',
    description: 'A real-time chat application built with Angular and a Node.js backend. Messages update instantly through Socket.IO.',
    feature: 'Instant message delivery using Socket.IO.',
    image: 'assets/Chat-Web.webp',
    tools: ['Socket.io', 'Node.js', 'Express', 'Angular'],
    link: 'https://naivedhp2518.github.io/Under-Maintenance/',
    github: 'https://github.com/naivedhP2518/Chat-Web',
    order: 3,
    featured: true,
  },
  {
    title: 'Headphone Website',
    category: 'Frontend & Canvas',
    description: 'An interactive product landing page for headphones, built with web technologies and canvas animation. It combines a responsive presentation with 3D visuals.',
    feature: 'Interactive 3D product presentation in the browser.',
    image: 'assets/headpnone.webp',
    tools: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    link: 'https://naivedhp2518.github.io/Aurora-X-Headphone/',
    github: 'https://github.com/naivedhP2518/Aurora-X-Headphone',
    order: 5,
    featured: false,
  },
  {
    title: 'Small Projects',
    category: 'Frontend Only',
    description: 'A collection of small frontend projects and web apps, brought together in one place.',
    feature: 'Explore a range of small web projects from one collection.',
    image: 'assets/More-Projects.webp',
    tools: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://naivedhp2518.github.io/Small-Projects/index.html',
    github: '',
    githubOptional: true,
    order: 6,
    featured: false,
  },
];



const seed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);

    console.log('Clearing old project collection...');
    await Project.deleteMany({});

    console.log('Seeding initial projects...');
    await Project.insertMany(initialProjects);

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();

