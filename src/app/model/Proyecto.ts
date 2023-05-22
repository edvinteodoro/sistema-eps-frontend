import { Carrera } from "./Carrera";
import { Requisito } from "./Requisito";
import { Usuario } from "./Usuario";

export interface Proyecto {
    idProyecto: string;
    titulo: string;
    coordenadas: string;
    requisitos?:any[];
    carrera: Carrera;
    constanciaInscripcion: any;
    constanciaPropedeutico: any;
    certificadoNacimiento: any;
    cartaAsesorSupervisor: any;
    anteproyecto:any;
    usuario?:Usuario;
    asesor?:Usuario;
    coordinador?:Usuario;
    supervisor?:Usuario;
}