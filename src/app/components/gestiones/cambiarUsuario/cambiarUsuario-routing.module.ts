import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CambiarUsuarioComponent } from './cambiarUsuario.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CambiarUsuarioComponent }
	])],
	exports: [RouterModule]
})
export class CambiarUsuarioRoutingModule { }
