import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditarProyectoComponent } from './editarProyecto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EditarProyectoComponent }
	])],
	exports: [RouterModule]
})
export class EditarProyectoRoutingModule { }
