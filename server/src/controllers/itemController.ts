import { Response } from 'express';
import Item from '../models/Item';
import { AuthRequest, ItemType } from '../types';
import { sendClaimNotification, sendClaimSuccessNotification } from '../utils/email';
import Notification from '../models/Notification';

export const createItem = async (req: AuthRequest, res: Response) => {
  try {
    // Parse security questions if they exist
    let securityQuestions;
    if (req.body.securityQuestions) {
      try {
        securityQuestions = JSON.parse(req.body.securityQuestions);
      } catch (e) {
        securityQuestions = req.body.securityQuestions;
      }
    }

    // Get uploaded image paths
    const images = (req.files as Express.Multer.File[])?.map(file => 
      `/uploads/${file.filename}`
    ) || [];

    console.log('Uploaded images:', images);
    console.log('Files received:', req.files);

    const itemData = {
      ...req.body,
      userId: req.user!.id,
      images,
      securityQuestions,
      contactInfo: {
        email: req.user!.email,
        phone: req.body.phoneNumber
      }
    };

    const item = new Item(itemData);
    await item.save();

    console.log('Item saved with images:', item.images);

    res.status(201).json(item);
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getItems = async (req: AuthRequest, res: Response) => {
  try {
    const { type, category, location, status, search, page = 1, limit = 20 } = req.query;

    const query: any = {};
    if (type) query.type = type;
    if (category) query.category = category;
    if (location) query.location = location;
    if (status) query.status = status;
    if (search) query.$text = { $search: search as string };

    const items = await Item.find(query)
      .populate('userId', 'displayName email')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Item.countDocuments(query);

    res.json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getItemById = async (req: AuthRequest, res: Response) => {
  try {
    const item = await Item.findById(req.params.id).populate('userId', 'displayName email');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.userId.toString() !== req.user!.id && req.user!.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(item, req.body);
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteItem = async (req: AuthRequest, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.userId.toString() !== req.user!.id && req.user!.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const claimItem = async (req: AuthRequest, res: Response) => {
  try {
    const item = await Item.findById(req.params.id).populate('userId', 'displayName email');
    if (!item || item.type !== ItemType.FOUND) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const userAttempts = item.claimAttempts.filter(
      a => a.userId.toString() === req.user!.id
    );

    if (userAttempts.length >= 3) {
      return res.status(429).json({ message: 'Maximum claim attempts exceeded' });
    }

    const { answers } = req.body;
    let matchCount = 0;

    item.securityQuestions?.forEach((sq, index) => {
      if (sq.answer.toLowerCase().trim() === answers[index]?.toLowerCase().trim()) {
        matchCount++;
      }
    });

    const success = matchCount >= (item.securityQuestions?.length || 0) * 0.8;

    item.claimAttempts.push({
      userId: req.user!.id as any,
      attemptDate: new Date(),
      success
    });

    await item.save();

    if (success) {
      await sendClaimSuccessNotification(req.user!.email, item.title);
      await sendClaimNotification((item.userId as any).email, item.title, req.user!.email);

      await Notification.create({
        userId: item.userId,
        type: 'claim_success',
        title: 'Item Claimed',
        message: `Your item "${item.title}" has been successfully claimed`,
        itemId: item._id
      });

      res.json({
        success: true,
        message: 'Claim verified',
        contactInfo: item.contactInfo
      });
    } else {
      res.json({
        success: false,
        message: 'Answers do not match',
        attemptsRemaining: 3 - userAttempts.length - 1
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
