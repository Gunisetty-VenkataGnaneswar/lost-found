import { Response } from 'express';
import { AuthRequest, ItemType } from '../types';
import Item from '../models/Item';
import { analyzeImage, findSimilarItems, extractItemDetails } from '../utils/gemini';

export const analyzeItemImage = async (req: AuthRequest, res: Response) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ message: 'Image data required' });
    }

    const analysis = await analyzeImage(imageBase64);
    const details = await extractItemDetails(imageBase64);

    res.json({
      analysis,
      suggestedCategory: details.category,
      suggestedTitle: details.title,
      detectedText: details.text
    });
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ message: 'Failed to analyze image' });
  }
};

export const findMatches = async (req: AuthRequest, res: Response) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Find opposite type items (lost items match with found, vice versa)
    const oppositeType = item.type === ItemType.LOST ? ItemType.FOUND : ItemType.LOST;
    
    const candidateItems = await Item.find({
      type: oppositeType,
      status: 'active',
      category: item.category
    })
      .limit(20)
      .select('title description _id');

    if (candidateItems.length === 0) {
      return res.json({ matches: [] });
    }

    const matches = await findSimilarItems(
      `${item.title}: ${item.description}`,
      item.images[0] || '',
      candidateItems.map(c => ({
        _id: c._id.toString(),
        title: c.title,
        description: c.description
      }))
    );

    // Populate full item details for matches
    const matchedItems = await Item.find({
      _id: { $in: matches.map(m => m.itemId) }
    }).populate('userId', 'displayName email');

    const enrichedMatches = matches.map(match => {
      const matchedItem = matchedItems.find(
        item => item._id.toString() === match.itemId
      );
      return {
        ...match,
        item: matchedItem
      };
    });

    res.json({ matches: enrichedMatches });
  } catch (error) {
    console.error('Match finding error:', error);
    res.status(500).json({ message: 'Failed to find matches' });
  }
};
