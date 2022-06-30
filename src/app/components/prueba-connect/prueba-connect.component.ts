import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-prueba-connect',
  templateUrl: './prueba-connect.component.html',
  styleUrls: ['./prueba-connect.component.scss'],
})
export class PruebaConnectComponent implements OnInit {
  title = 'xyz';
  content = '';
  received = [];
  sent = [];
  constructor(private webSocketService: WebsocketService) {}

  prueba() {
    this.webSocketService.prueba(this.title);
  }

  ngOnInit(): void {
    this.prueba();
    this.webSocketService.messages.subscribe((msg) => {
      this.received.push(msg);
      console.log('Response from websocket: ' + msg);
    });
  }
}
