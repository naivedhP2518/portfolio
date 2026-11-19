import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Mail, Github, Linkedin, Send, MessageSquare, CheckCircle, AlertCircle } from 'lucide-angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  readonly MailIcon = Mail;
  readonly GithubIcon = Github;
  readonly LinkedinIcon = Linkedin;
  readonly SendIcon = Send;
  readonly MsgIcon = MessageSquare;
  readonly SuccessIcon = CheckCircle;
  readonly ErrorIcon = AlertCircle;

  isSubmitting = false;
  isSuccess = false;
  isError = false;

  constructor(private apiService: ApiService) {}

  contactInfo = [
    {
      icon: this.MailIcon,
      label: 'Email',
      value: 'naivedhpatel2514@gmail.com',
      link: 'mailto:naivedhpatel2514@gmail.com'
    },
    {
      icon: this.GithubIcon,
      label: 'GitHub',
      value: 'github.com/naivedhP2518',
      link: 'https://github.com/naivedhP2518'
    },
    {
      icon: this.LinkedinIcon,
      label: 'LinkedIn',
      value: 'linkedin.com/in/naivedh2518',
      link: 'https://www.linkedin.com/in/naivedh2518/'
    }
  ];

  formData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.isSuccess = false;
    this.isError = false;

    this.apiService.submitContact(this.formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.isSuccess = true;
        this.formData = { name: '', email: '', message: '' };
        
        // Reset success message after 5 seconds
        setTimeout(() => (this.isSuccess = false), 5000);
      },
      error: () => {
        this.isSubmitting = false;
        this.isError = true;
      }
    });
  }
}

