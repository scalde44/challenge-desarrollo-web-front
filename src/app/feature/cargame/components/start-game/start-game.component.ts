import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomainEventUtil } from 'src/app/shared/utils/domain-event-util';
import { IniciarJuegoCommand } from '../../models/commands/iniciar-juego-command.model';
import { CarrilFinalizoSuRecorrido } from '../../models/events/carril-finalizo-recorrido.model';
import { JuegoCreado } from '../../models/events/juego-creado.model';
import { JuegoFinalizado } from '../../models/events/juego-finalizado.model';
import { KilometrajeCambiado } from '../../models/events/kilometraje-cambiado.model';
import { InformacionGenericaJuego } from '../../models/objects/informacion-generica-juego.model';
import { JuegoService } from '../../services/juego.service';
import { WebsocketService } from '../../services/websocket.service';

const PORCENTAJE_COMPLETO_INICIAL = 100;
const VALOR_DOBLE = 2;
const VALOR_KILOMETRO = 1000;
@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
  @ViewChild('carril')
  carril: ElementRef;
  @ViewChild('carrito')
  carrito: ElementRef;
  carros: Map<string, number> = new Map();
  juego: JuegoCreado;
  juegoId: string;
  juegoIniciado: boolean = false;
  tamanioCarril: number = PORCENTAJE_COMPLETO_INICIAL;
  tamanioPista: number = 0;
  informacionJuego: InformacionGenericaJuego[] = [];
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
    this.juegoId = this.juegoService.juego.aggregateRootId;
    this.tamanioCarril =
      PORCENTAJE_COMPLETO_INICIAL / this.juego.carroCreados.length;
    this.juego.carroCreados.forEach((carro) => {
      this.carros.set(carro.aggregateRootId, 0);
    });
    setTimeout(() => {
      this.tamanioPista =
        (this.carril.nativeElement as HTMLElement).offsetWidth -
        VALOR_DOBLE * (this.carrito.nativeElement as HTMLElement).offsetWidth;
    }, 100);
    this.obtenerDatosJuegoWs();
    this.iniciarJuego(new IniciarJuegoCommand(this.juegoId));
    this.llenarInfoGenerica();
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
    const posicionActualizada: number =
      posicion +
      (distancia * this.tamanioPista) /
        (this.juego.pista.kilometros * VALOR_KILOMETRO);

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
      this.moverCarro(evento.aggregateRootId, evento.distancia);
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

  private llenarInfoGenerica() {
    const juegoInfo: InformacionGenericaJuego = {
      nombre: 'Juego',
      dato: this.juegoId,
      url: 'https://dl.dropbox.com/s/0qq5anxliaopt8d/sun.png',
    };
    const kilometro: InformacionGenericaJuego = {
      nombre: 'Kilometros',
      dato: this.juego.pista.kilometros.toString(),
      url: 'https://dl.dropbox.com/s/0qq5anxliaopt8d/sun.png',
    };
    const jugadoresCantidad: InformacionGenericaJuego = {
      nombre: 'Jugadores',
      dato: this.juego.pista.numeroDeCarriles.toString(),
      url: 'https://dl.dropbox.com/s/0qq5anxliaopt8d/sun.png',
    };
    this.informacionJuego.push(juegoInfo, kilometro, jugadoresCantidad);
  }
}
