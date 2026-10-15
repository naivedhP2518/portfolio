import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';
import { requireAdminKey } from '../middlewares/adminAuth.js';

const router = Router();

// Public: View projects
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin Only: Manage projects
router.post('/', requireAdminKey, createProject);
router.put('/:id', requireAdminKey, updateProject);
router.delete('/:id', requireAdminKey, deleteProject);

export default router;
