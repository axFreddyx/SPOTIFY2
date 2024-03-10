import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-inf-user',
  templateUrl: './inf-user.component.html',
  styleUrls: ['./inf-user.component.scss'],
})
export class InfUserComponent  implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController
  ) { }

  user:any[] = [];

  ngOnInit() {
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
