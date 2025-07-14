import { UrlMapping } from './types';

class UrlStore {
  private urls: Map<string, UrlMapping> = new Map();

  addUrl(mapping: UrlMapping): void {
    this.urls.set(mapping.shortCode, mapping);
  }

  getUrl(shortCode: string): UrlMapping | undefined {
    return this.urls.get(shortCode);
  }

  getAllUrls(): UrlMapping[] {
    return Array.from(this.urls.values());
  }

  addClick(shortCode: string): void {
    const url = this.urls.get(shortCode);
    if (url) {
      url.clicks++;
    }
  }

  exists(shortCode: string): boolean {
    return this.urls.has(shortCode);
  }
}

export const urlStore = new UrlStore();
