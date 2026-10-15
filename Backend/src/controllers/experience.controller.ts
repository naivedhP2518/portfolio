import { Request, Response } from 'express';
import { Experience } from '../models/Experience.js';

export const getExperiences = async (req: Request, res: Response): Promise<void> => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch experiences.',
    });
  }
};

export const createExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const { company, role, location, duration, description, highlights, order } = req.body;

    if (!company || !role || !location || !duration || !description) {
      res.status(400).json({
        success: false,
        message: 'Company, role, location, duration, and description are required.',
      });
      return;
    }

    const experience = await Experience.create({
      company,
      role,
      location,
      duration,
      description,
      highlights: Array.isArray(highlights) ? highlights : [],
      order: typeof order === 'number' ? order : 0,
    });

    res.status(201).json({
      success: true,
      message: 'Experience entry created successfully.',
      data: experience,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create experience.',
    });
  }
};

export const updateExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Experience.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({
        success: false,
        message: 'Experience entry not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Experience entry updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update experience.',
    });
  }
};

export const deleteExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Experience.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Experience entry not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Experience entry deleted successfully.',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete experience.',
    });
  }
};
