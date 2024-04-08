import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProrrogaComponent } from './prorroga.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProrrogaComponent }
	])],
	exports: [RouterModule]
})
export class ProrrogaRoutingModule { }
