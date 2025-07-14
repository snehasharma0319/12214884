import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import { Launch, Refresh } from '@mui/icons-material';
import type { UrlMapping } from '../types';

interface UrlListProps {
  urls: UrlMapping[];
  onRefresh: () => void;
}

const UrlList = ({ urls, onRefresh }: UrlListProps) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Your URLs ({urls.length})
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={onRefresh}
        >
          Refresh
        </Button>
      </Box>

      {urls.length === 0 ? (
        <Typography color="text.secondary">
          No URLs created yet. Use the shortener to create some!
        </Typography>
      ) : (
        <List>
          {urls.map((url, index) => (
            <div key={url.shortCode}>
              <ListItem>
                <ListItemText
                  primary={`http://localhost:3001/${url.shortCode}`}
                  secondary={
                    <div>
                      <div>Original: {url.originalUrl}</div>
                      <div>Clicks: {url.clicks} | Created: {new Date(url.createdAt).toLocaleDateString()}</div>
                    </div>
                  }
                />
                <IconButton
                  onClick={() => window.open(`http://localhost:3001/${url.shortCode}`, '_blank')}
                  color="primary"
                >
                  <Launch />
                </IconButton>
              </ListItem>
              {index < urls.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      )}
    </Box>
  );
};

export default UrlList;
