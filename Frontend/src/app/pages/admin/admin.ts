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
  Video as VideoIcon,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Layers,
  Sparkles,
} from 'lucide-angular';
import { ApiService, ProjectItem, GalleryItem } from '../../services/api.service';

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
  readonly VideoIcon = VideoIcon;
  readonly CheckCircleIcon = CheckCircle;
  readonly AlertCircleIcon = AlertCircle;
  readonly ArrowLeftIcon = ArrowLeft;
  readonly RefreshIcon = RefreshCw;
  readonly LayersIcon = Layers;
  readonly SparklesIcon = Sparkles;

  // Auth State
  isAuthenticated = false;
  adminKeyInput = '';
  showKey = false;
  authError = '';
  isVerifying = false;
  activeAdminKey = '';

  // Tab State: 'projects' | 'gallery'
  activeTab: 'projects' | 'gallery' = 'projects';

  // Projects State
  projects: ProjectItem[] = [];
  isLoadingProjects = false;
  editingProject: Partial<ProjectItem> | null = null;
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

  // Gallery / Images Section State
  galleryItems: GalleryItem[] = [];
  isLoadingGallery = false;
  isGalleryModalOpen = false;
  galleryForm: {
    _id?: string;
    title: string;
    category: string;
    size: 'small' | 'medium' | 'large';
    image: string;
    video: string;
    order: number;
  } = this.getEmptyGalleryForm();

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
          this.loadGallery();
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

  loadGallery() {
    this.isLoadingGallery = true;
    this.apiService.getGallery().subscribe({
      next: (res) => {
        this.isLoadingGallery = false;
        if (res.data) {
          this.galleryItems = res.data;
        }
      },
      error: () => {
        this.isLoadingGallery = false;
        this.showToast('Could not load showcase items from server', 'error');
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

  // ==========================================
  // GALLERY / IMAGES SECTION MANAGEMENT
  // ==========================================
  getEmptyGalleryForm() {
    return {
      title: '',
      category: 'Creative',
      size: 'medium' as 'small' | 'medium' | 'large',
      image: '',
      video: '',
      order: 1,
    };
  }

  openAddGalleryModal() {
    this.galleryForm = this.getEmptyGalleryForm();
    this.galleryForm.order = this.galleryItems.length + 1;
    this.isGalleryModalOpen = true;
  }

  openEditGalleryModal(item: GalleryItem) {
    this.galleryForm = {
      _id: item._id,
      title: item.title,
      category: item.category,
      size: item.size || 'medium',
      image: item.image || '',
      video: item.video || '',
      order: item.order ?? 0,
    };
    this.isGalleryModalOpen = true;
  }

  closeGalleryModal() {
    this.isGalleryModalOpen = false;
    this.galleryForm = this.getEmptyGalleryForm();
  }

  // Replace/Upload Image in Gallery Item
  onGalleryImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.isUploading = true;
    this.uploadProgressMsg = 'Uploading showcase image...';

    this.apiService.uploadMedia(file, this.activeAdminKey).subscribe({
      next: (res) => {
        this.isUploading = false;
        if (res.success && res.data?.url) {
          this.galleryForm.image = res.data.url;
          this.showToast('Image replaced/uploaded successfully!', 'success');
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

  // Replace/Upload Video in Gallery Item
  onGalleryVideoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.isUploading = true;
    this.uploadProgressMsg = 'Uploading showcase video (this may take a few moments)...';

    this.apiService.uploadMedia(file, this.activeAdminKey).subscribe({
      next: (res) => {
        this.isUploading = false;
        if (res.success && res.data?.url) {
          this.galleryForm.video = res.data.url;
          this.showToast('Video replaced/uploaded successfully!', 'success');
        } else {
          this.showToast('Video upload failed', 'error');
        }
      },
      error: (err) => {
        this.isUploading = false;
        this.showToast(err.error?.message || 'Video upload error', 'error');
      },
    });
  }

  saveGalleryItem() {
    if (!this.galleryForm.title.trim()) {
      this.showToast('Title is required', 'error');
      return;
    }
    if (!this.galleryForm.image && !this.galleryForm.video) {
      this.showToast('Please provide or upload at least an Image or a Video', 'error');
      return;
    }

    const payload: Partial<GalleryItem> = {
      title: this.galleryForm.title.trim(),
      category: this.galleryForm.category.trim(),
      size: this.galleryForm.size,
      image: this.galleryForm.image.trim(),
      video: this.galleryForm.video.trim(),
      order: Number(this.galleryForm.order) || 0,
    };

    if (this.galleryForm._id) {
      // Update
      this.apiService.updateGalleryItem(this.galleryForm._id, payload, this.activeAdminKey).subscribe({
        next: (res) => {
          if (res.success) {
            this.showToast('Showcase item updated successfully!', 'success');
            this.closeGalleryModal();
            this.loadGallery();
          }
        },
        error: (err) => {
          this.showToast(err.error?.message || 'Failed to update item', 'error');
        },
      });
    } else {
      // Create
      this.apiService.createGalleryItem(payload, this.activeAdminKey).subscribe({
        next: (res) => {
          if (res.success) {
            this.showToast('New showcase item added successfully!', 'success');
            this.closeGalleryModal();
            this.loadGallery();
          }
        },
        error: (err) => {
          this.showToast(err.error?.message || 'Failed to add item', 'error');
        },
      });
    }
  }

  deleteGalleryItem(item: GalleryItem) {
    if (!item._id) return;
    const confirmDelete = confirm(`Are you sure you want to delete "${item.title}"?`);
    if (!confirmDelete) return;

    this.apiService.deleteGalleryItem(item._id, this.activeAdminKey).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast('Showcase item deleted', 'success');
          this.loadGallery();
        }
      },
      error: (err) => {
        this.showToast(err.error?.message || 'Failed to delete item', 'error');
      },
    });
  }
}
