import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PruebaConnectComponent } from './components/prueba-connect/prueba-connect.component';

const routes: Routes = [
  {
    path: '',
    component: PruebaConnectComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'cargame',
    loadChildren: () =>
      import('./feature/cargame/cargame.module').then((m) => m.CargameModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
