import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  claimItem
} from '../controllers/itemController';

const router = Router();

router.post('/', authenticate, upload.array('images', 5), createItem);
router.get('/', authenticate, getItems);
router.get('/:id', authenticate, getItemById);
router.put('/:id', authenticate, updateItem);
router.delete('/:id', authenticate, deleteItem);
router.post('/:id/claim', authenticate, claimItem);

export default router;
