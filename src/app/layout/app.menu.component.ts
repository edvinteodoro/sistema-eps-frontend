import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../services/auth.service';
import { Role } from '../model/Utils';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    userRole!: String;
    model: any[] = [];

    constructor(public layoutService: LayoutService, private authService: AuthService) { }

    ngOnInit() {

        this.userRole = this.authService.getUserRole();
        this.model = [
            /*{
                label: 'Home',
                roles: [Role.Estudiante, Role.Asesor, Role.Secretaria, Role.Supervisor, Role.Coordinador, Role.CoordinadorEps],
                items: [
                    {
                        label: 'Principal', icon: 'pi pi-fw pi-home', routerLink: ['/']
                        , roles: [Role.Asesor, Role.Estudiante, Role.Secretaria, Role.Supervisor, Role.Coordinador, Role.CoordinadorEps]
                    }
                ]

            },*/
            {
                label: 'Proyectos',
                roles: [Role.Estudiante, Role.Asesor, Role.Secretaria, Role.Supervisor, Role.Coordinador, Role.CoordinadorEps],
                items: [
                    {
                        label: 'Proyectos', icon: 'pi pi-fw pi-file', routerLink: ['/gestiones/listado'],
                        roles: [Role.Asesor, Role.Estudiante, Role.Secretaria, Role.Supervisor, Role.Coordinador, Role.CoordinadorEps]
                    },
                    {
                        label: 'Nuevo Proyecto', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/gestiones/crear-proyecto'],
                        roles: [Role.Estudiante]
                    },
                    /*{
                        label: 'Extension Eps', icon: 'pi pi-fw pi-clock', routerLink: ['/extension/listado'],
                        roles: [Role.Asesor, Role.Estudiante, Role.Supervisor, Role.Coordinador, Role.CoordinadorEps]
                    }*/
                ]
            },
            {
                label: 'Bitacoras',
                roles: [Role.Estudiante, Role.Asesor, Role.Supervisor, Role.Asesor, Role.Contraparte,Role.CoordinadorEps,Role.Coordinador],
                items: [
                    {
                        label: 'Bitacoras', icon: 'pi pi-fw pi-book', routerLink: ['/bitacoras/listado'],
                        roles: [Role.Asesor, Role.Estudiante, Role.Supervisor, Role.Coordinador, Role.CoordinadorEps,Role.Coordinador]
                    },
                    {
                        label: 'Registrar Bitacora', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/bitacoras/registrar-bitacora'],
                        roles: [Role.Estudiante]
                    },
                ]
            },
            {
                label: 'Actas',
                roles: [Role.Secretaria],
                items: [
                    {
                        label: 'Actas', icon: 'pi pi-fw pi-book', routerLink: ['/actas/listado'],
                        roles: [Role.Secretaria]
                    }
                ]
            },
            {
                label: 'Usuarios',
                roles: [Role.Secretaria, Role.Supervisor],
                items: [
                    {
                        label: 'Nuevo', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/usuarios/crear-usuario'],
                        roles: [Role.Secretaria, Role.Supervisor]
                    },
                    {
                        label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/usuarios/listado'],
                        roles: [Role.Secretaria, Role.Supervisor]
                    }
                ]
            },
            {
                label: 'Documentos',
                roles: [Role.Asesor, Role.Secretaria, Role.Supervisor],
                items: [
                    {
                        label: 'Documentos', icon: 'pi pi-fw pi-file', routerLink: ['/documentos/documentos'],
                        roles: [Role.Asesor, Role.Secretaria, Role.Supervisor]
                    }
                ]
            }
        ];
    }
}
