import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PrincipalComponent }
    ])],
    exports: [RouterModule]
})
export class PrincipalRoutingModule { }
