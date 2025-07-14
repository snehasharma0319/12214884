import { nanoid } from 'nanoid';

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const generateShortCode = (): string => {
  return nanoid(6);
};
