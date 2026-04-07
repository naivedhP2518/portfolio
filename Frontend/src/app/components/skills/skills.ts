import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingService } from '../../services/loading.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements AfterViewInit {
  constructor(private loadingService: LoadingService) {}

  skillCategories = [
    {
      name: 'Frontend & Design',
      skills: [
        { name: 'HTML / CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'React', level: 85 },
        { name: 'UI/UX Design', level: 88 }
      ]
    },
    {
      name: 'Backend & Database',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'MongoDB', level: 82 },
        { name: 'MySQL', level: 85 }
      ]
    },
    {
      name: 'Creative & Tools',
      skills: [
        { name: 'Video Editing', level: 92 },
        { name: 'DaVinci Resolve', level: 85 },
        { name: 'Premiere Pro', level: 80 },
        { name: 'Photoshop', level: 85 }
      ]
    }
  ];

  ngAfterViewInit() {
    this.loadingService.isLoaded$.subscribe((isLoaded: boolean) => {
      if (isLoaded) {
        // Use multiple refreshes to account for late layout shifts
        setTimeout(() => {
          this.initAnimations();
          ScrollTrigger.refresh();
        }, 500);
        
        // Follow-up refresh for images/slow renders
        setTimeout(() => ScrollTrigger.refresh(), 1500);
      }
    });
  }

  private initAnimations() {
    // Reveal skill categories
    gsap.fromTo('.skill-category', 
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Animate skill bars
    gsap.fromTo('.skill-bar-fill', 
      { width: '0%' },
      {
        width: (index, target: HTMLElement) => {
          return target.getAttribute('data-level') + '%' || '100%';
        },
        duration: 1.5,
        delay: 0.5,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}
