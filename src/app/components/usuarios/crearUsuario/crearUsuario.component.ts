import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Carrera } from 'src/app/model/Carrera';
import { Rol } from 'src/app/model/Rol';
import { CarreraService } from 'src/app/services/carrera.service';
import { RolService } from 'src/app/services/rol.service';



@Component({
    templateUrl: './crearUsuario.component.html',
    providers: [ConfirmationService]
})

export class CrearUsuarioComponent implements OnInit {
    nombres!:String;
    apellidos!:String;
    correoElectorino!:String;
    fechaNacimiento!:Date;
    rolSeleccionado!: Rol;
    roles!: Rol[];
    carreras!: Carrera[];
    carreraSeleccionada!: Carrera;

    constructor(private confirmationService: ConfirmationService,private rolService:RolService,private carreraService:CarreraService){
    }

    ngOnInit() {

           this.rolService.getRoles().subscribe((roles: Rol[]) => { //observable to array
            this.roles = roles.map((rol) => {
                return {
                  titulo: rol.titulo,
                  idRol: rol.idRol
                };
              });   
          });
          this.carreraService.getCarreras().subscribe((carreras: Carrera[]) => { //observable to array
            this.carreras = carreras.map((carrera) => {
                return {
                  titulo: carrera.titulo,
                  idCarrera: carrera.idCarrera
                };
              });   
          });
    }

    confirm() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de crear el usuario?',
            acceptLabel:"Si",
            icon:'pi pi-check-circle',
            accept: ()=>{    
            }
        });
    }
    cancelar(){
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Estas seguro de cancelar la creacion del usuario?',
            acceptLabel:"Si",
            icon:'pi pi-times-circle',
            accept: ()=>{     
            }
        });
    }

}
