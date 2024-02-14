import { Municipio } from "./Municipio";

export interface Institucion {
    idInstitucion?:String;
    nombre:String;
    coordenadas:String;
    direccion:String;
    municipio?:Municipio;
}