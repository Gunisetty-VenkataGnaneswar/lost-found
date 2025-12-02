import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { analyzeItemImage, findMatches } from '../controllers/aiController';

const router = Router();

router.post('/analyze-image', authenticate, analyzeItemImage);
router.get('/find-matches/:itemId', authenticate, findMatches);

export default router;
