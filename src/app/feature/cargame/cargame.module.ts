import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargameRoutingModule } from './cargame-routing.module';
import { HomeComponent } from './components/home/home.component';
import { StartGameComponent } from './components/start-game/start-game.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoricGameComponent } from './components/historic-game/historic-game.component';
import { LandingGameComponent } from './components/landing-game/landing-game.component';


@NgModule({
  declarations: [HomeComponent, StartGameComponent, CreateGameComponent, HistoricGameComponent, LandingGameComponent],
  imports: [CommonModule, CargameRoutingModule, MaterialModule, SharedModule],
})
export class CargameModule {}
