import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ToolbarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
    
  ],
  exports:[
    ToolbarComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
