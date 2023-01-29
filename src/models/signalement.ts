import { Observation } from './observation';
import { Author } from './author';

export class Signalement {
  id?: string ;
  author!: Author ;
  observation!: Observation[] ;
  description!: string ;
}
