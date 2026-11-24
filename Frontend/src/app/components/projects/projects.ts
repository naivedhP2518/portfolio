import { Component, AfterViewInit, OnInit, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
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
export class Projects implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;


  constructor(
    private loadingService: LoadingService,
    private apiService: ApiService
  ) {}

  ngOnDestroy() {
    gsap.killTweensOf(this.projectCards?.map((card) => card.nativeElement) ?? []);
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger instanceof HTMLElement && trigger.trigger.closest('app-projects')) trigger.kill();
    });
  }

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
                  ? curatedProjects.find((item) => item.title === 'Small Projects')
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
      description: 'A collaborative workspace for teams to organize work, manage access, and stay in sync.',
      feature: 'Real-time workspace synchronization with secure user authentication.',
      image: 'assets/SYNCUBE.webp',
      tools: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'Vercel'],
      link: 'https://syncube.vercel.app/login',
      github: 'https://github.com/naivedhP2518/SYNCUBE'
    },
    {
      title: 'Rental Website',
      category: 'MEAN Stack',
      description: 'A property rental platform that brings listings and user workflows together in one responsive experience.',
      feature: 'Connects rental listings to backend services and persistent data.',
      image: 'assets/Rental-web.webp',
      tools: ['MongoDB', 'Express', 'Angular', 'Node.js'],
      link: 'https://urban-nest-flax.vercel.app',
      github: 'https://github.com/naivedhP2518/UrbanNest'
    },
    {
      title: 'Live Chat Website',
      category: 'Socket.IO Integration',
      description: 'A real-time messaging application with an Angular interface and a Node.js backend.',
      feature: 'Instant message delivery using Socket.IO.',
      image: 'assets/Chat-Web.webp',
      tools: ['Socket.io', 'Node.js', 'Express', 'Angular'],
      link: 'https://naivedhp2518.github.io/Under-Maintenance/',
      github: 'https://github.com/naivedhP2518/Chat-Web'
    },
    {
      title: 'Hotel Website',
      category: 'MEAN Stack',
      description: 'A responsive hotel website presenting resort information and a streamlined booking flow.',
      feature: 'Responsive booking interface for exploring a hotel resort.',
      image: 'assets/hotel-web.webp',
      tools: ['MongoDB', 'Express', 'Angular', 'Node.js'],
      link: 'https://the-grand-oasis-resort.vercel.app',
      github: 'https://github.com/naivedhP2518/The-Grand-Oasis-Resort'
    },
    {
      title: 'Headphone Website',
      category: 'Frontend & Canvas',
      description: 'An interactive headphone product page combining responsive web design with animated 3D visuals.',
      feature: 'Interactive 3D product presentation in the browser.',
      image: 'assets/headpnone.webp',
      tools: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
      link: 'https://naivedhp2518.github.io/Aurora-X-Headphone/',
      github: 'https://github.com/naivedhP2518/Aurora-X-Headphone'
    },
    {
      title: 'Small Projects',
      category: 'Frontend Only',
      description: 'A curated collection of smaller frontend experiments and web applications.',
      feature: 'Explore a range of small web projects from one collection.',
      image: 'assets/More-Projects.webp',
      tools: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://naivedhp2518.github.io/Small-Projects/index.html',
      github: '',
      githubOptional: true
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
    const cards = this.projectCards.map((card) => card.nativeElement);
    const grid = document.querySelector('app-projects .projects-grid');
    if (!cards.length || !grid || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(cards,
      { y: 28, autoAlpha: 0 },
      {
        y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.11, ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 82%',
          once: true,
        }
      }
    );
  }
}
