import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Carrera } from 'src/app/model/Carrera';
import { Rol } from 'src/app/model/Rol';
import { Usuario } from 'src/app/model/Usuario';
import { CarreraService } from 'src/app/services/carrera.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Titulo } from 'src/app/model/Titulo';
import { TituloService } from 'src/app/services/titulo.service';
import { Role } from 'src/app/model/Utils';

interface Campo {
    class: string,
    valor: any
}

@Component({
    templateUrl: './actualizar.component.html',
    providers: [ConfirmationService, MessageService]
})

export class ActualizarComponent implements OnInit {
    usuario!: Usuario;
    idUsuario!: string;
    roles!: Rol[];
    carreras!: Carrera[];
    titulos!: Titulo[];
    guardarCambios: boolean = false;
    bloqueado: boolean = true;
    menuItems: MenuItem[] = [];

    constructor(private confirmationService: ConfirmationService, private rolService: RolService,
        private carreraService: CarreraService, private messageService: MessageService, private usuarioService: UsuarioService,
        private router: Router, private location: Location, private activatedroute: ActivatedRoute,
        private tituloService: TituloService) {
    }

    ngOnInit() {
        this.getUsuarioData();
        this.getCarreras();
    }

    getUsuarioData() {
        this.idUsuario = (this.location.getState() as { idUsuario: string }).idUsuario;
        if (this.idUsuario == undefined) {
            this.idUsuario = sessionStorage.getItem('idUsuario')!;
        }
        if (this.idUsuario != undefined) {
            sessionStorage.setItem('idUsuario', this.idUsuario);
            this.usuarioService.getUsuario(this.idUsuario).subscribe(usuario => {
                this.usuario = usuario;
                this.getRoles();
                this.getTitulos();
            })
        } else {
            this.router.navigate(['usuarios/listado']);
        }
    }

    getCarreras() {
        this.carreraService.getCarreras().subscribe(carreras => this.carreras = carreras);
    }

    getOpcionesMenu() {
        if (this.usuario.activo) {
            this.menuItems = [
                { label: 'Reiniciar contraseña', icon: 'pi pi-fw pi-replay', command: this.activarUsuario.bind(this) },
                { label: 'Desactivar usuario', icon: 'pi pi-fw pi-times', command: this.desactivarUsuario.bind(this) }];
        } else {
            this.menuItems = [
                { label: 'Activar Usuario', icon: 'pi pi-fw pi-check', command: this.activarUsuario.bind(this) }
            ];
        }
    }

    getUsuario() {
        this.usuarioService.getUsuarios(0, 10, undefined, undefined, this.usuario.numeroColegiado, this.usuario.registroAcademico).subscribe(usuarios => {
            this.usuario = usuarios[0];
        });
    }

    getTitulos() {
        this.tituloService.getTitulos().subscribe(titulos => {
            this.titulos = titulos;
            this.usuario.titulo = this.titulos.filter(titulo => titulo.idTitulo == this.usuario.titulo?.idTitulo)[0];
        });
    }

    getRoles() {
        this.rolService.getRoles().subscribe(roles => {
            this.roles = roles;
            this.onRoleChange();
        });
    }

    editar() {
        this.bloqueado = false;
    }

    cancelarEdicion() {
        window.location.reload();
    }

    desactivarUsuario() {
    }

    activarUsuario() {
        this.usuarioService.activarUsuario(this.usuario.idUsuario!).subscribe();
    }

    isFieldInvalid(field: any): boolean {
        if (field == undefined && this.guardarCambios) {
            return true;
        } else if (typeof field === 'string') {
            return this.guardarCambios && field.trim() === '';
        }
        return false;
    }

    showTitulos(): boolean {
        if (this.usuario.rol != undefined && this.usuario.rol.idRol != 1) {

            return this.usuario.rol.contieneCarrera;
        }
        return false;
    }

    showCarreras(): boolean {
        if (this.usuario.rol != undefined) {
            return this.usuario.rol.contieneCarrera;
        }
        return false;
    }
    showRegistro(): boolean {
        if (this.usuario.rol != undefined) {
            return this.usuario.rol.contieneRegistro;
        }
        return false;
    }

    showColegiado(): boolean {
        if (this.usuario.rol != undefined) {
            return this.usuario.rol.contieneColegiado;
        }
        return false;
    }

    goBack(): void {
        this.location.back();
    }

    onRoleChange() {
        
    }

}
