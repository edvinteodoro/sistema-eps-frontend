import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrearProyectoComponent } from './crearProyecto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrearProyectoComponent }
	])],
	exports: [RouterModule]
})
export class CrearProyectoRoutingModule { }
