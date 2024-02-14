import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';

@Component({
    templateUrl: './listado.component.html',
    providers: [MessageService]
})

export class ListadoComponent implements OnInit {
    nombresFiltro!: String;
    colegiadoFiltro!: String;
    registroFiltro!: String;
    activoFiltro!: Boolean;
    usuarioFilter!: Usuario;

    usuarios: Usuario[] = [];
    usuario: Usuario = {};

    usuariosSeleccionados: Usuario[] = [];

    totalRecords!: number;
    loading: boolean = false;
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService,
        private usuarioService: UsuarioService,
        private messageService: MessageService,
        private router: Router) {
    }

    ngOnInit() {
        const storedProyecto = sessionStorage.getItem('usuarioFilter');
        this.usuarioFilter = storedProyecto ? JSON.parse(storedProyecto) : {};
    }

    editUsuario(usuario: Usuario) {
        this.router.navigate(['usuarios/actualizar'], { state: { idUsuario: usuario.idUsuario } });
    }

    buscar() {
        this.usuarioService.getUsuarios(0, 10, undefined, this.usuarioFilter.nombreCompleto, this.usuarioFilter.numeroColegiado,
            this.usuarioFilter.registroAcademico).subscribe(response => {
                this.usuarios = response.content;
                this.totalRecords = response.totalElements;
            });
        sessionStorage.setItem('usuarioFilter', JSON.stringify(this.usuarioFilter));
    }

    loadUsuarios(event: any) {
        this.usuarios = [];
        let page =  event.first/ 10;
        this.usuarioService.getUsuarios(page, 10,undefined, this.usuarioFilter.nombreCompleto, this.usuarioFilter.numeroColegiado,
            this.usuarioFilter.registroAcademico).subscribe(response => {
            this.usuarios = response.content;
            this.loading = false;
            this.totalRecords = response.totalElements;
        })
    }
}
