import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/menu-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public routescar: MenuItem[] = [
    { url: './create', nombre: 'Crear Juego' },
    { url: './start', nombre: 'Iniciar Juego' },
    { url: './historic', nombre: 'Resultados'}
  ];
  public title: MenuItem = { url: './', nombre: 'Cargame' };
  constructor() { }

  ngOnInit(): void {
  }

}
