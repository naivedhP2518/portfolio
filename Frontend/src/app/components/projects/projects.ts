import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ExternalLink, Github, Eye } from 'lucide-angular';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingService } from '../../services/loading.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements AfterViewInit {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  readonly ExternalLinkIcon = ExternalLink;
  readonly GithubIcon = Github;
  readonly EyeIcon = Eye;

  constructor(private loadingService: LoadingService) {}

  projects = [
    {
      title: 'Hotel Website',
      category: 'MEAN Stack',
      description: 'Developed a modern hotel booking interface with premium UI design, smooth animations, and responsive layout.',
      image: 'assets/hotel-web.png',
      tools: ['MongoDB', 'Express', 'Angular', 'Node.js'],
      link: 'https://the-grand-oasis-resort.vercel.app',
      github: 'https://github.com/naivedhP2518/The-Grand-Oasis-Resort'
    },
    {
      title: 'Rental Website',
      category: 'MEAN Stack',
      description: 'Built a complete rental platform with backend integration, database handling, and user interaction features.',
      image: 'assets/Rental-web.png',
      tools: ['MongoDB', 'Express', 'Angular', 'Node.js'],
      link: 'https://urban-nest-flax.vercel.app',
      github: 'https://github.com/naivedhP2518/UrbanNest'
    },
    {
      title: 'Live Chat Website',
      category: 'Socket.IO Integration',
      description: 'Created a real-time chat application using Socket.IO with instant messaging and dynamic updates.',
      image: 'assets/Chat-Web.png',
      tools: ['Socket.io', 'Node.js', 'Express', 'Angular'],
      link: 'https://naivedhp2518.github.io/Under-Maintenance/',
      github: 'https://github.com/naivedhP2518/Chat-Web'
    },
    {
      title: '10+ Small Projects',
      category: 'Frontend Only',
      description: 'Including UI-based apps, tools, and mini web applications showcasing various developer skills.',
      image: 'assets/More-Projects.png',
      tools: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://naivedhp2518.github.io/Small-Projects/index.html',
      github: 'https://github.com/naivedhP2518?tab=repositories'
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
    // Entrance Animation
    gsap.fromTo('.project-card', 
      { 
        y: 100, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Hover 3D Tilt Effect
    this.projectCards.forEach((cardRef) => {
      const card = cardRef.nativeElement;
      
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(card, {
          rotateY: x * 15,
          rotateX: -y * 15,
          scale: 1.02,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }
}
