import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, User, Code2, Palette, Globe } from 'lucide-angular';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../services/loading.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit, OnDestroy {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('aboutImage') aboutImage!: ElementRef;
  @ViewChild('aboutContent') aboutContent!: ElementRef;

  profileImage = 'assets/Naivedh.png'; 

  readonly UserIcon = User;
  readonly CodeIcon = Code2;
  readonly PaletteIcon = Palette;
  readonly GlobeIcon = Globe;

  features = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Building clean, responsive, and user-friendly applications using modern technologies.'
    },
    {
      icon: Palette,
      title: 'Video Editing',
      description: 'Creating high-quality digital content and professional video edits for social media.'
    },
    {
      icon: Globe,
      title: 'UI/UX Design',
      description: 'Specializing in modern UI/UX design, problem-solving, and dynamic web platforms.'
    }
  ];

  private loadingSub?: Subscription;

  constructor(private loadingService: LoadingService) {}

  ngAfterViewInit() {
    this.loadingSub = this.loadingService.isLoaded$.subscribe((isLoaded: boolean) => {
      if (isLoaded) {
        // Use a small timeout to ensure the DOM is ready
        setTimeout(() => {
          this.initAnimations();
          ScrollTrigger.refresh();
        }, 500);
      }
    });
  }

  ngOnDestroy() {
    this.loadingSub?.unsubscribe();
  }

  private initAnimations() {
    const section = this.aboutSection.nativeElement;
    const image = this.aboutImage.nativeElement;
    const content = this.aboutContent.nativeElement;

    // Entrance Animation (Simpler)
    gsap.fromTo(image, 
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.from(content.querySelectorAll('.section-tag, .section-title, .about-text'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // We keep the cards separate and simple
    gsap.from('.feature-card', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  }
}
