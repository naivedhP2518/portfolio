import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, AlertCircle } from 'lucide-angular';
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
  readonly PhoneIcon = Phone;
  readonly MapIcon = MapPin;
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
      value: 'naivedhpatel25@gmail.com',
      link: 'mailto:naivedhpatel25@gmail.com'
    },
    {
      icon: this.PhoneIcon,
      label: 'Phone',
      value: '+91 9313096998',
      link: 'tel:+919313096998'
    },
    {
      icon: this.MapIcon,
      label: 'Location',
      value: 'Nandanvan Society, Vadodara',
      link: 'https://maps.app.goo.gl/rQ3MCA8PQb7Neswt7'
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
      error: (error) => {
        this.isSubmitting = false;
        this.isError = true;
        console.error('Contact submission error:', error);
      }
    });
  }
}

