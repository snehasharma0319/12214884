import { useState, useEffect } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Box,
  Button,
} from '@mui/material';
import { UrlShortener, UrlList } from './components';
import { urlApi } from './api';
import type { UrlMapping, CreateUrlResponse } from './types';
import { logger } from 'shared/logger';

function App() {
  const [view, setView] = useState<'shorten' | 'list'>('shorten');
  const [urls, setUrls] = useState<UrlMapping[]>([]);

  useEffect(() => {
    logger.info('frontend', 'component', 'App started - fetching URLs');
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      logger.info('frontend', 'api', 'Fetching all URLs');
      const fetchedUrls = await urlApi.getAllUrls();
      setUrls(fetchedUrls);
      logger.info('frontend', 'component', `Loaded ${fetchedUrls.length} URLs`);
    } catch (error) {
      logger.error('frontend', 'api', `Error fetching URLs: ${error}`);
      console.error('Error fetching URLs:', error);
    }
  };

  const handleUrlCreated = (result: CreateUrlResponse, originalUrl: string) => {
    logger.info('frontend', 'component', `URL created: ${originalUrl} -> ${result.shortLink}`);
    const newUrl: UrlMapping = {
      originalUrl,
      shortCode: result.shortLink.split('/').pop() || '',
      createdAt: new Date().toISOString(),
      clicks: 0
    };
    setUrls(prev => [newUrl, ...prev]);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Button 
              variant={view === 'shorten' ? 'contained' : 'outlined'}
              onClick={() => setView('shorten')}
              sx={{ mr: 1 }}
            >
              Shorten URL
            </Button>
            <Button 
              variant={view === 'list' ? 'contained' : 'outlined'}
              onClick={() => setView('list')}
            >
              View URLs
            </Button>
          </Box>
          
          {view === 'shorten' && (
            <UrlShortener onUrlCreated={handleUrlCreated} />
          )}
          
          {view === 'list' && (
            <UrlList urls={urls} onRefresh={fetchUrls} />
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default App;
