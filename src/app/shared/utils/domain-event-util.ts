export class DomainEventUtil {
  private static readonly JUEGO = 'juego';
  private static readonly CARRO = 'carro';
  private static readonly CARRIL = 'carril';
  public static readonly CARRO_KILOMETRAJE_CAMBIADO = `${this.CARRO}.KilometrajeCambiado`;
  public static readonly CARRIL_FINALIZO_RECORRIDO = `${this.CARRIL}.CarroFinalizoSuRecorrido`;
  public static readonly JUEGO_JUEGO_FINALIZADO = `${this.JUEGO}.JuegoFinalizado`;
}
