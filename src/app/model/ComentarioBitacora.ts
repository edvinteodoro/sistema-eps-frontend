import { Rol } from "./Rol";
import { Usuario } from "./Usuario";

export interface ComentarioBitacora {
    idComentarioBitacora?: number;
    comentario:String;
    fecha?: String;
    usuario?: Usuario;
    rol?: Rol;
}