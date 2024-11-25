import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Prorroga } from 'src/app/model/Prorroga';
import { ElementoUtils } from 'src/app/model/Utils';
import { ProrrogaService } from 'src/app/services/prorroga.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { DescargasService } from 'src/app/services/descargas.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './prorroga.component.html',
  providers: [ConfirmationService, MessageService]
})
export class ProrrogaComponent implements OnInit {

  idProrroga!: number;
  solicitud!: any;
  amparo!: any;
  idUsuario!: number;
  prorroga!: Prorroga;
  modoEdicion: boolean = false;

  edicionDias: boolean = false;
  edicionSolicitud: boolean = false;
  edicionAmparo: boolean = false;

  isSupervisor: boolean = false;
  isEstudiante: boolean = false;
  isLoading: boolean = false;

  mostrarLinkDialog: boolean = false;

  constructor(private location: Location, private confirmationService: ConfirmationService,
    private messageService: MessageService, private proyectoService: ProyectoService,
    private prorrogaService: ProrrogaService, private router: Router,
    private descargasService: DescargasService, private authService: AuthService) { }

  ngOnInit(): void {
    this.idUsuario = this.authService.getUserId();
    this.getIdProrroga();
    this.isLoading = true;
    this.prorrogaService.getProrroga(this.idProrroga).subscribe(prorroga => {
      this.prorroga = prorroga;
      this.getRolUsuario();
      this.isLoading = false;
      this.proyectoService.getElementoProyecto(prorroga.proyecto?.idProyecto!, ElementoUtils.ID_ELEMENTO_TITULO).subscribe(elementoProyecto => {
        this.prorroga.proyecto!.elementoTitulo = elementoProyecto;
      });
    },(error)=>{
      this.isLoading=false;
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Hubo un problema al intetar obtener la solicitud.' });
    })
  }

  getRolUsuario() {
    if (this.prorroga.proyecto!.usuario!.idUsuario == this.idUsuario.toString()) {
      this.isEstudiante = true;
      if (this.prorroga.aprobado == undefined) {
        this.modoEdicion = true;
      }
    } else {
      this.proyectoService.getSupervisor(this.prorroga.proyecto!.idProyecto!).subscribe(supervisor => {
        if (supervisor.idUsuario == this.idUsuario.toString()) {
          this.isSupervisor = true;
        }
      });
    }
  }

  getIdProrroga() {
    this.idProrroga = (this.location.getState() as { data: number }).data;
    if (this.idProrroga == undefined) {
      const storedIdProyecto = sessionStorage.getItem('idProrroga');
      this.idProrroga = storedIdProyecto ? JSON.parse(storedIdProyecto) : undefined;
    }
    if (this.idProrroga == undefined) {
      this.router.navigate(['prorroga/listado']);
    }
    sessionStorage.setItem('idProrroga', JSON.stringify(this.idProrroga));
  }

  descargar(key: string) {
    this.descargasService.descargar(key).subscribe(
      requisito => {
        //this.link = requisito.link;
        window.open(requisito.link.toString(), '_blank');
      }, (error) => {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'No se pudo realizar la descarga.' });
      });
  }

  cancelarEdicionDias() {
    this.prorrogaService.getProrroga(this.idProrroga).subscribe(prorroga => {
      this.prorroga.diasExtension = prorroga.diasExtension;
      this.edicionDias = false;
    });
  }
  cancelarEdicionSolicitud() {
    this.solicitud = undefined;
    this.edicionSolicitud = false;
  }
  cancelarEdicionAmparo() {
    this.amparo = undefined;
    this.edicionAmparo = false;
  }

  cargarSolicitud(event: any) {
    this.solicitud = event.currentFiles[0];
  }

  cargarAmparo(event: any) {
    this.amparo = event.currentFiles[0];
  }

  guardarDias() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: '¿Estas seguro de solicitar prorroga?',
      acceptLabel: "Si",
      icon: 'pi pi-check-circle',
      accept: () => {
        this.prorrogaService.actualizarProrroga(this.idProrroga, this.prorroga.diasExtension).subscribe(prorroga => {
          this.messageService.add({ key: 'tst', severity: 'success', summary: 'Listo!', detail: 'Cambios guardados.' });
          this.edicionDias = false;
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error: ' + error });
        })
      }
    });
  }

  guardarSolicitud() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: '¿Estas seguro de solicitar prorroga?',
      acceptLabel: "Si",
      icon: 'pi pi-check-circle',
      accept: () => {
        this.prorrogaService.actualizarProrroga(this.idProrroga, undefined, this.solicitud).subscribe(prorroga => {
          this.messageService.add({ key: 'tst', severity: 'success', summary: 'Listo!', detail: 'Cambios guardados.' });
          this.prorroga.linkSolicitud = prorroga.linkSolicitud;
          this.solicitud = undefined;
          this.edicionSolicitud = false;
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error: ' + error });
        })
      }
    });
  }

  guardarAmparo() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: '¿Estas seguro de solicitar prorroga?',
      acceptLabel: "Si",
      icon: 'pi pi-check-circle',
      accept: () => {
        this.prorrogaService.actualizarProrroga(this.idProrroga, undefined, undefined, this.amparo).subscribe(prorroga => {
          this.messageService.add({ key: 'tst', severity: 'success', summary: 'Listo!', detail: 'Cambios guardados.' });
          this.prorroga.linkAmparo = prorroga.linkAmparo;
          this.amparo = undefined;
          this.edicionAmparo = false;
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error: ' + error });
        })
      }
    });
  }

  aprobarProrroga() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: '¿Estas seguro de aprobar la solicitud de prorroga?',
      acceptLabel: "Si",
      icon: 'pi pi-check-circle',
      accept: () => {
        this.prorroga.aprobado = true;
        this.prorrogaService.responderProrroga(this.idProrroga, this.prorroga).subscribe(prorroga => {
          this.messageService.add({ key: 'tst', severity: 'success', summary: 'Listo!', detail: 'Se ha aprobado la solicitud de prorroga.' });
        }, (error) => {
          this.prorroga.aprobado = undefined;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error: ' + error });
        })
      }
    });
  }

  rechazarProrroga() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: '¿Estas seguro de rechazar la solicitud de prorroga?',
      acceptLabel: "Si",
      icon: 'pi pi-check-circle',
      accept: () => {
        this.prorroga.aprobado = false;
        this.prorrogaService.responderProrroga(this.idProrroga, this.prorroga).subscribe(prorroga => {
          this.messageService.add({ key: 'tst', severity: 'success', summary: 'Listo!', detail: 'Se ha rechazado la solicitud de prorroga.' });
          this.mostrarLinkDialog = false;
        }, (error) => {
          this.prorroga.aprobado = undefined;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error: ' + error });
        })
      }
    });
  }

}
