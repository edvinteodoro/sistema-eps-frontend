import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CargarDocumentoComponent } from './cargarDocumento.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CargarDocumentoComponent }
	])],
	exports: [RouterModule]
})
export class CargarDocumentoRoutingModule { }
