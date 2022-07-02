import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CrearJuegoCommand } from '../models/commands/crear-juego-command.model';

const API_ENDPOINT = environment.apiUrl;
@Injectable()
export class JuegoService {
  public juegoId: string;
  constructor(public httpClient: HttpClient) {}

  public crearJuego(command: CrearJuegoCommand): Observable<string> {
    return this.httpClient.post(`${API_ENDPOINT}/crearJuego`, command, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      responseType: 'text',
    });
  }
}
