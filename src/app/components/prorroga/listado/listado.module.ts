import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListadoRoutingModule } from './listado-routing.module';
import { ListadoComponent } from './listado.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [
    ListadoComponent
  ],
  imports: [
    CommonModule,
    ListadoRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TagModule,
    InputTextModule
  ]
})
export class ListadoModule { }
