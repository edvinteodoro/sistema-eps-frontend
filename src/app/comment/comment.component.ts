import { Component, Input } from "@angular/core";
import { Comentario } from "../model/Comentario";
import { Usuario } from "../model/Usuario";
import { ComentarioBitacora } from "../model/ComentarioBitacora";

@Component({
    selector:'app-comment',
    templateUrl:'./comment.component.html'
})
export class CommentComponent{
    @Input() comment!:Comentario|ComentarioBitacora;
}