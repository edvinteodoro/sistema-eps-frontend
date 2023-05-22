import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../services/auth.service';
import { Role } from '../model/Role'; 

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    userRole!:String;
    model: any[] = [];

    constructor(public layoutService: LayoutService,private authService: AuthService) { }

    ngOnInit() {

        this.userRole= this.authService.getUserRole();
        this.model = [
            {
                label: 'Home',
                roles: [Role.Estudiante,Role.Asesor,Role.Secretaria,Role.Supervisor],
                items: [
                    { label: 'Principal', icon: 'pi pi-fw pi-home', routerLink: ['/']    
                    ,roles:[Role.Asesor,Role.Estudiante,Role.Secretaria,Role.Supervisor]}
                ]

            },
            {
                label: 'Usuarios',
                roles:[Role.Secretaria,Role.Supervisor],
                items: [
                    { label: 'Nuevo', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/usuarios/crear-usuario'],
                    roles:[Role.Secretaria,Role.Supervisor]},
                    { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/usuarios/listado'],
                    roles:[Role.Secretaria,Role.Supervisor]}
                ]
            },
            {
                label: 'Gestiones',
                roles:[Role.Estudiante,Role.Asesor,Role.Secretaria,Role.Supervisor],
                items: [
                    { label: 'Nuevo Proyecto', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/gestiones/crear-proyecto'],
                    roles:[Role.Estudiante]},
                    { label: 'Proyectos', icon: 'pi pi-fw pi-file', routerLink: ['/gestiones/listado'],
                    roles:[Role.Asesor,Role.Estudiante,Role.Secretaria,Role.Supervisor]}
                ]
            },
            {
                label: 'Documentos',
                roles:[Role.Asesor,Role.Secretaria,Role.Supervisor],
                items: [
                    { label: 'Evaluaciones', icon: 'pi pi-fw pi-file-excel', routerLink: ['/gestiones/crear-proyecto'],
                    roles:[Role.Asesor,Role.Secretaria,Role.Supervisor]}
                ]
            }
        ];
    }
}
