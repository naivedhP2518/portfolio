import { Request, Response, NextFunction } from 'express';

export const requireAdminKey = (req: Request, res: Response, next: NextFunction): void => {
  const adminSecret = process.env.ADMIN_SECRET_KEY;
  const providedKey = req.headers['x-admin-key'] || req.query['adminKey'];

  if (!adminSecret) {
    res.status(500).json({
      success: false,
      message: 'ADMIN_SECRET_KEY is not configured on the server.',
    });
    return;
  }

  if (!providedKey || providedKey !== adminSecret) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or missing Admin Key (x-admin-key header).',
    });
    return;
  }

  next();
};
