import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { requireAdminKey } from '../middlewares/adminAuth.js';
import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';

const router = Router();

// Ensure temporary uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitizedBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `${sanitizedBase}-${uniqueSuffix}${ext}`);
  },
});

// File filter for images and videos
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed: Images (JPG, PNG, WebP, GIF, SVG) and Videos (MP4, WebM, QuickTime).`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit to allow high-res videos
  },
});

// Admin-protected file upload endpoint with Cloudinary Support
router.post('/', requireAdminKey, upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({
      success: false,
      message: 'No file uploaded.',
    });
    return;
  }

  const isVideo = req.file.mimetype.startsWith('video/');

  try {
    // If Cloudinary keys are configured, stream to Cloudinary CDN
    if (isCloudinaryConfigured) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto',
        folder: 'portfolio',
        use_filename: true,
        unique_filename: true,
      });

      // Remove temporary file from local disk
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(200).json({
        success: true,
        message: `${isVideo ? 'Video' : 'Image'} uploaded to Cloudinary CDN successfully.`,
        data: {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          format: uploadResult.format,
          bytes: uploadResult.bytes,
          type: isVideo ? 'video' : 'image',
          provider: 'cloudinary',
        },
      });
      return;
    }

    // Fallback: Local storage if Cloudinary is not yet configured
    const localUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: `${isVideo ? 'Video' : 'Image'} stored locally. (Tip: Add Cloudinary keys to .env for cloud CDN storage)`,
      data: {
        url: localUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        type: isVideo ? 'video' : 'image',
        provider: 'local',
      },
    });
  } catch (error: any) {
    // Clean up local temp file on error
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (_) {}
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload media.',
    });
  }
});

export default router;
