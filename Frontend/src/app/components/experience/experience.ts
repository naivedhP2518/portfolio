import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Calendar, MapPin, Briefcase } from 'lucide-angular';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  readonly CalendarIcon = Calendar;
  readonly MapIcon = MapPin;
  readonly BriefcaseIcon = Briefcase;

  experiences = [
    {
      company: 'Web Development',
      role: 'Web Developer',
      location: 'Vadodara',
      duration: 'Ongoing',
      description: 'Building responsive and interactive web applications with modern UI/UX design.',
      highlights: [
        'Built responsive and interactive web applications.',
        'Designed modern UI layouts with smooth user experience.',
        'Worked on multiple real-world inspired projects.'
      ]
    },
    {
      company: 'Video Editing',
      role: 'Modern Video Editor',
      location: 'YouTube & Instagram',
      duration: 'Ongoing',
      description: 'Creating trending and high-quality digital content for social media.',
      highlights: [
        'Editing modern & trending videos for YouTube and Instagram.',
        'Specialized in devotional, aesthetic, and cinematic edits.',
        'Full workflow: clipping, transitions, effects, color correction & export.'
      ]
    },
    {
      company: 'Parul Institute of Engineering & Technology',
      role: 'Bachelor of Technology',
      location: 'Vadodara',
      duration: '2023 — 2027',
      description: 'Pursuing B.Tech in Engineering & Technology.',
      highlights: [
        'Focusing on modern web technologies and full-stack development.',
        'Active member of the tech community.'
      ]
    },
    {
      company: 'Modi Boarding School',
      role: 'HSCE',
      location: 'Rajkot',
      duration: '2022 — 2023',
      description: 'Higher Secondary School Certificate.',
      highlights: []
    },
    {
      company: 'New Sarwa Mangal School',
      role: 'SSCE',
      location: 'Vadodara',
      duration: '2020 — 2021',
      description: 'Secondary School Certificate.',
      highlights: []
    }
  ];
}
