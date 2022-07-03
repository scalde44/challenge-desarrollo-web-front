import { ValueObject } from '../objects/value-object.model';

export interface CarroCreado {
  aggregateParentId: string;
  aggregateRootId: string;
  color: ValueObject;
}
