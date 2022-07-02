import { Pista } from '../objects/pista.model';

export interface JuegoCreado {
  pista: Pista;
  aggregateRootId: string;
}
