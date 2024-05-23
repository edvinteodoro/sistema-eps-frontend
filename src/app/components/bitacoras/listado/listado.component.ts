import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/model/Proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Router } from '@angular/router';
import { Bitacora } from 'src/app/model/Bitacora';
import { BitacoraService } from 'src/app/services/bitacora.service';
import { AuthService } from 'src/app/services/auth.service';
import { EtapaUtils, Role } from 'src/app/model/Utils';

@Component({
    templateUrl: './listado.component.html',
    providers: [MessageService]
})
export class ListadoComponent implements OnInit {

    bitacoras!: Bitacora[];
    cols: any[] = [];
    proyectoActivo?: Proyecto;
    totalRecords!: number;
    loading: boolean = false;

    nombreFilter: string = '';
    registroFilter: string = '';

    constructor(private bitacoraService: BitacoraService,
        private proyectoService: ProyectoService, private authService: AuthService,
        private messageService: MessageService, private location: Location,
        private router: Router) { }

    ngOnInit() {
        this.getRegistroAcademico();    
    }

    getRegistroAcademico(){
        this.registroFilter = (this.location.getState() as { registroAcademico: string }).registroAcademico;
    }

    loadBitacoras(event: any) {
        this.bitacoras = [];
        let page = event.first / 10;
        this.bitacoraService.getBitacoras(page, 10,this.nombreFilter,this.registroFilter).subscribe(response => {
            this.bitacoras = response.content;
            this.totalRecords = response.totalElements;
        })
    }

    revisarBitacora(bitacora: Bitacora) {
        this.router.navigate(['bitacoras/bitacora'], { state: { data: bitacora.idBitacora } });
    }

    buscar(){
        this.bitacoraService.getBitacoras(0, 10, this.nombreFilter, this.registroFilter).subscribe(response => {
            this.bitacoras = response.content;
            this.totalRecords = response.totalElements;
        });
    }
}
