import { Identity } from '../objects/identity.model';

export interface CarrilFinalizoSuRecorrido {
  aggregateParentId: string;
  aggregateRootId: string;
  carroId: Identity;
  type: string;
}
