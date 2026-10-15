import { Router } from 'express';
import {
  submitContact,
  getMessages,
  deleteMessage,
} from '../controllers/contact.controller.js';
import { requireAdminKey } from '../middlewares/adminAuth.js';
import { contactLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

// Public: Submit a message (rate limited)
router.post('/', contactLimiter, submitContact);

// Admin Only: View & Delete messages
router.get('/messages', requireAdminKey, getMessages);
router.delete('/messages/:id', requireAdminKey, deleteMessage);

export default router;
