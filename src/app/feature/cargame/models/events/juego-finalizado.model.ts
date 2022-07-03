import { Podio } from '../objects/podio.model';

export interface JuegoFinalizado {
  aggregateRootId: string;
  podio: Podio;
  type: string;
}
