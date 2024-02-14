import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrarBitacoraComponent } from './registrarBitacora.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RegistrarBitacoraComponent }
	])],
	exports: [RouterModule]
})
export class RegistrarBitacoraRoutingModule { }
