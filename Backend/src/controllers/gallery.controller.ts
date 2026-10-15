import { Request, Response } from 'express';
import { Gallery } from '../models/Gallery.js';

export const getGalleryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await Gallery.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch gallery items.',
    });
  }
};

export const getGalleryItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await Gallery.findById(id);

    if (!item) {
      res.status(404).json({
        success: false,
        message: 'Gallery item not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch gallery item.',
    });
  }
};

export const createGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, size, image, video, order } = req.body;

    if (!title || !category) {
      res.status(400).json({
        success: false,
        message: 'Title and category are required.',
      });
      return;
    }

    if (!image && !video) {
      res.status(400).json({
        success: false,
        message: 'At least an image or a video must be provided.',
      });
      return;
    }

    const newItem = await Gallery.create({
      title,
      category,
      size: size || 'medium',
      image: image || '',
      video: video || '',
      order: typeof order === 'number' ? order : 0,
    });

    res.status(201).json({
      success: true,
      message: 'Gallery item created successfully.',
      data: newItem,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create gallery item.',
    });
  }
};

export const updateGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Gallery.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({
        success: false,
        message: 'Gallery item not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update gallery item.',
    });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Gallery.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Gallery item not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully.',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete gallery item.',
    });
  }
};
