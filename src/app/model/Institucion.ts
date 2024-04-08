import { Municipio } from "./Municipio";

export interface Institucion {
    idInstitucion?:String;
    nombre:String;
    coordenadaProyecto?:String;
    direccion:String;
    direccionProyecto?:String;
    municipio?:Municipio;
    municipioProyecto?:Municipio;
}