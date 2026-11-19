import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingService } from '../../services/loading.service';

gsap.registerPlugin(ScrollTrigger);

interface SkillGroup {
  name: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements AfterViewInit {
  skillGroups: SkillGroup[] = [
    { name: 'Frontend', skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'SCSS', 'GSAP', 'Three.js'] },
    { name: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs', 'Socket.IO'] },
    { name: 'Database', skills: ['MongoDB', 'MySQL'] },
    { name: 'Tools & DevOps', skills: ['Git', 'GitHub', 'Postman', 'Docker', 'Vercel', 'VS Code'] },
  ];

  constructor(private loadingService: LoadingService) {}

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
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
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
