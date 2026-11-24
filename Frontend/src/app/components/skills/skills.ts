import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs';

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
export class Skills implements AfterViewInit, OnDestroy {
  skillGroups: SkillGroup[] = [
    { name: 'Frontend', skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'SCSS', 'GSAP', 'Three.js'] },
    { name: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs', 'Socket.IO'] },
    { name: 'Database', skills: ['MongoDB', 'MySQL'] },
    { name: 'Tools & DevOps', skills: ['Git', 'GitHub', 'Postman', 'Docker', 'Vercel', 'VS Code'] },
  ];

  constructor(private loadingService: LoadingService) {}
  private loadingSub?: Subscription;

  ngAfterViewInit() {
    this.loadingSub = this.loadingService.isLoaded$.subscribe((isLoaded: boolean) => {
      if (isLoaded) {
        setTimeout(() => {
          this.initAnimations();
          ScrollTrigger.refresh();
        }, 500);
        setTimeout(() => ScrollTrigger.refresh(), 1500);
      }
    });
  }

  ngOnDestroy() {
    this.loadingSub?.unsubscribe();
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger instanceof HTMLElement && trigger.trigger.closest('app-skills')) trigger.kill();
    });
  }

  private initAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo('.skill-group-card',
      { y: 24, autoAlpha: 0 },
      {
        y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 82%',
          once: true,
        }
      }
    );
  }
}
