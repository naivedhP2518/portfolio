import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Calendar, MapPin, Code, GraduationCap, School, BookOpen } from 'lucide-angular';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingService } from '../../services/loading.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements AfterViewInit {
  readonly CalendarIcon = Calendar;
  readonly MapIcon = MapPin;
  readonly CodeIcon = Code;
  readonly GradIcon = GraduationCap;
  readonly SchoolIcon = School;
  readonly BookIcon = BookOpen;

  constructor(private loadingService: LoadingService) {}

  private getIconForRole(role: string, company: string): any {
    const combined = `${role} ${company}`.toLowerCase();
    if (combined.includes('bachelor') || combined.includes('engineering') || combined.includes('institute')) return this.GradIcon;
    if (combined.includes('hsce') || combined.includes('boarding')) return this.SchoolIcon;
    if (combined.includes('ssce') || combined.includes('school')) return this.BookIcon;
    return this.CodeIcon;
  }

  experiences: any[] = [
    {
      company: 'Parul Institute of Engineering & Technology',
      role: 'Bachelor of Technology',
      location: 'Vadodara',
      duration: '2023 — 2027',
      icon: this.GradIcon,
      description: 'Pursuing B.Tech in Engineering & Technology.',
      highlights: [
        'Focusing on modern web technologies and full-stack development.',
        'Active member of the tech community.'
      ]
    },

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
    gsap.fromTo('.timeline-item', 
      { 
        x: -50, 
        opacity: 0 
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}
