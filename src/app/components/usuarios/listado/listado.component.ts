import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

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
    isLoading: boolean = false;
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
        this.usuarioService.getUsuarios(0, 10, this.usuarioFilter).subscribe(response => {
                this.usuarios = response.content;
                this.totalRecords = response.totalElements;
            });
        sessionStorage.setItem('usuarioFilter', JSON.stringify(this.usuarioFilter));
    }

    loadUsuarios(event: any) {
        this.usuarios = [];
        let page =  event.first/ 10;
        this.isLoading=true;
        this.usuarioService.getUsuarios(page, 10,this.usuarioFilter).subscribe(response => {
            this.usuarios = response.content;
            this.totalRecords = response.totalElements;
            this.isLoading = false;
        },(error)=>{
            this.isLoading=false;
            this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: "Hubo un error al intentar obtener el listado de usuarios." });
        })
    }
}
