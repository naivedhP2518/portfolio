import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-signature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signature.html',
  styleUrl: './signature.scss'
})
export class Signature implements AfterViewInit {
  @ViewChild('signatureSvg') signatureSvg!: ElementRef<SVGElement>;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.initSignatureAnimation();
  }

  private initSignatureAnimation() {
    const paths = this.el.nativeElement.querySelectorAll('.sig-path');
    
    // Create a timeline for the signature
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.signature-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
        // markers: true, // For debugging
      }
    });

    paths.forEach((path: SVGPathElement, index: number) => {
      const length = path.getTotalLength();
      
      // Set initial state - fully hidden including opacity
      gsap.set(path, {
        strokeDasharray: length + 1,
        strokeDashoffset: length + 1,
        opacity: 0
      });

      // Animate the path: Fade in then draw
      tl.to(path, {
        opacity: 1,
        duration: 0.1,
      }, index * 0.4)
      .to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      }, index * 0.4); // Start drawing at the same time as fade-in
    });
  }
}
