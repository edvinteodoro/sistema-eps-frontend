import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-phase',
    templateUrl: './phase.component.html',
    styleUrls:['./phase.component.css']
})
export class PhaseComponent{
    @Input() name!: any;
    @Input() icon!: any;
}