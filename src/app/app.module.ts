import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { WebSocketService } from './services/web-socket.service';



const appRoutes:Routes = [  
  { path:'notificacion', component:NotificacionesComponent },
  { path:'chat', component:ChatComponent },
  { path:'**', redirectTo:'notificacion', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    NotificacionesComponent,    
  ],
  imports: [
    BrowserModule,
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {useHash:true}), 
  ],
  providers: [ WebSocketService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
