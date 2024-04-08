import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './listado.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListadoRoutingModule { }
