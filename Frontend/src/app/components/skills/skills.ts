import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingService } from '../../services/loading.service';

gsap.registerPlugin(ScrollTrigger);

export interface SkillItem {
  name: string;
  level: number;
  category: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements OnInit, AfterViewInit {
  constructor(private loadingService: LoadingService) {}

  // Part 1: Languages & Technical Skills
  technicalSkills: SkillItem[] = [
    { name: 'HTML / CSS / JS', level: 95, category: 'Frontend' },
    { name: 'Angular', level: 98, category: 'Framework' },
    { name: 'React', level: 85, category: 'Library' },
    { name: 'TypeScript', level: 90, category: 'Language' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Express.js', level: 80, category: 'Backend' },
    { name: 'MongoDB', level: 82, category: 'Database' },
    { name: 'MySQL', level: 85, category: 'Database' },
    { name: 'Python', level: 78, category: 'Language' },
    { name: 'UI/UX Design', level: 88, category: 'Design' },
    { name: 'C / C++', level: 80, category: 'Language' },
    { name: 'Socket.IO', level: 85, category: 'Real-time' }
  ];

  // Part 2: Professional Tools & Software
  professionalTools: SkillItem[] = [
    { name: 'Photoshop', level: 85, category: 'Design Tool' },
    { name: 'Premiere Pro', level: 80, category: 'Video Editing' },
    { name: 'After Effects', level: 82, category: 'Motion Graphics' },
    { name: 'DaVinci Resolve', level: 85, category: 'Color & Edit' },
    { name: 'Video Editing', level: 92, category: 'Creative' },
    { name: 'Git & GitHub', level: 90, category: 'Version Control' },
    { name: 'VS Code', level: 95, category: 'IDE' },
    { name: 'Figma', level: 88, category: 'UI Prototyping' },
    { name: 'Postman', level: 85, category: 'API Testing' },
    { name: 'Vercel', level: 88, category: 'Deployment' },
    { name: 'Docker', level: 75, category: 'DevOps' },
    { name: 'Canva', level: 90, category: 'Graphics' }
  ];

  // Duplicated tracks for continuous seamless infinite marquee loop
  technicalTrack: SkillItem[] = [];
  toolsTrack: SkillItem[] = [];

  ngOnInit() {
    this.technicalTrack = [...this.technicalSkills, ...this.technicalSkills, ...this.technicalSkills];
    this.toolsTrack = [...this.professionalTools, ...this.professionalTools, ...this.professionalTools];
  }

  ngAfterViewInit() {
    this.loadingService.isLoaded$.subscribe((isLoaded: boolean) => {
      if (isLoaded) {
        setTimeout(() => {
          this.initAnimations();
          ScrollTrigger.refresh();
        }, 500);

        setTimeout(() => ScrollTrigger.refresh(), 1500);
      }
    });
  }

  private initAnimations() {
    gsap.fromTo('.marquee-row-wrapper',
      {
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.marquee-container',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}
