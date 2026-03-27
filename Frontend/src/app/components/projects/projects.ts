import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ExternalLink, Github, Eye } from 'lucide-angular';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  readonly ExternalLinkIcon = ExternalLink;
  readonly GithubIcon = Github;
  readonly EyeIcon = Eye;

  projects = [
    {
      title: 'Hotel Website',
      category: 'MEAN Stack',
      description: 'Developed a modern hotel booking interface with premium UI design, smooth animations, and responsive layout.',
      image: 'assets/hotel-web.png',
      tools: ['MongoDB', 'Express', 'Angular', 'Node.js'],
      link: '#',
      github: 'https://github.com/naivedhP2518'
    },
    {
      title: 'Rental Website',
      category: 'MEAN Stack',
      description: 'Built a complete rental platform with backend integration, database handling, and user interaction features.',
      image: 'assets/Rental-web.png',
      tools: ['MongoDB', 'Express', 'Angular', 'Node.js'],
      link: '#',
      github: 'https://github.com/naivedhP2518/UrbanNest'
    },
    {
      title: 'Live Chat Website',
      category: 'Socket.IO Integration',
      description: 'Created a real-time chat application using Socket.IO with instant messaging and dynamic updates.',
      image: 'assets/Chat-Web.png',
      tools: ['Socket.io', 'Node.js', 'Express', 'Angular'],
      link: '#',
      github: 'https://github.com/naivedhP2518/Chat-Web'
    },
    {
      title: '10+ Small Projects',
      category: 'Frontend & Backend',
      description: 'Including UI-based apps, tools, and mini web applications showcasing various developer skills.',
      image: 'assets/More-Projects.png',
      tools: ['HTML', 'CSS', 'JavaScript', 'React'],
      link: '#',
      github: 'https://github.com/naivedhP2518?tab=repositories'
    }
  ];
}
