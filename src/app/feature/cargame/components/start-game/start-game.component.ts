import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
  carros: any[] = [
    { id: 1, posicion: 0, color: 'rojo' },
    { id: 2, posicion: 0, color: 'amarillo' },
    { id: 3, posicion: 0, color: 'rojo' },
  ];
  constructor(private juegoService: JuegoService) {}

  ngOnInit(): void {
    console.log(this.juegoService.juegoId);
  }

  updatePosition(idCar: number) {
    const divCar = document.getElementById(this.getNombreIdCar(idCar));
    const posicion = this.getPosicionCarroById(idCar);
    divCar.style.transform = `translateX(${posicion}px)`;
  }

  getNombreIdCar(idCar: number): string {
    return 'carro' + idCar;
  }

  private getPosicionCarroById(carroId: number): number {
    let index = this.carros.findIndex((obj) => obj.id == carroId);
    this.carros[index].posicion = this.carros[index].posicion + 10;
    return this.carros[index].posicion;
  }

  getColorCarroById(carroId: number): string {
    let carro = this.carros.find((carro) => carro.id === carroId);
    return `assets/images/carro-${carro.color}.png`;
  }
}
