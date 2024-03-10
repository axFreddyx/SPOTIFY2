import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlayComponent } from 'src/app/components/play/play.component'; 
import { PauseComponent } from 'src/app/components/pause/pause.component';
import { NextComponent } from 'src/app/components/next/next.component';
import { BeforeComponent } from 'src/app/components/before/before.component';
import { PlayerComponent } from 'src/app/components/player/player.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { InfUserComponent } from 'src/app/components/inf-user/inf-user.component';


@NgModule({
  declarations: [
    PlayComponent, 
    PauseComponent,
    NextComponent,
    BeforeComponent,
    PlayerComponent,
    HeaderComponent,
    InfUserComponent
  ],
  exports:[
    PlayComponent, 
    PauseComponent,
    NextComponent,
    BeforeComponent,
    PlayerComponent,
    HeaderComponent,
    InfUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ]
})
export class AppModule { }
