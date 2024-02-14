import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EvaluarProyectoComponent } from './evaluarProyecto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EvaluarProyectoComponent }
	])],
	exports: [RouterModule]
})
export class EvaluarProyectoRoutingModule { }
