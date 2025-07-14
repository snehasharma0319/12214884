import express, { Request, Response } from 'express';
import cors from 'cors';
import { CreateUrlRequest, CreateUrlResponse, UrlMapping } from './types';
import { urlStore } from './store';
import { isValidUrl, generateShortCode } from './utils';
import { logger } from 'shared/logger';

const app = express();
const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.post('/shorturls', (req: Request, res: Response) => {
  try {
    logger.info('backend', 'handler', 'Processing URL shortening request');
    
    const { url }: CreateUrlRequest = req.body;

    if (!url || !isValidUrl(url)) {
      logger.warn('backend', 'handler', 'Invalid URL provided');
      return res.status(400).json({ error: 'Invalid URL' });
    }

    let shortCode = generateShortCode();
    while (urlStore.exists(shortCode)) {
      shortCode = generateShortCode();
    }

    const mapping: UrlMapping = {
      originalUrl: url,
      shortCode,
      createdAt: new Date(),
      clicks: 0
    };

    urlStore.addUrl(mapping);
    logger.info('backend', 'service', `URL shortened: ${url} -> ${shortCode}`);

    const response: CreateUrlResponse = {
      shortLink: `${BASE_URL}/${shortCode}`
    };

    res.status(201).json(response);
  } catch (error) {
    logger.error('backend', 'handler', `Error creating short URL: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/:shortCode', (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    logger.info('backend', 'handler', `Redirect request for: ${shortCode}`);
    
    const mapping = urlStore.getUrl(shortCode);

    if (!mapping) {
      logger.warn('backend', 'handler', `URL not found: ${shortCode}`);
      return res.status(404).json({ error: 'URL not found' });
    }

    urlStore.addClick(shortCode);
    logger.info('backend', 'service', `Redirecting ${shortCode} to ${mapping.originalUrl}`);
    res.redirect(mapping.originalUrl);
  } catch (error) {
    logger.error('backend', 'handler', `Error during redirect: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/urls', (req: Request, res: Response) => {
  try {
    logger.info('backend', 'handler', 'Request for all URLs');
    const urls = urlStore.getAllUrls();
    res.json(urls);
  } catch (error) {
    logger.error('backend', 'handler', `Error getting URLs: ${error}`);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  logger.info('backend', 'service', `Server started on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});


