import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { urlApi } from '../api';
import type { CreateUrlResponse } from '../types';

interface UrlShortenerProps {
  onUrlCreated: (result: CreateUrlResponse, originalUrl: string) => void;
}

const UrlShortener = ({ onUrlCreated }: UrlShortenerProps) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const result = await urlApi.shortenUrl({ url });
      onUrlCreated(result, url);
      setSuccess(`Short URL created: ${result.shortLink}`);
      setUrl('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create short URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shorten a URL
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          disabled={loading}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !url}
        >
          {loading ? 'Creating...' : 'Shorten'}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
    </Box>
  );
};



export default UrlShortener;
