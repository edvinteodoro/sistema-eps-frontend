import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Prorroga } from 'src/app/model/Prorroga';
import { Proyecto } from 'src/app/model/Proyecto';
import { ElementoUtils } from 'src/app/model/Utils';
import { ProrrogaService } from 'src/app/services/prorroga.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  templateUrl: './nuevo.component.html',
  providers: [ConfirmationService, MessageService]
})
export class NuevoComponent implements OnInit {

  proyectos: Proyecto[] = [];
  proyecto!: Proyecto;

  solicitud!: any;
  amparo!: any;
  prorroga: Prorroga = {
    diasExtension: 0
  }
  constructor(private confirmationService: ConfirmationService,
    private messageService: MessageService, private proyectoService: ProyectoService,
    private prorrogaService: ProrrogaService, private router: Router) { }

  ngOnInit(): void {
    this.proyectoService.getProyectosActivos().subscribe(proyectos => {
      this.proyectos = proyectos;
      for (const proyecto of this.proyectos) {
        this.proyectoService.getElementoProyecto(proyecto.idProyecto!, ElementoUtils.ID_ELEMENTO_TITULO)
          .subscribe(elementoTitulo => {
            proyecto.elementoTitulo = elementoTitulo;
          })
      }
    })
  }

  solicitarProrroga() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: '¿Estas seguro de solicitar prorroga?',
      acceptLabel: "Si",
      icon: 'pi pi-check-circle',
      accept: () => {
        this.prorrogaService.crearProrroga(this.proyecto.idProyecto!, this.prorroga, this.solicitud, this.amparo).subscribe(prorroga => {
          this.messageService.add({ key: 'tst', severity: 'success', summary: 'Prorroga Solicitada', detail: 'Se ha solicitado la prorroga exitosamente.' });
          setTimeout(() => {
            this.router.navigate(['prorroga/prorroga']);
          }, 2000);
        }, (error) => {
          console.log('error: ',error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error: ' + error });
        })
      }
    });
  }

  onUploadSolicitud(event: any) {
    this.solicitud = event.currentFiles[0];
  }

  onRemoveSolicitud() {
    this.solicitud = undefined;
  }

  onUploadAmparo(event: any) {
    this.amparo = event.currentFiles[0];
  }

  onRemoveAmparo() {
    this.amparo = undefined;
  }

}
