import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrearUsuarioComponent } from './crearUsuario.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrearUsuarioComponent }
	])],
	exports: [RouterModule]
})
export class CrearUsuarioRoutingModule { }
