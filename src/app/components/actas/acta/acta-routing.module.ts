import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActaComponent } from './acta.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ActaComponent }
	])],
	exports: [RouterModule]
})
export class ActaRoutingModule { }
