import { Component, HostListener, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) { }

    lastActivity: Date = new Date();

    @HostListener('window:mousemove', ['$event'])
    @HostListener('window:keydown', ['$event'])
    onUserActivity(event: MouseEvent | KeyboardEvent) {
        
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
