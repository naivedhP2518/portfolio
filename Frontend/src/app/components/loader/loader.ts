import { Component, AfterViewInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss'
})
export class Loader implements AfterViewInit, OnDestroy {
  @Output() loaded = new EventEmitter<void>();
  
  percent = 0;
  private timer: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.startLoading();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private startLoading() {
    // 1. Text entrance
    gsap.from('.loader-square-content > *', {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.5
    });

    // 2. Reliable counter logic
    const duration = 2500;
    const intervalTime = 16; // approx 60fps
    const increment = 100 / (duration / intervalTime);

    this.timer = setInterval(() => {
      this.percent += increment;
      
      if (this.percent >= 100) {
        this.percent = 100;
        clearInterval(this.timer);
        this.cdr.detectChanges(); // Final push
        
        setTimeout(() => {
          this.finishLoading();
        }, 500);
      }
      
      // Explicitly trigger Angular change detection
      this.cdr.detectChanges();
    }, intervalTime);
  }

  private finishLoading() {
    const tl = gsap.timeline({
      onComplete: () => {
        this.loaded.emit();
      }
    });

    tl.to('.loader-square', {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.in'
    })
    .to('.loader-overlay', {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, '-=0.4');
  }
}
