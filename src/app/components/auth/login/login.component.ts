import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth.service';

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

    valCheck: string[] = ['remember'];
    errorLabel: string = "";

    password!: string;
    user!: string;

    loginObj: any = {
        username:this.user,        
        password:this.password
    }

    constructor(public layoutService: LayoutService, private authService: AuthService,private router: Router) {  
        if(!!localStorage.getItem('token')){//is logged in
            this.router.navigate(['']);
        }
    }
    onLogin(){
        this.loginObj.username=this.user;
        this.loginObj.password=this.password;
        this.authService.onLogin(this.loginObj).subscribe((res: any) => {
            localStorage.setItem('token',res.jwt);
            this.router.navigate(['']);
        },(error)=>{
            if(error.status==401){
                this.errorLabel="Usuario y/o contraseña invalida";    
            }else{
                this.errorLabel="Hubo un error en el sistema, vuelva a intentar mas tarde";
            }
            console.log('error message',error.status);
        })
    }
}
