import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsignarUsuarioComponent } from './asignarUsuario.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AsignarUsuarioComponent }
	])],
	exports: [RouterModule]
})
export class AsignarUsuarioRoutingModule { }
