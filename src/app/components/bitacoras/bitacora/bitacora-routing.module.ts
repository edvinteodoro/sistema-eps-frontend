import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BitacoraComponent } from './bitacora.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BitacoraComponent }
	])],
	exports: [RouterModule]
})
export class BitacoraRoutingModule { }
