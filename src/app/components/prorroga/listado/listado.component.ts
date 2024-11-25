import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Prorroga } from 'src/app/model/Prorroga';
import { ProrrogaService } from 'src/app/services/prorroga.service';

@Component({
  templateUrl: './listado.component.html',
  providers: [MessageService]
})
export class ListadoComponent implements OnInit {

  prorrogas: Prorroga[] = [];
  totalRecords: number = 0;
  nombreFilter: string = '';
  registroFilter: string = '';
  isLoading: boolean = false;

  constructor(private prorrogaService: ProrrogaService,
    private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
  }

  loadProrrogas(event: any) {
    this.prorrogas = [];
    let page = event.first / 10;
    this.isLoading = true;
    this.prorrogaService.getProrrogas(page, 10).subscribe(response => {
      this.prorrogas = response.content;
      this.totalRecords = response.totalElements;
      this.isLoading = false;
    },(error)=>{
      this.isLoading=false;
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: "Hubo un error al intentar obtener el listado de solicitudes." });
    })
  }

  revisarProrroga(prorroga: Prorroga) {
    this.router.navigate(['prorroga/prorroga'], { state: { data: prorroga.idProrroga } });
  }

  buscar(){}

}
