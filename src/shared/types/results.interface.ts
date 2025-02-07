import { Card } from './card.interface';
import { User } from './user.interface';

interface ResultCard {
  card: Card;
  likes: User[];
}

export interface Result {
  top: ResultCard[];
}
