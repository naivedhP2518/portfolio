import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Calendar, MapPin, Code, Video, GraduationCap, School, BookOpen } from 'lucide-angular';
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
  readonly VideoIcon = Video;
  readonly GradIcon = GraduationCap;
  readonly SchoolIcon = School;
  readonly BookIcon = BookOpen;

  constructor(private loadingService: LoadingService) {}

  experiences = [
    {
      company: 'Web Development',
      role: 'Web Developer',
      location: 'Vadodara',
      duration: 'Ongoing',
      icon: this.CodeIcon,
      description: 'Building responsive and interactive web applications with modern UI/UX design.',
      highlights: [
        'Built responsive and interactive web applications.',
        'Designed modern UI layouts with smooth user experience.',
        'Worked on multiple real-world inspired projects.'
      ]
    },
    {
      company: 'Video Editing',
      role: 'Modern Video Editor',
      location: 'YouTube & Instagram',
      duration: 'Ongoing',
      icon: this.VideoIcon,
      description: 'Creating trending and high-quality digital content for social media.',
      highlights: [
        'Editing modern & trending videos for YouTube and Instagram.',
        'Specialized in devotional, aesthetic, and cinematic edits.',
        'Full workflow: clipping, transitions, effects, color correction & export.'
      ]
    },
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
    {
      company: 'Modi Boarding School',
      role: 'HSCE',
      location: 'Rajkot',
      duration: '2022 — 2023',
      icon: this.SchoolIcon,
      description: 'Higher Secondary School Certificate.',
      highlights: []
    },
    {
      company: 'New Sarwa Mangal School',
      role: 'SSCE',
      location: 'Vadodara',
      duration: '2020 — 2021',
      icon: this.BookIcon,
      description: 'Secondary School Certificate.',
      highlights: []
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
