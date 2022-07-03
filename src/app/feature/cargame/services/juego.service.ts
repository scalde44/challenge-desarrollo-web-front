import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CrearJuegoCommand } from '../models/commands/crear-juego-command.model';
import { IniciarJuegoCommand } from '../models/commands/iniciar-juego-command.model';
import { JuegoCreado } from '../models/events/juego-creado.model';
import { Historico } from '../models/objects/Historico.model';
import { HistoricoTabla } from '../models/objects/historicotabla.model';
import { Podio } from '../models/objects/podio.model';

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

  public getPodio(juegoId : string): Observable<Podio> {
    return this.httpClient.get<Podio>(`${API_ENDPOINT}/podio/${juegoId}`);
  }

  public getHistoricoGanadores() : Observable<HistoricoTabla[]> {
    return this.httpClient.get<Historico[]>(`${API_ENDPOINT}/ganadores`).pipe(
      map((historico: Historico[])=> historico.map((h)=>{
        const historicoTabla: HistoricoTabla = {
          aggregateRootId : h.aggregateRootId,
          idGanador : h.ganador[0].jugadorId.uuid,
          nombreGanador : h.ganador[0].nombre.value,
          colorGanador : h.ganador[0].color.value
        };
        return historicoTabla;
      }))
    );  
  }
}
