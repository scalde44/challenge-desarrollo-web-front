import { Identity } from "./identity.model";
import { ValueObject } from "./value-object.model";

export interface Ganador {
    nombre: ValueObject;
    color: ValueObject;
    jugadorId: Identity;    
}