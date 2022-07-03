import { Pista } from '../objects/pista.model';
import { CarroCreado } from './carro-creado.model';

export interface JuegoCreado {
  pista: Pista;
  aggregateRootId: string;
  carroCreados: CarroCreado[];
}
