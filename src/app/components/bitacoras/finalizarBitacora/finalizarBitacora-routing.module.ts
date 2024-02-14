import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinalizarBitacoraComponent } from './finalizarBitacora.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FinalizarBitacoraComponent }
	])],
	exports: [RouterModule]
})
export class FinalizarBitacoraRoutingModule { }
