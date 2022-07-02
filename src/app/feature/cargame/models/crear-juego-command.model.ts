export class CrearJuegoCommand {
  kilometros: number;
  juegoId: string;
  jugadoresMap: Map<string, string>;
  jugadores: Object;
  constructor(juegoId: string,kilometros: number) {
    this.juegoId=juegoId;
    this.kilometros=kilometros;
    this.jugadoresMap=new Map<string,string>;
  }
  public addJugador(cedula:string,nombre:string){
    this.jugadoresMap.set(cedula,nombre);
    this.updateJugadoresByMap();
  }
  private updateJugadoresByMap(){
    this.jugadores=Object.fromEntries(this.jugadoresMap);
  }
}
