import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Loader } from './components/loader/loader';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  isAppReady = false;

  constructor(private loadingService: LoadingService) {}

  onLoaderComplete() {
    this.isAppReady = true;
    this.loadingService.setLoaded(true);
  }
}
