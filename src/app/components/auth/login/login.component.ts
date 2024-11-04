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
    roles: string[] = [];

    errorLabel: string = "";

    password!: string;
    user!: string;

    loginObj: any = {
        username: this.user,
        password: this.password
    }

    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router,
        private storageService: StorageService) {
        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
            this.router.navigate(['/gestiones/listado']);
        }
    }

    reloadPage(): void {
        window.location.reload();
    }

    onLogin() {
        this.isLoading = true;
        this.loginObj.username = this.user;
        this.loginObj.password = this.password;
        this.authService.login(this.loginObj).subscribe({
            next: data => {

                this.storageService.saveUser(data);
                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.storageService.getUser().roles;
                this.isLoading = false;
                this.reloadPage();
            },
            error: err => {
                this.isLoading = false;
                if (err.status == 0 || err.status == 502) {
                    this.errorLabel = "Error en el sistema, vuelva a intentar mas tarde.";
                }else{
                    this.errorLabel = err.error;
                }
                this.isLoginFailed = true;
            }
        });
    }
}
