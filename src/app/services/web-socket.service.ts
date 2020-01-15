import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Notificacion } from '../chat/models/notificacion';

@Injectable()
export class WebSocketService {
  
  connected:boolean=false;
  private client:Client;
  subs:any; 
  username;
  mensaje:string;	
  notis:Notificacion[]=[];


  constructor() {

      this.client = new Client();

      this.client.webSocketFactory = () => {
          return new SockJS("http://localhost:8080/chat-websocket");
      }    

      this.client.onConnect = ( frame ) =>{  
          console.log( 'Conectados:' +  this.client.connected + ' : ' + frame );
          this.connected = true; 
          this.publishoNotificacion();
          this.subscribeNotificacion();
      }  
      
      this.client.onDisconnect = ( frame ) =>{
        console.log( 'Desconectados:' +  !this.client.connected + ' : ' + frame );
        this.connected = false;           
      }

   }

   conectar(){  
      this.client.activate();    
   }

   desconectar(){
      this.client.deactivate();
   }

   publishoNotificacion(){
      this.client.publish({
        destination: '/app/notificaciones',  
        body:this.username  
      });  
   }

   subscribeNotificacion(){

      this.client.subscribe( '/chat/notificaciones/'+ this.username, 
               e => {                                 
                  this.notis = JSON.parse( e.body ) as Notificacion[];  
                  console.log( this.notis );                 
               });
   }

}
