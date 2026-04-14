import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Maximize2, Search, Video, X, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-angular';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  readonly MaximizeIcon = Maximize2;
  readonly SearchIcon = Search;
  readonly CloseIcon = X;
  readonly VideoIcon = Video;
  readonly PlayIcon = Play;
  readonly PauseIcon = Pause;
  readonly VolumeIcon = Volume2;
  readonly MuteIcon = VolumeX;
  readonly ResetIcon = RotateCcw;

  isModalOpen = false;
  selectedMedia: { url: string; type: 'image' | 'video' } | null = null;
  
  // Video Player State
  isPlaying = false;
  isMuted = false;
  currentTime = 0;
  duration = 0;
  volume = 1;

  openModal(url: string, type: 'image' | 'video') {
    this.selectedMedia = { url, type };
    this.isModalOpen = true;
    this.isPlaying = type === 'video'; // Auto-play video
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedMedia = null;
    this.isPlaying = false;
    document.body.style.overflow = 'auto';
  }

  togglePlay(video: HTMLVideoElement) {
    if (this.isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  toggleMute(video: HTMLVideoElement) {
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
  }

  onTimeUpdate(video: HTMLVideoElement) {
    this.currentTime = video.currentTime;
  }

  onLoadedMetadata(video: HTMLVideoElement) {
    this.duration = video.duration;
  }

  seek(value: string, video: HTMLVideoElement) {
    const time = parseFloat(value);
    video.currentTime = time;
    this.currentTime = time;
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  galleryItems = [
    { title: 'Lyrics Based Editing', category: 'Editing', size: 'large', image: 'assets/CoverPage.png', video: 'assets/SojaZara.mp4'},
    { title: 'Rental Platform', category: 'Full Stack', size: 'small', image: 'assets/Rental-web.png' },
    { title: 'Chat Interface', category: 'Real-time', size: 'medium', image: 'assets/Chat-Web.png' },
    { title: 'Meme Based Video', category: 'Comedy', size: 'medium', image: 'assets/CoverPage1.jpg', video: 'assets/MemeBaseVideo.mp4' },
    { title: 'Video Motion Graphic', category: 'Creative', size: 'large', image: 'assets/Dwarka-img.png', video: 'assets/Dwarka.mp4' },
    { title: 'Mini Web App', category: 'Frontend', size: 'small', image: 'assets/More-Projects.png' }
  ];
}
