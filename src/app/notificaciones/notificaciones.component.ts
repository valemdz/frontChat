import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styles: []
})
export class NotificacionesComponent implements OnInit, OnDestroy {

  username = 'VTORRES';
  constructor( public _wsocket: WebSocketService ) {     
  }

  ngOnInit() {
      this._wsocket.username = this.username;
      this._wsocket.conectar();
      console.log( this.username );
  }

  ngOnDestroy(): void {
     // this._wsocket.desconectar();
  }

}
