import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivarUsuario } from 'src/app/model/ActivarUsuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './confirm.component.html',
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
        usuario: "",
        token: "",
        password1: "",
        password2: ""
    };
    token!: String;
    usuario!: string;

    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.activarUsuario.token = params['token'];
        });
    }

    onLogin() {
        this.authService.activarUsuario(this.activarUsuario).subscribe({
            next: (response) => {
                this.router.navigate(['']);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
}
