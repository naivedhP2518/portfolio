import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowDown, Instagram, Youtube, Mail } from 'lucide-angular';
import gsap from 'gsap';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit {
  readonly ArrowIcon = ArrowDown;
  readonly InstagramIcon = Instagram;
  readonly YoutubeIcon = Youtube;
  readonly MailIcon = Mail;

  @ViewChild('heroContent') heroContent!: ElementRef;
  @ViewChild('heroBg') heroBg!: ElementRef;

  constructor(private loadingService: LoadingService) {}

  ngAfterViewInit() {
    this.loadingService.isLoaded$.subscribe((isLoaded: boolean) => {
      if (isLoaded) {
        // Delay slightly for the loader reveal to start
        setTimeout(() => this.initAnimations(), 100);
      }
    });
  }

  initAnimations() {
    const tl = gsap.timeline();

    tl.from('.hero-title .char', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      ease: 'power4.out'
    })
    .from('.hero-tagline', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-cta', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, '-=0.3')
    .from('.social-vertical', {
      x: -20,
      opacity: 0,
      duration: 0.8
    }, '-=0.5');

    // Subtle background drift
    gsap.to(this.heroBg.nativeElement, {
      backgroundPosition: '100% 100%',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'none'
    });
  }

  scrollToAbout() {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToProjects() {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
