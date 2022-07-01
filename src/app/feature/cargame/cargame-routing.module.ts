import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { HistoricGameComponent } from './components/historic-game/historic-game.component';
import { HomeComponent } from './components/home/home.component';
import { LandingGameComponent } from './components/landing-game/landing-game.component';
import { StartGameComponent } from './components/start-game/start-game.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LandingGameComponent,

      },
      {
        path: 'create',
        component: CreateGameComponent,
      },
      {
        path: 'start',
        component: StartGameComponent,
      },
      {
        path: 'historic',
        component: HistoricGameComponent
      }
    ],
  },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargameRoutingModule {}
