import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Menu, X, MousePointer2, Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly MenuIcon = Menu;
  readonly XIcon = X;
  readonly PointerIcon = MousePointer2;
  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;

  isScrolled = signal(false);
  isMenuOpen = signal(false);
  isDarkMode = signal(false);
  private audioContext?: AudioContext;

  constructor() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    this.setTheme(savedTheme === 'dark');
  }

  navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  toggleTheme(event: MouseEvent) {
    const nextIsDark = !this.isDarkMode();
    this.playThemeSwitchSound(nextIsDark);
    const root = document.documentElement;
    const button = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    const bounds = button?.getBoundingClientRect();
    const x = event.clientX || (bounds ? bounds.left + bounds.width / 2 : window.innerWidth / 2);
    const y = event.clientY || (bounds ? bounds.top + bounds.height / 2 : window.innerHeight / 2);
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.style.setProperty('--theme-wipe-x', `${x}px`);
    root.style.setProperty('--theme-wipe-y', `${y}px`);
    root.style.setProperty('--theme-wipe-radius', `${radius}px`);

    const viewTransitionDocument = document as Document & {
      startViewTransition?: (update: () => void) => { finished: Promise<void> };
    };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && viewTransitionDocument.startViewTransition) {
      viewTransitionDocument.startViewTransition(() => this.setTheme(nextIsDark));
      return;
    }

    this.setTheme(nextIsDark);
  }

  private playThemeSwitchSound(isDark: boolean) {
    try {
      this.audioContext ??= new AudioContext();
      const context = this.audioContext;
      if (context.state === 'suspended') void context.resume();

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = context.currentTime;
      const endFrequency = isDark ? 430 : 760;

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(isDark ? 690 : 470, start);
      oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + 0.14);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.035, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.17);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.18);
      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
    } catch {
      // Theme switching should still work when audio is unavailable.
    }
  }

  private setTheme(isDark: boolean) {
    this.isDarkMode.set(isDark);
    document.documentElement.dataset['theme'] = isDark ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }

  scrollToSection(sectionId: string, event?: MouseEvent) {
    event?.preventDefault();
    this.isMenuOpen.set(false);
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
