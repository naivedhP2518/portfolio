import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  ExternalLink,
  Github,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Layers,
} from 'lucide-angular';
import { ApiService, ProjectItem } from '../../services/api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class AdminComponent implements OnInit {
  // Lucide Icons
  readonly LockIcon = Lock;
  readonly UnlockIcon = Unlock;
  readonly EyeIcon = Eye;
  readonly EyeOffIcon = EyeOff;
  readonly PlusIcon = Plus;
  readonly TrashIcon = Trash2;
  readonly EditIcon = Edit3;
  readonly SaveIcon = Save;
  readonly CloseIcon = X;
  readonly ExternalLinkIcon = ExternalLink;
  readonly GithubIcon = Github;
  readonly UploadIcon = Upload;
  readonly ImageIcon = ImageIcon;
  readonly CheckCircleIcon = CheckCircle;
  readonly AlertCircleIcon = AlertCircle;
  readonly ArrowLeftIcon = ArrowLeft;
  readonly RefreshIcon = RefreshCw;
  readonly LayersIcon = Layers;

  // Auth State
  isAuthenticated = false;
  adminKeyInput = '';
  showKey = false;
  authError = '';
  isVerifying = false;
  activeAdminKey = '';


  activeTab: 'projects' = 'projects';

  // Projects State
  projects: ProjectItem[] = [];
  isLoadingProjects = false;
  isNewProjectModalOpen = false;
  projectForm: {
    _id?: string;
    title: string;
    category: string;
    description: string;
    image: string;
    toolsString: string;
    link: string;
    github: string;
    order: number;
    featured: boolean;
  } = this.getEmptyProjectForm();

  // Upload status
  isUploading = false;
  uploadProgressMsg = '';

  // Toast notification
  toast: { message: string; type: 'success' | 'error' } | null = null;
  private toastTimeout: any;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if key is preserved in sessionStorage
    const savedKey = sessionStorage.getItem('portfolio_admin_key');
    if (savedKey) {
      this.activeAdminKey = savedKey;
      this.verifyAndLoad(savedKey);
    }
  }

  // Auth Verification
  login() {
    if (!this.adminKeyInput.trim()) {
      this.authError = 'Please enter the admin secret key.';
      return;
    }
    this.verifyAndLoad(this.adminKeyInput.trim());
  }

  verifyAndLoad(key: string) {
    this.isVerifying = true;
    this.authError = '';

    this.apiService.verifyAdminKey(key).subscribe({
      next: (res) => {
        this.isVerifying = false;
        if (res.success) {
          this.isAuthenticated = true;
          this.activeAdminKey = key;
          sessionStorage.setItem('portfolio_admin_key', key);
          this.loadProjects();
          this.showToast('Admin authenticated successfully', 'success');
        } else {
          this.authError = 'Invalid admin key. Access denied.';
        }
      },
      error: (err) => {
        this.isVerifying = false;
        this.authError = err.error?.message || 'Invalid admin key. Please check and try again.';
      },
    });
  }

  logout() {
    this.isAuthenticated = false;
    this.activeAdminKey = '';
    this.adminKeyInput = '';
    sessionStorage.removeItem('portfolio_admin_key');
    this.showToast('Logged out of admin panel', 'success');
  }

  toggleKeyVisibility() {
    this.showKey = !this.showKey;
  }

  // Load Data
  loadProjects() {
    this.isLoadingProjects = true;
    this.apiService.getProjects().subscribe({
      next: (res) => {
        this.isLoadingProjects = false;
        if (res.data) {
          this.projects = res.data;
        }
      },
      error: () => {
        this.isLoadingProjects = false;
        this.showToast('Could not load projects from server', 'error');
      },
    });
  }

  // Helper URL resolver
  resolveUrl(url?: string): string {
    return this.apiService.resolveMediaUrl(url);
  }

  // Toast Notification
  showToast(message: string, type: 'success' | 'error' = 'success') {
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toast = { message, type };
    this.toastTimeout = setTimeout(() => {
      this.toast = null;
    }, 4000);
  }

  // ==========================================
  // PROJECTS MANAGEMENT
  // ==========================================
  getEmptyProjectForm() {
    return {
      title: '',
      category: 'Full Stack App',
      description: '',
      image: '',
      toolsString: 'Angular, Node.js, Express, MongoDB',
      link: '',
      github: '',
      order: 1,
      featured: true,
    };
  }

  openAddProjectModal() {
    this.projectForm = this.getEmptyProjectForm();
    this.projectForm.order = this.projects.length + 1;
    this.isNewProjectModalOpen = true;
  }

  openEditProjectModal(project: ProjectItem) {
    this.projectForm = {
      _id: project._id,
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      toolsString: Array.isArray(project.tools) ? project.tools.join(', ') : '',
      link: project.link || '',
      github: project.github || '',
      order: project.order ?? 0,
      featured: project.featured ?? true,
    };
    this.isNewProjectModalOpen = true;
  }

  closeProjectModal() {
    this.isNewProjectModalOpen = false;
    this.projectForm = this.getEmptyProjectForm();
  }

  // File Upload for Project Image
  onProjectImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.isUploading = true;
    this.uploadProgressMsg = 'Uploading project image...';

    this.apiService.uploadMedia(file, this.activeAdminKey).subscribe({
      next: (res) => {
        this.isUploading = false;
        if (res.success && res.data?.url) {
          this.projectForm.image = res.data.url;
          this.showToast('Image uploaded successfully!', 'success');
        } else {
          this.showToast('Image upload failed', 'error');
        }
      },
      error: (err) => {
        this.isUploading = false;
        this.showToast(err.error?.message || 'Image upload error', 'error');
      },
    });
  }

  saveProject() {
    if (!this.projectForm.title.trim()) {
      this.showToast('Project title is required', 'error');
      return;
    }
    if (!this.projectForm.image.trim()) {
      this.showToast('Project image is required (upload or provide URL)', 'error');
      return;
    }

    const tools = this.projectForm.toolsString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload: Partial<ProjectItem> = {
      title: this.projectForm.title.trim(),
      category: this.projectForm.category.trim(),
      description: this.projectForm.description.trim(),
      image: this.projectForm.image.trim(),
      tools,
      link: this.projectForm.link.trim(),
      github: this.projectForm.github.trim(),
      order: Number(this.projectForm.order) || 0,
      featured: this.projectForm.featured,
    };

    if (this.projectForm._id) {
      // Update
      this.apiService.updateProject(this.projectForm._id, payload, this.activeAdminKey).subscribe({
        next: (res) => {
          if (res.success) {
            this.showToast('Project updated successfully!', 'success');
            this.closeProjectModal();
            this.loadProjects();
          }
        },
        error: (err) => {
          this.showToast(err.error?.message || 'Failed to update project', 'error');
        },
      });
    } else {
      // Create
      this.apiService.createProject(payload, this.activeAdminKey).subscribe({
        next: (res) => {
          if (res.success) {
            this.showToast('New project added successfully!', 'success');
            this.closeProjectModal();
            this.loadProjects();
          }
        },
        error: (err) => {
          this.showToast(err.error?.message || 'Failed to add project', 'error');
        },
      });
    }
  }

  deleteProject(project: ProjectItem) {
    if (!project._id) return;
    const confirmDelete = confirm(`Are you sure you want to delete "${project.title}"?`);
    if (!confirmDelete) return;

    this.apiService.deleteProject(project._id, this.activeAdminKey).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast('Project deleted successfully', 'success');
          this.loadProjects();
        }
      },
      error: (err) => {
        this.showToast(err.error?.message || 'Failed to delete project', 'error');
      },
    });
  }

}
