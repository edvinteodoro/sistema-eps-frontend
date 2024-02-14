import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { StorageService } from '../services/storage.service';

@Component({
    selector: 'app-topbar',
    providers: [ConfirmationService],
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(private confirmationService: ConfirmationService, public layoutService: LayoutService,
        private storageService: StorageService) { }

    logOut() {
        this.storageService.clean();
        window.location.reload();
    }

    confirm() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Esta seguro de cerrar la sesion?',
            acceptLabel: "Si",
            accept: () => {
                this.logOut();
            }
        });
    }
}
