import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/model/Proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Router } from '@angular/router';
import { ElementoUtils, Role } from 'src/app/model/Utils';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    templateUrl: './listado.component.html',
    providers: [MessageService]
})
export class ListadoComponent implements OnInit {

    mostrarOpcionBitacora: boolean = false;
    proyectos!: Proyecto[];

    totalRecords!: number;
    loading: boolean = false;

    rolUsuario: string = "";

    nombreFilter: string = '';
    registroFilter: string = '';

    constructor(private proyectoService: ProyectoService, private messageService: MessageService,
        private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.rolUsuario = this.authService.getUserRole();
        this.loading = true;
        this.opcionBitacora();
    }

    opcionBitacora() {
        var rolUsuario = this.authService.getUserRole();
        if (rolUsuario == Role.Supervisor ||
            rolUsuario == Role.Estudiante ||
            rolUsuario == Role.Asesor ||
            rolUsuario == Role.Contraparte) {
            this.mostrarOpcionBitacora = true;
        }
    }

    revisarProyecto(proyecto: Proyecto) {
        this.router.navigate(['gestiones/proyecto'], { state: { data: proyecto.idProyecto } });
    }

    revisarBitacora(proyecto: Proyecto) {
        this.router.navigate(['bitacoras/listado'], { state: { registroAcademico: proyecto.usuario!.registroAcademico } });
    }

    loadProyectos(event: any) {
        this.proyectos = [];
        let page = event.first / 10;
        this.proyectoService.getProyectos(page, 10).subscribe(response => {
            this.proyectos = response.content;
            this.proyectos.forEach(proyecto => {
                this.proyectoService.getElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_TITULO).subscribe(elementoProyecto => {
                    proyecto.elementoTitulo = elementoProyecto;
                })
            })
            this.totalRecords = response.totalElements;
        })
    }

    buscar() {
        this.proyectoService.getProyectos(0, 10, this.nombreFilter, this.registroFilter).subscribe(response => {
            this.proyectos = response.content;
            this.proyectos.forEach(proyecto => {
                this.proyectoService.getElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_TITULO).subscribe(elementoProyecto => {
                    proyecto.elementoTitulo = elementoProyecto;
                })
            })
            this.totalRecords = response.totalElements;
        });
    }
}
