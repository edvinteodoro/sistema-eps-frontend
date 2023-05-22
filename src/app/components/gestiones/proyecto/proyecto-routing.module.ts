import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProyectoComponent } from './proyecto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProyectoComponent }
	])],
	exports: [RouterModule]
})
export class ProyectoRoutingModule { }
