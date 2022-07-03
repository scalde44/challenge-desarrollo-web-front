import { Identity } from './identity.model';
import { ValueObject } from './value-object.model';

export interface Jugador {
  entityId: Identity;
  color: ValueObject;
  nombre: ValueObject;
  puntos: number;
}
