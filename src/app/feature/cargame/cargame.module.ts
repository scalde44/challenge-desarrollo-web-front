import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargameRoutingModule } from './cargame-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, CargameRoutingModule],
})
export class CargameModule {}
