import { Router } from 'express';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experience.controller.js';
import { requireAdminKey } from '../middlewares/adminAuth.js';

const router = Router();

// Public: View experiences
router.get('/', getExperiences);

// Admin Only: Manage experiences
router.post('/', requireAdminKey, createExperience);
router.put('/:id', requireAdminKey, updateExperience);
router.delete('/:id', requireAdminKey, deleteExperience);

export default router;
