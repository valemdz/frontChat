import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


const appRoutes:Routes = [  
  { path:'chat', component:ChatComponent },
  { path:'**', redirectTo:'chat', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {useHash:true}), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
