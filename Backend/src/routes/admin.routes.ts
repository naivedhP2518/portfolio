import { Router, Request, Response } from 'express';
import { requireAdminKey } from '../middlewares/adminAuth.js';

const router = Router();

// Endpoint to verify Admin Key from Admin Panel UI
router.post('/verify', requireAdminKey, (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: 'Admin key verified successfully.',
  });
});

export default router;
