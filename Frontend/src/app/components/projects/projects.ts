import { Component, AfterViewInit, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingService } from '../../services/loading.service';
import { ApiService, ProjectItem } from '../../services/api.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit, AfterViewInit {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;


  constructor(
    private loadingService: LoadingService,
    private apiService: ApiService
  ) {}

  resolveUrl(url?: string): string {
    return this.apiService.resolveMediaUrl(url);
  }

  ngOnInit() {
    this.apiService.getProjects().subscribe({
      next: (res) => {
        if (res.success && res.data && res.data.length > 0) {
          const curatedProjects = this.projects;
          this.projects = res.data
            .map((project) => {
              const curated = curatedProjects.find((item) => item.title === project.title)
                ?? (project.title === '10+ Small Projects'
                  ? curatedProjects.find((item) => item.title.startsWith('TODO:'))
                  : undefined);
              return curated
                ? { ...project, ...curated, _id: project._id }
                : { ...project, feature: project.feature || 'TODO: Add key feature or problem solved.' };
            })
            .sort((a, b) => {
              const aOrder = curatedProjects.findIndex((item) => item.title === a.title);
              const bOrder = curatedProjects.findIndex((item) => item.title === b.title);
              return (aOrder < 0 ? Number.MAX_SAFE_INTEGER : aOrder)
                - (bOrder < 0 ? Number.MAX_SAFE_INTEGER : bOrder);
            });
          setTimeout(() => ScrollTrigger.refresh(), 200);
        }
      },
    });
  }

  projects: ProjectItem[] = [
    {
      title: 'SYNCUBE',
      category: 'Full Stack App',
      description: 'A full stack collaboration platform with authenticated access and workspace management. It keeps team activity synchronized through live updates.',
      feature: 'Real-time workspace synchronization with secure user authentication.',
      image: 'assets/SYNCUBE.webp',
      tools: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'Vercel'],
      link: 'https://syncube.vercel.app/login',
      github: 'https://github.com/naivedhP2518/SYNCUBE'
    },
    {
      title: 'Rental Website',
      category: 'MEAN Stack',
      description: 'A full stack rental platform with backend and database integration. It brings rental listings and user interactions together in one application.',
      feature: 'Connects rental listings to backend services and persistent data.',
      image: 'assets/Rental-web.webp',
      tools: ['MongoDB', 'Express', 'Angular', 'Node.js'],
      link: 'https://urban-nest-flax.vercel.app',
      github: 'https://github.com/naivedhP2518/UrbanNest'
    },
    {
      title: 'Live Chat Website',
      category: 'Socket.IO Integration',
      description: 'A real-time chat application built with Angular and a Node.js backend. Messages update instantly through Socket.IO.',
      feature: 'Instant message delivery using Socket.IO.',
      image: 'assets/Chat-Web.webp',
      tools: ['Socket.io', 'Node.js', 'Express', 'Angular'],
      link: 'https://naivedhp2518.github.io/Under-Maintenance/',
      github: 'https://github.com/naivedhP2518/Chat-Web'
    },
    {
      title: 'Hotel Website',
      category: 'MEAN Stack',
      description: 'A responsive hotel booking experience built with the MEAN stack. The interface presents resort information and booking flows in a polished layout.',
      feature: 'Responsive booking interface for exploring a hotel resort.',
      image: 'assets/hotel-web.webp',
      tools: ['MongoDB', 'Express', 'Angular', 'Node.js'],
      link: 'https://the-grand-oasis-resort.vercel.app',
      github: 'https://github.com/naivedhP2518/The-Grand-Oasis-Resort'
    },
    {
      title: 'Headphone Website',
      category: 'Frontend & Canvas',
      description: 'An interactive product landing page for headphones, built with web technologies and canvas animation. It combines a responsive presentation with 3D visuals.',
      feature: 'Interactive 3D product presentation in the browser.',
      image: 'assets/headpnone.webp',
      tools: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
      link: 'https://naivedhp2518.github.io/Aurora-X-Headphone/',
      github: 'https://github.com/naivedhP2518/Aurora-X-Headphone'
    },
    {
      title: 'TODO: Add a named development project',
      category: 'Frontend Only',
      description: 'TODO: Add a concise description of a specific development project and the problem it solves.',
      feature: 'TODO: Add the key feature or problem solved.',
      image: 'assets/More-Projects.webp',
      tools: ['TODO: Add project technologies'],
      link: '',
      github: ''
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
