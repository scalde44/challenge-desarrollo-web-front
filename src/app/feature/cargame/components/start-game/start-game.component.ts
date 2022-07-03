import { Component, OnInit } from '@angular/core';
import { DomainEventUtil } from 'src/app/shared/utils/domain-event-util';
import { IniciarJuegoCommand } from '../../models/commands/iniciar-juego-command.model';
import { CarrilFinalizoSuRecorrido } from '../../models/events/carril-finalizo-recorrido.model';
import { JuegoCreado } from '../../models/events/juego-creado.model';
import { JuegoFinalizado } from '../../models/events/juego-finalizado.model';
import { KilometrajeCambiado } from '../../models/events/kilometraje-cambiado.model';
import { JuegoService } from '../../services/juego.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
  carros: Map<string, number> = new Map();
  juego: JuegoCreado;
  juegoId: string;
  juegoIniciado: boolean = false;
  constructor(
    private juegoService: JuegoService,
    private webSocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.juegoId = this.juegoService.juegoId;
  }

  ingresar(event: boolean) {
    this.juegoIniciado = event;
    this.juego = this.juegoService.juego;
    this.juegoId = this.juegoService.juegoId;
    this.juego.carroCreados.forEach((carro) => {
      this.carros.set(carro.aggregateRootId, 0);
    });
    this.obtenerDatosJuegoWs();
    this.iniciarJuego(new IniciarJuegoCommand(this.juegoId));
  }

  private moverCarro(carroId: string, distancia: number) {
    const divCar = document.getElementById(this.getNombreIdCar(carroId));
    const posicion = this.updateAndGetPosicion(carroId, distancia);
    divCar.style.transform = `translateX(${posicion}px)`;
  }

  getNombreIdCar(carroId: string): string {
    return 'carro' + carroId;
  }

  private updateAndGetPosicion(carroId: string, distancia: number): number {
    const posicion: number = this.carros.get(carroId);
    const posicionActualizada: number = posicion + distancia;
    this.carros.set(carroId, posicionActualizada);
    return posicionActualizada;
  }

  getColorCarroById(carroId: string): string {
    return `assets/images/carro-amarillo.png`;
  }

  // Obtener datos juego ws
  obtenerDatosJuegoWs() {
    this.webSocketService.iniciar(this.juegoId);
    this.webSocketService.messages.subscribe((msg) => {
      console.log(msg);
      this.procesarMensajeWebSocket(msg);
    });
  }
  procesarMensajeWebSocket(mensaje: any) {
    if (mensaje.type === DomainEventUtil.CARRO_KILOMETRAJE_CAMBIADO) {
      const evento: KilometrajeCambiado = mensaje as KilometrajeCambiado;
      this.moverCarro(evento.aggregateRootId, evento.distancia / 10);
    }
    if (mensaje.type === DomainEventUtil.CARRIL_FINALIZO_RECORRIDO) {
      mensaje as CarrilFinalizoSuRecorrido;
    }

    if (mensaje.type === DomainEventUtil.JUEGO_JUEGO_FINALIZADO) {
      mensaje as JuegoFinalizado;
    }
  }

  // Iniciar juego
  private iniciarJuego(command: IniciarJuegoCommand) {
    this.juegoService.iniciarJuego(command).subscribe((data) => {
      console.log(data);
    });
  }
}
