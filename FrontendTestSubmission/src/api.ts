import axios from 'axios';
import type { CreateUrlRequest, CreateUrlResponse, UrlMapping } from './types';
import { logger } from 'shared/logger';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const urlApi = {
  shortenUrl: async (request: CreateUrlRequest): Promise<CreateUrlResponse> => {
    logger.info('frontend', 'api', `Shortening URL: ${request.url}`);
    const response = await api.post('/shorturls', request);
    logger.info('frontend', 'api', `URL shortened to: ${response.data.shortLink}`);
    return response.data;
  },

  getAllUrls: async (): Promise<UrlMapping[]> => {
    logger.info('frontend', 'api', 'Fetching all URLs');
    const response = await api.get('/api/urls');
    return response.data;
  },
};
