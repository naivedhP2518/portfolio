import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Experience } from '../../components/experience/experience';
import { Projects } from '../../components/projects/projects';
import { Skills } from '../../components/skills/skills';
import { Portfolio } from '../../components/portfolio/portfolio';
import { Contact } from '../../components/contact/contact';

import { Cursor } from '../../components/cursor/cursor';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Hero,
    About,
    Experience,
    Projects,
    Skills,
    Portfolio,
    Contact,
    Cursor
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
