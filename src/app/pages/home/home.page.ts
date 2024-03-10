import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular/standalone';
import { closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/modules/app/app.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,AppModule]
})
export class HomePage implements OnInit {

  constructor(
    private api: ApiService,
    private storage: Storage, 
    private toastController: ToastController,
    private router: Router
  ) 
  { 
    addIcons({checkmarkCircleOutline, closeCircleOutline});
  }

  song: any[] = [];
  user: any[] = [];

  ngOnInit() {
    this.getSongs();
    this.getUser();
  }
  
  async getUser(){
    try {
      const token = await this.storage.get("token");
      if(token){
        this.api.getUsersById(token).subscribe({
          next: (res: any) => {
            const data = res.data;
            this.user.push(...data);
            console.log(this.user);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }else{
        this.router.navigateByUrl("/login");
        this.presentToast("middle","Tienes que iniciar Sesión", "warning", 'close-circle-outline');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getSongs() {
    try {
      const token = await this.storage.get("token");
      this.api.getSongs(token).subscribe({
        next: (res: any) => {
          const data = res.data;
          this.song.push(...data);
          console.log(this.song);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg: string, color: string = "success", icon:string = "checkmark-circle-outline") {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
      color: color,
      mode: "ios",
      icon: icon
    });

    await toast.present();
  }



}
