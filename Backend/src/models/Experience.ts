import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  role: string;
  location: string;
  duration: string;
  description: string;
  highlights: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: Schema = new Schema(
  {
    company: {
      type: String,
      required: [true, 'Company / Institute name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role / Degree is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    highlights: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Experience = mongoose.model<IExperience>('Experience', ExperienceSchema);
