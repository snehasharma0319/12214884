// Simplified types - hardcoded and minimal
export interface UrlMapping {
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  clicks: number;
}

export interface CreateUrlRequest {
  url: string;
}

export interface CreateUrlResponse {
  shortLink: string;
}
