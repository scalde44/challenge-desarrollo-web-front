import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PruebaConnectComponent } from './components/prueba-connect/prueba-connect.component';
import { CoreModule } from './core/core.module';
import { WebsocketService } from './prueba-ws/services/websocket.service';

@NgModule({
  declarations: [AppComponent, PruebaConnectComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
