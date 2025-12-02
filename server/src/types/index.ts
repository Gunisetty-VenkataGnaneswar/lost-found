import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'user' | 'admin';
  };
}

export enum ItemStatus {
  ACTIVE = 'active',
  CLAIMED = 'claimed',
  RESOLVED = 'resolved'
}

export enum ItemType {
  LOST = 'lost',
  FOUND = 'found'
}

export enum ItemCategory {
  ELECTRONICS = 'Electronics',
  CLOTHING = 'Clothing',
  BOOKS = 'Books',
  IDS_CARDS = 'IDs/Cards',
  KEYS = 'Keys',
  BAGS = 'Bags',
  ACCESSORIES = 'Accessories',
  OTHER = 'Other'
}
