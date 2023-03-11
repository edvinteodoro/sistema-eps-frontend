import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActualizarComponent } from './actualizar.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ActualizarComponent }
	])],
	exports: [RouterModule]
})
export class ActualizarRoutingModule { }
