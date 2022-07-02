import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CargameRoutingModule } from './cargame-routing.module';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { HistoricGameComponent } from './components/historic-game/historic-game.component';
import { HomeComponent } from './components/home/home.component';
import { LandingGameComponent } from './components/landing-game/landing-game.component';
import { StartGameComponent } from './components/start-game/start-game.component';
import { JuegoService } from './services/juego.service';

@NgModule({
  declarations: [
    HomeComponent,
    StartGameComponent,
    CreateGameComponent,
    HistoricGameComponent,
    LandingGameComponent,
  ],
  imports: [
    CommonModule,
    CargameRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [JuegoService],
})
export class CargameModule {}
