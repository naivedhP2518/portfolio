import { Router } from 'express';
import {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/gallery.controller.js';
import { requireAdminKey } from '../middlewares/adminAuth.js';

const router = Router();

// Public: View gallery items
router.get('/', getGalleryItems);
router.get('/:id', getGalleryItemById);

// Admin Only: Manage gallery items (create, update/replace image or video, delete)
router.post('/', requireAdminKey, createGalleryItem);
router.put('/:id', requireAdminKey, updateGalleryItem);
router.delete('/:id', requireAdminKey, deleteGalleryItem);

export default router;
