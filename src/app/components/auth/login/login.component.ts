import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    isLoggedIn = false;
    isLoginFailed = false;
    isLoading = false;

    errorLabel: string = "";

    password!: string;
    user!: string;

    loginObj: any = {
        username: this.user,
        password: this.password
    }

    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router,
        private storageService: StorageService) {
        this.goToProyecto();
    }

    goToProyecto(){
        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            this.router.navigate(['/gestiones/listado']);
        }
    }

    onLogin() {
        this.loginObj.username = this.user;
        this.loginObj.password = this.password;
        this.isLoading = true;
        this.authService.login(this.loginObj).subscribe({
            next: data => {
                this.storageService.saveUser(data);
                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.goToProyecto();
            },
            error: err => {
                this.isLoading = false;
                if (err.status == 0 || err.status == 502) {
                    this.errorLabel = "Hubo un error en el sistema, vuelva a intentar mas tarde.";
                }else{
                    this.errorLabel = err.error;
                }
                this.isLoginFailed = true;
            }
        });
    }
}
