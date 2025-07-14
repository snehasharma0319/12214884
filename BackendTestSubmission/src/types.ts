export interface UrlMapping {
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
}

export interface CreateUrlRequest {
  url: string;
}

export interface CreateUrlResponse {
  shortLink: string;
}
