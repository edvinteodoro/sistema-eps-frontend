import { Component, OnInit} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentosService } from 'src/app/services/documentos.service';
import { Requisito } from 'src/app/model/Requisito';

@Component({
    templateUrl: './documentos.component.html',
    providers: [ConfirmationService, MessageService]
})



export class DocumentosComponent implements OnInit {
    
    documentos!:Requisito[];

    constructor(private documentosService:DocumentosService) { }


    ngOnInit() {
        this.documentosService.getDocumentos().subscribe(documentos=>{
            this.documentos=documentos;
        })
    }

    descargar(documento:Requisito){
        this.documentosService.getDocumento(documento.link).subscribe(documento => {
                let link = documento.link.toString();
                window.open(link, '_blank');
            },
            error => console.log('Error getting documento:', error)
        );
    }

}
