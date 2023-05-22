import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefinirEvaluacionComponent } from './definirEvaluacion.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DefinirEvaluacionComponent }
	])],
	exports: [RouterModule]
})
export class DefinirEvaluacionRoutingModule { }
