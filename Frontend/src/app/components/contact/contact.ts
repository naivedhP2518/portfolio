import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Mail, Github, Linkedin, Send, MessageSquare, CheckCircle, AlertCircle } from 'lucide-angular';
import { ApiService } from '../../services/api.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit, OnDestroy {
  @ViewChild('contactSection') contactSection!: ElementRef<HTMLElement>;
  readonly MailIcon = Mail;
  readonly GithubIcon = Github;
  readonly LinkedinIcon = Linkedin;
  readonly SendIcon = Send;
  readonly MsgIcon = MessageSquare;
  readonly SuccessIcon = CheckCircle;
  readonly ErrorIcon = AlertCircle;

  isSubmitting = false;
  isSuccess = false;
  isError = false;

  private loadingSub?: Subscription;

  constructor(private apiService: ApiService, private loadingService: LoadingService) {}

  ngAfterViewInit() {
    this.loadingSub = this.loadingService.isLoaded$.subscribe((isLoaded) => {
      if (isLoaded) setTimeout(() => this.initAnimations(), 500);
    });
  }

  ngOnDestroy() {
    this.loadingSub?.unsubscribe();
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger instanceof HTMLElement && trigger.trigger.closest('app-contact')) trigger.kill();
    });
  }

  private initAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = this.contactSection.nativeElement;
    const items = section.querySelectorAll('.contact-info, .contact-form-container');
    gsap.fromTo(items, { y: 22, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 0.65,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: section.querySelector('.contact-grid'), start: 'top 82%', once: true },
    });
  }

  contactInfo = [
    {
      icon: this.MailIcon,
      label: 'Email',
      value: 'naivedhpatel2514@gmail.com',
      link: 'mailto:naivedhpatel2514@gmail.com'
    },
    {
      icon: this.GithubIcon,
      label: 'GitHub',
      value: 'github.com/naivedhP2518',
      link: 'https://github.com/naivedhP2518'
    },
    {
      icon: this.LinkedinIcon,
      label: 'LinkedIn',
      value: 'linkedin.com/in/naivedh2518',
      link: 'https://www.linkedin.com/in/naivedh2518/'
    }
  ];

  formData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.isSuccess = false;
    this.isError = false;

    this.apiService.submitContact(this.formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.isSuccess = true;
        this.formData = { name: '', email: '', message: '' };
        
        // Reset success message after 5 seconds
        setTimeout(() => (this.isSuccess = false), 5000);
      },
      error: () => {
        this.isSubmitting = false;
        this.isError = true;
      }
    });
  }
}

