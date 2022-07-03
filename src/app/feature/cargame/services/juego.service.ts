import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CrearJuegoCommand } from '../models/commands/crear-juego-command.model';
import { IniciarJuegoCommand } from '../models/commands/iniciar-juego-command.model';
import { JuegoCreado } from '../models/events/juego-creado.model';

const API_ENDPOINT = environment.apiUrl;
@Injectable()
export class JuegoService {
  public juego: JuegoCreado;
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

  public informacionJuego(juegoId: string): Observable<JuegoCreado> {
    return this.httpClient.get<JuegoCreado>(
      `${API_ENDPOINT}/informacion-juego/${juegoId}`
    );
  }

  public iniciarJuego(command: IniciarJuegoCommand): Observable<string> {
    return this.httpClient.post(`${API_ENDPOINT}/iniciarJuego`, command, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      responseType: 'text',
    });
  }
}
