import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/feature/auth/services/auth.service';
import { MenuItem } from 'src/app/shared/models/menu-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public routescar: MenuItem[] = [
    { url: './create', nombre: 'Crear Juego' },
    { url: './start', nombre: 'Iniciar Juego' },
    { url: './historic', nombre: 'Resultados' },
  ];
  public title: MenuItem = { url: './', nombre: 'Cargame' };
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  logout(evento: boolean) {
    if (evento) {
      this.authService.logout();
    }
  }
}
