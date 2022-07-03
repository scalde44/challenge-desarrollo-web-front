import { Identity } from '../objects/identity.model';

export interface KilometrajeCambiado {
  aggregateParentId: string;
  aggregateRootId: string;
  carril: Identity;
  distancia: number;
  type: string;
}
