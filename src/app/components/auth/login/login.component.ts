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
        this.loginObj.username = this.user;
        this.loginObj.password = this.password;
        this.authService.login(this.loginObj).subscribe({
            next: data => {
                this.storageService.saveUser(data);
                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.storageService.getUser().roles;
                this.reloadPage();
            },
            error: err => {
                this.errorLabel = err.error.message;
                this.isLoginFailed = true;
            }
        });
    }
}
