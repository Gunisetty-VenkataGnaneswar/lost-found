import mongoose, { Document, Schema } from 'mongoose';
import { ItemStatus, ItemType, ItemCategory } from '../types';

interface SecurityQuestion {
  question: string;
  answer: string;
}

export interface IItem extends Document {
  userId: mongoose.Types.ObjectId;
  type: ItemType;
  title: string;
  category: ItemCategory;
  description: string;
  date: Date;
  location: string;
  currentLocation?: string;
  images: string[];
  status: ItemStatus;
  securityQuestions?: SecurityQuestion[];
  contactInfo: {
    email: string;
    phone?: string;
  };
  claimAttempts: Array<{
    userId: mongoose.Types.ObjectId;
    attemptDate: Date;
    success: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema<IItem>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: Object.values(ItemType),
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  category: {
    type: String,
    enum: Object.values(ItemCategory),
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  currentLocation: {
    type: String
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: Object.values(ItemStatus),
    default: ItemStatus.ACTIVE
  },
  securityQuestions: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  contactInfo: {
    email: { type: String, required: true },
    phone: String
  },
  claimAttempts: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    attemptDate: { type: Date, default: Date.now },
    success: Boolean
  }]
}, {
  timestamps: true
});

itemSchema.index({ title: 'text', description: 'text' });
itemSchema.index({ type: 1, status: 1, createdAt: -1 });

export default mongoose.model<IItem>('Item', itemSchema);
