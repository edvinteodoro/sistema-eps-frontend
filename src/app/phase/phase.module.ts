import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhaseComponent } from './phase.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PhaseComponent],
  exports: [PhaseComponent]
})
export class PhaseModule { }
