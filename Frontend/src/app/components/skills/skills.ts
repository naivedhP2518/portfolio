import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  skillCategories = [
    {
      name: 'Frontend & Design',
      skills: [
        { name: 'HTML / CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'React', level: 85 },
        { name: 'UI/UX Design', level: 88 }
      ]
    },
    {
      name: 'Backend & Database',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'MongoDB', level: 82 },
        { name: 'MySQL', level: 85 }
      ]
    },
    {
      name: 'Creative & Tools',
      skills: [
        { name: 'Video Editing', level: 92 },
        { name: 'Motion Graphics', level: 85 },
        { name: 'Premiere Pro', level: 80 },
        { name: 'Photoshop', level: 85 }
      ]
    }
  ];
}
