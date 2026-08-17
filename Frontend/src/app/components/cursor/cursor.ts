import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor.html',
  styleUrl: './cursor.scss',
})
export class Cursor implements AfterViewInit {
  @ViewChild('dot') dot!: ElementRef;
  @ViewChild('outline') outline!: ElementRef;

  private dotPos = { x: 0, y: 0 };
  private mousePos = { x: 0, y: 0 };

  ngAfterViewInit() {
    this.initCursor();
  }

  private initCursor() {
    gsap.set(this.dot.nativeElement, { xPercent: -50, yPercent: -50 });
    gsap.set(this.outline.nativeElement, { xPercent: -50, yPercent: -50 });

    window.addEventListener('mousemove', (e) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;

      gsap.to(this.dot.nativeElement, {
        duration: 0.1,
        x: this.mousePos.x,
        y: this.mousePos.y,
      });

      gsap.to(this.outline.nativeElement, {
        duration: 0.5,
        x: this.mousePos.x,
        y: this.mousePos.y,
        ease: 'power2.out'
      });
    });

    // Handle Hover states
    const interactives = document.querySelectorAll('a, button, .logo, .info-card, .feature-card, .project-card, .skill-category, .timeline-item');
    
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(this.outline.nativeElement, {
          scale: 2,
          backgroundColor: 'rgba(244, 208, 111, 0.05)',
          borderColor: 'rgba(244, 208, 111, 0.6)',
          duration: 0.3
        });
        gsap.to(this.dot.nativeElement, {
          scale: 0.5,
          duration: 0.3
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(this.outline.nativeElement, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(244, 208, 111, 0.3)',
          duration: 0.3
        });
        gsap.to(this.dot.nativeElement, {
          scale: 1,
          duration: 0.3
        });
      });
    });
  }
}
