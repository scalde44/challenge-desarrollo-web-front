import { Ganador } from "./ganador.model";

export interface Historico {
    aggregateRootId: string;
    ganador: Ganador[]; 
}