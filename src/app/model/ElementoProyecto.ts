import { Elemento } from "./Elemento";

export interface ElementoProyecto {
    idElementoProyecto?:number;
    informacion?:string;
    file?:File;
    elemento?:Elemento;
    edicion?:boolean;    
}