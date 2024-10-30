import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActivarUsuario } from 'src/app/model/ActivarUsuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './confirm.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class ConfirmComponent {
    errorLabel: string = "";
    activarUsuario: ActivarUsuario = {
        token: "",
        password1: "",
        password2: ""
    };
    token!: String;
    usuario!: string;

    constructor(private router: Router, private route: ActivatedRoute,
        private authService: AuthService, private messageService: MessageService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.activarUsuario.token = params['token'];
        });
    }

    onLogin() {
        if(this.activarUsuario.password1=="" || this.activarUsuario.password2==""){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ingrese toda la informacion solicitada.'});
            return;    
        }
        this.authService.activarUsuario(this.activarUsuario).subscribe({
            next: (response) => {
                this.messageService.add({ severity: 'success', summary: 'Usuario Activado', detail: 'Usuario activado exitosamente!'});
                setTimeout(() => {
                    this.router.navigate(['']);
                }, 2000);
            },
            error: (error) => {
                console.log('error: ',error)
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error: ' + error.error });
            }
        })
    }
}
