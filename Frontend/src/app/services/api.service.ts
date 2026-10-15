import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ProjectItem {
  _id?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tools: string[];
  link?: string;
  github?: string;
  order?: number;
  featured?: boolean;
}

export interface GalleryItem {
  _id?: string;
  title: string;
  category: string;
  size: 'small' | 'medium' | 'large';
  image?: string;
  video?: string;
  order?: number;
}

export interface ExperienceItem {
  _id?: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  description: string;
  highlights: string[];
  order?: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAdminHeaders(adminKey: string): HttpHeaders {
    return new HttpHeaders({
      'x-admin-key': adminKey,
    });
  }

  // Resolve media URLs (e.g. uploaded files from backend vs local assets/external links)
  resolveMediaUrl(url?: string): string {
    if (!url) return '';
    if (url.startsWith('/uploads')) {
      const backendBase = this.apiUrl.replace(/\/api\/?$/, '');
      return `${backendBase}${url}`;
    }
    return url;
  }

  // Admin Verification
  verifyAdminKey(adminKey: string): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>(
      `${this.apiUrl}/admin/verify`,
      {},
      { headers: this.getAdminHeaders(adminKey) }
    );
  }

  // Contact API
  submitContact(data: ContactPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, data);
  }

  // Projects API (Public)
  getProjects(): Observable<{ success: boolean; data: ProjectItem[] }> {
    return this.http
      .get<{ success: boolean; data: ProjectItem[] }>(`${this.apiUrl}/projects`)
      .pipe(
        catchError((err) => {
          console.warn('Backend API unavailable, using local project fallback:', err);
          return of({ success: false, data: [] });
        })
      );
  }

  // Projects API (Admin)
  createProject(project: Partial<ProjectItem>, adminKey: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/projects`, project, {
      headers: this.getAdminHeaders(adminKey),
    });
  }

  updateProject(id: string, project: Partial<ProjectItem>, adminKey: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/projects/${id}`, project, {
      headers: this.getAdminHeaders(adminKey),
    });
  }

  deleteProject(id: string, adminKey: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/projects/${id}`, {
      headers: this.getAdminHeaders(adminKey),
    });
  }

  // Gallery / Images Section API (Public)
  getGallery(): Observable<{ success: boolean; data: GalleryItem[] }> {
    return this.http
      .get<{ success: boolean; data: GalleryItem[] }>(`${this.apiUrl}/gallery`)
      .pipe(
        catchError((err) => {
          console.warn('Backend API unavailable, using local gallery fallback:', err);
          return of({ success: false, data: [] });
        })
      );
  }

  // Gallery API (Admin)
  createGalleryItem(item: Partial<GalleryItem>, adminKey: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/gallery`, item, {
      headers: this.getAdminHeaders(adminKey),
    });
  }

  updateGalleryItem(id: string, item: Partial<GalleryItem>, adminKey: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/gallery/${id}`, item, {
      headers: this.getAdminHeaders(adminKey),
    });
  }

  deleteGalleryItem(id: string, adminKey: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/gallery/${id}`, {
      headers: this.getAdminHeaders(adminKey),
    });
  }

  // Media Upload (Admin)
  uploadMedia(file: File, adminKey: string): Observable<{ success: boolean; message?: string; data?: { url: string; type: string } }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ success: boolean; message?: string; data?: { url: string; type: string } }>(
      `${this.apiUrl}/upload`,
      formData,
      { headers: this.getAdminHeaders(adminKey) }
    );
  }

  // Experience API
  getExperiences(): Observable<{ success: boolean; data: ExperienceItem[] }> {
    return this.http
      .get<{ success: boolean; data: ExperienceItem[] }>(`${this.apiUrl}/experience`)
      .pipe(
        catchError((err) => {
          console.warn('Backend API unavailable, using local experience fallback:', err);
          return of({ success: false, data: [] });
        })
      );
  }
}
