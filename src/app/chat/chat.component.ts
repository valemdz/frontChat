import { Component, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Mensaje } from './models/mensaje';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensajes:Mensaje[]=[];
  busqueda:string;
  connected:boolean=false;

  private client:Client;
  subs:any;

  mensaje:Mensaje = new Mensaje();

  escribiendo;  

  clienteId:string;

  constructor() { 
    this.clienteId =  'id-' + new Date().getUTCMilliseconds()
                            + '-' + Math.random().toString(36).substr(2);
  }

  ngOnInit() {

    this.client = new Client();
    this.client.webSocketFactory = () => {
        return new SockJS("http://localhost:8080/chat-websocket");
    }    

    this.client.onConnect = ( frame) =>{  

        console.log( 'Conectados:' +  this.client.connected + ' : ' + frame );
        this.connected = true;
        this.client.subscribe( '/chat/mensaje', 
            e => { 
              let m = JSON.parse( e.body) as Mensaje;
              m.fecha = new Date( m.fecha);

              // Ojo tengo que filtrar xq recibo todo mezclado
              if( !this.mensaje.color 
                  && this.mensaje.tipo == 'NUEVO_USUARIO'
                  && this.mensaje.username ==  m.username ){
                    this.mensaje.color = m.color;
              }              
              this.mensajes.push( m );
            });
        
        this.mensaje.tipo = 'NUEVO_USUARIO';
            
        this.client.publish({
          destination: '/app/mensaje',  
          body: JSON.stringify( this.mensaje ) 
        });  
        
        this.client.subscribe( '/chat/escribiendo', 
                                e => {                                 
                                  this.escribiendo = e.body; 
                                  setTimeout( () => this.escribiendo = '' , 100 );
                                });
        
        this.solicitarHistorial();
        this.subscribirHistorial();
                                

    }

    this.client.onDisconnect = ( frame ) =>{
      console.log( 'Desconectados:' +  !this.client.connected + ' : ' + frame );
      this.connected = false;    
      this.mensaje.username = '';    
    }

  }

  conectar(){  
    this.client.activate();    
  }

  desconectar(){
    this.client.deactivate();
  }

  solicitarHistorial(){
      this.client.publish({
        destination: '/app/historial',  
        body: this.clienteId 
      });  
  }

  subscribirHistorial(){
     this.client.subscribe( '/chat/historial/'+ this.clienteId , 
                    e => {                      
                      let mjes = JSON.parse( e.body ) as Mensaje[];
                      this.mensajes = mjes.map( m => { m.fecha = new Date(m.fecha); 
                                       return m;} ).reverse()
                      
                  });

  }
 
  enviar(){

    this.mensaje.tipo = 'MENSAJE';

    this.client.publish({
      destination: '/app/mensaje',  
      body: JSON.stringify( this.mensaje ) 
    });

    this.mensaje.texto = ''; 
    this.mensaje.username = ''; 
  }
  
  informarEscritura(){

    this.mensaje.tipo = 'MENSAJE';

    this.client.publish({
      destination: '/app/escribiendo',  
      body: this.mensaje.username
    });
    
  }

  onKeydownEvent( mensajeTipeado ){
     this.informarEscritura();
  }  

}
