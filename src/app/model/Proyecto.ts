import { Carrera } from "./Carrera";

export interface Proyecto {
    idProyecto?: string;
    titulo: string;
    coordenadas: string;
    carrera: Carrera;
    constanciaInscripcion: any;
    constanciaPropedeutico: any;
    certificadoNacimiento: any;
    cartaAsesorSupervisor: any;
    anteproyecto:any;
}