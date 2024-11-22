import { Tag } from './tag.interface';

export interface Card {
  id: number;
  title: string;
  shortВescription: string;
  description: string;
  images: string[];
  location: {
    lat: number;
    lon: number;
  };
  address: string;
  priceAvg: number;
  reviewRating: number;
  reviewCount: number;
  tags: Tag[];
  updatedAt: Date;
}

export type CardSwipeDirection = 'left' | 'right';
export type IsDragOffBoundary = 'left' | 'right' | null;
