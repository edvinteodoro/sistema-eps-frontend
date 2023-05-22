import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmRoutingModule } from './confirm-routing.module';
import { ConfirmComponent } from './confirm.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        CommonModule,
        ConfirmRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule
    ],
    declarations: [ConfirmComponent]
})
export class ConfirmModule { }
