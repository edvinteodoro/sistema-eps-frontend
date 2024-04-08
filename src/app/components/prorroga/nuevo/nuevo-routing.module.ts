import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoComponent } from './nuevo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: NuevoComponent }
	])],
	exports: [RouterModule]
})
export class NuevoRoutingModule { }
