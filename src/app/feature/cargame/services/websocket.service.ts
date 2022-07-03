import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import { Observer } from 'rxjs/internal/types';
import { environment } from 'src/environments/environment';
const HOST_API = new URL(environment.apiUrl).host;
const WEBSOCKET_URL = `ws://${HOST_API}/retrieve`;
@Injectable()
export class WebsocketService {
  private subject: AnonymousSubject<MessageEvent>;
  public messages: Subject<any>;
  constructor() {}

  public iniciar(aggregateId: string) {
    this.messages = <Subject<any>>this.connect(aggregateId).pipe(
      map((response: MessageEvent): any => {
        return JSON.parse(response.data);
      })
    );
  }
  public connect(aggregateId: string) {
    if (!this.subject) {
      this.subject = this.create(`${WEBSOCKET_URL}/${aggregateId}`);
      console.log(
        'Successfully connected: ' + `${WEBSOCKET_URL}/${aggregateId}`
      );
    }
    return this.subject;
  }

  private create(url): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      error: null,
      complete: null,
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
