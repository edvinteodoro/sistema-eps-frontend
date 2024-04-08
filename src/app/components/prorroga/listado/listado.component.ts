import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prorroga } from 'src/app/model/Prorroga';
import { ProrrogaService } from 'src/app/services/prorroga.service';

@Component({
  templateUrl: './listado.component.html',
  providers: []
})
export class ListadoComponent implements OnInit {

  prorrogas: Prorroga[] = [];
  totalRecords: number = 0;
  nombreFilter: string = '';
  registroFilter: string = '';

  constructor(private prorrogaService: ProrrogaService,
    private router: Router) { }

  ngOnInit(): void {
  }

  loadProrrogas(event: any) {
    this.prorrogas = [];
    let page = event.first / 10;
    this.prorrogaService.getProrrogas(page, 10).subscribe(response => {
      this.prorrogas = response.content;
      console.log('prorrogas: ', this.prorrogas);
      this.totalRecords = response.totalElements;
    })
  }

  revisarProrroga(prorroga: Prorroga) {
    this.router.navigate(['prorroga/prorroga'], { state: { data: prorroga.idProrroga } });
  }

  buscar(){}

}
