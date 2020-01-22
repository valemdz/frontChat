import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { UsuarioService } from '../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styles: []
})
export class NotificacionesComponent implements OnInit, OnDestroy {

  userNameSubscription:Subscription;
  constructor( public _wsocket: WebSocketService, public _us:UsuarioService ) {     
  }

  ngOnInit() {
     this.escucharUserName();
  }

  escucharUserName(){
      this._us.usernameSource.subscribe( username => {

        this._wsocket.username = username;
        this._wsocket.inicializar();
        this._wsocket.conectar();
        console.log( username );
      });

  }

  ngOnDestroy(): void {
     if( this.userNameSubscription ){
        this.userNameSubscription.unsubscribe();
     }
  }

}
